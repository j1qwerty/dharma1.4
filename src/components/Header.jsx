import { Link, NavLink, useLocation } from 'react-router-dom'
import { useLocale } from '../lib/i18n'
import { useBooking } from '../lib/booking'

export default function Header() {
  const { locale, setLocale, t } = useLocale()
  const { booking } = useBooking()
  const location = useLocation()

  return (
    <>
      <div className="notice-bar">
        <span>
          {locale === 'hi'
            ? 'परंपरा, संदर्भ और आपकी सहभागिता।'
            : 'Tradition, context and your participation.'}
        </span>
        <span className="notice-dot" />
        <span>
          {locale === 'hi'
            ? 'अंतिम स्लॉट व्हाट्सऐप पर तय होता है।'
            : 'Final slots are confirmed on WhatsApp.'}
        </span>
      </div>

      <header className="site-header">
        <Link to="/" className="brand" aria-label="Dharmaa Tribe home">
          <span className="brand-mark">द</span>
          <span>
            <strong>Dharmaa</strong>
            <small>TRIBE</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary">
          {Object.entries(t.nav).map(([key, label]) => (
            <NavLink
              key={key}
              to={key === 'home' ? '/' : `/${key}`}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              end={key === 'home'}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <Link
            className="header-booking"
            to={booking.pujaId ? `/pujas/${booking.pujaId}` : '/pujas'}
          >
            {locale === 'hi' ? 'पूजा चुनें' : 'Choose a puja'}
          </Link>
          <button
            className="locale-toggle"
            onClick={() => setLocale(locale === 'en' ? 'hi' : 'en')}
            aria-label="Toggle language"
          >
            <span className={locale === 'en' ? 'on' : ''}>EN</span>
            <span className="toggle-line" />
            <span className={locale === 'hi' ? 'on' : ''}>हिं</span>
          </button>
        </div>
      </header>

      {location.pathname.startsWith('/booking/') &&
        location.pathname !== '/booking/confirmation' && (
          <div className="booking-context">
            <span>{locale === 'hi' ? 'बुकिंग' : 'Booking'}</span>
            <div className="context-line" />
            <span>
              {locale === 'hi' ? 'चार चरण, एक साफ़ विवरण' : 'Four steps, one complete record'}
            </span>
          </div>
        )}
    </>
  )
}
