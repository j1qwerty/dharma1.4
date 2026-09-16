import { Link } from 'react-router-dom'
import { useLocale } from '../lib/i18n'

export default function Footer() {
  const { locale } = useLocale()
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <span className="brand-mark large">द</span>
          <h2>Dharmaa Tribe</h2>
          <p>
            {locale === 'hi'
              ? 'पुरानी परंपराओं को आज की पारिवारिक ज़िंदगी के लिए समझने योग्य बनाना।'
              : 'Making old traditions legible for modern family life.'}
          </p>
        </div>
        <div>
          <p className="footer-label">{locale === 'hi' ? 'जाएँ' : 'Go'}</p>
          <Link to="/pujas">{locale === 'hi' ? 'पूजा' : 'Pujas'}</Link>
          <Link to="/stories">{locale === 'hi' ? 'कथाएँ' : 'Stories'}</Link>
          <Link to="/acharyas">{locale === 'hi' ? 'आचार्य' : 'Acharyas'}</Link>
        </div>
        <div>
          <p className="footer-label">{locale === 'hi' ? 'सहायता' : 'Help'}</p>
          <Link to="/about">{locale === 'hi' ? 'हमारे बारे में' : 'About'}</Link>
          <Link to="/privacy">{locale === 'hi' ? 'गोपनीयता' : 'Privacy'}</Link>
          <Link to="/terms">{locale === 'hi' ? 'नियम' : 'Terms'}</Link>
        </div>
        <div className="footer-note">
          <p className="footer-label">01 / 2026</p>
          <p>
            {locale === 'hi' ? 'ज्ञान पहले। लेन-देन बाद में।' : 'Knowledge before transaction.'}
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Dharmaa Tribe</span>
        <span>
          {locale === 'hi' ? 'परंपरा · परिवार · सहभागिता' : 'Tradition · Family · Participation'}
        </span>
      </div>
    </footer>
  )
}
