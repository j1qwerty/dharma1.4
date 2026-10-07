import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpenText,
  CalendarBlank,
  HandHeart,
  MapPin,
  SealCheck,
  UsersThree,
  VideoCamera,
  ClockCounterClockwise,
  Sparkle,
} from "@phosphor-icons/react";
import { useLanguage } from "./LanguageToggle";
import { Reveal, ParallaxImage } from "./Motion";
import { SectionDecor, LeafBranch, DiyaCluster, Yantra } from "./decor";
import { pujas as defaultPujas } from "../../lib/data";
import { buildInquiryHref } from "../../lib/booking";

/* Navratri detail page body. Index-plus-detail pattern for the ten
 * recitations, plus the Vedacharya, distance and journey sections.
 * Every image is a repo asset so the page never depends on a CDN. */

const RECITATIONS = [
  {
    id: "saptashloki",
    name: "Saptashloki Durga",
    nameHi: "सप्तश्लोकी दुर्गा",
    kicker: "A focused prayer to the Divine Mother",
    kickerHi: "देवी के प्रति एकाग्र प्रार्थना",
    body: "The Saptashloki Durga, also known as Amba Stuti, is a concise yet deeply revered invocation comprising seven verses dedicated to Goddess Durga.",
    bodyHi:
      "सप्तश्लोकी दुर्गा, जिसे अम्बा स्तुति भी कहा जाता है, देवी दुर्गा को समर्पित सात श्लोकों का एक संक्षिप्त परंतु अत्यंत पूजनीय आवाहन है।",
    why: "Navratri is traditionally considered an especially auspicious period for Devi upasana. The Saptashloki Durga offers a simple and focused form of prayer for those who wish to dedicate their Navratri to a particular intention without undertaking an elaborate recitation.",
    whyHi:
      "नवरात्रि को परंपरागत रूप से देवी उपासना के लिए विशेष शुभ माना जाता है। जो भक्त नवरात्रि को किसी एक संकल्प के लिए समर्पित करना चाहते हैं, उनके लिए सप्तश्लोकी दुर्गा सरल और एकाग्र प्रार्थना का रूप है।",
    sig: "It is traditionally approached for focused prayer, inner strength, protection and the fulfilment of heartfelt intentions. Its brevity also makes it accessible to devotees who wish to maintain a regular connection with Devi amidst demanding lives.",
    sigHi:
      "इसे एकाग्र प्रार्थना, आंतरिक सामर्थ्य, सुरक्षा और हृदय की इच्छाओं की पूर्ति के लिए अपनाया जाता है। इसकी संक्षिप्तता उन भक्तों के लिए भी उपयोगी है जो व्यस्त जीवन में भी देवी से नियमित संबंध बनाए रखना चाहते हैं।",
    exp: "Share your intention with your Vedacharya, establish your sankalpa and have the sacred recitation performed on your behalf with traditional pronunciation and vidhi.",
    expHi:
      "अपना संकल्प अपने वेदाचार्य के साथ साझा करें, संकल्प स्थापित करें और पारंपरिक उच्चारण तथा विधि के अनुसार यह पवित्र पाठ आपकी ओर से संपन्न करवाएँ।",
  },
  {
    id: "dvatrimshannama",
    name: "Durga Dvatrimshannama",
    nameHi: "दुर्गा द्वात्रिंशन्नाम",
    kicker: "The 32 sacred names of Durga",
    kickerHi: "दुर्गा के 32 पवित्र नाम",
    body: "A devotional recitation of the 32 names of Goddess Durga, each reflecting a particular aspect, attribute or manifestation of the Divine Mother.",
    bodyHi:
      "देवी दुर्गा के 32 नामों का भक्तिमय पाठ, जिसमें प्रत्येक नाम दिव्य माँ के किसी एक पहलू, गुण या रूप को व्यक्त करता है।",
    why: "The nine days of Navratri provide a natural opportunity to contemplate the many forms and qualities of Devi. Reciting Her names becomes a practice of remembrance, devotion and surrender.",
    whyHi:
      "नवरात्रि के नौ दिन देवी के अनेक रूपों और गुणों का चिंतन करने का स्वाभाविक अवसर देते हैं। उनके नामों का उच्चारण स्मरण, भक्ति और समर्पण का अभ्यास बन जाता है।",
    sig: "The Dvatrimshannama is traditionally associated with protection, courage, resilience and relief from difficulties. For many devotees, it offers a deeply personal way of placing their concerns before the Divine Mother.",
    sigHi:
      "द्वात्रिंशन्नाम को परंपरागत रूप से सुरक्षा, साहस, धैर्य और कठिनाइयों से मुक्ति से जोड़ा जाता है। अनेक भक्तों के लिए यह अपनी चिंताओं को दिव्य माँ के समक्ष रखने का एक अत्यंत व्यक्तिगत तरीका है।",
    exp: "Your sankalpa is taken in your name and the recitation is performed traditionally by a qualified Vedacharya, allowing you to participate in the spiritual observance even when circumstances prevent you from doing so personally.",
    expHi:
      "आपका संकल्प आपके नाम से लिया जाता है और यह पाठ एक योग्य वेदाचार्य परंपरागत रूप से संपन्न कराते हैं, जिससे आप परिस्थितिवश साक्षी न दे पाने के बावजूद इस भक्ति-अनुष्ठान में भाग ले सकते हैं।",
  },
  {
    id: "ashtottara-shatanama",
    name: "Ashtottara Shatanama Stotra",
    nameHi: "अष्टोत्तर शतनाम स्तोत्र",
    kicker: "The 108 names of the Divine Mother",
    kickerHi: "दिव्य माँ के 108 नाम",
    body: "The Ashtottara Shatanama Stotra invokes 108 sacred names of Goddess Durga, each representing a distinct quality or manifestation of Devi.",
    bodyHi:
      "अष्टोत्तर शतनाम स्तोत्र देवी दुर्गा के 108 पवित्र नामों का आवाहन करता है, जिनमें प्रत्येक देवी के एक विशिष्ट गुण या रूप को प्रकट करता है।",
    why: "Navratri is a time of deepening one's relationship with Shakti. Contemplating the 108 names allows the devotee to move beyond asking for something from the Divine and towards remembering and contemplating the many dimensions of the Divine Mother.",
    whyHi:
      "नवरात्रि शक्ति से संबंध को गहरा करने का समय है। इन 108 नामों के चिंतन से भक्त दिव्य से कुछ माँगने से आगे बढ़कर दिव्य माँ के अनेक आयामों का स्मरण और चिंतन करने तक पहुँचता है।",
    sig: "The recitation is traditionally undertaken to cultivate devotion, remembrance, inner steadiness and a deeper connection with Devi's various forms and attributes.",
    sigHi:
      "इस पाठ को परंपरागत रूप से भक्ति, स्मरण, आंतरिक स्थिरता और देवी के विभिन्न रूपों-गुणों से गहरा संबंध बनाने के लिए किया जाता है।",
    exp: "A learned Vedacharya performs the recitation with your sankalpa, transforming what might otherwise remain a distant festival into a personally meaningful spiritual observance.",
    expHi:
      "एक विद्वान वेदाचार्य आपके संकल्प के साथ यह पाठ संपन्न कराते हैं, जिससे यह त्योहार दूर का न रहकर व्यक्तिगत रूप से अर्थपूर्ण भक्ति-अनुष्ठान बन जाता है।",
  },
  {
    id: "devi-kavach",
    name: "Devi Kavach",
    nameHi: "देवी कवच",
    kicker: "Invoking the Mother's protection",
    kickerHi: "माँ की सुरक्षा का आवाहन",
    body: "The Devi Kavach is a powerful protective hymn associated with the Durga Saptashati tradition. It invokes Devi in Her many forms and seeks Her protection over different aspects of one's life.",
    bodyHi:
      "देवी कवच दुर्गा सप्तशती परंपरा से जुड़ा एक शक्तिशाली रक्षात्मक स्तोत्र है। यह देवी के अनेक रूपों का आवाहन करता है और जीवन के विभिन्न पहलुओं पर उनकी सुरक्षा का आह्वान करता है।",
    why: "Navratri is traditionally regarded as a particularly potent period for Devi worship. The Kavach is therefore often included as part of more comprehensive Devi upasana.",
    whyHi:
      "नवरात्रि को परंपरागत रूप से देवी उपासना के लिए विशेष प्रभावी काल माना जाता है, इसलिए कवच को अधिक व्यापक देवी उपासना का हिस्सा अक्सर शामिल किया जाता है।",
    sig: "The Kavach is traditionally recited with the intention of seeking protection, courage, strength and freedom from fear and adversity.",
    sigHi:
      "कवच का पाठ परंपरागत रूप से सुरक्षा, साहस, बल तथा भय और विपत्ति से मुक्ति की कामना के संकल्प के साथ किया जाता है।",
    exp: "The recitation is performed according to traditional practice, with your sankalpa and intention at the centre of the ritual.",
    expHi:
      "यह पाठ परंपरिक पद्धति के अनुसार संपन्न कराया जाता है, जिसमें आपका संकल्प और आपकी कामना अनुष्ठान के केंद्र में रहती है।",
  },
  {
    id: "devi-atharvashirsha",
    name: "Devi Atharvashirsha",
    nameHi: "देवी अथर्वशीर्ष",
    kicker: "Contemplating the deeper nature of Shakti",
    kickerHi: "शक्ति की गहरतर प्रकृति का चिंतन",
    body: "The Devi Atharvashirsha is a profound sacred text that presents Devi as the fundamental spiritual reality underlying creation.",
    bodyHi:
      "देवी अथर्वशीर्ष एक गंभीर पवित्र ग्रंथ है, जो देवी को सृष्टि के अंतर्निहित मूल आध्यात्मिक सत्य के रूप में प्रस्तुत करता है।",
    why: "While Navratri is celebrated through many forms of ritual and devotion, it is also an opportunity to contemplate the deeper philosophical understanding of Shakti. The Atharvashirsha provides precisely this dimension.",
    whyHi:
      "नवरात्रि अनेक अनुष्ठानों और भक्ति-रूपों में आयोजित होता है, परंतु यह शक्ति के गहन दार्शनिक बोध का चिंतन करने का भी अवसर है। अथर्वशीर्ष ठीक यही आयाम देता है।",
    sig: "Traditionally approached for spiritual purification, inner strength, clarity and devotion, it invites the devotee to contemplate the Divine Mother not merely as a deity to be worshipped, but as the all-pervading principle of consciousness and existence.",
    sigHi:
      "इसे परंपरागत रूप से आध्यात्मिक शोधन, आंतरिक बल, स्पष्टता और भक्ति के लिए अपनाया जाता है। यह भक्त को देवी को केवल पूजनीय देवता नहीं, बल्कि चेतना और अस्तित्व की सर्वव्यापी सिद्धांत के रूप में देखने की प्रेरित करता है।",
    exp: "For devotees who wish to experience a more contemplative and philosophical dimension of Navratri, the recitation can become a deeply enriching spiritual offering.",
    expHi:
      "जो भक्त नवरात्रि के अध्यात्मवादी और चिंतनशील आयाम को अनुभव करना चाहते हैं, उनके लिए यह पाठ गहरा समृद्ध करने वाला आध्यात्मिक उपहार बन सकता है।",
  },
  {
    id: "siddha-kunjika",
    name: "Siddha Kunjika Stotra",
    nameHi: "सिद्ध कुंजिका स्तोत्र",
    kicker: "A concentrated invocation of Devi",
    kickerHi: "देवी का एकाग्र आवाहन",
    body: "The Siddha Kunjika Stotra is a revered and esoteric hymn associated with the Durga Saptashati tradition.",
    bodyHi: "सिद्ध कुंजिका स्तोत्र दुर्गा सप्तशती परंपरा से जुड़ा एक पूजनीय और गूढ़ स्तोत्र है।",
    why: "Its association with the Chandi tradition makes Navratri a particularly meaningful period for its recitation.",
    whyHi:
      "इसका चंदी परंपरा से संबंध नवरात्रि को इसके पाठ के लिए विशेष रूप से सार्थक काल बना देता है।",
    sig: "Traditionally regarded as a concentrated form of Devi upasana, it is approached for spiritual strength, removal of obstacles and the fulfilment of sincere intentions. Because of its esoteric nature, it is particularly important that this practice be undertaken with appropriate guidance rather than treated as simply another text to be recited.",
    sigHi:
      "इसे परंपरागत रूप से देवी उपासना का एकाग्र रूप माना जाता है, जिसे आध्यात्मिक बल, बाधाओं के निवारण और प्रामाणिक संकल्पों की पूर्ति के लिए अपनाया जाता है। इसकी गूढ़ प्रकृति के कारण यह आवश्यक है कि इसे उचित मार्गदर्शन में किया जाए, न कि केवल एक और पाठ मानकर।",
    exp: "Dharmaa Tribe connects you with experienced Vedacharyas who understand the traditional context of such practices and can guide the choice of recitation according to your intention.",
    expHi:
      "Dharmaa Tribe आपको अनुभवी वेदाचार्यों से जोड़ता है, जो ऐसी साधनाओं की पारंपरिक परिस्थिति को समझते हैं और आपके संकल्प के अनुसार पाठ के चयन में मार्गदर्शन कर सकते हैं।",
  },
  {
    id: "chandi-path",
    name: "Chandi Path",
    nameHi: "चंदी पाठ",
    kicker: "The complete invocation of the Divine Mother",
    kickerHi: "दिव्य माँ का पूर्ण आवाहन",
    body: "The Chandi Path, based on the Devi Mahatmya or Durga Saptashati, is among the most revered forms of Devi worship. It narrates the triumph of the Divine Mother over forces of adharma and celebrates the many manifestations of Shakti.",
    bodyHi:
      "चंदी पाठ, जो देवी माहात्म्य अर्थात दुर्गा सप्तशती पर आधारित है, देवी उपासना के सबसे पूजनीय रूपों में से एक है। यह दिव्य माँ के अधर्म पर विजय की कथा कहता है और शक्ति के अनेक रूपों का उल्लेख करता है।",
    why: "The Durga Saptashati is intrinsically connected with Navratri and occupies a central place in traditional Devi worship during this sacred period.",
    whyHi:
      "दुर्गा सप्तशती का नवरात्रि से सहज संबंध है और इस पवित्र काल में पारंपरिक देवी उपासना में इसका केंद्रीय स्थान है।",
    sig: "The Chandi Path is traditionally undertaken to invoke divine strength, protection, courage, auspiciousness and restoration of balance. Beyond specific intentions, it offers an opportunity for the devotee to contemplate a profound spiritual message: that forces of imbalance can be overcome through the awakening of divine strength.",
    sigHi:
      "चंदी पाठ परंपरागत रूप से दिव्य बल, सुरक्षा, साहस, शुभता और संतुलन की पुनर्स्थापना के लिए किया जाता है। विशिष्ट संकल्पों से परे यह भक्त को एक गहन आध्यात्मिक संदेश पर चिंतन करने का अवसर देता है: असंतुलन की शक्तियाँ दिव्य बल की जागरण से पराजित हो सकती हैं।",
    exp: "Rather than simply arranging a recitation, Dharmaa Tribe creates a personalised experience around your sankalpa, performed by a learned Vedacharya following the appropriate traditional process.",
    expHi:
      "Dharmaa Tribe केवल पाठ की व्यवस्था नहीं करता, बल्कि आपके संकल्प के आसपास एक व्यक्तिगत अनुभव बनाता है, जिसे एक विद्वान वेदाचार्य उचित पारंपरिक प्रक्रिया के अनुसार संपन्न करते हैं।",
  },
  {
    id: "navachandi",
    name: "Navachandi",
    nameHi: "नवचण्डी",
    kicker: "An elaborate Navratri offering to Devi",
    kickerHi: "देवी को समर्पित विस्तृत नवरात्रि उपहार",
    body: "Navachandi is an elaborate form of Chandi worship involving detailed ritual observances and the invocation of Devi in a ninefold form.",
    bodyHi:
      "नवचण्डी चंदी उपासना का विस्तृत रूप है, जिसमें विस्तृत अनुष्ठान-परंपराएँ और देवी के नौ रूपों का आवाहन शामिल होता है।",
    why: "The symbolism of nine is deeply woven into Navratri through the worship of the Navadurga, the nine manifestations of the Divine Mother. Navachandi therefore carries a particularly strong association with this sacred period.",
    whyHi:
      "नौ का प्रतीक नवदुर्गा, अर्थात दिव्य माँ के नौ रूपों की उपासना के माध्यम से नवरात्रि में गहराई से बुना है। इसलिए नवचण्डी का इस पवित्र काल से विशेष रूप से गहरा संबंध है।",
    sig: "It is traditionally performed with prayers for auspiciousness, protection, wellbeing, strength and the fulfilment of significant intentions.",
    sigHi:
      "इसे परंपरागत रूप से शुभता, सुरक्षा, कल्याण, बल और महत्वपूर्ण संकल्पों की पूर्ति की प्रार्थनाओं के साथ संपन्न किया जाता है।",
    exp: "Navachandi is suited to devotees seeking a more immersive and elaborate Navratri observance, particularly when they wish to mark an important personal, family or spiritual milestone.",
    expHi:
      "नवचण्डी उन भक्तों के लिए उपयुक्त है जो अधिक गहरे और विस्तृत नवरात्रि अनुष्ठान की तलाश कर रहे हैं, विशेषकर जब कोई महत्वपूर्ण व्यक्तिगत, पारिवारिक या आध्यात्मिक पड़ाव को चिह्नित करना हो।",
  },
  {
    id: "shatachandi",
    name: "Shatachandi",
    nameHi: "शतचण्डी",
    kicker: "An intensive form of Chandi upasana",
    kickerHi: "चंदी उपासना का घनीभूत रूप",
    body: "Shatachandi represents a considerably more extensive form of Devi worship involving repeated recitation of the Durga Saptashati.",
    bodyHi:
      "शतचण्डी देवी उपासना का अत्यंत विस्तृत रूप है, जिसमें दुर्गा सप्तशती का बार-बार पाठ सम्मिलित होता है।",
    why: "Navratri provides an especially auspicious setting for intensive Devi sadhana. Traditionally, larger-scale Chandi observances are undertaken during significant sacred occasions and for deeply held intentions.",
    whyHi:
      "नवरात्रि गहन देवी साधना के लिए विशेष शुभ वातावरण प्रदान करता है। परंपरा में बड़े पैमाने पर चंदी अनुष्ठान महत्वपूर्ण पवित्र अवसरों और गहन संकल्पों के लिए किए जाते हैं।",
    sig: "It is traditionally associated with intensive spiritual practice, protection, auspiciousness and significant personal or collective intentions. Because of the scale and discipline involved, it requires careful preparation and knowledgeable ritual execution.",
    sigHi:
      "इसे परंपरागत रूप से घनीभूत आध्यात्मिक अभ्यास, सुरक्षा, शुभता तथा महत्वपूर्ण व्यक्तिगत या सामूहिक संकल्पों से जोड़ा जाता है। इसके पैमाने और अनुशासन के कारण इसमें सावधानीपूर्वक तैयारी और ज्ञानपूर्ण अनुष्ठान-निष्पादन आवश्यक होता है।",
    exp: "Dharmaa Tribe can help transform such an elaborate traditional practice into an accessible experience for devotees who may be geographically distant from India or unable to organise the complete ritual themselves.",
    expHi:
      "Dharmaa Tribe ऐसी विस्तृत पारंपरिक साधना को उन भक्तों के लिए सुलभ अनुभव बनाने में सहायक हो सकता है जो भारत से भौगोलिक रूप से दूर हैं या पूरा अनुष्ठान स्वयं आयोजित नहीं कर सकते।",
  },
  {
    id: "mantra-samputa",
    name: "Durga Saptashati with Mantra Samputa",
    nameHi: "दुर्गा सप्तशती संपुट मंत्र सहित",
    kicker: "A bespoke Devi sadhana, centred around your intention",
    kickerHi: "आपके संकल्प पर केंद्रित विशिष्ट देवी साधना",
    body: "This is where the Dharmaa Tribe experience becomes truly personalised. In a Samputa practice, selected mantras are traditionally incorporated into the recitation of the Durga Saptashati according to the specific intention for which the practice is being undertaken.",
    bodyHi:
      "संपुट साधना में चुने हुए मंत्र परंपरागत रूप से दुर्गा सप्तशती के पाठ में शामिल किए जाते हैं, जो उस विशेष संकल्प के अनुसार होता है जिसके लिए यह साधना की जा रही है।",
    why: "Navratri is traditionally regarded as one of the most auspicious periods for Devi sadhana. A personalised Samputa practice allows the devotee to approach the sacred text with a clearly defined sankalpa rather than undertaking a generic recitation.",
    whyHi:
      "नवरात्रि को परंपरागत रूप से देवी साधना के सबसे शुभ कालों में से एक माना जाता है। व्यक्तिगत संपुट साधना में भक्त सामान्य पाठ के बजाय स्पष्ट संकल्प के साथ इस पवित्र ग्रंथ के पास जाता है।",
    sig: "The practice is traditionally undertaken for specific spiritual intentions, prayers and aspirations, with the exact form of practice determined according to the tradition and guidance of the Vedacharya.",
    sigHi:
      "यह साधना परंपरागत रूप से विशिष्ट आध्यात्मिक संकल्पों, प्रार्थनाओं और आकांक्षाओं के लिए की जाती है, और इसका सटीक रूप परंपरा तथा वेदाचार्य के मार्गदर्शन के अनुसार निर्धारित होता है।",
    exp: "You bring your intention. Our Vedacharya helps you identify the right practice, establishes the sankalpa in your name, and performs the ritual according to traditional vidhi.",
    expHi:
      "आप अपना संकल्प लाते हैं। हमारा वेदाचार्य उपयुक्त साधना को पहचानने में आपका मार्गदर्शन करता है, आपके नाम से संकल्प स्थापित करता है, और अनुष्ठान पारंपरिक विधि के अनुसार संपन्न कराता है।",
  },
];

