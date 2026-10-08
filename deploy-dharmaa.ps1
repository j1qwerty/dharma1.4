<#
.SYNOPSIS
    Builds and deploys the DharmaTribe React website to dharmaatribe.com.

.DESCRIPTION
    Builds the Vite app into dist/, packages the static output with tar, uploads
    it through the configured SSH host, and syncs it to the nginx document root
    /var/www/dharmaatribe.com/html. The deployment does not restart a service or
    change nginx configuration.

.PARAMETER SkipBuild
    Deploy the existing dist/ directory without running pnpm build.

.PARAMETER SkipConfirm
    Deploy without the interactive y/N confirmation.

.PARAMETER SkipVerify
    Skip the public HTTP checks after deployment.

.PARAMETER Host_
    SSH host alias. Defaults to "contabo".

.EXAMPLE
    .\deploy-v1.ps1
    .\deploy-v1.ps1 -SkipConfirm
    .\deploy-v1.ps1 -SkipBuild -SkipConfirm
#>
[CmdletBinding()]
param(
    [switch] $SkipBuild,
    [switch] $SkipConfirm,
    [switch] $SkipVerify,
    [string] $Host_ = 'contabo'
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

$RepoRoot = $PSScriptRoot
$DistDir = Join-Path $RepoRoot 'dist'
$RemoteRoot = '/var/www/dharmaatribe.com/html'
$PublicUrl = 'https://dharmaatribe.com'
$Archive = Join-Path ([System.IO.Path]::GetTempPath()) ("dharmaatribe-web-" + [guid]::NewGuid().ToString('N') + '.tar.gz')
$RemoteArchive = '/tmp/dharmaatribe-web-deploy.tar.gz'

$script:StepNo = 0
$script:Start = Get-Date

function Write-Step {
    param([string] $Text)
    $script:StepNo++
    $elapsed = ((Get-Date) - $script:Start).TotalSeconds
    Write-Host ''
    Write-Host ("  [{0,2}] " -f $script:StepNo) -ForegroundColor DarkGray -NoNewline
    Write-Host $Text -ForegroundColor Cyan -NoNewline
    Write-Host ("  ({0,6:N1}s)" -f $elapsed) -ForegroundColor DarkGray
}

function Write-Ok { param([string] $Text) Write-Host "       OK   $Text" -ForegroundColor Green }
function Write-Info { param([string] $Text) Write-Host "       INFO $Text" -ForegroundColor Gray }
function Fail {
    param([string] $Text)
    Write-Host "  FAIL  $Text" -ForegroundColor Red
    throw $Text
}

function Invoke-Checked {
    param(
        [Parameter(Mandatory)] [string] $FilePath,
        [Parameter(Mandatory)] [string[]] $Arguments,
        [Parameter(Mandatory)] [string] $What,
        [string] $WorkingDirectory
    )

    $previousEap = $ErrorActionPreference
    $ErrorActionPreference = 'Continue'
    try {
        if ($WorkingDirectory) {
            Push-Location $WorkingDirectory
            try { $output = & $FilePath @Arguments 2>&1 }
            finally { Pop-Location }
        } else {
            $output = & $FilePath @Arguments 2>&1
        }
        $code = $LASTEXITCODE
    } finally {
        $ErrorActionPreference = $previousEap
    }

    if ($output) { $output | ForEach-Object { Write-Host "       $_" -ForegroundColor DarkGray } }
    if ($code -ne 0) { Fail "$What failed (exit $code)" }
    return ($output | Out-String)
}

function Test-CommandExists { param([string] $Name) return [bool](Get-Command $Name -ErrorAction SilentlyContinue) }

try {
    Write-Host ''
    Write-Host '  DharmaTribe website deploy' -ForegroundColor Cyan
    Write-Host '  --------------------------' -ForegroundColor DarkCyan

    Write-Step 'Preflight'
    foreach ($command in @('pnpm', 'tar', 'ssh', 'scp')) {
        if (-not (Test-CommandExists $command)) { Fail "Required tool not on PATH: $command" }
    }
    foreach ($file in @('package.json', 'vite.config.js')) {
        if (-not (Test-Path (Join-Path $RepoRoot $file))) { Fail "Run this from the DharmaTribe repo root ($file not found)" }
    }
    Write-Ok 'pnpm, tar, ssh, and scp are available; project root identified'

    Invoke-Checked ssh @('-o', 'BatchMode=yes', '-o', 'ConnectTimeout=10', $Host_, 'echo ssh-ok') `
        -What "ssh $Host_" | Out-Null
    Invoke-Checked ssh @('-o', 'BatchMode=yes', $Host_, "test -d '$RemoteRoot' && nginx -T 2>/dev/null | grep -Fq 'root $RemoteRoot;' && echo site-root-ok") `
        -What 'remote nginx document-root check' | Out-Null
    Write-Ok "$Host_ reachable; nginx maps dharmaatribe.com to $RemoteRoot"

    if (-not $SkipBuild) {
        Write-Step 'Build React app'
        Invoke-Checked pnpm @('build') -What 'pnpm build' -WorkingDirectory $RepoRoot | Out-Null
    } else {
        Write-Step 'Use existing build'
    }

    $indexPath = Join-Path $DistDir 'index.html'
    if (-not (Test-Path $indexPath)) { Fail "Build output missing: $indexPath" }
    $indexHtml = Get-Content -LiteralPath $indexPath -Raw
    $assetRefs = [regex]::Matches($indexHtml, '(?:src|href)="(/assets/[^"?#]+)"') |
        ForEach-Object { $_.Groups[1].Value } | Select-Object -Unique
    if (-not $assetRefs) { Fail 'dist/index.html has no /assets/ JS or CSS references' }
    foreach ($assetRef in $assetRefs) {
        $assetPath = Join-Path $DistDir ($assetRef.TrimStart('/') -replace '/', [IO.Path]::DirectorySeparatorChar)
        if (-not (Test-Path $assetPath)) { Fail "Referenced build asset is missing: $assetRef" }
    }
    Write-Ok ("dist/ contains index.html and {0} referenced asset(s)" -f $assetRefs.Count)

    Write-Step 'Package static site'
    if (Test-Path $Archive) { Remove-Item -LiteralPath $Archive -Force }
    Invoke-Checked tar @('-czf', $Archive, '-C', $DistDir, '.') -What 'tar dist' | Out-Null
    Write-Ok ("created {0:N2} MB archive" -f ((Get-Item -LiteralPath $Archive).Length / 1MB))

    if (-not $SkipConfirm) {
        Write-Host ''
        Write-Host "       Deploy this build to ${PublicUrl}?" -ForegroundColor White
        Write-Host "         Local build: $DistDir" -ForegroundColor Gray
        Write-Host "         Remote root: $RemoteRoot" -ForegroundColor Gray
        $answer = Read-Host '       Continue [y/N]'
        if ($answer.Trim() -notin @('y', 'Y', 'yes', 'YES', 'Yes')) {
            Write-Info 'deployment cancelled'
            return
        }
    }

    Write-Step 'Upload archive'
    Invoke-Checked scp @('-o', 'BatchMode=yes', '-o', 'ConnectTimeout=10', $Archive, "${Host_}:$RemoteArchive") -What 'scp website archive' | Out-Null

    Write-Step 'Deploy to nginx document root'
    $remoteScript = @'
set -eu
archive=/tmp/dharmaatribe-web-deploy.tar.gz
root=/var/www/dharmaatribe.com/html
stage=$(mktemp -d /tmp/dharmaatribe-web-stage.XXXXXX)
trap 'rm -rf "$stage"; rm -f "$archive"' EXIT
tar -xzf "$archive" -C "$stage"
test -s "$stage/index.html"
test -d "$stage/assets"
rsync -a --delete --chown=www-data:www-data "$stage/" "$root/"
test -s "$root/index.html"
echo 'static site synced'
'@
    # Send the script as stdin so its shell quoting and multiline body stay intact.
    $previousEap = $ErrorActionPreference
    $ErrorActionPreference = 'Continue'
    try {
        $remoteScript | ssh -o BatchMode=yes $Host_ 'bash -s'
        $deployCode = $LASTEXITCODE
    } finally {
        $ErrorActionPreference = $previousEap
    }
    if ($deployCode -ne 0) { Fail "remote static-site deploy failed (exit $deployCode)" }
    Write-Ok "synced static build to $RemoteRoot (www-data:www-data)"

    if (-not $SkipVerify) {
        Write-Step 'Verify public site'
        $response = (Invoke-Checked ssh @('-o', 'BatchMode=yes', $Host_, "curl -fsS -o /dev/null -w 'home-ok' '$PublicUrl/'") -What 'homepage HTTP check').Trim()
        if ($response -ne 'home-ok') { Fail 'homepage did not return the expected response' }
        Write-Ok "$PublicUrl/ returns HTML"

        foreach ($assetRef in $assetRefs) {
            Invoke-Checked ssh @('-o', 'BatchMode=yes', $Host_, "curl -fsSI '$PublicUrl$assetRef' >/dev/null && echo asset-ok") -What "asset check $assetRef" | Out-Null
        }
        Write-Ok ("{0} referenced JS/CSS asset(s) return successfully" -f $assetRefs.Count)
        $deepCode = (Invoke-Checked ssh @('-o', 'BatchMode=yes', $Host_, "curl -fsS -o /dev/null -w '%{http_code}' '$PublicUrl/pujas'") -What 'SPA deep-link check').Trim()
        if ($deepCode -ne '200') { Fail "SPA deep link returned HTTP $deepCode (expected 200)" }
        Write-Ok "$PublicUrl/pujas returns successfully"
    }

    Write-Host ''
    Write-Host '  Deploy succeeded.' -ForegroundColor Green
    Write-Host "   Website   $PublicUrl" -ForegroundColor Gray
    Write-Host "   Web root  $RemoteRoot" -ForegroundColor Gray
} finally {
    if (Test-Path $Archive) { Remove-Item -LiteralPath $Archive -Force -ErrorAction SilentlyContinue }
}
