import { useLocale } from '../lib/i18n'

const steps = [
  ['date', '01'],
  ['package', '02'],
  ['sankalp', '03'],
  ['delivery', '04'],
  ['payment', '05'],
]

export default function BookingStepper({ current }) {
  const { locale } = useLocale()
  const labels =
    locale === 'hi'
      ? {
          date: 'तिथि',
          package: 'विकल्प',
          sankalp: 'संकल्प',
          delivery: 'सहभागिता',
          payment: 'पुष्टि',
        }
      : {
          date: 'Date',
          package: 'Options',
          sankalp: 'Sankalp',
          delivery: 'Participation',
          payment: 'Review',
        }

  return (
    <div className="booking-stepper">
      {steps.map(([key, no], index) => (
        <div className={`booking-step ${key === current ? 'current' : ''}`} key={key}>
          <span>{no}</span>
          <div>
            <small>{labels[key]}</small>
            {index < steps.length - 1 && <i />}
          </div>
        </div>
      ))}
    </div>
  )
}