const SIGNATURE = [
  {
    en: "You don't have to know which paath you need.",
    hi: "आपको यह जानने की आवश्यकता नहीं कि आपके लिए कौन-सा पाठ उपयुक्त है।",
  },
  {
    en: "You bring your intention. Our Vedacharya helps guide the sacred practice.",
    hi: "आप अपना संकल्प लाते हैं। हमारा वेदाचार्य पवित्र साधना का मार्गदर्शन करता है।",
  },
  {
    en: "Your intention is understood, the appropriate practice is identified, the sankalpa is established in your name, and the ritual is performed according to traditional vidhi.",
    hi: "आपका संकल्प समझा जाता है, उपयुक्त साधना पहचानी जाती है, आपके नाम से संकल्प स्थापित होता है, और अनुष्ठान पारंपरिक विधि के अनुसार संपन्न होता है।",
  },
  {
    en: "This is not simply an online booking. It is your personal connection with an ancient spiritual tradition, made possible wherever you are.",
    hi: "यह केवल एक ऑनलाइन बुकिंग नहीं है। यह आपके पारंपरिक आध्यात्मिक परंपरा से आपका व्यक्तिगत संबंध है, जो आप कहीं भी हों, संभव हो गया है।",
  },
];

const CAPABILITIES = [
  {
    Icon: BookOpenText,
    en: "Understand",
    hi: "समझें",
    body: "Know the traditional significance of the practice you are undertaking.",
    bodyHi: "जिस साधना का आप अनुष्ठान कर रहे हैं, उसका पारंपरिक महत्व जानें।",
  },
  {
    Icon: HandHeart,
    en: "Personalise",
    hi: "व्यक्तिगत बनाएँ",
    body: "Have your prayer and intention expressed through a proper sankalpa.",
    bodyHi: "अपनी प्रार्थना और संकल्प को उचित संकल्प के माध्यम से व्यक्त करवाएँ।",
  },
  {
    Icon: SealCheck,
    en: "Experience authenticity",
    hi: "प्रामाणिकता का अनुभव",
    body: "Have the recitation and ritual performed with attention to traditional vidhi, mantra and pronunciation.",
    bodyHi: "पाठ और अनुष्ठान पारंपरिक विधि, मंत्र और उच्चारण के साथ संपन्न करवाएँ।",
  },
  {
    Icon: UsersThree,
    en: "Stay connected",
    hi: "जुड़े रहें",
    body: "Participate in sacred occasions even when you are far from your family, temple or homeland.",
    bodyHi: "परिवार, मंदिर या मातृभूमि से दूर होने पर भी पवित्र अवसरों में भाग लें।",
  },
  {
    Icon: VideoCamera,
    en: "Be present, even from afar",
    hi: "दूर से भी उपस्थित रहें",
    body: "Experience the ritual through live telecast and receive relevant recordings where offered.",
    bodyHi:
      "लाइव प्रसारण के माध्यम से अनुष्ठान का अनुभव करें और जहाँ उपलब्ध हो, रिकॉर्डिंग प्राप्त करें।",
  },
  {
    Icon: ClockCounterClockwise,
    en: "Preserve continuity",
    hi: "निरंतरता बनाए रखें",
    body: "Continue practices that connect you and your family to the spiritual traditions of your home, wherever life has taken you.",
    bodyHi:
      "जीवन जहाँ भी ले गया हो, अपने और अपने परिवार को घर की आध्यात्मिक परंपराओं से जोड़ने वाली साधनाएँ जारी रखें।",
  },
];

