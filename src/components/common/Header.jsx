import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MagnifyingGlass, List, X, Sun, Moon } from "@phosphor-icons/react";
import Brand from "./Brand";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
  const links = [
    ["Home", "/", true],
    ["Pujas", "/pujas", false],
    ["Stories", "/stories", false],
    ["About", "/about", false],
  ];
  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("dt-theme", next ? "dark" : "light");
  }
  return (
    <>
      <div className="h-8 bg-ink-950 text-gold-300 flex items-center justify-center text-[10px] tracking-[.09em]">
        Ganesh Chaturthi bookings are open{" "}
        <Link className="ml-4 font-bold underline underline-offset-4" to="/pujas">
          Explore pujas
        </Link>
      </div>
      <header className="header-dt">
        <div className="container-dt flex h-[70px] items-center justify-between gap-5">
          <Link to="/" aria-label="DharmaTribe home">
            <Brand />
          </Link>
          <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
            {links.map(([label, to, exact]) => (
              <NavLink
                className={({ isActive }) => `nav-dt${isActive ? " active" : ""}`}
                to={to}
                end={exact}
                key={to}
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              className="hidden sm:grid place-items-center h-9 w-9 rounded-full border border-dt"
              aria-label="Search"
            >
              <MagnifyingGlass size={16} />
            </button>
            <button
              onClick={toggleTheme}
              className="grid place-items-center h-9 w-9 rounded-full border border-dt"
              aria-label="Toggle theme"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <Link className="hidden sm:inline-flex nav-dt font-semibold" to="/auth/login">
              My account
            </Link>
            <Link className="hidden sm:inline-flex btn-gold-dt" to="/pujas">
              Book a puja
            </Link>
            <button
              className="lg:hidden grid place-items-center h-9 w-9 rounded-full border border-dt"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              {open ? <X /> : <List />}
            </button>
          </div>
        </div>
        {open && (
          <div className="lg:hidden border-t border-dt surface-dt">
            <div className="container-dt py-5 grid gap-1">
              {links.map(([label, to, exact]) => (
                <NavLink
                  className={({ isActive }) =>
                    `py-3 text-xl display-dt border-b border-dt mobile-nav-dt${isActive ? " active" : ""}`
                  }
                  onClick={() => setOpen(false)}
                  key={to}
                  end={exact}
                  to={to}
                >
                  {label}
                </NavLink>
              ))}
              <Link
                onClick={() => setOpen(false)}
                className="py-3 text-xl display-dt border-b border-dt mobile-nav-dt"
                to="/auth/login"
              >
                My account
              </Link>
              <Link onClick={() => setOpen(false)} className="btn-gold-dt mt-3" to="/pujas">
                Book a puja
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
