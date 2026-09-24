import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Flame,
  BookOpen,
  MapTrifold,
  CalendarBlank,
  UsersThree,
} from "@phosphor-icons/react";
import { useLanguage } from "./LanguageToggle";
import { SectionDecor } from "./decor";
import FaqAccordion from "./FaqAccordion";
import { pujas as defaultPujas } from "../../lib/data";
import { useLivePujas } from "../../lib/cms";
import { buildInquiryHref } from "../../lib/booking";
import { WHATSAPP_NUMBER } from "../../lib/site";

/* ------------------------------------------------------------------ *
 * PitruPakshaOnline — bilingual (EN/HI toggle) Pitru Paksha online
 * Shradh marketing content for /pujas/shraadh.
 * ------------------------------------------------------------------ */

const EN = {
  heroEyebrow: "Pitru Paksha Online Shradh Pooja",
  heroTitle: "Honour Your Ancestors. Fulfil Your Sankalp. Preserve the Tradition.",
  hero: [
    "Distance should never come between you and your duties towards your ancestors.",
    "This Pitru Paksha, perform your Shradh and Pitru Tarpan with authentic Vedic rituals, conducted by experienced Acharyas in accordance with traditional practices — while you and your family participate from wherever you are in the world.",
    "Dharmaa Tribe brings the ritual to you, without taking away its sanctity.",
  ],
  bookCta: "Book your Pitru Paksha Pooja",
  distanceTitle: "This Pitru Paksha, don't let distance come in the way",
  distance: [
    "For many families living away from their ancestral home, travelling to a particular place or finding a trusted priest at the right time and according to the appropriate Tithi can be difficult.",
    "Dharmaa Tribe makes it possible to fulfil your ancestral rituals remotely, while keeping the traditional process at the centre.",
    "Your Puja is performed by an experienced Vedic Acharya.",
    "Your Sankalp is made in the name of your family and ancestors.",
    "You can participate live from anywhere in the world.",
    "And after the ritual, you receive a record of the sacred ceremony performed on your behalf.",
    "Tradition remains. Only the distance disappears.",
  ],
  includedTitle: "What is included?",
  includedSub: "Your Pitru Paksha Shradh service is designed to make the entire process simple, transparent and meaningful.",
  included: [
    ["1. YOUR ANCESTRAL DETAILS & SANKALP", "Share the required details of the person or ancestors for whom the ritual is being performed. Our team helps you understand what information is required and assists you in preparing the Sankalp."],
    ["2. TITHI GUIDANCE", "Pitru Paksha rituals are traditionally performed according to the appropriate lunar Tithi. Based on the details you provide, our team helps identify the relevant Tithi and the appropriate ritual date."],
    ["3. VEDIC RITUAL BY AN ACHARYA", "The Shradh / Pitru ritual is performed by an experienced Vedic Acharya according to the prescribed traditional process. The Acharya performs the necessary Sankalp, offerings, prayers and associated rituals applicable to the selected service."],
    ["4. LIVE PARTICIPATION", "You don't have to simply “book a pooja”. You can participate. A secure online link allows you and your family to join the ceremony remotely and be part of the Sankalp and ritual from wherever you are."],
    ["5. YOUR FAMILY'S SANKALP", "The ritual is performed with the Sankalp made for your family and the ancestors named by you. Where applicable, you may also participate in specific portions of the ritual as guided by the Acharya."],
    ["6. RECORD OF THE CEREMONY", "A recording or other appropriate confirmation of the completed ritual is shared with you after the ceremony, subject to the service selected."],
  ],
  howTitle: "How does an online Shradh work?",
  howSub: "It's simpler than you think.",
  steps: [
    ["STEP 1 — BOOK YOUR POOJA", "Select the Pitru Paksha Shradh service and your preferred available date/time."],
    ["STEP 2 — SHARE YOUR DETAILS", "Provide the details required for the Sankalp and ritual, including the relevant ancestral information."],
    ["STEP 3 — WE CONFIRM YOUR TITHI", "Our team reviews your details and confirms the applicable ritual date and other information required for the ceremony."],
    ["STEP 4 — JOIN YOUR POOJA ONLINE", "You receive the joining details before the scheduled ceremony. Join with your family from your home, wherever you are in the world."],
    ["STEP 5 — THE ACHARYA PERFORMS THE RITUAL", "The prescribed ritual is conducted traditionally, with your family's Sankalp and ancestral details incorporated into the ceremony."],
    ["STEP 6 — COMPLETE YOUR SANKALP", "Participate as guided by the Acharya and complete the portions of the ritual that require your participation."],
    ["STEP 7 — RECEIVE CONFIRMATION", "After the ceremony, you receive the applicable recording, photographs or ritual confirmation included with your service."],
  ],
  validTitle: "But is an online pooja really valid?",
  valid: [
    "This is one of the first questions many families ask.",
    "An online service does not mean an automated or virtual ritual.",
    "The physical ritual is performed by the Acharya at the designated place of worship. Your family's Sankalp and relevant details are incorporated into that ritual, while technology allows you to participate remotely.",
    "Think of it as remote participation in a physical Vedic ritual — not a virtual substitute for one.",
    "The exact ritual procedure can vary according to the tradition, family practice, location and service selected. Our Acharya guides you accordingly.",
  ],
  needTitle: "What do I need to do?",
  needIntro: "You don't need to become an expert in Vedic rituals.",
  needBefore: "Before the ceremony, we tell you:",
  needBullets: [
    "What information to provide",
    "What you need to keep ready at home, if anything",
    "When and how to join",
    "How to participate during the Sankalp",
    "What the Acharya will guide you through",
  ],
  needClose1: "You simply need to be present with sincerity and attention.",
  needStrong: "We take care of the ritual. You take care of your Sankalp.",
  whoTitle: "Who can perform this Shradh?",
  whoIntro: "The service can be booked by families who wish to perform ancestral rituals for:",
  whoList: ["Father", "Mother", "Grandparents", "Great-grandparents", "Other departed family members"],
  whoNote1: "The appropriate ritual and requirements can differ depending on the family circumstances and tradition.",
  whoNote2: "If you are unsure which ritual is appropriate, speak to our team before booking.",
  unsureCta: "I'm not sure which pooja I need",
  forTitle: "Who is this service for?",
  forWhom: [
    ["FOR FAMILIES LIVING ABROAD", "Unable to travel to India during Pitru Paksha? Participate from wherever you are."],
    ["FOR FAMILIES LIVING AWAY FROM THEIR HOMETOWN", "Your ancestral home may be hundreds of kilometres away. Your responsibilities don't have to be."],
    ["FOR THOSE WHO CANNOT FIND A TRUSTED ACHARYA", "Dharmaa Tribe helps connect families with experienced practitioners for traditional rituals."],
    ["FOR FAMILIES WHO WANT TO PARTICIPATE TOGETHER", "Children, siblings and relatives living in different cities or countries can join the same ceremony online."],
  ],
  faqTitle: "Frequently asked questions",
  faqs: [
    ["What is Pitru Paksha?", "Pitru Paksha is a traditional period dedicated to remembering and honouring one's ancestors through rituals, offerings, prayers and acts of remembrance. The specific practices and customs followed can vary according to family tradition and regional practice."],
    ["What is Shradh?", "Shradh refers broadly to traditional Hindu rites performed in remembrance and honour of departed ancestors. The form of the ritual can vary according to the person's circumstances, family tradition, regional customs and the prescribed Tithi."],
    ["How do I know the correct Shradh date?", "Pitru Paksha rituals are generally associated with the lunar Tithi corresponding to the ancestor's death date. If you don't know the correct Tithi or are uncertain about which date applies, share the available details with us. Our team can guide you regarding the information required."],
    ["What if I don't know the exact date of death?", "Don't worry. Share whatever information you have with our team. Depending on the circumstances and your family tradition, an appropriate course of action may be suggested by the Acharya."],
    ["Do I have to be in India?", "No. You can participate from anywhere with a reliable internet connection."],
    ["Do I have to travel to the temple?", "No. For this online service, the physical ritual is conducted by the designated Acharya at the specified location while you participate remotely."],
    ["Can my family members join from different countries?", "Yes, provided they have access to the online joining link. This can be particularly useful when family members live in different cities or countries."],
    ["Do I have to perform anything myself?", "The Acharya will guide you regarding any part of the Sankalp or ritual that requires your participation. You will be informed beforehand if you need to keep anything ready."],
    ["What details do I need to provide?", "Typically, information may include: your name; family details required for the Sankalp; name of the ancestor(s); relationship with the ancestor; relevant date/Tithi information, if known; contact details; and other information specifically required for the selected ritual. Our team will tell you exactly what is required after booking."],
    ["Can I book for more than one ancestor?", "This depends on the specific Shradh service selected. If you wish to perform rituals for multiple ancestors, please contact us before booking so that we can guide you appropriately."],
    ["Will the pooja be performed by a real Acharya?", "Yes. Dharmaa Tribe's model is based on connecting devotees with real practitioners and Acharyas who conduct the physical rituals. The online component enables communication and participation. It does not replace the physical performance of the ritual."],
    ["Will I receive photographs or a recording?", "Where included in your selected service, photographs and/or a recording of the ceremony will be shared with you after the ritual. The exact deliverables are mentioned on the booking page for each service."],
    ["Can I speak to the Acharya?", "Where applicable, you may interact with the Acharya during the ceremony or through the process arranged for your selected service. For specific questions about your family's ritual requirements, our team can guide you on the appropriate channel."],
    ["What if I have a question about my family's tradition?", "We understand that Sanatan traditions are diverse. Different families and regions may follow different customs. Dharmaa Tribe does not seek to impose one uniform ritual on every family. Where a question requires an Acharya's guidance, we will help route it appropriately."],
  ],
  diffTitle: "What makes Dharmaa Tribe different?",
  diff: [
    ["AUTHENTICITY OVER AUTOMATION", "We believe sacred rituals should never become just another transaction. Technology should make access easier — not make the ritual impersonal."],
    ["TRANSPARENCY", "You should know what you are booking, who is performing it, how you participate and what you receive afterwards."],
    ["TRADITION WITH CONTEMPORARY ACCESS", "We respect traditional practices while using technology to serve families living in a modern, connected world."],
    ["PARTICIPATION, NOT JUST BOOKING", "Our purpose is not simply to arrange a ritual on your behalf. Where possible, we want you and your family to understand, witness and participate in the ritual."],
    ["TRUST", "A sacred ritual begins with trust. That is why we aim to build relationships with knowledgeable and experienced Acharyas and communicate the process clearly to devotees."],
  ],
  visionEyebrow: "More than an online pooja",
  visionTitle: "Dharmaa Tribe",
  visionA: "Ancient wisdom. Relevant for life.",
  visionB: "Dharmaa Tribe is being created as a contemporary platform for people who wish to stay connected with Sanatan traditions, knowledge and practices — wherever they live.",
  visionC: "Online pooja is only the beginning. Our vision extends across:",
  vision: [
    ["AUTHENTIC ONLINE POOJA", "Traditional rituals conducted by experienced Acharyas, accessible to families across India and the world."],
    ["VEDIC KNOWLEDGE & LEARNING", "Accessible learning experiences around Vedic literature, philosophy, traditions and practices."],
    ["SPIRITUAL JOURNEYS", "Thoughtfully curated journeys to sacred places, temples and centres of Sanatan knowledge."],
    ["FESTIVAL & RITUAL GUIDANCE", "Helping families understand what a festival or ritual means, when it is observed and how it may traditionally be performed."],
    ["A COMMUNITY AROUND DHARMA", "A space where tradition can be understood, practised and passed on — particularly across generations and across borders."],
  ],
  beliefTitle: "Our belief",
  belief: [
    "For generations, Sanatan traditions have been carried forward through families, teachers, temples and communities.",
    "But the world has changed.",
    "Families now live across cities, countries and continents.",
    "Children grow up far from their ancestral homes.",
    "Time zones separate siblings.",
    "And traditional knowledge is not always easy to access.",
    "We believe technology can help bridge that distance — without diluting the wisdom it carries.",
    "That is the space Dharmaa Tribe hopes to occupy.",
    "Not replacing tradition.",
    "Making tradition accessible.",
  ],
  closingTitle: "This Pitru Paksha, remember.",
  closing: [
    "The people who came before us are part of the story we continue to live.",
    "Perform your Shradh with sincerity. Make your Sankalp. Honour your ancestors. Wherever you are.",
    "Dharmaa Tribe — Rooted in wisdom. Relevant for life. Together we rise.",
  ],
  whatsapp: "Speak to us on WhatsApp",
  disclaimerTitle: "Important information",
  disclaimer: [
    "The rituals offered through Dharmaa Tribe are based on traditional Hindu practices. Specific procedures, eligibility, dates, mantras and ritual requirements may vary according to family tradition, regional customs, the nature of the ritual and the guidance of the performing Acharya.",
    "Dharmaa Tribe facilitates access, coordination and participation in the selected service. It does not claim that one ritual procedure is universally applicable to every Hindu tradition or family.",
    "For questions regarding a specific family circumstance or ritual requirement, please contact our team before booking.",
  ],
};