const JOURNEY = [
  {
    title: "Share Your Intention",
    titleHi: "अपना संकल्प साझा करें",
    body: "Tell us what you would like to pray for, or what you wish to dedicate your Navratri practice to.",
    bodyHi:
      "बताइए आप किसके लिए प्रार्थना करना चाहते हैं, या नवरात्रि की अपनी साधना किस संकल्प को समर्पित करना चाहते हैं।",
  },
  {
    title: "Connect With a Vedacharya",
    titleHi: "वेदाचार्य से जुड़ें",
    body: "Explore the profiles of our learned Vedacharyas and choose the one with whom you feel connected.",
    bodyHi: "हमारे विद्वान वेदाचार्यों की परिचय पढ़ें और जिनसे आपका जुड़ाव महसूस हो, उन्हें चुनें।",
  },
  {
    title: "Find Your Sacred Practice",
    titleHi: "अपनी पवित्र साधना पाएँ",
    body: "Where appropriate, your Vedacharya can guide you towards a suitable paath, stotra or pooja based on your intention.",
    bodyHi:
      "जहाँ उचित हो, आपके वेदाचार्य आपके संकल्प के आधार पर उपयुक्त पाठ, स्तोत्र या पूजा की ओर मार्गदर्शन करेंगे।",
  },
  {
    title: "Create Your Sankalpa",
    titleHi: "अपना संकल्प बनाएँ",
    body: "Your name, intention and relevant details are incorporated into the traditional sankalpa.",
    bodyHi: "आपका नाम, संकल्प और प्रासंगिक विवरण पारंपरिक संकल्प में शामिल किए जाते हैं।",
  },
  {
    title: "Experience the Ritual",
    titleHi: "अनुष्ठान का अनुभव करें",
    body: "Your chosen pooja or recitation is performed according to the appropriate traditional vidhi.",
    bodyHi: "आपकी चुनी हुई पूजा या पाठ उचित पारंपरिक विधि के अनुसार संपन्न किया जाता है।",
  },
  {
    title: "Be Part of It",
    titleHi: "इसमें शामिल हों",
    body: "Join through live telecast wherever available, and experience the ritual from wherever you are.",
    bodyHi: "जहाँ उपलब्ध हो, लाइव प्रसारण से जुड़ें और अपने स्थान से ही अनुष्ठान का अनुभव करें।",
  },
  {
    title: "Carry the Experience Forward",
    titleHi: "अनुभव को आगे बढ़ाएँ",
    body: "Receive relevant recordings and completion details, so the sacred experience stays part of your spiritual journey.",
    bodyHi:
      "प्रासंगिक रिकॉर्डिंग और पूर्णता विवरण प्राप्त करें, ताकि यह पवित्र अनुभव आपकी आध्यात्मिक यात्रा का हिस्सा बना रहे।",
  },
];

