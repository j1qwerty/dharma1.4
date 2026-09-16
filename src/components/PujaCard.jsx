import { Link } from 'react-router-dom'
import { useLocale, text } from '../lib/i18n'

export default function PujaCard({ puja, featured = false }) {
  const { locale, t } = useLocale()
  return (
    <article className={`puja-card ${featured ? 'featured' : ''}`}>
      <Link to={`/pujas/${puja.id}`} className="puja-media">
        <img src={puja.image} alt={text(puja.title, locale)} loading="lazy" />
        <span className="puja-tag">{text(puja.tag, locale)}</span>
        <span className="puja-arrow">↗</span>
      </Link>
      <div className="puja-card-body">
        <div className="eyebrow">
          {text(puja.deity, locale)} · {text(puja.purpose, locale)}
        </div>
        <Link to={`/pujas/${puja.id}`} className="puja-title">
          {text(puja.title, locale)}
        </Link>
        <p>{text(puja.desc, locale)}</p>
        <div className="puja-card-foot">
          <span>₹{puja.price.toLocaleString('en-IN')}</span>
          <span>{text(puja.place, locale)}</span>
        </div>
      </div>
    </article>
  )
}
