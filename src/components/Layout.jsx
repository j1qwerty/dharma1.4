import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import { useLocale } from '../lib/i18n'

function ScrollReset() {
  const location = useLocation()
  useEffect(() => window.scrollTo({ top: 0, behavior: 'instant' }), [location.pathname])
  return null
}

export default function Layout() {
  const { locale } = useLocale()
  useEffect(() => {
    document.documentElement.lang = locale === 'hi' ? 'hi' : 'en'
  }, [locale])

  return (
    <div className="app-shell">
      <ScrollReset />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