const KEYWORDS = [
  "navratri",
  "navratra",
  "sharad navratri 2026",
  "navratri 2026 dates",
  "durga saptashati path",
  "saptashloki durga",
  "durga saptashati",
  "ashtottara shatanama stotra",
  "durga dvatrimshannama",
  "devi kavach",
  "devi atharvashirsha",
  "siddha kunjika stotra",
  "chandi path",
  "navachandi",
  "shatachandi",
  "mantra samputa",
  "navratri puja online",
  "online navratri puja booking",
  "chandi path puja",
  "vedacharya",
];

export default function NavratriContent() {
  const { lang } = useLanguage();
  const hi = lang === "hi";
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const puja = defaultPujas.find((p) => p.id === "navratri");
  const inquiry = buildInquiryHref(puja, lang);
  const pick = (en, hiText) => (hi ? hiText : en);
  const item = RECITATIONS[active];

  useEffect(() => {
    document.title = hi
      ? "नवरात्रि पाठ और देवी उपासना | Dharmaa Tribe"
      : "Sacred Navratri Recitations with a Vedacharya | Dharmaa Tribe";
    const setMeta = (name, content) => {
      let m = document.querySelector(`meta[name="${name}"]`);
      if (!m) {
        m = document.createElement("meta");
        m.setAttribute("name", name);
        document.head.appendChild(m);
      }
      m.setAttribute("content", content);
    };
    setMeta(
      "description",
      hi
        ? "शारदीय नवरात्रि के पवित्र पाठ: सप्तश्लोकी दुर्गा, द्वात्रिंशन्नाम, अष्टोत्तर शतनाम, देवी कवच, चंदी पाठ, नवचण्डी और संपुट। वेदाचार्य के मार्गदर्शन में अपने संकल्प के साथ पूजा कराएँ।"
        : "Sacred Navratri recitations performed by a learned Vedacharya: Saptashloki Durga, Dvatrimshannama, Ashtottara Shatanama, Chandi Path, Navachandi and Mantra Samputa, with your Sankalp."
    );
    setMeta("keywords", KEYWORDS.join(", "));
    let ld = document.getElementById("navratri-ld-json");
    if (!ld) {
      ld = document.createElement("script");
      ld.id = "navratri-ld-json";
      ld.type = "application/ld+json";
      document.head.appendChild(ld);
    }
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Sacred Navratri Recitations",
      itemListElement: RECITATIONS.map((r, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: r.name,
      })),
    });
  }, [hi]);

  const detailBlock = (label, body) => (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-[.16em] text-gold-600">{label}</div>
      <p className="mt-2 text-[13px] leading-7 muted-dt">{body}</p>
    </div>
  );

  return (
    <>
      {/* Opening: asymmetric split, statement left, ritual image right */}
      <section className="site-section has-decor-dt">
        <SectionDecor />
        <LeafBranch className="decor-dt decor-tl hide-mobile soft-tone" />
        <div className="container-dt grid gap-12 lg:grid-cols-[1.05fr_.95fr] items-center">
          <Reveal>
            <div className="eyebrow eyebrow-line-dt">
              {hi ? "शारदीय नवरात्रि" : "Sharad Navratri"}
            </div>
            <h1 className="display-dt mt-4 text-[clamp(38px,5.4vw,66px)]">
              {hi ? "पवित्र नवरात्रि पाठ" : "Sacred Navratri recitations"}
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-7 muted-dt">
              {hi
                ? "परंपरा में जड़, व्यक्तिगत आध्यात्मिक साधना।"
                : "Personalised spiritual practices, rooted in tradition."}
            </p>
            <p className="mt-5 max-w-xl text-sm leading-8 muted-dt">
              {hi
                ? "नवरात्रि के इन नौ रातों में आप अपना संकल्प एक विद्वान वेदाचार्य के साथ साझा करते हैं, उचित संकल्प बनाते हैं, और पारंपरिक उच्चारण तथा विधि के अनुसार संपन्न होने वाले पाठ का अनुभव करते हैं।"
                : "Across nine nights, you share your intention with a learned Vedacharya, establish a sankalpa, and experience recitations performed with the pronunciation and vidhi the tradition prescribes."}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link className="btn-gold-dt" to="/booking/navratri/date">
                {hi ? "नवरात्रि पूजा बुक करें" : "Book Navratri puja"} <ArrowRight size={15} />
              </Link>
              <a className="btn-ghost-dt" href={inquiry} target="_blank" rel="noreferrer">
                {hi ? "वेदाचार्य से पूछें" : "Ask a Vedacharya"} <ArrowUpRight size={14} />
              </a>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-2 text-[11px] muted-dt">
              <span className="inline-flex items-center gap-1.5">
                <CalendarBlank size={14} /> 11-19 {hi ? "अक्टूबर" : "Oct"} 2026
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} /> {hi ? "शक्ति पीठ सेवा" : "Shakti Peeth Seva"}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <VideoCamera size={14} /> {hi ? "लाइव प्रसारण" : "Live telecast"}
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="overflow-hidden rounded-[24px]">
              <ParallaxImage
                src="/puja/navratra.jpg"
                alt={
                  hi
                    ? "नवरात्रि के लिए सजाई गई देवी मूर्ति"
                    : "Devi idol prepared for Navratri worship"
                }
                className="h-[340px] w-full sm:h-[440px]"
                strength={20}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Introductory essay, two columns with a rule between */}
      <section className="site-section surface-2-dt has-decor-dt">
        <SectionDecor />
        <div className="container-dt">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <h2 className="display-dt text-[clamp(30px,4vw,48px)] title-soft">
                {hi ? "देवी की उपासना का पवित्र काल" : "A sacred period for the worship of Shakti"}
              </h2>
              <p className="mt-6 text-sm leading-8 muted-dt">
                {hi
                  ? "शारदीय नवरात्रि हिन्दू पंचांग में शक्ति, अर्थात दिव्य स्त्री, की उपासना के लिए सबसे पवित्र कालों में से एक है।"
                  : "Sharadiya Navratri is among the most sacred periods in the Hindu calendar for the worship of Shakti, the Divine Feminine."}
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="grid gap-6 text-sm leading-8 muted-dt">
                <p>
                  {hi
                    ? "इन नौ रातों और दस दिनों में, भक्त प्रार्थना, मंत्र, स्तोत्र, पाठ, पूजा और साधना के माध्यम से देवी के अनेक रूपों की ओर उन्मुख होते हैं। परंपरागत रूप से नवरात्रि को भक्ति विकसित करने, दिव्य माँ के प्रसाद की कामना करने, अपना संकल्प नवीनीकरण करने तथा बल, सुरक्षा, स्पष्टता और कल्याण का आह्वान करने के लिए विशेष शुभ माना जाता है।"
                    : "Across these nine nights and ten days, devotees turn towards the many manifestations of Devi through prayer, mantra, stotra, paath, puja and sadhana. Traditionally, Navratri is considered an especially auspicious time to cultivate devotion, seek the grace of the Divine Mother, renew one's sankalpa, and invoke strength, protection, clarity and wellbeing."}
                </p>
                <p>
                  {hi
                    ? "Dharmaa Tribe में हम मानते हैं कि किसी पवित्र साधना को केवल अनुष्ठान पूरा करने तक सीमित नहीं किया जाना चाहिए। इसे समझा जाना चाहिए, व्यक्तिगत बनाया जाना चाहिए और प्रामाणिकता से संपन्न किया जाना चाहिए।"
                    : "At Dharmaa Tribe, we believe that a sacred practice should not be reduced to simply completing a ritual. It should be understood, personalised and performed with authenticity."}
                </p>
                <p>
                  {hi
                    ? "हमारे नवरात्रि उपहार आपको अपना संकल्प एक विद्वान वेदाचार्य के साथ साझा करने, उचित संकल्प बनाने और पारंपरिक अनुष्ठानों का अनुभव करने की सुविधा देते हैं, जिन्हें परंपरा द्वारा निर्धारित अनुशासन, उच्चारण और विधि के अनुसार संपन्न किया जाता है।"
                    : "Our Navratri offerings let you share your intention with a learned Vedacharya, create an appropriate sankalpa, and experience traditional recitations performed with the discipline, pronunciation and vidhi prescribed by the tradition."}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The ten recitations: sticky index on the left, one expanded detail */}
      <section className="site-section has-decor-dt">
        <SectionDecor />
        <div className="container-dt">
          <Reveal>
            <h2 className="display-dt max-w-2xl text-[clamp(30px,4.4vw,54px)]">
              {hi ? "दस पाठ, दस अलग संकल्प" : "Ten recitations, ten different intentions"}
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-8 muted-dt">
              {hi
                ? "अपना संकल्प चुनें, या अपने वेदाचार्य से पूछकर वह पाठ चुनवाएँ जो आपकी कामना के लिए सबसे उपयुक्त हो।"
                : "Choose by intention, or let your Vedacharya guide you to the recitation that fits what you are praying for."}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,300px)_1fr] lg:gap-14">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0">
                {RECITATIONS.map((r, i) => (
                  <button
                    key={r.id}
                    id={r.id}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-current={i === active}
                    className={`group flex shrink-0 cursor-pointer items-baseline gap-3 border-b border-dt px-4 py-3 text-left transition-colors disabled:cursor-not-allowed lg:w-full ${
                      i === active ? "bg-surface" : "hover:bg-surface-2"
                    }`}
                  >
                    <span
                      className={`text-[10px] font-bold tracking-[.14em] ${
                        i === active ? "text-gold-600" : "muted-dt"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      <span
                        className={`block whitespace-nowrap text-[13px] font-semibold lg:whitespace-normal ${
                          i === active ? "text-ink" : "muted-dt"
                        }`}
                      >
                        {pick(r.name, r.nameHi)}
                      </span>
                      <span className="mt-0.5 hidden text-[11px] leading-5 muted-dt lg:block">
                        {pick(r.kicker, r.kickerHi)}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="panel-dt flex h-[760px] flex-col overflow-hidden sm:h-[680px] lg:h-[620px]">
              <div className="flex min-h-0 flex-1 flex-col">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={item.id}
                    initial={reduce ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="min-h-full overflow-y-auto p-7 sm:p-9"
                  >
                    <div className="text-[10px] font-bold uppercase tracking-[.16em] text-gold-600">
                      {pick(item.kicker, item.kickerHi)}
                    </div>
                    <h3 className="display-dt mt-3 text-[clamp(26px,3.4vw,40px)]">
                      {pick(item.name, item.nameHi)}
                    </h3>
                    <p className="mt-5 text-sm leading-8 muted-dt">
                      {pick(item.body, item.bodyHi)}
                    </p>
                    <div className="mt-8 grid gap-7 border-t border-dt pt-7 sm:grid-cols-2 xl:grid-cols-3">
                      {detailBlock(
                        hi ? "नवरात्रि में क्यों" : "Why during Navratri",
                        pick(item.why, item.whyHi)
                      )}
                      {detailBlock(
                        hi ? "पारंपरिक महत्व" : "Traditional significance",
                        pick(item.sig, item.sigHi)
                      )}
                      {detailBlock(
                        hi ? "Dharmaa Tribe अनुभव" : "A Dharmaa Tribe experience",
                        pick(item.exp, item.expHi)
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="grid grid-cols-2 border-t border-dt">
                <button
                  type="button"
                  onClick={() => setActive((a) => Math.max(0, a - 1))}
                  disabled={active === 0}
                  className="flex cursor-pointer items-center gap-2 border-r border-dt px-6 py-4 text-[12px] font-semibold transition-colors hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-35"
                >
                  <ArrowRight size={14} className="rotate-180" /> {hi ? "पिछला पाठ" : "Previous"}
                </button>
                <button
                  type="button"
                  onClick={() => setActive((a) => Math.min(RECITATIONS.length - 1, a + 1))}
                  disabled={active === RECITATIONS.length - 1}
                  className="flex cursor-pointer items-center justify-end gap-2 px-6 py-4 text-[12px] font-semibold transition-colors hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-35"
                >
                  {hi ? "अगला पाठ" : "Next"} <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signature: ink band, four statements stacked on a single measure */}
      <section className="site-section ink-dt has-decor-dt">
        <SectionDecor />
        <div className="container-dt grid gap-12 lg:grid-cols-[.85fr_1.15fr] items-center">
          <Reveal>
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.18em] text-gold-300">
              <Sparkle size={14} weight="fill" />{" "}
              {hi ? "Dharmaa Tribe की पहचान" : "The Dharmaa Tribe signature"}
            </div>
            <div className="mt-7 overflow-hidden rounded-[20px]">
              <ParallaxImage
                src="/more/diya.png"
                alt={hi ? "नवरात्रि के दीप" : "Lamps lit for Navratri"}
                className="h-[240px] w-full sm:h-[300px]"
                strength={14}
              />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="grid gap-6">
              {SIGNATURE.map((s, i) => (
                <p
                  key={s.en}
                  className={`leading-[1.35] ${
                    i === 0
                      ? "display-dt text-[clamp(28px,3.6vw,46px)] text-white"
                      : "text-[15px] leading-8 text-white/60"
                  }`}
                >
                  {pick(s.en, s.hi)}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why a Vedacharya: sticky heading left, capability list right */}
      <section className="site-section has-decor-dt">
        <SectionDecor />
        <DiyaCluster className="decor-dt decor-br hide-mobile soft-tone" />
        <div className="container-dt grid gap-12 lg:grid-cols-[.95fr_1.05fr] items-start">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <h2 className="display-dt text-[clamp(30px,4.2vw,52px)]">
                {hi
                  ? "वेदाचार्य से पूजा करवाएँ, क्यों?"
                  : "Why have a Vedacharya perform your Navratri pooja?"}
              </h2>
              <p className="mt-6 max-w-lg text-sm leading-8 muted-dt">
                {hi
                  ? "पीढ़ियों से पवित्र अनुष्ठान और पाठ गुरु-शिष्य परंपरा के माध्यम से प्राप्त हुए हैं, जहाँ मंत्र, उच्चारण, अनुष्ठान-क्रम, संकल्प और विधि का ज्ञान अध्ययन और अभ्यास से विकसित होता है।"
                  : "For generations, sacred rituals and recitations have been transmitted through guru-shishya parampara, where knowledge of mantra, pronunciation, ritual sequence, sankalpa and vidhi is cultivated through study and practice."}
              </p>
              <p className="mt-5 max-w-lg text-sm leading-8 muted-dt">
                {hi
                  ? "अनेक आधुनिक भक्तों के लिए चुनौती श्रद्धा की कमी नहीं है। वह समय, दूरी और पहुँच है।"
                  : "For many modern devotees, the challenge is not a lack of faith. It is time, distance and access."}
              </p>
              <ul className="mt-7 grid gap-2 max-w-lg text-[13px] leading-7 muted-dt">
                {[
                  hi
                    ? "आप हजारों मील दूर अपने घर से रह सकते हैं।"
                    : "You may be living thousands of miles away from home.",
                  hi
                    ? "आप अपने पारिवारिक मंदिर तक नहीं जा सकते।"
                    : "You may be unable to travel to your family temple.",
                  hi
                    ? "आपको पूरी विधि का ज्ञान नहीं हो सकता।"
                    : "You may not know the complete vidhi.",
                  hi
                    ? "आपका पेशेवर या पारिवारिक जीवन व्यस्त है।"
                    : "You may have a demanding professional or family life.",
                  hi
                    ? "या आप प्रामाणिकता से समझौता किए बिना अनुष्ठान का अनुभव करना चाहते हैं।"
                    : "Or you may simply wish to experience the ritual without compromising its authenticity.",
                ].map((x) => (
                  <li key={x} className="flex gap-3">
                    <span className="mt-2 h-px w-4 flex-none bg-gold-500" />
                    {x}
                  </li>
                ))}
              </ul>
              <p className="mt-7 max-w-lg text-[15px] font-semibold text-ink">
                {hi ? "Dharmaa Tribe यह अंतर भरता है।" : "Dharmaa Tribe bridges that gap."}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="grid gap-px overflow-hidden rounded-[22px] border border-dt bg-[color:var(--line)]">
              {CAPABILITIES.map(({ Icon, en, hi: hiLabel, body, bodyHi }) => (
                <div key={en} className="surface-dt flex gap-5 p-6 sm:p-7">
                  <span className="grid h-11 w-11 flex-none place-items-center rounded-full border border-dt text-gold-600">
                    <Icon size={19} />
                  </span>
                  <div>
                    <h3 className="display-dt text-2xl">{pick(en, hiLabel)}</h3>
                    <p className="mt-2 text-[13px] leading-7 muted-dt">{pick(body, bodyHi)}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* For those far from home: full-bleed image with an overlaid statement */}
      <section className="relative has-decor-dt">
        <div className="relative h-[560px] sm:h-[640px] w-full overflow-hidden">
          <ParallaxImage
            src="/stories/A puja performed 1,300 km away, but still close to home.png"
            alt={
              hi
                ? "दूरस्थ परिवार लाइव प्रसारण के माध्यम से पूजा में भाग लेता है"
                : "A family taking part in a puja through a live telecast"
            }
            className="h-full w-full"
            strength={18}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950/88 via-ink-950/60 to-ink-950/20" />
          <div className="absolute inset-0 flex items-center">
            <div className="container-dt">
              <div className="max-w-xl">
                <h2 className="display-dt text-[clamp(30px,4.6vw,58px)] text-white">
                  {hi ? "जो घर से दूर हैं" : "For those far from home"}
                </h2>
                <p className="mt-6 text-sm leading-8 text-white/70">
                  {hi
                    ? "दूरी को कभी भी असंबद्धता नहीं बनना चाहिए। आपने शायद लंदन, न्यूयॉर्क, दुबई, सिंगापुर, मेलबर्न या टोरंटो में अपना जीवन बनाया हो। आपका घर कहीं और हो सकता है, पर आपकी परंपराएँ आपके साथ चल सकती हैं।"
                    : "Distance should never have to mean disconnection. You may have built a life in London, New York, Dubai, Singapore, Melbourne or Toronto. Your home may be elsewhere, but your traditions can travel with you."}
                </p>
                <p className="mt-5 text-sm leading-8 text-white/70">
                  {hi
                    ? "नवरात्रि के दौरान, Dharmaa Tribe पवित्र साधना, वेदाचार्य और संकल्प को आपके पास ले आता है, जहाँ भी आप हों।"
                    : "During Navratri, Dharmaa Tribe brings the sacred practice, the Vedacharya and the sankalpa closer to you, wherever you are."}
                </p>
                <p className="display-dt mt-9 text-[clamp(22px,2.6vw,32px)] text-gold-200">
                  {hi
                    ? "आपकी जगह दूर हो सकती है। आपकी प्रार्थना नहीं।"
                    : "Your place may be far away. Your prayer does not have to be."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey: all seven steps visible in a responsive card grid */}
      <section className="site-section surface-2-dt has-decor-dt">
        <SectionDecor />
        <Yantra className="decor-dt decor-tr hide-mobile soft-tone" />
        <div className="container-dt">
          <Reveal>
            <h2 className="display-dt max-w-2xl text-[clamp(30px,4.2vw,52px)]">
              {hi ? "Dharmaa Tribe अनुभव" : "The Dharmaa Tribe experience"}
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {JOURNEY.map((step, i) => (
              <Reveal
                key={step.title}
                delay={i * 0.04}
                className={i === JOURNEY.length - 1 ? "xl:col-start-2" : ""}
              >
                <article className="card-dt group relative flex h-full min-h-[220px] flex-col overflow-hidden p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <span className="display-dt text-5xl leading-none text-gold-600/75">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-dt text-gold-600 transition-colors group-hover:bg-gold-500 group-hover:text-ink">
                      {i < JOURNEY.length - 1 ? <ArrowRight size={15} /> : <Sparkle size={15} />}
                    </span>
                  </div>
                  <h3 className="display-dt mt-7 text-2xl leading-tight">
                    {pick(step.title, step.titleHi)}
                  </h3>
                  <p className="mt-3 text-[12.5px] leading-7 muted-dt">
                    {pick(step.body, step.bodyHi)}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing band */}
      <section className="site-section ink-dt has-decor-dt">
        <SectionDecor />
        <div className="container-dt grid gap-10 lg:grid-cols-[1.2fr_.8fr] items-end">
          <Reveal>
            <div className="display-dt text-[clamp(30px,4.6vw,60px)] text-white">
              {hi
                ? "आपका संकल्प। आपका संकल्प-पाठ। आपका पवित्र अनुभव।"
                : "Your intention. Your sankalpa. Your sacred experience."}
            </div>
            <p className="mt-6 max-w-xl text-sm leading-8 text-white/55">
              {hi
                ? "प्राचीन ज्ञान। प्रामाणिक अभ्यास। व्यक्तिगत संबंध।"
                : "Ancient wisdom. Authentic practice. Personal connection."}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="grid gap-3">
              <Link className="btn-gold-dt w-full" to="/booking/navratri/date">
                {hi ? "नवरात्रि पूजा बुक करें" : "Book Navratri puja"} <ArrowRight size={15} />
              </Link>
              <a
                className="btn-ghost-dt !border-white/20 !bg-white/10 !text-white w-full"
                href={inquiry}
                target="_blank"
                rel="noreferrer"
              >
                {hi ? "वेदाचार्य से पूछें" : "Ask a Vedacharya"} <ArrowUpRight size={14} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
