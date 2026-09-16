import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "@phosphor-icons/react";
import { useLanguage } from "./LanguageToggle";
import { SectionDecor } from "./decor";
import { pujas } from "../../lib/data";
import { buildInquiryHref, buildGayaJiHref } from "../../lib/booking";

/* ------------------------------------------------------------------ *
 * ShraadhContent
 * Renders the cultural essay from website_shradh1.md on the Shraadh
 * puja detail page. Fully bilingual — switch via the language toggle.
 * Layout keeps the existing site aesthetic: large display headlines,
 * muted body copy, soft panels, three-card and seven-step blocks.
 * ------------------------------------------------------------------ */
export default function ShraadhContent() {
  const { lang } = useLanguage();
  const hi = lang === "hi";
  const shraadhPuja = pujas.find((x) => x.id === "shraadh") || pujas[0];
  const vedacharyaHref = buildInquiryHref(shraadhPuja, lang);
  const gayaJiHref = buildGayaJiHref(lang);

  // The copy is intentionally written for cultural warmth, not as
  // a service catalogue entry. Each block is a section of the essay.
  const c = hi
    ? {
        intro1: "कुछ संबंध समाप्त नहीं होते। वे हमारे होने का हिस्सा बन जाते हैं।",
        intro2:
          "हम अपने परिवार से बहुत कुछ विरासत में पाते हैं। एक नाम। एक घर। कहानियाँ। मूल्य। जीवन को देखने का एक तरीका। और कभी-कभी, ऐसी परंपराएँ जिन्हें हम पूरी तरह समझ नहीं पाते। श्राद्ध उनमें से एक है।",
        intro3:
          "सनातन परंपरा में, श्राद्ध उन लोगों को स्मरण और सम्मान देने का एक तरीका है जो हमसे पहले आए — श्रद्धा, कृतज्ञता और स्मरण के साथ। इसलिए नहीं कि हम डरे हुए हैं। बल्कि इसलिए कि हमें याद है।",
        intro4:
          "और आज की दुनिया में, जहाँ परिवार शहरों, देशों और महाद्वीपों में फैले हो सकते हैं, Dharmaa Tribe इस प्राचीन प्रथा को आधुनिक पारिवारिक जीवन में लाता है — बिना इसके अर्थ को खोए।",

        what1: "तो आख़िर श्राद्ध क्या है?",
        what2:
          "श्राद्ध परिवार के दिवंगत सदस्यों को सम्मान देने के लिए किया जाने वाला एक पारंपरिक पितृ अनुष्ठान है। इसमें संकल्प, तर्पण, पिंडदान, मंत्र, प्रार्थना, दान, भोजन, होम और अन्य निर्धारित प्रथाएँ शामिल हो सकती हैं, परिवार की परंपरा और अनुष्ठान की प्रकृति के अनुसार।",
        what3:
          "इसे सामान्यतः पितृ पक्ष के दौरान किया जाता है, और इसे किसी प्रियजन के निधन से जुड़ी प्रासंगिक चान्द्र तिथि पर वार्षिक रूप से भी संपन्न किया जा सकता है।",
        what4: "पर यहाँ एक महत्वपूर्ण बात है:",
        what5: "हर परिवार के लिए एक ही श्राद्ध नहीं होता।",
        what6:
          "आपके क्षेत्र की अपनी प्रथा हो सकती है। आपका परिवार किसी विशेष परंपरा का पालन कर सकता है। आपके वेदाचार्य कोई विशिष्ट विधि बता सकते हैं।",
        what7: "Dharmaa में, हम वहीं से शुरू करते हैं।",
        what8: "पैकेज से नहीं। समझ से।",

        why1: "हम श्राद्ध क्यों करते हैं?",
        why2: "शायद सबसे सरल उत्तर है:",
        why3: "क्योंकि हम यहाँ अकेले नहीं पहुँचे।",
        why4: "हमारे जीवन में वे टुकड़े हैं जो हमसे पहले आए लोगों के हैं। उनके निर्णय। उनके त्याग। उनके मूल्य। उनकी कहानियाँ। उनके संस्कार।",
        why5: "श्राद्ध हमें रुककर उस संबंध को स्वीकार करने का पारंपरिक तरीका देता है। यह स्मरण, कृतज्ञता और अपनी वंशावली के प्रति ज़िम्मेदारी का कार्य है।",
        why6: "श्राद्ध भय के बारे में नहीं है।",
        why7: "यह श्रद्धा के बारे में है।",

        when1: "श्राद्ध कब किया जाना चाहिए?",
        when2: "यहाँ बातें भ्रमित कर सकती हैं।",
        when3: "पितृ पक्ष? वार्षिक श्राद्ध? कौन-सी तिथि? कौन-सा अनुष्ठान? कौन-सा स्थान?",
        when4:
          "और यदि आप विदेश में रहते हैं, तो सवाल और भी बढ़ सकते हैं। श्राद्ध सामान्यतः पितृ से जुड़ी चान्द्र तिथि के अनुसार किया जाता है, न कि केवल अंग्रेज़ी कैलेंडर की तारीख पर।",
        when5: "इसे किया जा सकता है:",
        whenOpt1Title: "पितृ पक्ष के दौरान",
        whenOpt1Body:
          "एक अवधि जो पारंपरिक रूप से पितरों को स्मरण और सम्मान देने के लिए समर्पित है।",
        whenOpt2Title: "वार्षिक श्राद्ध के रूप में",
        whenOpt2Body: "प्रासंगिक तिथि पर वार्षिक अनुष्ठान।",
        whenOpt3Title: "किसी पवित्र तीर्थ पर",
        whenOpt3Body:
          "कुछ पितृ अनुष्ठान पारंपरिक रूप से गया, काशी, हरिद्वार, प्रयागराज, गोकर्ण, पुष्कर और अन्य पवित्र स्थानों से जुड़े हैं।",
        when6: "तिथि नहीं पता?",
        when7: "गोत्र नहीं पता?",
        when8: "नहीं जानते कौन-सा अनुष्ठान उपयुक्त है?",
        when9: "ठीक है।",
        when10: "आपको शुरू करने से पहले सब कुछ जानने की आवश्यकता नहीं है।",
        when11: "इसीलिए वेदाचार्य होते हैं।",

        happens1: "श्राद्ध के दौरान वास्तव में क्या होता है?",
        happens2: "सटीक विधि परंपरा अनुसार बदलती है।",
        happens3: "पर अनुष्ठान अनुसार, आपको ये मिल सकते हैं:",
        h_sankalp_title: "संकल्प",
        h_sankalp_body:
          "अपने संकल्प को शब्दों में रखना — आप किसके लिए और क्यों अनुष्ठान कर रहे हैं।",
        h_tarpan_title: "तर्पण",
        h_tarpan_body: "जल के पारंपरिक अर्पण, अक्सर तिल और निर्धारित मंत्रों के साथ।",
        h_pind_title: "पिंडदान",
        h_pind_body: "विशेष पितृ अनुष्ठान में निर्धारित पिंड अर्पण करना।",
        h_mantra_title: "मंत्र और प्रार्थना",
        h_mantra_body: "पवित्र पाठ और प्रार्थना।",
        h_homa_title: "होम / हवन",
        h_homa_body: "जहाँ निर्धारित हो।",
        h_daan_title: "दान और भोजन",
        h_daan_body: "पारंपरिक अर्पण, दान या भोजन, जैसा निर्धारित हो।",
        happens4: "और अंत में —",
        happens5: "स्मरण।",
        happens6:
          "क्योंकि कभी-कभी किसी अनुष्ठान का सबसे महत्वपूर्ण हिस्सा वह नहीं है जो हम अर्पण करते हैं... बल्कि जिसे हम अर्पण करते समय स्मरण करते हैं।",

        howTitle: "आप Dharmaa के साथ श्राद्ध कैसे कर सकते हैं?",
        howSub: "तीन तरीके। एक भाव।",
        howSub2: "आपका परिवार। आपकी परंपरा। आपके सहभागी होने का तरीका।",
        opt1Num: "01 — स्वयं करें",
        opt1Title: "घर पर। वेदाचार्य के साथ।",
        opt1Body:
          "चाहते हैं कि आपका परिवार वास्तव में भाग ले? घर पर अपना स्थान सजाएँ और एक वेदाचार्य के साथ लाइव जुड़ें। वे आपको निर्धारित विधि से मार्गदर्शन देंगे — संकल्प और तर्पण से लेकर प्रासंगिक अर्पण और प्रार्थनाओं तक।",
        opt1Bold: "आप इसे अनुभव करते हैं। समझते हैं। आगे बढ़ाते हैं।",
        opt1Close:
          "विशेषकर उन परिवारों के लिए जो चाहते हैं कि उनके बच्चे जानें कि उनकी परंपराओं का क्या अर्थ है, यह केवल एक समारोह से कहीं अधिक बन सकता है।",
        opt2Num: "02 — हम आपके लिए करें",
        opt2Title: "जब दूरी भागीदारी कठिन बनाती है।",
        opt2Body:
          "शायद आप विदेश में हैं। शायद यात्रा पर हैं। शायद आपका परिवार स्वयं अनुष्ठान नहीं कर सकता। ऐसे मामलों में, एक योग्य वेदाचार्य आपकी ओर से निर्धारित श्राद्ध किसी पारंपरिक मंदिर या निर्धारित पवित्र स्थान से संपन्न कर सकता है।",
        opt2Bold: "आप सौंपते हैं। वेदाचार्य संपन्न करते हैं।",
        opt2Close: "और आप तकनीक के माध्यम से जुड़े रह सकते हैं — दुनिया में जहाँ भी हों।",
        opt3Num: "03 — गया जी जाएँ",
        opt3Title: "जो यात्रा करना चाहते हैं, उनके लिए।",
        opt3Body:
          "पीढ़ियों से, गया जी पिंडदान और पितृ अनुष्ठानों की परंपरा में विशेष स्थान रखता है। यदि आप गया में श्राद्ध करना चाहते हैं, तो Dharmaa अनुभव को सहज बनाने में सहायता कर सकता है — उपयुक्त अनुष्ठान और तिथि को समझने से लेकर जानकार स्थानीय पुरोहितों से जुड़ने तक।",
        opt3Bold: "आप यात्रा करते हैं। हम परंपरा में सहायता करते हैं।",
        opt3Close:
          "और यदि आप यात्रा नहीं कर सकते? हम परिवार की ओर से अनुष्ठान के लिए उपयुक्त व्यवस्था खोजने में सहायता कर सकते हैं।",

        ifTitle: "अगर मुझे अपने परिवार के अनुष्ठान नहीं पता?",
        if1: "यह शायद सबसे सामान्य सवाल है।",
        if2: "हमारे दादा-दादी जानते थे। फिर हमारे माता-पिता जानते थे। और शहर बदलने, देश बदलने और जीवन में व्यस्त होने के बीच कहीं...",
        if3: "ज्ञान खो गया।",
        if4: "हो सकता है आप अपना गोत्र न जानते हों।",
        if5: "हो सकता है सटीक तिथि याद न हो।",
        if6: "हो सकता है आप न जानते हों कि आपका परिवार पारंपरिक रूप से तर्पण, पिंडदान, होम या किसी अन्य प्रकार का श्राद्ध करता है।",
        if7: "यह विफलता नहीं है।",
        if8: "यह केवल संकेत है कि परंपराओं को पुनः जोड़ना है, न कि त्यागना। Dharmaa आपको एक जानकार वेदाचार्य से बात करने, अपने विकल्पों को समझने और उपयुक्त पारंपरिक कार्यवाही पहचानने में सहायता करता है।",

        pindTitle: "पिंडदान क्या है?",
        pindBody:
          "पिंडदान एक पारंपरिक पितृ अर्पण है जो कई श्राद्ध और तीर्थ अनुष्ठानों का महत्वपूर्ण हिस्सा है। यह विशेष रूप से गया जी से जुड़ा है, जहाँ पितृ अनुष्ठानों की गहरी और दीर्घकालिक तीर्थ यात्रा परंपरा है। सटीक प्रथा और सामग्री अनुष्ठान और परंपरा अनुसार बदल सकती है।",

        tarpanTitle: "तर्पण क्या है?",
        tarpanBody:
          "तर्पण जल का पारंपरिक अर्पण है, अक्सर तिल और निर्धारित मंत्रों के साथ। यह कई पितृ अनुष्ठानों का महत्वपूर्ण हिस्सा है। और जब Dharmaa के साथ घर पर किया जाता है, तो आपके वेदाचार्य केवल यह नहीं बताते कि क्या करना है। वे समझा सकते हैं कि क्यों कर रहे हैं। क्योंकि समझ एक निर्देश को अभ्यास में बदल देती है।",

        varshikTitle: "वार्षिक श्राद्ध क्या है?",
        varshikBody:
          "कुछ स्मृतियाँ कैलेंडर पर जगह की हकदार हैं। वार्षिक श्राद्ध किसी दिवंगत परिवार के सदस्य के स्मरण में किया जाने वाला वार्षिक अनुष्ठान है, सामान्यतः प्रासंगिक चान्द्र तिथि के अनुसार। Dharmaa में, हम परिवारों की सहमति से प्रासंगिक अनुष्ठान जानकारी रखने में सहायता कर सकते हैं, ताकि अगले वर्ष का अनुष्ठान इससे शुरू न हो:",

        tripindiTitle: "और त्रिपिंडी श्राद्ध के बारे में क्या?",
        tripindi1: "शायद आपने यह शब्द सुना हो।",
        tripindi2: "शायद आपने इसके बारे में कई दावे भी सुने हों।",
        tripindi3: "Dharmaa का दृष्टिकोण यह है:",
        tripindi4: "पहले समझें। बाद में निर्णय लें।",
        tripindi5:
          "त्रिपिंडी श्राद्ध एक विशिष्ट पितृ अनुष्ठान परंपरा है जो विशेष परिस्थितियों और प्रथाओं से जुड़ी है। इसे हर परिवार की हर समस्या का समाधान स्वतः नहीं माना जाना चाहिए।",
        tripindi6: "यदि इसे आपके लिए सुझाया गया है, तो एक जानकार वेदाचार्य से बात करें और समझें:",
        tripindiL1: "त्रिपिंडी श्राद्ध वास्तव में क्या है",
        tripindiL2: "क्या यह आपकी परिस्थितियों के लिए प्रासंगिक है",
        tripindiL3: "इसे पारंपरिक रूप से कहाँ संपन्न किया जाता है",
        tripindiL4: "विधि में क्या शामिल है",
        tripindiL5: "क्या तैयारी आवश्यक है",
        tripindiBold: "न भय। न दबाव। केवल सूचित भक्ति।",

        itemsTitle: "श्राद्ध के लिए मुझे क्या चाहिए?",
        items1: "उत्तर इस बात पर निर्भर करता है कि आप कौन-सा श्राद्ध कर रहे हैं।",
        items2: "सामान्य वस्तुओं में शामिल हो सकते हैं:",
        itemsList:
          "तिल • अक्षत • चावल • घी • फूल • धूप • दीप • कलश • जलपात्र • मोली • रोली • चंदन • नैवेद्य • फल • पिंड-संबंधी अर्पण • दान सामग्री • आसन",
        items3: "पर कृपया अभी इस सूची से खरीदारी शुरू न करें।",
        items4: "पहले अनुष्ठान चुनें।",
        items5:
          "फिर Dharmaa आपको एक व्यक्तिगत तैयारी चेकलिस्ट दे सकता है जो बताएगी कि आपको क्या व्यवस्था करनी है और हम क्या व्यवस्था करेंगे।",
        itemsBold: "न अनुमान। न अनावश्यक खरीदारी। केवल जो आपके अनुष्ठान को आवश्यक है।",

        durationTitle: "श्राद्ध में कितना समय लगता है?",
        duration1: "कोई एक सार्वभौमिक उत्तर नहीं है।",
        duration2:
          "अवधि अनुष्ठान, स्थान, अनुष्ठानों की संख्या, भागीदारी और होम या भोजन जैसी अतिरिक्त प्रथाओं पर निर्भर करती है।",
        duration3: "जब आप Dharmaa के साथ बुक करते हैं, तो हम पहले बताएँगे कि क्या अपेक्षा करें।",
        duration4: "क्योंकि आपका समय भी मायने रखता है।",

        needTitle: "Dharmaa को आपसे क्या चाहिए?",
        need1: "कागज़ी कार्रवाई का ढेर नहीं।",
        need2: "केवल वह जानकारी जो हमें अनुष्ठान को व्यक्तिगत और उपयुक्त बनाने में सहायता करे:",
        need3: "आपका नाम",
        need4: "पितृ का नाम",
        need5: "उनसे आपका संबंध",
        need6: "गोत्र — यदि ज्ञात हो",
        need7: "निधन की तिथि / तिथि — यदि ज्ञात हो",
        need8: "आपका स्थान और समय क्षेत्र",
        need9: "पसंदीदा तिथि",
        need10: "आप कैसे भाग लेना चाहते हैं",
        need11: "और यदि कुछ छूट रहा है?",
        need12: "हमें बताएँ।",
        need13: "हम आपको पता लगाने में सहायता करेंगे।",

        journeyTitle: "आपकी श्राद्ध यात्रा",
        j1Title: "बताएँ",
        j1Body: "आपकी पारिवारिक कहानी। आपके पितृ। जो कुछ भी आप जानते हैं।",
        j2Title: "समझें",
        j2Body: "एक वेदाचार्य से जुड़ें और उपयुक्त अनुष्ठान समझें।",
        j3Title: "चुनें",
        j3Body: "घर पर। मंदिर से। या गया जी में।",
        j4Title: "तैयारी",
        j4Body: "अपनी व्यक्तिगत अनुष्ठान और तैयारी गाइड पाएँ।",
        j5Title: "भाग लें",
        j5Body: "लाइव जुड़ें — या वेदाचार्य को आपकी ओर से संपन्न करने दें।",
        j6Title: "प्राप्त करें",
        j6Body:
          "अपने चुने हुए अनुष्ठान अनुसार, रिकॉर्डिंग, तस्वीरें, प्रसाद या डिजिटल प्रलेखन प्राप्त करें।",
        j7Title: "स्मरण",
        j7Body:
          "आपकी सहमति से, भविष्य के अनुष्ठानों के लिए परिवार की अनुष्ठान जानकारी व्यवस्थित रखें।",

        farTitle: "घर से दूर रहने वाले परिवारों के लिए",
        far1: "आप हो सकते हैं:",
        far2: "न्यूयॉर्क। लंदन। दुबई। सिंगापुर। सिडनी।",
        far3: "आपके माता-पिता दिल्ली में हो सकते हैं।",
        far4: "आपके दादा-दादी का घर कहीं और ही हो सकता है।",
        far5: "दूरी ने परिवारों के जीने का तरीका बदल दिया है।",
        far6: "इसका मतलब यह नहीं कि परिवार याद करने का तरीका भी बदल दिया है।",
        far7: "Dharmaa में, तकनीक केवल एक पुल है।",
        far8: "परंपरा पारंपरिक रहती है।",
        far9: "वेदाचार्य केंद्र में रहते हैं।",
        far10: "और आपका परिवार जुड़ा रहता है — दुनिया में जहाँ भी आप हों।",

        whyDharmaaTitle: "क्यों Dharmaa?",
        whyDharmaa1: "क्योंकि हम नहीं सोचते कि श्राद्ध इससे शुरू हो:",
        whyDharmaa2: "“मैं कौन-सा पैकेज ख़रीदूँ?”",
        whyDharmaa3: "इसे इससे शुरू होना चाहिए:",
        whyDharmaa4: "“मेरे परिवार के लिए क्या सही है?”",
        wd_block1_title: "ज्ञान, लेन-देन से पहले।",
        wd_block1_body: "अनुष्ठान को चुनने से पहले समझें।",
        wd_block2_title: "सुविधा से पहले परंपरा।",
        wd_block2_body: "तकनीक परंपरा की सेवा करे — उसे प्रतिस्थापित नहीं।",
        wd_block3_title: "पैकेज से अधिक व्यक्तिगतकरण।",
        wd_block3_body: "आपके पितृ। आपका परिवार। आपकी परंपरा।",
        wd_block4_title: "अनुमान से अधिक मार्गदर्शन।",
        wd_block4_body: "तिथि, गोत्र या विधि के बारे में अनिश्चित? वेदाचार्य से बात करें।",
        wd_block5_title: "भ्रम के बिना विकल्प।",
        wd_block5_body: "घर पर। मंदिर से। गया जी में।",

        closing1: "श्राद्ध भय के बारे में नहीं है।",
        closing2: "यह श्रद्धा के बारे में है।",
        closing3: "यह उन लोगों को याद करने के बारे में है जिनका जीवन हमारा हिस्सा बन गया।",
        closing4: "यह हमें जो दिया गया, उसके लिए कृतज्ञता के बारे में है।",
        closing5: "यह अपनी वंशावली का सम्मान करने के बारे में है।",
        closing6: "और शायद, सबसे महत्वपूर्ण —",
        closing7: "यह सुनिश्चित करना कि बदलती दुनिया हमें यह न भुला दे कि हम कहाँ से आए।",

        qaTitle: "प्रश्न: Dharmaa Tribe श्राद्ध कैसे संपन्न कराता है?",
        qaAns:
          "Dharmaa Tribe का मानना है कि श्राद्ध ऐसी विधि से संपन्न होना चाहिए जो परिवार की परंपरा के अनुरूप हो, परिवार के लिए सहज और व्यावहारिक हो, तथा विद्वान वेदाचार्यों के मार्गदर्शन में संपन्न हो।",
        qaIntro:
          "परिवार की आवश्यकता और अनुष्ठान की प्रकृति के अनुसार Dharmaa, श्राद्ध के लिए तीन प्रकार के विकल्प उपलब्ध करा सकता है:",
        qaOpt1Title: "1. घर पर श्राद्ध — वेदाचार्य के मार्गदर्शन में",
        qaOpt1Body:
          "परिवार अपने घर पर निर्धारित श्राद्ध-विधि स्वयं कर सकता है, जबकि एक योग्य वेदाचार्य उन्हें लाइव, चरण-दर-चरण संकल्प, तर्पण तथा अन्य आवश्यक विधियों का मार्गदर्शन प्रदान करते हैं।",
        qaOpt2Title: "2. वेदाचार्य द्वारा आपकी ओर से श्राद्ध",
        qaOpt2Body:
          "यदि परिवार स्वयं श्राद्ध-विधि संपन्न करने में सक्षम या उपलब्ध नहीं है, तो हमारे वेदाचार्य आपकी ओर से निर्धारित श्राद्ध-विधि किसी पारंपरिक मंदिर अथवा निर्धारित पवित्र स्थान पर संपन्न कर सकते हैं। इसमें परिवार के नाम, गोत्र और संकल्प को विधिवत शामिल किया जाता है।",
        qaOpt3Title: "3. गया जी में श्राद्ध",
        qaOpt3Body:
          "जो परिवार गया जी में पिंडदान एवं श्राद्ध करना चाहते हैं, उनके लिए Dharmaa अनुभवी स्थानीय पुरोहितों के माध्यम से पूरी प्रक्रिया को सुगम बनाने में सहायता कर सकता है। उचित श्राद्ध-विधि, तिथि, संकल्प और आवश्यक व्यवस्थाओं के संबंध में मार्गदर्शन दिया जाता है — ताकि दूर देश या दूर शहर में रहने वाले परिवार भी इस महत्वपूर्ण परंपरा को श्रद्धा और उचित विधि के साथ निभा सकें।",
        qaDiffTitle: "Dharmaa का अंतर",
        qaDiffBody:
          "आप चुनते हैं कि आप किस प्रकार सहभागी बनना चाहते हैं। हम आपको यह समझने में सहायता करते हैं कि आपके लिए क्या उचित है। हमारे वेदाचार्य यह सुनिश्चित करने में मार्गदर्शन देते हैं कि अनुष्ठान आवश्यक विधि और श्रद्धा के साथ संपन्न हो।",
        qaDiffBold:
          "घर पर। मंदिर से। या गया जी में। तरीके अलग हो सकते हैं — भाव और संबंध वही रहते हैं।",

        ctaTitle: "इस पवित्र बंधन को निभाएँ",
        ctaBody: "घर पर, मंदिर से, या गया जी में। एक ही भाव को निभाने के तीन तरीके।",
        ctaBtn1: "वेदाचार्य से बात करें",
        ctaBtn2: "श्राद्ध देखें",
        ctaBtn3: "गया जी अनुभव योजना",
        ctaTrust: "प्राचीन ज्ञान। सार्थक अभ्यास। संबंधित होने का आधुनिक तरीका।",
      }
    : {
        intro1: "Some bonds don't end. They become part of who we are.",
        intro2:
          "We inherit many things from our families. A name. A home. Stories. Values. A way of looking at life. And sometimes, traditions we may not fully understand anymore.",
        intro3:
          "Shradh is one of them. In the Sanatan tradition, Shradh is a way of remembering and honouring those who came before us — with śraddhā, gratitude and remembrance. Not because we are afraid. Because we remember.",
        intro4:
          "And in today's world, where families can be spread across cities, countries and continents, Dharmaa Tribe brings this ancient practice into modern family life — without losing its meaning.",

        what1: "So, what exactly is Shradh?",
        what2:
          "Shradh is a traditional ancestral observance performed to honour departed family members. It may involve Sankalp, Tarpan, Pind Daan, Mantra, Prarthana, Daan, Bhojan, Homa and other prescribed practices, depending on the family tradition and the nature of the ritual.",
        what3:
          "It is commonly observed during Pitru Paksha, and can also be performed annually on the relevant lunar Tithi associated with a loved one's passing.",
        what4: "But here's something important:",
        what5: "There isn't one Shradh that fits every family.",
        what6:
          "Your region may have its own practice. Your family may follow a particular tradition. Your Vedacharya may prescribe a specific Vidhi.",
        what7: "At Dharmaa, we begin there.",
        what8: "Not with a package. With understanding.",

        why1: "Why do we perform Shradh?",
        why2: "Perhaps the simplest answer is:",
        why3: "Because we didn't get here alone.",
        why4: "Our lives carry pieces of those who came before us. Their choices. Their sacrifices. Their values. Their stories. Their saṁskāra.",
        why5: "Shradh gives us a traditional way to pause and acknowledge that connection. It is an act of remembrance, gratitude and responsibility towards our lineage.",
        why6: "Shradh is not about fear.",
        why7: "It is about śraddhā.",

        when1: "When should Shradh be performed?",
        when2: "This is where things can get confusing.",
        when3: "Pitru Paksha? Annual Shradh? Which Tithi? Which ritual? Which place?",
        when4:
          "And if you're living abroad, the questions can multiply. Shradh is generally performed according to the lunar Tithi associated with the ancestor, rather than simply the date on the English calendar.",
        when5: "It may be observed:",
        whenOpt1Title: "During Pitru Paksha",
        whenOpt1Body: "A period traditionally dedicated to remembering and honouring ancestors.",
        whenOpt2Title: "As Varshik Shradh",
        whenOpt2Body: "An annual observance on the relevant Tithi.",
        whenOpt3Title: "At a Sacred Tirtha",
        whenOpt3Body:
          "Certain ancestral rites are traditionally associated with places such as Gaya, Varanasi, Haridwar, Prayagraj, Gokarna, Pushkar and other sacred locations.",
        when6: "Don't know the Tithi?",
        when7: "Don't know the Gotra?",
        when8: "Not sure which ritual is appropriate?",
        when9: "That's okay.",
        when10: "You don't need to know everything before you begin.",
        when11: "That's what a Vedacharya is for.",

        happens1: "What actually happens during Shradh?",
        happens2: "The exact Vidhi varies according to tradition.",
        happens3: "But depending on the ritual, you may encounter:",
        h_sankalp_title: "Sankalp",
        h_sankalp_body:
          "Putting your intention into words — who you are performing the ritual for and why.",
        h_tarpan_title: "Tarpan",
        h_tarpan_body: "Traditional offerings of water, often with sesame and prescribed mantras.",
        h_pind_title: "Pind Daan",
        h_pind_body: "Offering Pindas as prescribed in the particular ancestral ritual.",
        h_mantra_title: "Mantra & Prarthana",
        h_mantra_body: "Sacred recitation and prayer.",
        h_homa_title: "Homa / Havan",
        h_homa_body: "Where prescribed.",
        h_daan_title: "Daan & Bhojan",
        h_daan_body: "Traditional offerings, charity or feeding, as prescribed.",
        happens4: "And finally—",
        happens5: "Remembering.",
        happens6:
          "Because sometimes the most important part of a ritual is not what we offer... but whom we remember while offering it.",

        howTitle: "How can you perform Shradh with Dharmaa?",
        howSub: "Three ways. One intention.",
        howSub2: "Your family. Your tradition. Your way of participating.",
        opt1Num: "01 — DO IT YOURSELF",
        opt1Title: "At Home. With a Vedacharya beside you.",
        opt1Body:
          "Want your family to actually participate? Set up your space at home and join a Vedacharya live. They guide you through the prescribed Vidhi — from Sankalp and Tarpan to the relevant offerings and prayers. You don't simply watch a ritual happening somewhere else.",
        opt1Bold: "You experience it. You understand it. You pass it on.",
        opt1Close:
          "Especially for families who want their children to know what their traditions mean, this can become much more than a ceremony.",
        opt2Num: "02 — LET US DO IT FOR YOU",
        opt2Title: "When distance makes participation difficult.",
        opt2Body:
          "Maybe you're overseas. Maybe you're travelling. Maybe your family simply cannot perform the ritual themselves. In such cases, a qualified Vedacharya can perform the prescribed Shradh on your behalf from a traditional temple or designated sacred location. Your relevant family details, ancestor information, Gotra and Sankalp are incorporated as appropriate.",
        opt2Bold: "You entrust. The Vedacharya performs.",
        opt2Close:
          "And you can remain connected through technology — wherever you are in the world.",
        opt3Num: "03 — GO TO GAYA JI",
        opt3Title: "For those who want to take the journey.",
        opt3Body:
          "For generations, Gaya Ji has held a special place in the tradition of Pind Daan and ancestral rites. If you wish to perform Shradh at Gaya, Dharmaa can help you navigate the experience — from understanding the appropriate ritual and Tithi to connecting with knowledgeable local priests and coordinating the required arrangements. Because pilgrimage shouldn't mean figuring everything out yourself.",
        opt3Bold: "You make the journey. We help you navigate the tradition.",
        opt3Close:
          "And if you can't make the journey? We can help you explore appropriate arrangements for the ritual to be performed on your behalf.",

        ifTitle: "What if I don't know my family's rituals?",
        if1: "This may actually be the most common question of all.",
        if2: "Our grandparents knew. Then our parents knew. And somewhere between moving cities, moving countries and simply getting busy with life...",
        if3: "the knowledge got lost.",
        if4: "You may not know your Gotra.",
        if5: "You may not remember the exact Tithi.",
        if6: "You may not know whether your family traditionally performs Tarpan, Pind Daan, Homa or another form of Shradh.",
        if7: "That's not a failure.",
        if8: "It is simply a sign that traditions need to be reconnected, not abandoned. Dharmaa helps you speak to a knowledgeable Vedacharya, understand your options and identify the appropriate traditional course of action.",

        pindTitle: "What is Pind Daan?",
        pindBody:
          "Pind Daan is a traditional ancestral offering that forms an important part of several Shradh and Tirtha rituals. It is particularly associated with Gaya Ji, where ancestral rites have a deep and longstanding pilgrimage tradition. The exact practice and ingredients can vary according to the ritual and tradition being followed.",

        tarpanTitle: "What is Tarpan?",
        tarpanBody:
          "Tarpan is a traditional offering of water, often accompanied by sesame and prescribed mantras. It forms an important part of many ancestral observances. And when performed at home with Dharmaa, your Vedacharya doesn't just tell you what to do. They can explain why you're doing it. Because understanding transforms an instruction into a practice.",

        varshikTitle: "What is Varshik Shradh?",
        varshikBody:
          "Some memories deserve a place on the calendar. Varshik Shradh is the annual observance performed in remembrance of a departed family member, generally according to the relevant lunar Tithi. At Dharmaa, we can help families keep track of the relevant ritual information, with their permission, so that next year's observance doesn't begin with:",

        tripindiTitle: "And what about Tripindi Shradh?",
        tripindi1: "You may have heard the term.",
        tripindi2: "You may also have heard many claims about it.",
        tripindi3: "Here's the Dharmaa approach:",
        tripindi4: "Understand first. Decide later.",
        tripindi5:
          "Tripindi Shradh is a specific ancestral ritual tradition associated with particular circumstances and practices. It should not automatically be presented as a solution to every problem in a family.",
        tripindi6:
          "If it has been recommended to you, speak to a knowledgeable Vedacharya to understand:",
        tripindiL1: "What Tripindi Shradh actually is",
        tripindiL2: "Whether it is relevant to your circumstances",
        tripindiL3: "Where it is traditionally performed",
        tripindiL4: "What the Vidhi involves",
        tripindiL5: "What preparation is required",
        tripindiBold: "No fear. No pressure. Just informed devotion.",

        itemsTitle: "What do I need for Shradh?",
        items1: "The answer depends on which Shradh you're performing.",
        items2: "Common items may include:",
        itemsList:
          "Til • Akshat • Chawal • Ghee • Flowers • Dhoop • Deep • Kalash • Jalpatra • Moli • Roli • Chandan • Naivedya • Fruits • Pind-related offerings • Daan Samagri • Asana",
        items3: "But please don't start shopping from this list just yet.",
        items4: "First choose the ritual.",
        items5:
          "Then Dharmaa can give you a personalised preparation checklist telling you exactly what you need to arrange and what we will arrange for you.",
        itemsBold: "No guesswork. No unnecessary shopping. Just what your ritual requires.",

        durationTitle: "How long does Shradh take?",
        duration1: "There isn't one universal answer.",
        duration2:
          "The duration depends on the ritual, location, number of rites, participation and additional practices such as Homa or Bhojan.",
        duration3: "When you book with Dharmaa, we'll tell you what to expect beforehand.",
        duration4: "Because your time matters too.",

        needTitle: "What does Dharmaa need from you?",
        need1: "Not a mountain of paperwork.",
        need2: "Just the information that helps us make the ritual personal and appropriate:",
        need3: "Your name",
        need4: "Ancestor's name",
        need5: "Your relationship with them",
        need6: "Gotra — if known",
        need7: "Date / Tithi of passing — if known",
        need8: "Your location & time zone",
        need9: "Preferred date",
        need10: "How you'd like to participate",
        need11: "And if something is missing?",
        need12: "Tell us.",
        need13: "We'll help you figure it out.",

        journeyTitle: "Your Shradh Journey",
        j1Title: "TELL US",
        j1Body: "Your family story. Your ancestor. Whatever you know.",
        j2Title: "UNDERSTAND",
        j2Body: "Connect with a Vedacharya and understand the appropriate ritual.",
        j3Title: "CHOOSE",
        j3Body: "At home. From a temple. Or at Gaya Ji.",
        j4Title: "PREPARE",
        j4Body: "Receive your personalised ritual and preparation guide.",
        j5Title: "PARTICIPATE",
        j5Body: "Join live — or let the Vedacharya perform on your behalf.",
        j6Title: "RECEIVE",
        j6Body:
          "Depending on your chosen offering, receive recordings, photographs, Prasad or digital documentation.",
        j7Title: "REMEMBER",
        j7Body:
          "With your permission, keep your family's ritual details organised for future observances.",

        farTitle: "For Families Who Live Far From Home",
        far1: "You could be in:",
        far2: "New York. London. Dubai. Singapore. Sydney.",
        far3: "Your parents could be in Delhi.",
        far4: "Your grandparents' home could be somewhere else entirely.",
        far5: "Distance has changed how families live.",
        far6: "It doesn't have to change how families remember.",
        far7: "At Dharmaa, technology is simply the bridge.",
        far8: "The tradition stays traditional.",
        far9: "The Vedacharya stays at the centre.",
        far10: "And your family gets to remain connected — wherever in the world you happen to be.",

        whyDharmaaTitle: "Why Dharmaa?",
        whyDharmaa1: "Because we don't think Shradh should begin with:",
        whyDharmaa2: "“Which package do I buy?”",
        whyDharmaa3: "It should begin with:",
        whyDharmaa4: "“What is right for my family?”",
        wd_block1_title: "Knowledge before transaction.",
        wd_block1_body: "Understand the ritual before choosing it.",
        wd_block2_title: "Tradition before convenience.",
        wd_block2_body: "Technology should serve the tradition — not replace it.",
        wd_block3_title: "Personalisation over packages.",
        wd_block3_body: "Your ancestor. Your family. Your tradition.",
        wd_block4_title: "Guidance over guesswork.",
        wd_block4_body: "Not sure about Tithi, Gotra or Vidhi? Talk to a Vedacharya.",
        wd_block5_title: "Choice without confusion.",
        wd_block5_body: "At home. From a temple. At Gaya Ji.",

        closing1: "Shradh isn't about fear.",
        closing2: "It is about śraddhā.",
        closing3: "It is about remembering the people whose lives became part of ours.",
        closing4: "It is about gratitude for what was given to us.",
        closing5: "It is about honouring our lineage.",
        closing6: "And perhaps, most importantly—",
        closing7: "making sure that a changing world doesn't make us forget where we came from.",

        qaTitle: "Question: How does Dharmaa Tribe conduct Shradh?",
        qaAns:
          "At Dharmaa Tribe, we believe Shradh should be performed in a way that is authentic to the family's tradition, practical for the family, and guided by knowledgeable Vedacharyas.",
        qaIntro:
          "Depending on the family's needs and the nature of the ritual, Dharmaa can offer three ways to observe Shradh:",
        qaOpt1Title: "1. Perform it at Home — with Vedacharya Guidance",
        qaOpt1Body:
          "Families can perform the prescribed rituals themselves at home, while a qualified Vedacharya guides them live, step-by-step, through the Sankalp, Tarpan and other required vidhi.",
        qaOpt2Title: "2. Let the Vedacharya Perform it on Your Behalf",
        qaOpt2Body:
          "If the family cannot perform the ritual themselves, our Vedacharyas can conduct the prescribed Shradh on their behalf from a traditional temple or designated sacred location, with the family's names, Gotra and Sankalp incorporated into the ritual.",
        qaOpt3Title: "3. Perform Shradh at Gaya Ji",
        qaOpt3Body:
          "For families who wish to undertake Pind Daan and Shradh at Gaya Ji, Dharmaa can facilitate the process with knowledgeable local priests, helping with the appropriate ritual, Tithi, Sankalp and arrangements — so that even families living far away can meaningfully fulfil this important tradition.",
        qaDiffTitle: "The Dharmaa difference",
        qaDiffBody:
          "You choose how you participate. We help you understand what is appropriate. Our Vedacharyas help ensure that the ritual is performed with the required vidhi and śraddhā.",
        qaDiffBold:
          "At home. From a temple. Or at Gaya Ji. Different ways to honour the same bond.",

        ctaTitle: "Honour this sacred bond",
        ctaBody: "At home. From a temple. At Gaya Ji. Three ways to honour the same bond.",
        ctaBtn1: "Speak to a Vedacharya",
        ctaBtn2: "Explore Shradh",
        ctaBtn3: "Plan Your Gaya Ji Experience",
        ctaTrust: "Ancient wisdom. Meaningful practice. A modern way to belong.",
      };

  const ritualSteps = [
    [c.h_sankalp_title, c.h_sankalp_body],
    [c.h_tarpan_title, c.h_tarpan_body],
    [c.h_pind_title, c.h_pind_body],
    [c.h_mantra_title, c.h_mantra_body],
    [c.h_homa_title, c.h_homa_body],
    [c.h_daan_title, c.h_daan_body],
  ];

  const options = [
    { num: c.opt1Num, title: c.opt1Title, body: c.opt1Body, bold: c.opt1Bold, close: c.opt1Close },
    { num: c.opt2Num, title: c.opt2Title, body: c.opt2Body, bold: c.opt2Bold, close: c.opt2Close },
    { num: c.opt3Num, title: c.opt3Title, body: c.opt3Body, bold: c.opt3Bold, close: c.opt3Close },
  ];

  const journey = [
    ["01", c.j1Title, c.j1Body],
    ["02", c.j2Title, c.j2Body],
    ["03", c.j3Title, c.j3Body],
    ["04", c.j4Title, c.j4Body],
    ["05", c.j5Title, c.j5Body],
    ["06", c.j6Title, c.j6Body],
    ["07", c.j7Title, c.j7Body],
  ];

  const wdBlocks = [
    [c.wd_block1_title, c.wd_block1_body],
    [c.wd_block2_title, c.wd_block2_body],
    [c.wd_block3_title, c.wd_block3_body],
    [c.wd_block4_title, c.wd_block4_body],
    [c.wd_block5_title, c.wd_block5_body],
  ];

  const needItems = [c.need3, c.need4, c.need5, c.need6, c.need7, c.need8, c.need9, c.need10];

  const tripindiList = [c.tripindiL1, c.tripindiL2, c.tripindiL3, c.tripindiL4, c.tripindiL5];

  return (
    <section className="site-section has-decor-dt shraadh-page-dt">
      <SectionDecor />
      <div className="container-dt py-12">
        {/* Intro */}
        <div className="shraadh-section-dt">
          <h2 className="display-dt text-5xl sm:text-6xl">{c.intro1}</h2>
          <div className="shraadh-section-body-dt mt-6">
            <p>{c.intro2}</p>
            <p>{c.intro3}</p>
            <p>{c.intro4}</p>
          </div>
        </div>

        {/* What is */}
        <div className="shraadh-section-dt">
          <span className="shraadh-section-num-dt">{hi ? "अनुष्ठान" : "The ritual"}</span>
          <h3 className="shraadh-section-title-dt">{c.what1}</h3>
          <div className="shraadh-section-body-dt">
            <p>{c.what2}</p>
            <p>{c.what3}</p>
            <p>
              <strong>{c.what4}</strong> {c.what5}
            </p>
            <p>{c.what6}</p>
            <p>
              <em>{c.what7}</em> {c.what8}
            </p>
          </div>
        </div>

        {/* Why */}
        <div className="shraadh-section-dt">
          <h3 className="shraadh-section-title-dt">{c.why1}</h3>
          <div className="shraadh-section-body-dt">
            <p>
              {c.why2} <strong>{c.why3}</strong>
            </p>
            <p>{c.why4}</p>
            <p>{c.why5}</p>
            <p>{c.why6}</p>
            <p>
              <strong>{c.why7}</strong>
            </p>
          </div>
        </div>

        {/* When */}
        <div className="shraadh-section-dt">
          <h3 className="shraadh-section-title-dt">{c.when1}</h3>
          <div className="shraadh-section-body-dt">
            <p>
              {c.when2} {c.when3}
            </p>
            <p>{c.when4}</p>
            <p>
              <strong>{c.when5}</strong>
            </p>
          </div>
          <div className="shraadh-three-grid-dt">
            <div className="shraadh-card-dt">
              <span className="shraadh-card-num-dt">{hi ? "पितृ पक्ष" : "Pitru Paksha"}</span>
              <div className="shraadh-card-title-dt">{c.whenOpt1Title}</div>
              <div className="shraadh-card-body-dt">{c.whenOpt1Body}</div>
            </div>
            <div className="shraadh-card-dt">
              <span className="shraadh-card-num-dt">{hi ? "वार्षिक" : "Varshik"}</span>
              <div className="shraadh-card-title-dt">{c.whenOpt2Title}</div>
              <div className="shraadh-card-body-dt">{c.whenOpt2Body}</div>
            </div>
            <div className="shraadh-card-dt">
              <span className="shraadh-card-num-dt">{hi ? "तीर्थ" : "Tirtha"}</span>
              <div className="shraadh-card-title-dt">{c.whenOpt3Title}</div>
              <div className="shraadh-card-body-dt">{c.whenOpt3Body}</div>
            </div>
          </div>
          <div className="shraadh-section-body-dt mt-6">
            <p>
              <strong>{c.when6}</strong> {c.when7} {c.when8}
            </p>
            <p>
              <em>{c.when9}</em> {c.when10}
            </p>
            <p>{c.when11}</p>
          </div>
        </div>

        {/* What happens */}
        <div className="shraadh-section-dt">
          <h3 className="shraadh-section-title-dt">{c.happens1}</h3>
          <div className="shraadh-section-body-dt">
            <p>
              {c.happens2} {c.happens3}
            </p>
          </div>
          <div className="shraadh-three-grid-dt">
            {ritualSteps.map(([title, body]) => (
              <div key={title} className="shraadh-card-dt">
                <div className="shraadh-card-title-dt">{title}</div>
                <div className="shraadh-card-body-dt">{body}</div>
              </div>
            ))}
          </div>
          <div className="shraadh-section-body-dt mt-6">
            <p>
              {c.happens4} <strong>{c.happens5}</strong>
            </p>
            <p>{c.happens6}</p>
          </div>
        </div>

        {/* How — three ways */}
        <div className="shraadh-section-dt">
          <h3 className="shraadh-section-title-dt">{c.howTitle}</h3>
          <div className="shraadh-section-body-dt">
            <p>
              {c.howSub} {c.howSub2}
            </p>
          </div>
          <div className="shraadh-three-grid-dt">
            {options.map((o) => (
              <div key={o.num} className="shraadh-card-dt">
                <span className="shraadh-card-num-dt">{o.num}</span>
                <div className="shraadh-card-title-dt">{o.title}</div>
                <div className="shraadh-card-body-dt">
                  <p style={{ marginBottom: 8 }}>{o.body}</p>
                  <p style={{ fontWeight: 700, color: "var(--gold-600, #b88a2a)" }}>{o.bold}</p>
                  <p style={{ marginTop: 8 }}>{o.close}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* If you don't know */}
        <div className="shraadh-section-dt">
          <h3 className="shraadh-section-title-dt">{c.ifTitle}</h3>
          <div className="shraadh-section-body-dt">
            <p>{c.if1}</p>
            <p>
              {c.if2} <em>{c.if3}</em>
            </p>
            <p>
              {c.if4} {c.if5} {c.if6}
            </p>
            <p>
              <strong>{c.if7}</strong>
            </p>
            <p>{c.if8}</p>
          </div>
        </div>

        {/* Pind Daan */}
        <div className="shraadh-section-dt">
          <h3 className="shraadh-section-title-dt">{c.pindTitle}</h3>
          <div className="shraadh-section-body-dt">
            <p>{c.pindBody}</p>
          </div>
        </div>

        {/* Tarpan */}
        <div className="shraadh-section-dt">
          <h3 className="shraadh-section-title-dt">{c.tarpanTitle}</h3>
          <div className="shraadh-section-body-dt">
            <p>{c.tarpanBody}</p>
          </div>
        </div>

        {/* Varshik */}
        <div className="shraadh-section-dt">
          <h3 className="shraadh-section-title-dt">{c.varshikTitle}</h3>
          <div className="shraadh-section-body-dt">
            <p>{c.varshikBody}</p>
            <blockquote
              style={{
                borderLeft: "3px solid var(--gold-600, #b88a2a)",
                paddingLeft: 16,
                fontStyle: "italic",
                marginTop: 10,
                color: "var(--muted, rgba(10,9,6,0.7))",
              }}
            >
              {hi
                ? "“किसी को याद है दादाजी का श्राद्ध कब है?”"
                : "“Does anyone remember when Dadaji's Shradh is?”"}
            </blockquote>
          </div>
        </div>

        {/* Tripindi */}
        <div className="shraadh-section-dt">
          <h3 className="shraadh-section-title-dt">{c.tripindiTitle}</h3>
          <div className="shraadh-section-body-dt">
            <p>
              {c.tripindi1} {c.tripindi2}
            </p>
            <p>
              <strong>{c.tripindi3}</strong> <em>{c.tripindi4}</em>
            </p>
            <p>{c.tripindi5}</p>
            <p>{c.tripindi6}</p>
            <ul style={{ listStyle: "disc", paddingLeft: 22, marginTop: 8 }}>
              {tripindiList.map((x) => (
                <li key={x} style={{ marginBottom: 4 }}>
                  {x}
                </li>
              ))}
            </ul>
            <p style={{ marginTop: 12, fontWeight: 700, color: "var(--gold-600, #b88a2a)" }}>
              {c.tripindiBold}
            </p>
          </div>
        </div>

        {/* Items */}
        <div className="shraadh-section-dt">
          <h3 className="shraadh-section-title-dt">{c.itemsTitle}</h3>
          <div className="shraadh-section-body-dt">
            <p>
              {c.items1} {c.items2}
            </p>
            <p
              style={{
                background: "var(--surface-2, rgba(255,250,240,0.6))",
                padding: "12px 16px",
                borderRadius: 10,
                fontSize: 13,
                lineHeight: 1.9,
              }}
            >
              {c.itemsList}
            </p>
            <p>
              {c.items3} <strong>{c.items4}</strong>
            </p>
            <p>{c.items5}</p>
            <p style={{ fontWeight: 700, color: "var(--gold-600, #b88a2a)" }}>{c.itemsBold}</p>
          </div>
        </div>

        {/* Duration */}
        <div className="shraadh-section-dt">
          <h3 className="shraadh-section-title-dt">{c.durationTitle}</h3>
          <div className="shraadh-section-body-dt">
            <p>{c.duration1}</p>
            <p>{c.duration2}</p>
            <p>{c.duration3}</p>
            <p>
              <strong>{c.duration4}</strong>
            </p>
          </div>
        </div>

        {/* Need from you */}
        <div className="shraadh-section-dt">
          <h3 className="shraadh-section-title-dt">{c.needTitle}</h3>
          <div className="shraadh-section-body-dt">
            <p>
              {c.need1} {c.need2}
            </p>
            <ul style={{ listStyle: "disc", paddingLeft: 22, marginTop: 8 }}>
              {needItems.map((x) => (
                <li key={x} style={{ marginBottom: 4 }}>
                  {x}
                </li>
              ))}
            </ul>
            <p style={{ marginTop: 12 }}>
              {c.need11} <strong>{c.need12}</strong>
            </p>
            <p>{c.need13}</p>
          </div>
        </div>

        {/* Journey */}
        <div className="shraadh-section-dt">
          <h3 className="shraadh-section-title-dt">{c.journeyTitle}</h3>
          <div className="shraadh-journey-dt">
            {journey.map(([n, title, body]) => (
              <div key={n} className="shraadh-journey-item-dt">
                <span className="shraadh-journey-num-dt">{n}</span>
                <div>
                  <div className="shraadh-journey-title-dt">{title}</div>
                  <div className="shraadh-journey-body-dt">{body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Families far from home */}
        <div className="shraadh-section-dt">
          <h3 className="shraadh-section-title-dt">{c.farTitle}</h3>
          <div className="shraadh-section-body-dt">
            <p>
              {c.far1} <strong>{c.far2}</strong>
            </p>
            <p>
              {c.far3} {c.far4}
            </p>
            <p>{c.far5}</p>
            <p>
              <strong>{c.far6}</strong>
            </p>
            <p>{c.far7}</p>
            <p>{c.far8}</p>
            <p>{c.far9}</p>
            <p>{c.far10}</p>
          </div>
        </div>

        {/* Why Dharmaa */}
        <div className="shraadh-section-dt">
          <h3 className="shraadh-section-title-dt">{c.whyDharmaaTitle}</h3>
          <div className="shraadh-section-body-dt">
            <p>
              {c.whyDharmaa1} <em>{c.whyDharmaa2}</em>
            </p>
            <p>
              {c.whyDharmaa3} <strong>{c.whyDharmaa4}</strong>
            </p>
          </div>
          <div className="shraadh-three-grid-dt">
            {wdBlocks.map(([title, body]) => (
              <div key={title} className="shraadh-card-dt">
                <div className="shraadh-card-title-dt">{title}</div>
                <div className="shraadh-card-body-dt">{body}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Q&A */}
        <div className="shraadh-section-dt">
          <div className="shraadh-qa-dt">
            <h3 className="shraadh-qa-q-dt">{c.qaTitle}</h3>
            <div className="shraadh-qa-block-body-dt">
              <p style={{ marginBottom: 12 }}>{c.qaAns}</p>
              <p>{c.qaIntro}</p>
            </div>
            <div className="shraadh-three-grid-dt" style={{ marginTop: 16 }}>
              <div className="shraadh-card-dt">
                <div className="shraadh-card-title-dt">{c.qaOpt1Title}</div>
                <div className="shraadh-card-body-dt">{c.qaOpt1Body}</div>
              </div>
              <div className="shraadh-card-dt">
                <div className="shraadh-card-title-dt">{c.qaOpt2Title}</div>
                <div className="shraadh-card-body-dt">{c.qaOpt2Body}</div>
              </div>
              <div className="shraadh-card-dt">
                <div className="shraadh-card-title-dt">{c.qaOpt3Title}</div>
                <div className="shraadh-card-body-dt">{c.qaOpt3Body}</div>
              </div>
            </div>
            <div style={{ marginTop: 22 }}>
              <div className="shraadh-qa-block-title-dt">{c.qaDiffTitle}</div>
              <div className="shraadh-qa-block-body-dt">{c.qaDiffBody}</div>
              <p style={{ marginTop: 12, fontWeight: 700, color: "var(--gold-600, #b88a2a)" }}>
                {c.qaDiffBold}
              </p>
            </div>
          </div>
        </div>

        {/* Closing */}
        <div className="shraadh-section-dt">
          <div className="shraadh-section-body-dt">
            <p>{c.closing1}</p>
            <p>
              <strong>{c.closing2}</strong>
            </p>
            <p>{c.closing3}</p>
            <p>{c.closing4}</p>
            <p>{c.closing5}</p>
            <p>{c.closing6}</p>
            <p style={{ fontStyle: "italic", marginTop: 6 }}>{c.closing7}</p>
          </div>
        </div>

        {/* CTA band */}
        <div className="shraadh-cta-band-dt">
          <div className="shraadh-cta-title-dt">{c.ctaTitle}</div>
          <div className="shraadh-cta-body-dt">
            {c.ctaBody}
            <br />
            <em>{c.ctaTrust}</em>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={vedacharyaHref}
              target="_blank"
              rel="noreferrer"
              className="btn-gold-dt"
            >
              {c.ctaBtn1} <ArrowUpRight size={14} />
            </a>
            <Link className="btn-ghost-dt" to="/booking/shraadh/date">
              {c.ctaBtn2} <ArrowUpRight size={14} />
            </Link>
            <a
              href={gayaJiHref}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost-dt"
            >
              {c.ctaBtn3} <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