const HI = {
  heroEyebrow: "पितृ पक्ष ऑनलाइन श्राद्ध पूजा",
  heroTitle: "पूर्वजों का सम्मान करें। संकल्प पूर्ण करें। परंपरा निभाएँ।",
  hero: [
    "आपके पूर्वजों के प्रति कर्तव्यों और आपके बीच दूरी कभी नहीं आनी चाहिए।",
    "इस पितृ पक्ष में प्रामाणिक वैदिक अनुष्ठानों के साथ अपना श्राद्ध और पितृ तर्पण करें — अनुभवी आचार्यों द्वारा पारंपरिक विधि से, जबकि आप और आपका परिवार दुनिया में कहीं से भी भाग लें।",
    "धर्मा ट्राइब अनुष्ठान को आप तक लाता है — उसकी पवित्रता कम किए बिना।",
  ],
  bookCta: "अपनी पितृ पक्ष पूजा बुक करें",
  distanceTitle: "इस पितृ पक्ष, दूरी को बाधा न बनने दें",
  distance: [
    "अपने पैतृक घर से दूर रहने वाले कई परिवारों के लिए किसी विशेष स्थान की यात्रा करना या सही समय पर उचित तिथि के अनुसार विश्वसनीय पुरोहित खोजना कठिन हो सकता है।",
    "धर्मा ट्राइब पैतृक अनुष्ठानों को दूर से निभाना संभव बनाता है — पारंपरिक प्रक्रिया को केंद्र में रखते हुए।",
    "आपकी पूजा अनुभवी वैदिक आचार्य द्वारा संपन्न होती है।",
    "आपके परिवार और पूर्वजों के नाम से संकल्प लिया जाता है।",
    "आप दुनिया में कहीं से भी लाइव भाग ले सकते हैं।",
    "और अनुष्ठान के बाद आपको आपकी ओर से संपन्न पवित्र अनुष्ठान का रिकॉर्ड मिलता है।",
    "परंपरा बनी रहती है। केवल दूरी मिट जाती है।",
  ],
  includedTitle: "क्या शामिल है?",
  includedSub: "आपकी पितृ पक्ष श्राद्ध सेवा पूरी प्रक्रिया को सरल, पारदर्शी और अर्थपूर्ण बनाने के लिए बनाई गई है।",
  included: [
    ["1. पैतृक विवरण और संकल्प", "जिन व्यक्ति या पूर्वजों के लिए अनुष्ठान हो रहा है, उनका आवश्यक विवरण साझा करें। हमारी टीम आपको समझाती है कि क्या जानकारी चाहिए और संकल्प की तैयारी में सहायता करती है।"],
    ["2. तिथि मार्गदर्शन", "पितृ पक्ष अनुष्ठान पारंपरिक रूप से उचित चान्द्र तिथि के अनुसार होते हैं। आपके विवरण के आधार पर हमारी टीम प्रासंगिक तिथि और उचित अनुष्ठान तारीख पहचानने में सहायता करती है।"],
    ["3. आचार्य द्वारा वैदिक अनुष्ठान", "श्राद्ध / पितृ अनुष्ठान अनुभवी वैदिक आचार्य द्वारा निर्धारित पारंपरिक प्रक्रिया से संपन्न होता है। आचार्य चुनी सेवा के अनुसार आवश्यक संकल्प, अर्पण, प्रार्थना और संबद्ध विधियाँ करते हैं।"],
    ["4. लाइव सहभागिता", "आपको केवल “पूजा बुक” नहीं करनी है। आप भाग ले सकते हैं। सुरक्षित ऑनलाइन लिंक से आप और आपका परिवार दूर से समारोह में जुड़कर संकल्प और अनुष्ठान का हिस्सा बन सकते हैं — दुनिया में कहीं से भी।"],
    ["5. आपके परिवार का संकल्प", "अनुष्ठान आपके परिवार और आपके बताए पूर्वजों के नाम से संकल्प लेकर होता है। जहाँ लागू हो, आचार्य के मार्गदर्शन में आप अनुष्ठान के विशिष्ट भागों में भी भाग ले सकते हैं।"],
    ["6. समारोह का रिकॉर्ड", "चुनी सेवा के अनुसार, अनुष्ठान के बाद पूर्ण अनुष्ठान की रिकॉर्डिंग या अन्य उचित पुष्टि आपके साथ साझा की जाती है।"],
  ],
  howTitle: "ऑनलाइन श्राद्ध कैसे होता है?",
  howSub: "यह जितना सोचते हैं, उससे सरल है।",
  steps: [
    ["चरण 1 — पूजा बुक करें", "पितृ पक्ष श्राद्ध सेवा और अपनी पसंदीदा उपलब्ध तारीख/समय चुनें।"],
    ["चरण 2 — विवरण साझा करें", "संकल्प और अनुष्ठान के लिए आवश्यक विवरण दें, जिसमें प्रासंगिक पैतृक जानकारी शामिल हो।"],
    ["चरण 3 — हम आपकी तिथि निश्चित करते हैं", "हमारी टीम आपके विवरण की समीक्षा कर अनुष्ठान तारीख और समारोह के लिए आवश्यक अन्य जानकारी निश्चित करती है।"],
    ["चरण 4 — ऑनलाइन पूजा में जुड़ें", "निर्धारित समारोह से पहले आपको जुड़ने की जानकारी मिलती है। दुनिया में कहीं भी हों — अपने घर से परिवार सहित जुड़ें।"],
    ["चरण 5 — आचार्य अनुष्ठान संपन्न करते हैं", "निर्धारित अनुष्ठान पारंपरिक रूप से होता है, जिसमें आपके परिवार का संकल्प और पैतृक विवरण शामिल होता है।"],
    ["चरण 6 — संकल्प पूर्ण करें", "आचार्य के मार्गदर्शन में भाग लें और अनुष्ठान के वे भाग पूर्ण करें जिनमें आपकी सहभागिता आवश्यक है।"],
    ["चरण 7 — पुष्टि प्राप्त करें", "समारोह के बाद आपको सेवा में शामिल रिकॉर्डिंग, तस्वीरें या अनुष्ठान पुष्टि मिलती है।"],
  ],
  validTitle: "क्या ऑनलाइन पूजा वास्तव में मान्य है?",
  valid: [
    "यह उन पहले प्रश्नों में से एक है जो कई परिवार पूछते हैं।",
    "ऑनलाइन सेवा का अर्थ स्वचालित या आभासी अनुष्ठान नहीं है।",
    "भौतिक अनुष्ठान निर्धारित पूजा स्थल पर आचार्य द्वारा संपन्न होता है। आपके परिवार का संकल्प और प्रासंगिक विवरण उस अनुष्ठान में शामिल होता है, जबकि तकनीक आपको दूर से भाग लेने देती है।",
    "इसे भौतिक वैदिक अनुष्ठान में दूरस्थ सहभागिता समझें — उसका आभासी विकल्प नहीं।",
    "सटीक अनुष्ठान विधि परंपरा, पारिवारिक प्रथा, स्थान और चुनी सेवा के अनुसार बदल सकती है। हमारे आचार्य तदनुसार मार्गदर्शन करते हैं।",
  ],
  needTitle: "मुझे क्या करना होगा?",
  needIntro: "आपको वैदिक अनुष्ठानों का विशेषज्ञ बनने की आवश्यकता नहीं है।",
  needBefore: "समारोह से पहले हम आपको बताते हैं:",
  needBullets: [
    "क्या जानकारी देनी है",
    "घर पर यदि कुछ तैयार रखना हो तो क्या",
    "कब और कैसे जुड़ना है",
    "संकल्प के दौरान कैसे भाग लेना है",
    "आचार्य आपको किन बातों में मार्गदर्शन देंगे",
  ],
  needClose1: "आपको केवल श्रद्धा और ध्यान के साथ उपस्थित रहना है।",
  needStrong: "अनुष्ठान की चिंता हम करते हैं। संकल्प की चिंता आप करें।",
  whoTitle: "यह श्राद्ध कौन कर सकता है?",
  whoIntro: "यह सेवा वे परिवार बुक कर सकते हैं जो इनके लिए पितृ अनुष्ठान करना चाहते हैं:",
  whoList: ["पिता", "माता", "दादा-दादी", "परदादा-परदादी", "अन्य दिवंगत परिजन"],
  whoNote1: "उचित अनुष्ठान और आवश्यकताएँ पारिवारिक परिस्थितियों और परंपरा के अनुसार भिन्न हो सकती हैं।",
  whoNote2: "यदि निश्चित न हो कि कौन-सा अनुष्ठान उचित है, तो बुकिंग से पहले हमारी टीम से बात करें।",
  unsureCta: "समझ नहीं आ रहा कौन-सी पूजा चाहिए",
  forTitle: "यह सेवा किनके लिए है?",
  forWhom: [
    ["विदेश में रहने वाले परिवारों के लिए", "पितृ पक्ष में भारत यात्रा संभव नहीं? आप जहाँ हैं, वहीं से भाग लें।"],
    ["अपने गृहनगर से दूर रहने वाले परिवारों के लिए", "आपका पैतृक घर सैकड़ों किलोमीटर दूर हो सकता है। आपकी ज़िम्मेदारियाँ नहीं।"],
    ["विश्वसनीय आचार्य न मिलने वालों के लिए", "धर्मा ट्राइब परिवारों को पारंपरिक अनुष्ठानों हेतु अनुभवी विद्वानों से जोड़ने में सहायता करता है।"],
    ["साथ भाग लेने वाले परिवारों के लिए", "अलग शहरों या देशों में रहने वाले बच्चे, भाई-बहन और रिश्तेदार एक ही समारोह में ऑनलाइन जुड़ सकते हैं।"],
  ],
  faqTitle: "अक्सर पूछे जाने वाले प्रश्न",
  faqs: [
    ["पितृ पक्ष क्या है?", "पितृ पक्ष पूर्वजों के स्मरण और सम्मान हेतु अनुष्ठानों, अर्पणों, प्रार्थनाओं और स्मृति कार्यों को समर्पित पारंपरिक काल है। विशिष्ट प्रथाएँ और रीति-रिवाज पारिवारिक परंपरा और क्षेत्रीय प्रथा के अनुसार बदल सकते हैं।"],
    ["श्राद्ध क्या है?", "श्राद्ध सामान्यतः दिवंगत पूर्वजों के स्मरण और सम्मान में किए जाने वाले पारंपरिक हिंदू अनुष्ठानों को कहते हैं। अनुष्ठान का रूप व्यक्ति की परिस्थितियों, पारिवारिक परंपरा, क्षेत्रीय रीति और निर्धारित तिथि के अनुसार बदल सकता है।"],
    ["सही श्राद्ध तिथि कैसे जानें?", "पितृ पक्ष अनुष्ठान सामान्यतः पूर्वज की मृत्यु तिथि से जुड़ी चान्द्र तिथि से संबद्ध होते हैं। यदि सही तिथि न पता हो या निश्चित न हो कि कौन-सी तारीख लागू होती है, तो उपलब्ध विवरण हमारे साथ साझा करें। हमारी टीम आवश्यक जानकारी हेतु मार्गदर्शन कर सकती है।"],
    ["मृत्यु की सटीक तारीख न पता हो तो?", "चिंता न करें। जो भी जानकारी हो, हमारी टीम से साझा करें। परिस्थितियों और पारिवारिक परंपरा के अनुसार आचार्य उचित कार्यवाही सुझा सकते हैं।"],
    ["क्या भारत में होना आवश्यक है?", "नहीं। विश्वसनीय इंटरनेट कनेक्शन के साथ आप कहीं से भी भाग ले सकते हैं।"],
    ["क्या मंदिर जाना होगा?", "नहीं। इस ऑनलाइन सेवा में भौतिक अनुष्ठान निर्धारित आचार्य द्वारा निर्दिष्ट स्थान पर होता है, जबकि आप दूर से भाग लेते हैं।"],
    ["क्या परिवार विभिन्न देशों से जुड़ सकता है?", "हाँ, बशर्ते उनके पास ऑनलाइन जुड़ने का लिंक हो। जब परिजन अलग शहरों या देशों में रहते हों तो यह विशेष रूप से उपयोगी हो सकता है।"],
    ["क्या मुझे स्वयं कुछ करना होगा?", "संकल्प या अनुष्ठान के जिस भाग में आपकी सहभागिता आवश्यक होगी, आचार्य मार्गदर्शन करेंगे। पहले से कुछ तैयार रखना हो तो आपको पहले बता दिया जाएगा।"],
    ["क्या विवरण देने होंगे?", "सामान्यतः जानकारी में शामिल हो सकते हैं: आपका नाम; संकल्प हेतु पारिवारिक विवरण; पूर्वज(ों) का नाम; पूर्वज से संबंध; प्रासंगिक तारीख/तिथि जानकारी, यदि ज्ञात हो; संपर्क विवरण; और चुने अनुष्ठान हेतु विशेष आवश्यक अन्य जानकारी। बुकिंग के बाद हमारी टीम बताएगी कि वास्तव में क्या चाहिए।"],
    ["क्या एक से अधिक पूर्वजों के लिए बुक कर सकते हैं?", "यह चुनी श्राद्ध सेवा पर निर्भर करता है। यदि कई पूर्वजों के लिए अनुष्ठान करना हो तो बुकिंग से पहले हमसे संपर्क करें ताकि उचित मार्गदर्शन दे सकें।"],
    ["क्या पूजा वास्तविक आचार्य करेंगे?", "हाँ। धर्मा ट्राइब का आधार भक्तों को वास्तविक आचार्यों और साधकों से जोड़ना है जो भौतिक अनुष्ठान संपन्न करते हैं। ऑनलाइन माध्यम संवाद और सहभागिता संभव बनाता है। यह अनुष्ठान के भौतिक संपादन का स्थान नहीं लेता।"],
    ["क्या तस्वीरें या रिकॉर्डिंग मिलेंगी?", "चुनी सेवा में शामिल होने पर समारोह की तस्वीरें और/या रिकॉर्डिंग अनुष्ठान के बाद आपके साथ साझा की जाएँगी। प्रत्येक सेवा के बुकिंग पेज पर सटीक जानकारी दी गई है।"],
    ["क्या आचार्य से बात कर सकते हैं?", "जहाँ लागू हो, समारोह के दौरान या चुनी सेवा हेतु निर्धारित प्रक्रिया के माध्यम से आप आचार्य से संवाद कर सकते हैं। अपने परिवार की अनुष्ठान आवश्यकताओं पर विशिष्ट प्रश्नों हेतु हमारी टीम उचित माध्यम बताएगी।"],
    ["पारिवारिक परंपरा पर प्रश्न हो तो?", "हम समझते हैं कि सनातन परंपराएँ विविध हैं। अलग परिवार और क्षेत्र अलग रीति निभा सकते हैं। धर्मा ट्राइब हर परिवार पर एक समान अनुष्ठान विधि थोपना नहीं चाहता। जहाँ प्रश्न में आचार्य का मार्गदर्शन आवश्यक हो, हम उसे उचित स्थान तक पहुँचाने में सहायता करेंगे।"],
  ],
  diffTitle: "धर्मा ट्राइब को क्या अलग बनाता है?",
  diff: [
    ["स्वचालन से ऊपर प्रामाणिकता", "हम मानते हैं कि पवित्र अनुष्ठान केवल एक और लेन-देन कभी नहीं बनने चाहिए। तकनीक को पहुँच आसान बनानी चाहिए — अनुष्ठान को अवैयक्तिक नहीं।"],
    ["पारदर्शिता", "आपको पता होना चाहिए कि आप क्या बुक कर रहे हैं, कौन संपन्न कर रहा है, आप कैसे भाग लेते हैं और बाद में आपको क्या मिलता है।"],
    ["समकालीन पहुँच के साथ परंपरा", "हम पारंपरिक प्रथाओं का सम्मान करते हैं और आधुनिक, जुड़ी दुनिया में रहने वाले परिवारों की सेवा हेतु तकनीक का उपयोग करते हैं।"],
    ["केवल बुकिंग नहीं, सहभागिता", "हमारा उद्देश्य केवल आपकी ओर से अनुष्ठान कराना नहीं है। जहाँ संभव हो, हम चाहते हैं कि आप और आपका परिवार अनुष्ठान को समझें, देखें और उसमें भाग लें।"],
    ["विश्वास", "पवित्र अनुष्ठान विश्वास से शुरू होता है। इसीलिए हम ज्ञानी और अनुभवी आचार्यों से संबंध बनाते हैं और प्रक्रिया भक्तों को स्पष्ट बताते हैं।"],
  ],
  visionEyebrow: "ऑनलाइन पूजा से बढ़कर",
  visionTitle: "धर्मा ट्राइब",
  visionA: "प्राचीन ज्ञान। जीवन के लिए प्रासंगिक।",
  visionB: "धर्मा ट्राइब उन लोगों के लिए समकालीन मंच के रूप में बन रहा है जो सनातन परंपराओं, ज्ञान और प्रथाओं से जुड़े रहना चाहते हैं — चाहे वे कहीं भी रहते हों।",
  visionC: "ऑनलाइन पूजा केवल शुरुआत है। हमारी दृष्टि आगे तक है:",
  vision: [
    ["प्रामाणिक ऑनलाइन पूजा", "अनुभवी आचार्यों द्वारा पारंपरिक अनुष्ठान — भारत और दुनिया भर के परिवारों के लिए सुलभ।"],
    ["वैदिक ज्ञान और शिक्षा", "वैदिक साहित्य, दर्शन, परंपराओं और प्रथाओं पर सुलभ शिक्षण अनुभव।"],
    ["आध्यात्मिक यात्राएँ", "पवित्र स्थानों, मंदिरों और सनातन ज्ञान केंद्रों की सुविचारित यात्राएँ।"],
    ["पर्व और अनुष्ठान मार्गदर्शन", "परिवारों को यह समझने में सहायता कि कोई पर्व या अनुष्ठान क्या है, कब मनाया जाता है और पारंपरिक रूप से कैसे निभाया जा सकता है।"],
    ["धर्म के इर्द-गिर्द समुदाय", "ऐसा स्थान जहाँ परंपरा को समझा, निभाया और आगे बढ़ाया जा सके — विशेषकर पीढ़ियों और सीमाओं के पार।"],
  ],
  beliefTitle: "हमारा विश्वास",
  belief: [
    "पीढ़ियों से सनातन परंपराएँ परिवारों, गुरुओं, मंदिरों और समुदायों के माध्यम से आगे बढ़ी हैं।",
    "पर दुनिया बदल गई है।",
    "परिवार अब शहरों, देशों और महाद्वीपों में रहते हैं।",
    "बच्चे अपने पैतृक घरों से दूर बड़े होते हैं।",
    "समय क्षेत्र भाई-बहनों को अलग करते हैं।",
    "और पारंपरिक ज्ञान हमेशा आसानी से सुलभ नहीं होता।",
    "हम मानते हैं कि तकनीक यह दूरी पाटने में सहायता कर सकती है — उस ज्ञान को हल्का किए बिना जो वह वहन करती है।",
    "धर्मा ट्राइब उसी स्थान पर रहना चाहता है।",
    "परंपरा का स्थान नहीं लेना।",
    "परंपरा को सुलभ बनाना।",
  ],
  closingTitle: "इस पितृ पक्ष, स्मरण करें।",
  closing: [
    "हमसे पहले आए लोग उसी कहानी का हिस्सा हैं जिसे हम जी रहे हैं।",
    "श्रद्धा के साथ अपना श्राद्ध करें। संकल्प लें। पूर्वजों का सम्मान करें। चाहे आप कहीं भी हों।",
    "धर्मा ट्राइब — ज्ञान में निहित। जीवन के लिए प्रासंगिक। साथ मिलकर उठें।",
  ],
  whatsapp: "व्हाट्सऐप पर बात करें",
  disclaimerTitle: "महत्वपूर्ण जानकारी",
  disclaimer: [
    "धर्मा ट्राइब के माध्यम से प्रस्तुत अनुष्ठान पारंपरिक हिंदू प्रथाओं पर आधारित हैं। विशिष्ट विधियाँ, पात्रता, तिथियाँ, मंत्र और अनुष्ठान आवश्यकताएँ पारिवारिक परंपरा, क्षेत्रीय रीति, अनुष्ठान की प्रकृति और संपन्न आचार्य के मार्गदर्शन के अनुसार बदल सकती हैं।",
    "धर्मा ट्राइब चुनी सेवा में पहुँच, समन्वय और सहभागिता सुगम बनाता है। यह दावा नहीं करता कि एक अनुष्ठान विधि हर हिंदू परंपरा या परिवार पर समान रूप से लागू होती है।",
    "किसी विशेष पारिवारिक परिस्थिति या अनुष्ठान आवश्यकता पर प्रश्न हो तो बुकिंग से पहले हमारी टीम से संपर्क करें।",
  ],
};

