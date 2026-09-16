import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const LocaleContext = createContext(null)

const copy = {
  en: {
    nav: { home: 'Home', pujas: 'Pujas', stories: 'Stories', acharyas: 'Acharyas', about: 'About' },
    actions: {
      explore: 'Explore pujas',
      book: 'Book this puja',
      read: 'Read story',
      back: 'Back',
      next: 'Continue',
      finish: 'Send to WhatsApp',
    },
    labels: {
      english: 'English',
      hindi: 'हिन्दी',
      today: 'Today',
      from: 'From',
      duration: 'Duration',
    },
    home: {
      kicker: 'Ancient wisdom, lived today',
      hero: 'Tradition that still feels like home.',
      sub: 'Pujas, stories and guidance for families who want to stay close to their traditions, wherever life has taken them.',
      rituals: 'Rituals with context, not clutter.',
      ritualsSub:
        'Choose by the moment, understand the vidhi, then decide how you want to participate.',
      festival: 'Coming with the next season',
      story: 'Read the tradition',
      acharya: 'Meet the people behind the vidhi',
    },
    booking: {
      chooseDate: 'Choose a date',
      choosePackage: 'Shape your participation',
      sankalp: 'Your Sankalp',
      delivery: 'How should we conduct it?',
      review: 'Review and send',
      dateHint: 'Pick a preferred date and time. We will confirm the final slot on WhatsApp.',
      packageHint: 'Keep it simple. Choose only what your family actually needs.',
      sankalpHint:
        'These details make the Sankalp personal. For Shradh, add ancestor details where known.',
      deliveryHint:
        'You can join live, let the Vedacharya perform on your behalf, or plan a Gaya Ji experience where available.',
      reviewHint: 'Nothing is lost between steps. The final message includes the full booking.',
    },
  },
  hi: {
    nav: {
      home: 'मुखपृष्ठ',
      pujas: 'पूजा',
      stories: 'कथाएँ',
      acharyas: 'आचार्य',
      about: 'हमारे बारे में',
    },
    actions: {
      explore: 'पूजा देखें',
      book: 'पूजा बुक करें',
      read: 'कथा पढ़ें',
      back: 'वापस',
      next: 'आगे बढ़ें',
      finish: 'व्हाट्सऐप पर भेजें',
    },
    labels: { english: 'English', hindi: 'हिन्दी', today: 'आज', from: 'से', duration: 'अवधि' },
    home: {
      kicker: 'प्राचीन परंपरा, आज के जीवन में',
      hero: 'परंपरा, जो आज भी घर जैसी लगे।',
      sub: 'उन परिवारों के लिए पूजा, परंपरा और मार्गदर्शन जो कहीं भी हों, अपनी जड़ों से जुड़े रहना चाहते हैं।',
      rituals: 'विधि समझें, फिर पूजा चुनें।',
      ritualsSub: 'अपने अवसर के अनुसार पूजा देखें, उसकी परंपरा समझें और अपनी सहभागिता तय करें।',
      festival: 'अगले पर्व की ओर',
      story: 'परंपरा के बारे में पढ़ें',
      acharya: 'विधि से जुड़े लोगों से मिलें',
    },
    booking: {
      chooseDate: 'तिथि चुनें',
      choosePackage: 'अपनी सहभागिता चुनें',
      sankalp: 'आपका संकल्प',
      delivery: 'पूजा कैसे करानी है?',
      review: 'जाँचें और भेजें',
      dateHint: 'पसंदीदा तिथि और समय चुनें। अंतिम स्लॉट व्हाट्सऐप पर तय किया जाएगा।',
      packageHint: 'केवल वही चुनें जिसकी आपके परिवार को वास्तव में आवश्यकता है।',
      sankalpHint:
        'यही विवरण संकल्प को व्यक्तिगत बनाते हैं। श्राद्ध के लिए ज्ञात पितृ विवरण भी जोड़ें।',
      deliveryHint:
        'आप लाइव जुड़ सकते हैं, वेदाचार्य से अपनी ओर से पूजा करा सकते हैं या उपलब्ध होने पर गया जी की व्यवस्था चुन सकते हैं।',
      reviewHint: 'किसी चरण का विवरण नहीं छूटेगा। अंतिम संदेश में पूरी बुकिंग जाएगी।',
    },
  },
}

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState(() => localStorage.getItem('dt-locale') || 'en')
  useEffect(() => localStorage.setItem('dt-locale', locale), [locale])
  const value = useMemo(() => ({ locale, setLocale, t: copy[locale] }), [locale])
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const value = useContext(LocaleContext)
  if (!value) throw new Error('useLocale must be used inside LocaleProvider')
  return value
}

export function text(value, locale) {
  if (value && typeof value === 'object' && 'en' in value) return value[locale]
  return value
}
