export default function SectionTitle({ eyebrow, title, intro, align = 'left' }) {
  return (
    <div className={`section-title ${align}`}>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h2>{title}</h2>
      {intro && <p>{intro}</p>}
    </div>
  )
}
