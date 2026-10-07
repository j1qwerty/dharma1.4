// Per-story editorial bodies for StoryDetail. One entry per story id in
// data.js. Each body has keywords plus EN sections and HI sections
// (HI falls back to EN per section when a translation is not provided).
// Images mix the story cover, repo-verified Unsplash IDs and picsum seeds.
const U = (id, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;
const P = (seed, w = 1200, h = 700) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

function sec(h, hHi, ps, psHi, extra = {}) {
  return { h, hHi, ps, psHi, ...extra };
}

export const STORY_CONTENT = {
  "navratri-nine-nights": {
    keywords: ["navratri", "navratra", "sharad navratri 2026", "durga puja", "kalash sthapana", "kanya pujan", "navratri puja online", "navdurga"],
    relatedPuja: "navratri",
    en: {
      intro: "Sharad Navratri runs 11 to 19 Oct 2026. This guide covers the full sequence: Ghatasthapana, daily Saptashati path, Ashtami Kanya Pujan and Navami Havan, with colours, bhog and vrat rules for each day.",
      sections: [
        sec("Ghatasthapana sets the tone", null, [
          "Pratipada morning is the anchor. A Kalash with mango leaves, coconut, rice and water is installed facing east, and the Akhand Jyoti is lit with a clear Sankalp for the nine days.",
          "Book the morning muhurat in advance. If two muhurats are offered, the earlier one suits working families because the setup finishes before office hours.",
        ], null, { img: "/puja/navratra.jpg", alt: "Decorated Devi idol for Sharad Navratri", list: ["Kalash, mango leaves and coconut", "Akhand Jyoti ghee and cotton wicks", "Family names, gotra and intention"] }),
        sec("One Devi form per day", null, [
          "Shailputri to Siddhidatri: each day has a colour, a mantra and a bhog. Shailputri opens with yellow, Kalaratri deepens with blue, Mahagauri softens with pink on Ashtami.",
          "You do not need nine separate bookings. One Navratri Sankalp carries across all forms, and the acharya names each day form during the daily path.",
        ], null, { img: P("dharma-story-navratri-forms"), alt: "Nine diyas marking the nine nights of Navratri" }),
        sec("Ashtami and Navami decide the outcome", null, [
          "Ashtami hosts Kanya Pujan: nine girls are welcomed, fed and given dakshina. Navami closes with Havan and Purnahuti, then Dussehra morning ends the fast.",
          "These two days book out first every year. Reserve Ashtami and Navami slots before Saptami if your family wants the acharya live on both days.",
        ], null, { quote: "Navratri rewards steadiness more than intensity. Small daily discipline beats one grand gesture.", list: ["Ashtami: Kanya Pujan and prasad", "Navami: Havan, Purnahuti, Dussehra eve", "Video delivery within 48 hours"] }),
        sec("Vrat rules that working families can keep", null, [
          "Sendha namak, kuttu atta, singhara, fruit and milk carry most families through nine days. One simple meal plus fruit is a valid vrat when health needs it.",
          "Keep water, rest and medicines non-negotiable. Pregnant women, the elderly and the ill should follow a light phalahar with the doctor's advice, not a strict nirjala.",
        ], null, { img: U("photo-1604608672516-f1b9c7f84d1c"), alt: "Diya flames during Navratri vrat evenings" }),
      ],
      faq: [
        ["When is Sharad Navratri 2026?", "11 to 19 Oct, Dussehra on 20 Oct. Ghatasthapana on Pratipada morning."],
        ["Can I book only Ashtami and Navami?", "Yes. Single-day, Ashtami-Navami and full nine-night options all carry the same Sankalp format."],
        ["Is the video included?", "Yes. Recorded path, Kanya Pujan and Havan clips arrive within 24 to 48 hours."],
      ],
    },
    hi: {
      intro: "शारदीय नवरात्रि 2026: 11 से 19 अक्टूबर। घटस्थापना, daily सप्तशती पाठ, अष्टमी कन्या पूजन और नवमी हवन की पूरी विधि, रंग, भोग और व्रत नियमों सहित।",
      sections: [
        sec(null, "घटस्थापना से शुरुआत", null, [
          "प्रतिपदा की सुबह कलश स्थापना और अखंड ज्योति। नौ दिनों का संकल्प स्पष्ट शब्दों में।",
          "सुबह का मुहूर्त पहले बुक करें ताकि ऑफिस से पहले स्थापना पूरी हो जाए।",
        ]),
        sec(null, "हर दिन एक रूप", null, [
          "शैलपुत्री से सिद्धिदात्री: हर दिन का रंग, मंत्र और भोग।",
          "एक ही संकल्प नौ दिनों तक चलता है, आचार्य हर दिन रूप का नाम लेते हैं।",
        ]),
        sec(null, "अष्टमी और नवमी", null, [
          "अष्टमी को कन्या पूजन, नवमी को हवन और पूर्णाहुति।",
          "ये दो दिन सबसे पहले भरते हैं, सप्तमी से पहले बुक करें।",
        ]),
        sec(null, "व्रत के नियम", null, [
          "सेंधा नमक, कुट्टू, सिंघाड़ा, फल और दूध। स्वास्थ्य पहले, फिर व्रत।",
        ]),
      ],
      faq: [
        ["शारदीय नवरात्रि 2026 कब है?", "11 से 19 अक्टूबर, दशहरा 20 अक्टूबर।"],
        ["क्या केवल अष्टमी नवमी बुक हो सकती है?", "हाँ। एक दिन, अष्टमी-नवमी या पूरे नौ दिन।"],
        ["वीडियो मिलेगा?", "हाँ। 24 से 48 घंटे के भीतर।"],
      ],
    },
  },
  "why-sankalp": {
    keywords: ["sankalp", "sankalpa meaning", "gotra in puja", "online puja sankalp"],
    relatedPuja: "satyanarayan",
    en: {
      intro: "Sankalp is the spoken intention at the start of a puja: your name, gotra, place, time and purpose. This guide explains each field and why the priest asks for it.",
      sections: [
        sec("Name, gotra and the reason they matter", null, [
          "The priest places your identity into the ritual the way an address places a letter. Name plus gotra plus family members tells the mantra exactly whom it serves.",
          "Unknown gotra is normal. The booking offers an opt-out and the acharya uses a general gotra so the ritual proceeds without pause.",
        ], null, { img: P("dharma-story-sankalp"), alt: "Priest preparing the Sankalp patrika before a puja" }),
        sec("Purpose in one honest sentence", null, [
          "Manokamna works best as one plain sentence: health for a parent, steadiness in a new job, harmony at home. Vague wishes get vague rituals.",
          "Write it before checkout. You can refine it with the acharya on WhatsApp before the muhurat, and the final wording enters the patrika.",
        ], null, { quote: "A clear Sankalp is half the puja. The rest is procedure.", list: ["Full name and gotra", "Family members on Family package", "One-line purpose"] }),
        sec("Rashi and nakshatra, only when needed", null, [
          "Graha Shanti and Navagraha Homam need rashi and nakshatra. Most Katha and Archana bookings do not, and the form skips them there.",
          "Approximate birth details are fine. The acharya confirms the working values during Sankalp and notes them in your record.",
        ], null, {}),
        sec("What the priest sends back", null, [
          "After the ritual you receive the Sankalp patrika reference with photos and video. The same names reappear in the delivery so you can verify what was carried in.",
          "Keep the patrika. Next year the same details prefill, and annual rites like Varshik Shradh start from memory instead of zero.",
        ], null, { img: U("photo-1529070538774-1843cb3265df"), alt: "Family joining a puja Sankalp from home" }),
      ],
      faq: [
        ["Do I need my gotra?", "No. Choose the opt-out and the priest uses a general gotra."],
        ["Can family join one Sankalp?", "Yes. Family package covers four members by name."],
        ["Can I edit the purpose later?", "Yes, before the muhurat, on WhatsApp with the acharya."],
      ],
    },
    hi: {
      intro: "संकल्प पूजा की शुरुआत में बोला गया उद्देश्य है: नाम, गोत्र, स्थान, समय और मनोकामना। हर खाने का अर्थ और आचार्य इसे क्यों पूछते हैं, यहाँ।",
      sections: [
        sec(null, "नाम, गोत्र और इनका महत्व", null, [
          "आचार्य आपकी पहचान मंत्र में रखते हैं, जैसे पते पर चिट्ठी। नाम, गोत्र और परिवार के सदस्य बताते हैं कि मंत्र किसके लिए है।",
          "गोत्र ज्ञात न होना सामान्य है। बुकिंग में विकल्प चुनें और आचार्य सामान्य गोत्र से विधि बिना रुके पूरी करेंगे।",
        ]),
        sec(null, "एक सरल वाक्य में उद्देश्य", null, [
          "मनोकामना एक स्पष्ट वाक्य में लिखें: माता-पिता का स्वास्थ्य, नई नौकरी में स्थिरता, घर में सुख। अस्पष्ट कामना से अस्पष्ट अनुष्ठान।",
          "मुहूर्त से पहले WhatsApp पर सुधार हो सकता है, और अंतिम शब्द पत्रिका में जाते हैं।",
        ], { hiQuote: "स्पष्ट संकल्प आधी पूजा है। बाकी विधि है।", hiList: ["पूरा नाम और गोत्र", "Family package में परिवार के सदस्य", "एक पंक्ति में उद्देश्य"] }),
        sec(null, "राशि और नक्षत्र, जब जरूरी हो", null, [
          "ग्रह शांति और नवग्रह होमम में राशि और नक्षत्र चाहिए। कथा और अर्चना में फॉर्म इन्हें छोड़ देता है।",
          "अनुमानित जन्म विवरण भी चलता है। आचार्य संकल्प के समय सही मान तय करके रिकॉर्ड में लिखते हैं।",
        ]),
        sec(null, "आचार्य क्या भेजते हैं", null, [
          "पूजा के बाद संकल्प पत्रिका का संदर्भ, तस्वीरें और वीडियो मिलते हैं। वही नाम डिलीवरी में दिखते हैं।",
          "पत्रिका संभालकर रखें। अगले साल वही विवरण पहले से भरा मिलेगा।",
        ]),
      ],
      faq: [
        ["क्या गोत्र जानना जरूरी है?", "नहीं। विकल्प चुनें, आचार्य सामान्य गोत्र से पूजा करेंगे।"],
        ["क्या परिवार एक संकल्प में जुड़ सकता है?", "हाँ। Family package में चार सदस्य नाम सहित।"],
        ["क्या उद्देश्य बाद में बदल सकता है?", "हाँ, मुहूर्त से पहले WhatsApp पर आचार्य के साथ।"],
      ],
    },
  },
  "temple-bells": {
    keywords: ["temple bells", "ghanta meaning", "hindu temple ritual", "aarti bells"],
    relatedPuja: "mahadeva-rudra",
    en: {
      intro: "Bells mark time inside a temple: waking the deity, opening darshan, punctuating aarti. This is a short guide to what each ringing actually signals.",
      sections: [
        sec("Morning bell: waking the sanctum", null, [
          "The first bell opens the day with Suprabhatam energy. Doors open, lamps are lit, and the previous night stillness breaks in a controlled way.",
          "Devotees standing for this bell usually want the first darshan. Arrive ten minutes early; the bell waits for nobody.",
        ], null, { img: P("dharma-story-bells"), alt: "Temple bell ringing at morning aarti" }),
        sec("Aarti bells: keeping rhythm", null, [
          "During aarti, small bells keep tala while the large ghanta marks section ends. The pattern tells regulars where the ritual stands without announcements.",
          "Clap or cymbals only if the temple invites it. Many Shiva temples prefer bells alone during Rudrabhishek.",
        ], null, { quote: "The bell is the temple clock. Regulars tell time by it.", list: ["Opening bell", "Aarti rhythm", "Closing bell"] }),
        sec("Why metal and shape matter", null, [
          "Bronze bells with a long sustain carry across stone halls. The shape decides whether the sound blooms or cuts.",
          "Old bells are never polished bright. Patina is part of the voice, and priests protect it.",
        ], null, {}),
        sec("Hearing it online", null, [
          "Recorded aarti keeps the bell but compresses the hall. Listen once on speakers to catch the decay the phone mic misses.",
          "Dharmaa puja videos keep one unedited aarti minute so the bell rings at natural length.",
        ], null, { img: U("photo-1582555172866-f73bb12a2ab3"), alt: "Temple corridor with hanging bells" }),
      ],
      faq: [
        ["Why ring the bell on entry?", "To announce presence and mark the move from outer noise to inner attention."],
        ["Are bells mandatory?", "No. Darshan without ringing is complete darshan."],
        ["Do online pujas include bells?", "Yes. The recorded aarti keeps the natural bell sequence."],
      ],
    },
    hi: {
      intro: "मंदिर में घंटे समय बताते हैं: जागरण, दर्शन, आरती। सुबह के घंटे, आरती की ताल और धातु के महत्व की छोटी गाइड।",
      sections: [
        sec(null, "सुबह का घंटा", null, [
          "प्रमुख मंदिरों में सुबह 4 बजे द्वार खुलते हैं। घंटा रात्रि प्रहर तोड़ता है और गर्भगृह के दीप एक-एक करके जलते हैं।",
          "पहले दर्शन के लिए दस मिनट पहले पहुँचें। घंटा किसी का इंतजार नहीं करता।",
        ]),
        sec(null, "आरती में ताल", null, [
          "आरती में छोटे घंटे ताल रखते हैं, बड़ा घंटा खंड समाप्ति बताता है। नियमित भक्त बिना घोषणा समझ जाते हैं।",
          "ताली या मंजीरा तभी बजाएँ जब मंदिर कहे। रुद्राभिषेक में कई शिव मंदिर केवल घंटे पसंद करते हैं।",
        ], { hiQuote: "घंटा मंदिर की घड़ी है। नियमित लोग इसी से समय जानते हैं।", hiList: ["खुलने का घंटा", "आरती की ताल", "बंद होने का घंटा"] }),
        sec(null, "धातु और आकार का महत्व", null, [
          "कांसे के घंटों की गूंज पत्थर के हॉल में दूर जाती है। आकार तय करता है कि नाद खिलेगा या कटेगा।",
          "पुराने घंटे चमकाए नहीं जाते। हरापन नाद का हिस्सा है, पुजारी इसकी रक्षा करते हैं।",
        ]),
        sec(null, "ऑनलाइन सुनना", null, [
          "रिकॉर्ड आरती में घंटा रहता है पर हॉल दब जाता है। एक बार स्पीकर पर सुनें।",
          "धर्मा वीडियो में एक मिनट की आरती बिना कट रखी जाती है।",
        ]),
      ],
      faq: [
        ["प्रवेश पर घंटा क्यों?", "उपस्थिति बताने और बाहरी शोर से भीतर ध्यान में जाने के लिए।"],
        ["क्या घंटे जरूरी हैं?", "नहीं। बिना बजाए दर्शन पूर्ण है।"],
        ["क्या ऑनलाइन पूजा में घंटे हैं?", "हाँ। रिकॉर्ड आरती में प्राकृतिक क्रम रहता है।"],
      ],
    },
  },
  "shiva-ritual": {
    keywords: ["rudrabhishek", "maha rudrabhishek", "shiva puja online", "abhishek vidhi"],
    relatedPuja: "mahadeva-rudra",
    en: {
      intro: "Rudrabhishek is the most requested Shiva ritual because its sequence is legible: invocation, abhishek with eleven dravyas, Rudram recitation, aarti. Here is the order explained.",
      sections: [
        sec("Sankalp and invocation first", null, [
          "Ganesh and Kalash come before Shiva. The acharya settles direction, seat and water, then speaks your Sankalp into the vessels.",
          "This opening takes fifteen minutes and decides the quality of everything after. Never rush it.",
        ], null, { img: P("dharma-story-rudra"), alt: "Shiva lingam prepared for Rudrabhishek" }),
        sec("The eleven dravyas in order", null, [
          "Water, milk, curd, ghee, honey, sugar, then panchamrita combinations, followed by scented water and bhasma marking. Each has a mantra segment from Rudram.",
          "Online bookings use temple-standard quantities. Home rituals get a measured list so nothing is wasted.",
        ], null, { list: ["Panchamrita set", "Bilva leaves and flowers", "Bhasma and chandan", "Aarti lamps and camphor"] }),
        sec("Rudram: why it takes an hour", null, [
          "Namakam and Chamakam run about an hour at teaching pace. The abhishek flows continuously while the recitation holds the rhythm.",
          "Short bookings use Laghu Rudra. Ask which recension your slot carries before the muhurat.",
        ], null, { quote: "Abhishek is the body, Rudram is the breath. One without the other is incomplete." }),
        sec("What you receive after", null, [
          "Photos of the alankaram, the full aarti clip and the Sankalp reference arrive within 48 hours. Bhasma prasad ships where temple rules allow.",
          "Monday and Pradosh slots fill first. Shravan Mondays open a month ahead.",
        ], null, { img: U("photo-1548013146-72479768bada"), alt: "Temple towers at dawn before Rudrabhishek" }),
      ],
      faq: [
        ["How long is Maha Rudrabhishek?", "One to two hours depending on recension."],
        ["Can I join live?", "Yes. Live participation link arrives before the muhurat."],
        ["Is Monday required?", "No. Mondays and Pradosh are preferred, any day is valid."],
      ],
    },
    hi: {
      intro: "रुद्राभिषेक सबसे माँगा जाने वाला शिव अनुष्ठान है। संकल्प, ग्यारह द्रव्यों से अभिषेक, रुद्रम पाठ, आरती: पूरा क्रम यहाँ।",
      sections: [
        sec(null, "संकल्प और आह्वान पहले", null, [
          "शिव से पहले गणेश और कलश। आचार्य दिशा, आसन और जल स्थिर करके पात्रों में आपका संकल्प बोलते हैं।",
          "यह शुरुआत पंद्रह मिनट की है और आगे की गुणवत्ता तय करती है।",
        ]),
        sec(null, "क्रम से ग्यारह द्रव्य", null, [
          "जल, दूध, दही, घी, शहद, शक्कर, फिर पंचामृत, सुगंधित जल और भस्म। हर द्रव्य के साथ रुद्रम का खंड।",
          "ऑनलाइन बुकिंग में मंदिर-मानक मात्रा। घर की पूजा में नपी-तुली सूची ताकि व्यर्थ न हो।",
        ], { hiList: ["पंचामृत सेट", "बेलपत्र और फूल", "भस्म और चंदन", "आरती के दीप और कपूर"] }),
        sec(null, "रुद्रम में एक घंटा क्यों", null, [
          "नमकम और चमकम सिखाने की गति से लगभग एक घंटा। पाठ ताल रखता है, अभिषेक चलता रहता है।",
          "छोटी बुकिंग में लघु रुद्र। मुहूर्त से पहले पूछें कि आपके स्लॉट में कौन-सा पाठ है।",
        ], { hiQuote: "अभिषेक शरीर है, रुद्रम श्वास। एक के बिना दूसरा अधूरा।" }),
        sec(null, "बाद में क्या मिलता है", null, [
          "48 घंटे में अलंकार की तस्वीरें, पूरी आरती क्लिप और संकल्प संदर्भ। मंदिर नियम जहाँ दें, भस्म प्रसाद भेजा जाता है।",
          "सोमवार और प्रदोष स्लॉट पहले भरते हैं। श्रावण सोमवार एक महीना पहले खुलता है।",
        ]),
      ],
      faq: [
        ["महा रुद्राभिषेक कितना लंबा?", "पाठ के अनुसार एक से दो घंटे।"],
        ["क्या लाइव जुड़ सकते हैं?", "हाँ। मुहूर्त से पहले लाइव लिंक आता है।"],
        ["क्या सोमवार जरूरी है?", "नहीं। सोमवार और प्रदोष प्रिय हैं, हर दिन उचित है।"],
      ],
    },
  },
  "home-puja": {
    keywords: ["online puja", "remote puja india", "puja from abroad", "live puja"],
    relatedPuja: "shraadh",
    en: {
      intro: "One family, three cities, one booking. How a remote puja actually works: live guidance at home versus performance on your behalf at the temple.",
      sections: [
        sec("Two formats, one Sankalp", null, [
          "At-home format: you set up a small altar and the acharya guides each step live. On-behalf format: the acharya performs at the temple with your names in the Sankalp.",
          "Distance families usually pick on-behalf for Shradh and at-home for festivals. Both deliver video.",
        ], null, { img: P("dharma-story-remote"), alt: "Family watching a live puja from their living room" }),
        sec("The setup list is short", null, [
          "Diya, flowers, rice, water vessel and a white cloth cover ninety percent of home rituals. The booking sends the exact checklist per puja.",
          "No special room needed. A clean east-facing corner with phone on a stand works for the whole family.",
        ], null, { list: ["Diya and camphor", "Flowers and akshat", "Kalash or water vessel", "Phone stand for live view"] }),
        sec("Time zones handled before payment", null, [
          "Muhurat shows in your local zone at checkout. The acharya confirms the IST equivalent on WhatsApp so nobody converts wrong.",
          "US and Gulf families usually take dawn IST slots, which land at comfortable evening hours abroad.",
        ], null, { quote: "Distance changed how families live. It does not have to change how they remember." }),
        sec("After the bell rings", null, [
          "Photos land first, video within 48 hours. The Sankalp reference stays in your account for next year.",
          "Missed the live slot? Nothing is lost. The recording carries the same Sankalp names.",
        ], null, { img: U("photo-1599487488170-d11ec9c172f0"), alt: "Evening aarti lamps after a remote puja" }),
      ],
      faq: [
        ["Can elders join without a smartphone?", "Yes. One family device on speaker covers the whole room."],
        ["What if we miss the live slot?", "The recording stays in your account with the same Sankalp."],
        ["Is on-behalf valid?", "Yes. Shastra recognises sankalp-based representation by a qualified acharya."],
      ],
    },
    hi: {
      intro: "एक परिवार, तीन शहर, एक बुकिंग। दूर से पूजा के दो तरीके: घर पर लाइव मार्गदर्शन या मंदिर से आपकी ओर से अनुष्ठान।",
      sections: [
        sec(null, "दो तरीके, एक संकल्प", null, [
          "घर वाला तरीका: छोटी वेदी सजाकर आचार्य हर चरण लाइव बताते हैं। मंदिर वाला: आचार्य आपके नाम से मंदिर में करते हैं।",
          "दूरी वाले परिवार श्राद्ध में मंदिर वाला, त्योहार में घर वाला चुनते हैं। वीडियो दोनों में।",
        ]),
        sec(null, "छोटी तैयारी सूची", null, [
          "दीया, फूल, चावल, जलपात्र और सफेद कपड़ा नब्बे प्रतिशत घरेलू पूजा में काफी। हर पूजा की सही सूची बुकिंग भेजती है।",
          "अलग कमरा नहीं चाहिए। पूर्वमुखी साफ कोना और स्टैंड पर फोन पूरे परिवार के लिए काफी।",
        ], { hiList: ["दीया और कपूर", "फूल और अक्षत", "कलश या जलपात्र", "लाइव के लिए फोन स्टैंड"] }),
        sec(null, "भुगतान से पहले समय क्षेत्र", null, [
          "मुहूर्त चेकआउट पर आपके स्थानीय समय में दिखता है। आचार्य WhatsApp पर IST समतुल्य पक्का करते हैं।",
          "अमेरिका और खाड़ी के परिवार सुबह के IST स्लॉट लेते हैं जो वहाँ शाम होती है।",
        ], { hiQuote: "दूरी ने जीना बदला है। याद करना नहीं बदलना चाहिए।" }),
        sec(null, "घंटी के बाद", null, [
          "पहले तस्वीरें, 48 घंटे में वीडियो। संकल्प संदर्भ अगले साल के लिए खाते में रहता है।",
          "लाइव छूट भी जाए तो कुछ नहीं छूटता। रिकॉर्डिंग में वही संकल्प नाम हैं।",
        ]),
      ],
      faq: [
        ["बुजुर्ग बिना स्मार्टफोन जुड़ सकते हैं?", "हाँ। एक ही डिवाइस स्पीकर पर पूरे कमरे के लिए।"],
        ["लाइव छूट जाए तो?", "रिकॉर्डिंग खाते में रहती है, वही संकल्प सहित।"],
        ["क्या प्रतिनिधि पूजा मान्य है?", "हाँ। योग्य आचार्य द्वारा संकल्प-आधारित प्रतिनिधित्व शास्त्र मानता है।"],
      ],
    },
  },
  "diwali-lakshmi": {
    keywords: ["diwali lakshmi puja", "dhanteras", "diwali puja online", "mahalakshmi"],
    relatedPuja: "lakshmi-diwali",
    en: {
      intro: "A calmer Diwali starts two weeks early: Lakshmi puja slot, dhanteras list, pradosh muhurat. This guide orders the festival so the main night stays peaceful.",
      sections: [
        sec("Dhanteras first, Diwali night second", null, [
          "Dhanteras opens the buying and the first Lakshmi invocation. Diwali night carries the main Mahalakshmi puja in pradosh kaal.",
          "Book both in one Sankalp if the family splits across cities. Names carry across the two evenings.",
        ], null, { img: P("dharma-story-diwali"), alt: "Diyas lined up for Diwali Lakshmi puja" }),
        sec("The pradosh window", null, [
          "Lakshmi puja sits in the evening pradosh window, roughly two hours after sunset. The booking shows your city exact muhurat.",
          "Office-goers should take the second half of the window. The acharya holds the Sankalp till the family joins.",
        ], null, { list: ["Lakshmi and Ganesh idols", "Kamal flowers and lotus seeds", "Kheel, batasha and mithai", "New ledger or laptop for chopda pujan"] }),
        sec("What calms the night", null, [
          "One aarti, one bhog, one round of the family names. Long Diwali nights collapse when every cousin adds a new ritual mid-way.",
          "Fix the sequence on Dhanteras itself and share it in the family group. The night then runs itself.",
        ], null, { quote: "Diwali is won on Dhanteras. The main night only performs the plan." }),
        sec("After the festival", null, [
          "Photos and the aarti clip arrive within 48 hours. Keep the ledger photo; many businesses file it with the yearly accounts.",
          "Next year the same Lakshmi Sankalp prefills. One tap rebooks the pradosh slot.",
        ], null, { img: U("photo-1603561596112-0a132b5a965a"), alt: "Lakshmi diya glowing on Diwali night" }),
      ],
      faq: [
        ["Which day is the main Lakshmi puja?", "Diwali night in pradosh kaal, after sunset."],
        ["Can offices book one Sankalp?", "Yes. Partner and staff names go into one Family Sankalp."],
        ["Is Chopda Pujan included?", "On request. Mention ledger worship while booking."],
      ],
    },
    hi: {
      intro: "शांत दीवाली धनतेरस से शुरू होती है। लक्ष्मी पूजन, प्रदोष मुहूर्त और तैयारी का सही क्रम यहाँ।",
      sections: [
        sec(null, "पहले धनतेरस, फिर दीवाली रात", null, [
          "धनतेरस पर खरीद और पहला लक्ष्मी आह्वान। दीवाली रात प्रदोष काल में मुख्य महालक्ष्मी पूजा।",
          "परिवार अलग शहरों में हो तो दोनों शाम एक ही संकल्प में बुक करें।",
        ]),
        sec(null, "प्रदोष का समय", null, [
          "लक्ष्मी पूजन सूर्यास्त के लगभग दो घंटे बाद प्रदोष में। बुकिंग में आपके शहर का सही मुहूर्त दिखता है।",
          "नौकरीपेशा दूसरे आधे समय को लें। परिवार जुड़े तब तक आचार्य संकल्प रोके रखते हैं।",
        ], { hiList: ["लक्ष्मी-गणेश मूर्ति", "कमल फूल और कमलगट्टा", "खील, बताशा और मिठाई", "चोपड़ा पूजन के लिए नई बही या लैपटॉप"] }),
        sec(null, "रात को शांत क्या रखता है", null, [
          "एक आरती, एक भोग, परिवार के नामों का एक दौर। हर चचेरा नया विधान जोड़े तो लंबी रात बिखरती है।",
          "धनतेरस को ही क्रम तय करके परिवार ग्रुप में भेज दें। रात खुद चलती है।",
        ], { hiQuote: "दीवाली धनतेरस पर जीती जाती है। मुख्य रात केवल योजना निभाती है।" }),
        sec(null, "त्योहार के बाद", null, [
          "48 घंटे में तस्वीरें और आरती क्लिप। बही की फोटो संभालें, कई व्यापार वार्षिक खातों में रखते हैं।",
          "अगले साल वही लक्ष्मी संकल्प पहले से भरा। एक टैप में प्रदोष स्लॉट।",
        ]),
      ],
      faq: [
        ["मुख्य लक्ष्मी पूजन किस दिन?", "दीवाली रात प्रदोष काल में, सूर्यास्त के बाद।"],
        ["क्या ऑफिस एक संकल्प बुक कर सकता है?", "हाँ। साझेदार और स्टाफ के नाम एक Family संकल्प में।"],
        ["क्या चोपड़ा पूजन शामिल है?", "कहने पर। बुकिंग में बही पूजन लिखें।"],
      ],
    },
  },
  "annadanam": {
    keywords: ["annadanam", "bhandara", "prasad seva", "puja with bhojan"],
    relatedPuja: "satyanarayan",
    en: {
      intro: "When a puja includes Annadanam, the ritual feeds people, not just fire. What the offering covers, how counts are fixed and where the photos come from.",
      sections: [
        sec("What Annadanam actually funds", null, [
          "Rice, dal, sabzi, roti and a sweet for a fixed headcount at a temple bhojanalaya or partnered kitchen. The count is set at booking and receipted.",
          "Counts start at eleven and scale in lots. Festival days cost more because vegetable rates spike.",
        ], null, { img: P("dharma-story-annadanam"), alt: "Temple kitchen preparing Annadanam meals" }),
        sec("Where it happens", null, [
          "Kashi, Ayodhya and Prayagraj kitchens take daily slots. Gaya Ji kitchens prioritise Pitru Paksha weeks.",
          "Home-city feeding happens through partnered trusts. The booking names the kitchen before payment.",
        ], null, { list: ["Fixed headcount receipt", "Kitchen name before payment", "Serving photos after"] }),
        sec("The ritual order", null, [
          "Puja first, naivedya second, serving third. The acharya reads the donor Sankalp before the first plate is served.",
          "Donors joining live watch the Sankalp and the first serving. The full meal is photographed, not livestreamed, to protect diners.",
        ], null, { quote: "Annadanam turns a family intention into a shared meal." }),
        sec("Proof you receive", null, [
          "Serving photos with headcount board, kitchen receipt and the Sankalp reference. Video where the kitchen permits cameras.",
          "Festival weeks deliver photos within 72 hours because kitchens batch their media.",
        ], null, { img: U("photo-1609357605129-26f69add5d6e"), alt: "Hands serving prasad meals at a temple" }),
      ],
      faq: [
        ["What is the minimum count?", "Eleven plates. Festival minimums can be twenty-one."],
        ["Can we serve in our city?", "Yes, through partnered trusts named at booking."],
        ["Are photos guaranteed?", "Serving photos yes, video where the kitchen allows."],
      ],
    },
    hi: {
      intro: "अन्नदान में अनुष्ठान लोगों को खिलाता है, केवल अग्नि को नहीं। संख्या, रसोई और तस्वीरों की पूरी जानकारी यहाँ।",
      sections: [
        sec(null, "अन्नदान में क्या लगता है", null, [
          "मंदिर भोजनालय या साझेदार रसोई में निश्चित संख्या में चावल, दाल, सब्जी, रोटी और मिठाई। संख्या बुकिंग पर तय, रसीद सहित।",
          "संख्या ग्यारह से शुरू, जत्थों में बढ़ती। त्योहार में सब्जी भाव से लागत बढ़ती है।",
        ]),
        sec(null, "कहाँ होता है", null, [
          "काशी, अयोध्या, प्रयागराज की रसोई daily स्लॉट लेती हैं। गया जी पितृ पक्ष में प्राथमिकता।",
          "अपने शहर में साझेदार ट्रस्ट से भोजन। भुगतान से पहले रसोई का नाम।",
        ], { hiList: ["निश्चित संख्या की रसीद", "भुगतान से पहले रसोई का नाम", "बाद में परोसने की तस्वीरें"] }),
        sec(null, "अनुष्ठान क्रम", null, [
          "पहले पूजा, फिर नैवेद्य, फिर परोसना। पहली थाली से पहले आचार्य दाता संकल्प पढ़ते हैं।",
          "लाइव जुड़े दाता संकल्प और पहला परोसना देखते हैं। पूरा भोजन फोटो में, भोजन करने वालों की मर्यादा के लिए।",
        ], { hiQuote: "अन्नदान पारिवारिक भाव को साझा भोजन बनाता है।" }),
        sec(null, "क्या प्रमाण मिलता है", null, [
          "संख्या पट्ट सहित परोसने की तस्वीरें, रसोई रसीद और संकल्प संदर्भ। जहाँ रसोई कैमरा दे, वीडियो।",
          "त्योहार सप्ताह में 72 घंटे में तस्वीरें क्योंकि रसोई मीडिया जत्थों में देती है।",
        ]),
      ],
      faq: [
        ["न्यूनतम संख्या?", "ग्यारह थाली। त्योहार में इक्कीस।"],
        ["क्या अपने शहर में परोस सकते हैं?", "हाँ, बुकिंग पर नामित साझेदार ट्रस्ट से।"],
        ["क्या तस्वीरें पक्की?", "परोसने की तस्वीरें हाँ, वीडियो जहाँ रसोई दे।"],
      ],
    },
  },
  "temple-morning": {
    keywords: ["temple morning", "kashi vishwanath", "suprabhatam", "morning aarti"],
    relatedPuja: "mahadeva-rudra",
    en: {
      intro: "Bell, conch and chant: a temple morning in three sounds. When to arrive, where to stand and what the priests are actually doing before sunrise.",
      sections: [
        sec("First sound: the bell", null, [
          "Doors open around 4 am in major Shiva temples. The bell breaks the night watch and the sanctum lamps are relit one by one.",
          "Stand left of the dwaja stambha for the clearest sound without blocking the queue.",
        ], null, { img: P("dharma-story-morning"), alt: "Temple lamps lit before sunrise aarti" }),
        sec("Second sound: the conch", null, [
          "Conch marks abhishek segments. Three blasts open, two close. Regulars count the ritual by it.",
          "The conch player stands to the deity right. Photography is usually barred during this segment.",
        ], null, { list: ["Bell: opening", "Conch: segments", "Chant: continuous"] }),
        sec("Third sound: the chant", null, [
          "Rudram or Suprabhatam runs under everything else. The chant is the only sound that never fully stops till aarti.",
          "Morning bookings place your Sankalp inside this chant window, which is why dawn slots cost attention but repay it.",
        ], null, { quote: "Arrive for the bell, stay for the chant, leave after the conch closes." }),
        sec("Booking the morning", null, [
          "Dawn Rudrabhishek slots open a month ahead in Shravan and Navratri. Off-season mornings stay open till the previous evening.",
          "Video from morning rituals arrives by noon. The light in the sanctum photographs best at this hour.",
        ], null, { img: U("photo-1532968961962-8a0e2b6fc5f6"), alt: "Sunrise over temple ghats during morning rituals" }),
      ],
      faq: [
        ["What time do temples open?", "Around 4 am for major Shiva temples, later for small ones."],
        ["Is photography allowed?", "In outer halls usually, never inside the sanctum during abhishek."],
        ["Are dawn slots better?", "For sound and light, yes. For sleep, take the 7 am slot."],
      ],
    },
    hi: {
      intro: "घंटा, शंख और मंत्र: सूर्योदय से पहले मंदिर की सुबह। कब पहुँचें, कहाँ खड़े हों, पुजारी क्या कर रहे हैं।",
      sections: [
        sec(null, "पहली ध्वनि: घंटा", null, [
          "प्रमुख शिव मंदिरों में सुबह 4 बजे द्वार खुलते हैं। घंटा रात्रि प्रहर तोड़ता है, गर्भगृह के दीप एक-एक जलते हैं।",
          "ध्वज स्तंभ के बाईं ओर खड़े हों, कतार भी न रुके, नाद भी साफ।",
        ]),
        sec(null, "दूसरी ध्वनि: शंख", null, [
          "शंख अभिषेक खंड बताता है। तीन नाद खोलते हैं, दो बंद करते हैं। नियमित लोग इसी से क्रम गिनते हैं।",
          "शंखवादक देवता के दाईं ओर। इस खंड में फोटो प्रायः वर्जित।",
        ], { hiList: ["घंटा: शुरुआत", "शंख: खंड", "मंत्र: निरंतर"] }),
        sec(null, "तीसरी ध्वनि: मंत्र", null, [
          "रुद्रम या सुप्रभातम बाकी सबके नीचे चलता है। आरती तक यही ध्वनि कभी पूरी नहीं रुकती।",
          "सुबह की बुकिंग आपका संकल्प इसी मंत्र समय में रखती है।",
        ], { hiQuote: "घंटे के लिए आएँ, मंत्र के लिए रुकें, शंख बंद हो तब जाएँ।" }),
        sec(null, "सुबह की बुकिंग", null, [
          "श्रावण और नवरात्रि में भोर रुद्राभिषेक एक महीना पहले खुलता है। सामान्य सुबह पिछले शाम तक खुली।",
          "सुबह अनुष्ठान का वीडियो दोपहर तक। गर्भगृह की रोशनी इस समय सबसे अच्छी फोटो देती है।",
        ]),
      ],
      faq: [
        ["मंदिर कब खुलते हैं?", "प्रमुख शिव मंदिर लगभग 4 बजे, छोटे देर से।"],
        ["क्या फोटो ले सकते हैं?", "बाहरी हॉल में प्रायः, अभिषेक में गर्भगृह में कभी नहीं।"],
        ["क्या भोर स्लॉट बेहतर?", "नाद और रोशनी के लिए हाँ। नींद के लिए 7 बजे वाला लें।"],
      ],
    },
  },
  "family-sankalp": {
    keywords: ["family sankalp", "sankalp for family", "puja for siblings", "joint puja booking"],
    relatedPuja: "shraadh",
    en: {
      intro: "Three siblings, three cities, one Sankalp. How a Family package carries four names through one ritual without diluting anyone intention.",
      sections: [
        sec("One booking, four names", null, [
          "Family package holds four members by name with relationships: self, spouse, two more. Each name is spoken in the Sankalp, not folded into a generic family word.",
          "Siblings in different cities join one live link. The screen shows one altar, the mantra carries four addresses.",
        ], null, { img: P("dharma-story-family"), alt: "Siblings joining one family Sankalp from three cities" }),
        sec("Who speaks for the family", null, [
          "The eldest present usually speaks the gotra confirmation. The acharya handles the rest, calling each name at its line.",
          "If elders cannot join live, their names still enter the patrika. Presence helps, inscription suffices.",
        ], null, { list: ["Four named members", "Relationships noted", "One live link for all"] }),
        sec("Money without awkwardness", null, [
          "One payer books, the breakup shares on WhatsApp. Dakshina splits are noted before the muhurat so the ritual day stays clean.",
          "Receipts carry the booking ID. Next year the same group rebooks in one tap.",
        ], null, { quote: "One Sankalp lets a scattered family act as one household for an hour." }),
        sec("What each member receives", null, [
          "Everyone gets the photos and video link. The patrika PDF names all four members with the ritual date and temple.",
          "Festival Sankalps add prasad shipping per address where the temple permits.",
        ], null, { img: U("photo-1567591414240-e6c5a9e0a0c4"), alt: "Prasad and diya shared after a family puja" }),
      ],
      faq: [
        ["How many members fit?", "Four named members on Family package."],
        ["Can members join from abroad?", "Yes. One live link works across time zones."],
        ["Who pays?", "One payer, with the split noted before the muhurat."],
      ],
    },
    hi: {
      intro: "तीन भाई-बहन, तीन शहर, एक संकल्प। Family package में चार नाम एक अनुष्ठान में, बिना किसी का भाव घटे।",
      sections: [
        sec(null, "एक बुकिंग, चार नाम", null, [
          "Family package में संबंध सहित चार सदस्य: स्वयं, जीवनसाथी, दो और। हर नाम संकल्प में बोला जाता है।",
          "अलग शहरों के भाई-बहन एक ही लाइव लिंक से। स्क्रीन पर एक वेदी, मंत्र में चार पते।",
        ]),
        sec(null, "परिवार की ओर से कौन बोले", null, [
          "उपस्थित ज्येष्ठ प्रायः गोत्र पुष्टि बोलते हैं। बाकी आचार्य संभालते हैं, हर नाम अपनी पंक्ति में।",
          "बुजुर्ग लाइव न भी जुड़ें तो नाम पत्रिका में जाते हैं। उपस्थिति अच्छी, अंकन काफी।",
        ], { hiList: ["चार नामित सदस्य", "संबंध अंकित", "सबके लिए एक लाइव लिंक"] }),
        sec(null, "बिना झिझक पैसा", null, [
          "एक भुगतान करता है, बँटवारा WhatsApp पर। दक्षिणा मुहूर्त से पहले लिखी ताकि अनुष्ठान दिन साफ रहे।",
          "रसीद में बुकिंग ID। अगले साल वही समूह एक टैप में।",
        ], { hiQuote: "एक संकल्प बिखरे परिवार को एक घंटे के लिए एक घर बनाता है।" }),
        sec(null, "हर सदस्य को क्या मिलता है", null, [
          "सबको तस्वीरें और वीडियो लिंक। पत्रिका PDF में चारों नाम, तिथि और मंदिर।",
          "त्योहार संकल्प में जहाँ मंदिर दे, हर पते पर प्रसाद।",
        ]),
      ],
      faq: [
        ["कितने सदस्य?", "Family package में चार नामित सदस्य।"],
        ["क्या विदेश से जुड़ सकते हैं?", "हाँ। एक लाइव लिंक सब समय क्षेत्रों में।"],
        ["भुगतान कौन करे?", "एक भुगतान करे, बँटवारा मुहूर्त से पहले लिखित।"],
      ],
    },
  },
};

export function getStoryBody(id, lang = "en") {
  const entry = STORY_CONTENT[id];
  if (!entry) return null;
  const pick = (enVal, hiVal) => (lang === "hi" ? hiVal || enVal : enVal);
  const en = entry.en;
  const hi = entry.hi || {};
  return {
    keywords: entry.keywords || [],
    relatedPuja: entry.relatedPuja,
    intro: pick(en.intro, hi.intro),
    sections: en.sections.map((s, i) => {
      const hs = (hi.sections || [])[i] || {};
      return {
        h: pick(s.h, hs.hHi || hs.h),
        ps: pick(s.ps, hs.psHi || hs.ps),
        img: s.img,
        alt: s.alt,
        list: lang === "hi" ? hs.hiList || s.list : s.list,
        quote: lang === "hi" ? hs.hiQuote || s.quote : s.quote,
      };
    }),
    faq: pick(en.faq, hi.faq),
  };
}