export default function PitruPakshaOnline() {
  const { lang } = useLanguage();
  const { items: pujas } = useLivePujas();
  const shraadhPuja = pujas.find((x) => x.id === "shraadh") || defaultPujas[0];
  const inquiryHref = buildInquiryHref(shraadhPuja, lang);
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}`;
  const L = lang === "hi" ? HI : EN;
  const VISION_ICONS = [Flame, BookOpen, MapTrifold, CalendarBlank, UsersThree];

  return (
    <section className="site-section has-decor-dt shraadh-page-dt">
      <SectionDecor />
      <div className="container-dt py-12">
        {/* Hero */}
        <div className="shraadh-section-dt">
          <span className="shraadh-section-num-dt">{L.heroEyebrow}</span>
          <h2 className="display-dt text-5xl sm:text-6xl">{L.heroTitle}</h2>
          <div className="shraadh-section-body-dt mt-6">
            {L.hero.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link className="btn-gold-dt" to="/booking/shraadh/date">
              {L.bookCta} <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        {/* Distance */}
        <div className="shraadh-section-dt">
          <h3 className="shraadh-section-title-dt">{L.distanceTitle}</h3>
          <div className="shraadh-section-body-dt">
            {L.distance.map((p, i) => (
              <p key={i}>{i === L.distance.length - 1 ? <strong>{p}</strong> : p}</p>
            ))}
          </div>
        </div>

        {/* What is included */}
        <div className="shraadh-section-dt">
          <h3 className="shraadh-section-title-dt">{L.includedTitle}</h3>
          <div className="shraadh-section-body-dt">
            <p>{L.includedSub}</p>
          </div>
          <div className="shraadh-three-grid-dt">
            {L.included.map(([title, body]) => (
              <div key={title} className="shraadh-card-dt">
                <div className="shraadh-card-title-dt">{title}</div>
                <div className="shraadh-card-body-dt">{body}</div>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="shraadh-section-dt">
          <h3 className="shraadh-section-title-dt">{L.howTitle}</h3>
          <div className="shraadh-section-body-dt">
            <p>{L.howSub}</p>
          </div>
          <div className="shraadh-journey-dt">
            {L.steps.map(([title, body], i) => (
              <div key={title} className="shraadh-journey-item-dt">
                <span className="shraadh-journey-num-dt">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <div className="shraadh-journey-title-dt">{title}</div>
                  <div className="shraadh-journey-body-dt">{body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Validity */}
        <div className="shraadh-section-dt">
          <h3 className="shraadh-section-title-dt">{L.validTitle}</h3>
          <div className="shraadh-section-body-dt">
            {L.valid.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        {/* What do I need */}
        <div className="shraadh-section-dt">
          <h3 className="shraadh-section-title-dt">{L.needTitle}</h3>
          <div className="shraadh-section-body-dt">
            <p>{L.needIntro}</p>
            <p>{L.needBefore}</p>
            <ul style={{ listStyle: "disc", paddingLeft: 22, marginTop: 8 }}>
              {L.needBullets.map((x) => (
                <li key={x} style={{ marginBottom: 4 }}>{x}</li>
              ))}
            </ul>
            <p style={{ marginTop: 12 }}>{L.needClose1}</p>
            <p><strong>{L.needStrong}</strong></p>
          </div>
        </div>

        {/* Who can perform */}
        <div className="shraadh-section-dt">
          <h3 className="shraadh-section-title-dt">{L.whoTitle}</h3>
          <div className="shraadh-section-body-dt">
            <p>{L.whoIntro}</p>
            <ul style={{ listStyle: "disc", paddingLeft: 22, marginTop: 8 }}>
              {L.whoList.map((x) => (
                <li key={x} style={{ marginBottom: 4 }}>{x}</li>
              ))}
            </ul>
            <p style={{ marginTop: 12 }}>{L.whoNote1}</p>
            <p>{L.whoNote2}</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href={inquiryHref} target="_blank" rel="noreferrer" className="btn-ghost-dt">
              {L.unsureCta} <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* Who is this for */}
        <div className="shraadh-section-dt">
          <h3 className="shraadh-section-title-dt">{L.forTitle}</h3>
          <div className="shraadh-three-grid-dt">
            {L.forWhom.map(([title, body]) => (
              <div key={title} className="shraadh-card-dt">
                <div className="shraadh-card-title-dt">{title}</div>
                <div className="shraadh-card-body-dt">{body}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="shraadh-section-dt">
          <h3 className="shraadh-section-title-dt">{L.faqTitle}</h3>
          <div style={{ marginTop: 16 }}>
            <FaqAccordion items={L.faqs.map(([q, a]) => ({ q, a }))} />
          </div>
        </div>

        {/* What makes different */}
        <div className="shraadh-section-dt">
          <h3 className="shraadh-section-title-dt">{L.diffTitle}</h3>
          <div className="shraadh-three-grid-dt">
            {L.diff.map(([title, body]) => (
              <div key={title} className="shraadh-card-dt">
                <div className="shraadh-card-title-dt">{title}</div>
                <div className="shraadh-card-body-dt">{body}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Vision — redesigned ink band, icon-led pillars */}
        <div className="vision-band-dt">
          <span className="vision-eyebrow-dt">{L.visionEyebrow}</span>
          <h3 className="display-dt vision-title-dt">{L.visionTitle}</h3>
          <p className="vision-tagline-dt">{L.visionA}</p>
          <div className="vision-intro-dt">
            <p>{L.visionB}</p>
            <p>{L.visionC}</p>
          </div>
          <div className="vision-grid-dt">
            {L.vision.map(([title, body], i) => {
              const Icon = VISION_ICONS[i % VISION_ICONS.length];
              const lead = i === 0;
              return (
                <div key={title} className={`vision-cell-dt${lead ? " lead" : ""}`}>
                  <span className="vision-index-dt">{String(i + 1).padStart(2, "0")}</span>
                  <span className="vision-icon-dt">
                    <Icon size={22} weight="duotone" />
                  </span>
                  <div className="vision-copy-dt">
                    <div className="vision-name-dt">{title}</div>
                    <div className="vision-body-dt">{body}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Belief */}
        <div className="shraadh-section-dt">
          <h3 className="shraadh-section-title-dt">{L.beliefTitle}</h3>
          <div className="shraadh-section-body-dt">
            {L.belief.map((p, i) => (
              <p key={i}>{i === L.belief.length - 1 ? <strong>{p}</strong> : p}</p>
            ))}
          </div>
        </div>

        {/* Closing CTA */}
        <div className="shraadh-cta-band-dt">
          <div className="shraadh-cta-title-dt">{L.closingTitle}</div>
          <div className="shraadh-cta-body-dt">
            {L.closing[0]}
            <br />
            {L.closing[1]}
            <br />
            <em>{L.closing[2]}</em>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link className="btn-gold-dt" to="/booking/shraadh/date">
              {L.bookCta} <ArrowUpRight size={14} />
            </Link>
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="btn-ghost-dt">
              {L.whatsapp} <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="shraadh-section-dt">
          <h3 className="shraadh-section-title-dt">{L.disclaimerTitle}</h3>
          <div className="shraadh-section-body-dt">
            {L.disclaimer.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
