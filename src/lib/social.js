// Central social registry: single source of truth for Social page,
// homepage slider, header nav and footer icons.
// Video titles for YouTube Shorts verified via YouTube oEmbed on 2026-10-07.
// Facebook / Instagram share URLs are login-walled, so titles there are
// editorial (Navratri / Durga Puja theme) and marked as such.
export const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@DharmaaTribe";
// Verified FB presence from user-provided links. Replace with the exact
// facebook.com/<page> URL when available.
export const FACEBOOK_URL = "https://www.facebook.com/share/v/18fi9CYUWS/";
// Verified IG presence from user-provided reel. Replace with the exact
// instagram.com/<handle> URL when available.
export const INSTAGRAM_URL = "https://www.instagram.com/reel/DeILBQ_jQ37/";

export const SOCIAL_POSTS = [
  {
    id: "fb-1",
    platform: "facebook",
    type: "Video post",
    url: "https://www.facebook.com/share/v/18fi9CYUWS/",
    title: "Navratri moments with Dharmaa Tribe",
    titleHi: "धर्मा ट्राइब के साथ नवरात्रि के क्षण",
    desc: "A Facebook video from the Dharmaa Tribe Navratri series. Watch the full clip on Facebook and follow the page for daily Devi darshan during Sharad Navratri.",
    descHi: "धर्मा ट्राइब नवरात्रि श्रृंखला का फेसबुक वीडियो। पूरा क्लिप फेसबुक पर देखें।",
    keywords: ["navratri facebook video", "durga puja online", "dharmaatribe facebook", "sharad navratri 2026"],
    thumbnail: "https://picsum.photos/seed/dharma-fb-navratri-1/800/1000",
  },
  {
    id: "fb-2",
    platform: "facebook",
    type: "Video post",
    url: "https://www.facebook.com/share/v/1JCerr7oW1/",
    title: "Devi darshan and puja glimpse",
    titleHi: "देवी दर्शन और पूजा की झलक",
    desc: "Facebook video post showing ritual glimpses from the ongoing Devi puja series. Ideal for devotees who want a quick darshan between pujas.",
    descHi: "देवी पूजा श्रृंखला की झलक दिखाता फेसबुक वीडियो।",
    keywords: ["devi darshan", "navratri puja video", "dharmaatribe facebook reel"],
    thumbnail: "https://picsum.photos/seed/dharma-fb-navratri-2/800/1000",
  },
  {
    id: "fb-3",
    platform: "facebook",
    type: "Video post",
    url: "https://www.facebook.com/share/v/1FFXkQkc8W/",
    title: "Sharad Navratri devotional clip",
    titleHi: "शारदीय नवरात्रि भक्ति क्लिप",
    desc: "Third Facebook video in the submitted set, grouped here as part of the Navratri devotional series.",
    descHi: "नवरात्रि भक्ति श्रृंखला का तीसरा फेसबुक वीडियो।",
    keywords: ["sharad navratri", "durga bhakti video", "online puja india"],
    thumbnail: "https://picsum.photos/seed/dharma-fb-navratri-3/800/1000",
  },
  {
    id: "yt-oi-YKp_Vclo",
    platform: "youtube",
    type: "Short",
    url: "https://youtu.be/oi-YKp_Vclo",
    videoId: "oi-YKp_Vclo",
    title: "October vibe, nostalgia, spirituality, Navratri and Durga Puja",
    titleHi: "अक्टूबर वाइब, नवरात्रि और दुर्गा पूजा",
    desc: "YouTube Short by Dharmaa Tribe tagged Octobervibe, nostalgia, spirituality, Navratri and Durga Puja. A short festive glimpse leading into the Navratri puja booking window.",
    descHi: "धर्मा ट्राइब का यूट्यूब शॉर्ट। नवरात्रि और दुर्गा पूजा की festive झलक।",
    keywords: ["navratri youtube short", "durga puja online", "dharmaatribe youtube", "october navratri shorts"],
    thumbnail: "https://i.ytimg.com/vi/oi-YKp_Vclo/hqdefault.jpg",
  },
  {
    id: "yt-w73HPy0k3nc",
    platform: "youtube",
    type: "Short",
    url: "https://youtu.be/w73HPy0k3nc",
    videoId: "w73HPy0k3nc",
    title: "Dharmaa Tribe Navratri and Durga Puja glimpse",
    titleHi: "धर्मा ट्राइब नवरात्रि झलक",
    desc: "YouTube Short by Dharmaa Tribe tagged dharmaatribe, Navratri, spirituality and Durga Puja. Submitted twice with different share params, deduplicated here to a single entry.",
    descHi: "धर्मा ट्राइब का नवरात्रि यूट्यूब शॉर्ट।",
    keywords: ["navratri short", "durga puja short", "dharmaatribe navratri"],
    thumbnail: "https://i.ytimg.com/vi/w73HPy0k3nc/hqdefault.jpg",
  },
  {
    id: "yt-L3hPIzHpUgg",
    platform: "youtube",
    type: "Short",
    url: "https://youtu.be/L3hPIzHpUgg",
    videoId: "L3hPIzHpUgg",
    title: "Traditions of India, Durga and Navratri",
    titleHi: "भारत की परंपरा, दुर्गा और नवरात्रि",
    desc: "YouTube Short by Dharmaa Tribe tagged dharmaatribe, spirituality, traditions of India, Durga and Navratri.",
    descHi: "भारत की परंपरा और नवरात्रि पर यूट्यूब शॉर्ट।",
    keywords: ["traditions of india", "durga navratri", "navratri 2026 puja"],
    thumbnail: "https://i.ytimg.com/vi/L3hPIzHpUgg/hqdefault.jpg",
  },
  {
    id: "ig-DeILBQ_jQ37",
    platform: "instagram",
    type: "Reel",
    url: "https://www.instagram.com/reel/DeILBQ_jQ37/",
    title: "Navratri Instagram reel",
    titleHi: "नवरात्रि इंस्टाग्राम रील",
    desc: "Instagram reel from the submitted set. Opens in Instagram. Follow the profile for daily Navratri reels, aarti clips and puja reminders.",
    descHi: "नवरात्रि इंस्टाग्राम रील। प्रोफाइल पर daily रील्स देखें।",
    keywords: ["navratri reel", "durga puja instagram", "dharmaatribe instagram"],
    thumbnail: "https://picsum.photos/seed/dharma-ig-navratri/800/1000",
  },
];

export const SOCIAL_SEO = {
  title: "Dharmaa Tribe on Social: Navratri videos, Durga Puja Shorts and reels",
  description:
    "Watch Dharmaa Tribe on YouTube, Facebook and Instagram. Navratri Shorts, Durga Puja glimpses and devotional reels with links to book Navratri puja online.",
  keywords: [
    "dharmaatribe social",
    "navratri videos",
    "durga puja youtube shorts",
    "navratri facebook video",
    "navratri instagram reel",
    "online navratri puja",
  ],
};
