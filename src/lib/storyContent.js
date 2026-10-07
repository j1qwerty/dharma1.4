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
      intro: "संकल्प पूजा की शुरुआत में बोला गया उद्देश्य है: नाम, गोत्र, स्थान, समय और मनोकामना।",
      sections: [
        sec(null, "नाम और गोत्र", null, ["आचार्य मंत्र में आपकी पहचान रखते हैं। गोत्र ज्ञात न हो तो सामान्य गोत्र से पूजा होती है।"]),
        sec(null, "एक वाक्य में उद्देश्य", null, ["मनोकामना एक सरल वाक्य में लिखें। मुहूर्त से पहले WhatsApp पर सुधार हो सकता है।"]),
      ],
      faq: [["गोत्र जरूरी है?", "नहीं। विकल्प चुनें, पूजा सामान्य रूप से होगी।"]],
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
      intro: "मंदिर में घंटे समय बताते हैं: जागरण, दर्शन, आरती। हर नाद का अर्थ यहाँ।",
      sections: [sec(null, "सुबह का घंटा", null, ["पहला घंटा गर्भगृह जगाता है। दस मिनट पहले पहुँचें।"])],
      faq: [["घंटा बजाना जरूरी है?", "नहीं। बिना बजाए दर्शन पूर्ण है।"]],
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
      intro: "रुद्राभिषेक सबसे माँगा जाने वाला शिव अनुष्ठान है। संकल्प, एकादश द्रव्य अभिषेक, रुद्रम पाठ, आरती।",
      sections: [sec(null, "संकल्प और आह्वान", null, ["गणेश और कलश पहले, फिर शिव। यह शुरुआत पंद्रह मिनट की होती है।"])],
      faq: [["कितना समय लगता है?", "एक से दो घंटे।"]],
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
      intro: "एक परिवार, तीन शहर, एक बुकिंग। दूर से पूजा के दो तरीके: घर पर लाइव या मंदिर से आपकी ओर से।",
      sections: [sec(null, "दो तरीके", null, ["घर पर आचार्य लाइव मार्गदर्शन देते हैं। दूरी हो तो आचार्य मंदिर से आपकी ओर से करते हैं।"])],
      faq: [["लाइव छूट जाए तो?", "रिकॉर्डिंग खाते में रहती है।"]],
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
      intro: "शांत दीवाली धनतेरस से शुरू होती है। लक्ष्मी पूजन, प्रदोष मुहूर्त और तैयारी की सही क्रम यहाँ।",
      sections: [sec(null, "धनतेरस पहले", null, ["धनतेरस पर खरीद और पहला आह्वान। दीवाली रात मुख्य महालक्ष्मी पूजा।"])],
      faq: [["मुख्य पूजा कब?", "दीवाली रात प्रदोष काल में।"]],
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
      intro: "अन्नदान में अनुष्ठान लोगों को खिलाता है। संख्या, रसोई और तस्वीरों की पूरी जानकारी।",
      sections: [sec(null, "क्या शामिल है", null, ["निश्चित संख्या में भोजन, रसोई की रसीद और परोसने की तस्वीरें।"])],
      faq: [["न्यूनतम संख्या?", "ग्यारह थाली।"]],
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
      intro: "घंटा, शंख और मंत्र: सूर्योदय से पहले मंदिर की सुबह। कब पहुँचें, कहाँ खड़े हों।",
      sections: [sec(null, "पहली ध्वनि: घंटा", null, ["सुबह 4 बजे द्वार खुलते हैं। ध्वज स्तंभ के बाईं ओर खड़े हों।"])],
      faq: [["मंदिर कब खुलते हैं?", "प्रमुख शिव मंदिर लगभग सुबह 4 बजे।"]],
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
      intro: "तीन भाई-बहन, तीन शहर, एक संकल्प। Family package में चार नाम एक अनुष्ठान में।",
      sections: [sec(null, "एक बुकिंग, चार नाम", null, ["हर नाम संकल्प में बोला जाता है। एक ही लाइव लिंक से सब जुड़ते हैं।"])],
      faq: [["कितने सदस्य?", "चार नाम।"]],
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
        list: s.list,
        quote: s.quote,
      };
    }),
    faq: pick(en.faq, hi.faq),
  };
}
