# DharmaTribe — Client Feedback Document

**Live site (review here): https://dharmatribe.netlify.app/**

Points to cover (as shared):

- check all pages and section thoroughly suggest changes and sectons to keep and remove etc,
- provide images for all sections
- check all headings in english and hindi
- whatsapp number for booking and inquiry
- provide content for puja and their details

> How to review: open the link above, toggle **EN / हि** from the header on every
> page, and check each section below. Reply with **Keep / Change / Remove**
> against each numbered item, plus replacement text, photos, and numbers where
> asked.

---

## 1. WhatsApp numbers — booking vs inquiry (confirm this number)

All WhatsApp buttons across the site use **one centralized number**:

| Purpose | Number | Message sent |
|---|---|---|
| Puja booking (payment step → “Complete booking on WhatsApp”) | **911234567890** | Full booking summary: puja code, puja name (EN+Hindi), deity, temple, date, muhurat, package + price, add-ons, devotee name, gotra, purpose, family members, total amount |
| Per-puja inquiry (“Ask on WhatsApp” on every puja detail page) | **911234567890** | Short message naming that exact puja: puja name (EN+Hindi), puja code, temple |
| Shraadh → “Speak to a Vedacharya” | **911234567890** | Shraadh-specific inquiry (code PUJA-009, temple) |
| Shraadh → “Plan Your Gaya Ji Experience” | **911234567890** | Dedicated Gaya Ji message (place: Gaya Ji, asks for Tithi/Vidhi guidance) |
| Floating WhatsApp bubble (all pages) | **911234567890** | Generic: “Namaste DharmaTribe, I need help with a puja booking.” |
| Footer → “WhatsApp support” | **911234567890** (chat open, no pre-filled text) | — |

**Client action:** confirm **911234567890** is the correct business number. If booking
and general inquiry should go to *different* numbers, tell us which is which.

---

## 2. Home page (`/`) — section-by-section review

Order on the page today:

### 2.1 Hero (top banner)
- Eyebrow: “Ganesh Chaturthi · September 12” / “गणेश चतुर्थी · 12 सितंबर”
- Heading: “Sacred rituals. Modern access.” / “पवित्र अनुष्ठान। आधुनिक सुविधा।”
- Slide 2: “Let devotion travel with you.” / “अपनी भक्ति को साथ ले जाएँ।”
- Buttons: “Explore Pujas” / “Watch Video”
- Trust strip: Authentic Rituals · Trusted Priests · Live Video · Family Sankalp
- **Images (REPLACE):** hero photos are random `picsum.photos` placeholders
  (`seed/dharma-varanasi-sunset`, `seed/dharma-temple-diya`) — they are **not real
  Varanasi/temple photos**. Please approve real hero photography.
- Suggestion: **Keep.** Confirm festival + date in eyebrow.

### 2.2 Assurance strip (4 items)
“Dates and muhurat · Photos and video · Clear booking · Family participation”
- Suggestion: **Keep** — short and useful.

### 2.3 Festival countdown (“On the horizon” / “नज़दीक है”)
Heading: “The next festival is closer than you think.”
- Suggestion: **Keep** if the countdown date is maintained; otherwise it will show a stale festival. Confirm which festival/date drives it.

### 2.4 “The dates people are booking” / “लोग इन तिथियों के लिए बुक कर रहे हैं”
- Shows first 6 pujas, **Shraadh is card #1** (as requested).
- Suggestion: **Keep.**

### 2.5 Festival name marquee (scrolling band, dark strip)
- Suggestion: **Optional** — decorative only. Keep / Remove?

### 2.6 “The calendar keeps moving” / “कैलेंडर चलता रहता है” (4 festival cards)
- Ganesh Chaturthi (Sep 12) · Navratri (Oct 11) · Diwali (Oct 20) · Mahashivratri (Feb 15)
- Images: Unsplash generic (see image table §6). Confirm festival list and dates.
- Suggestion: **Keep**, replace photos with real ones if available.

### 2.7 “The people who carry the tradition.” / “परंपरा को आगे बढ़ाने वाले लोग।” (Acharya slider)
- Compact cards: photo + name + tradition tag + place/expertise/lineage/experience (no bio, no phone — full details live on `/acharyas`). Clicking a card opens `/acharyas`.
- Suggestion: **Keep.**

### 2.8 “What are you here to mark?” (intention list)
- 10 English-only intentions: Peace & protection, Health & well-being, Wealth & prosperity, Marriage & family, Career & success, Education, New beginnings, Ancestral peace, Spiritual growth, Dosha & remedy.
- ⚠️ **Not translated** — shows English in Hindi mode too. Give Hindi lines or confirm English-only.
- Suggestion: **Keep** once translated.

### 2.9 “A ritual journey with no hidden steps” (Choose → Submit → Receive)
- Suggestion: **Keep** — explains the process well.

### 2.10 Trust band (“See what matters…”, devotee quote, stats 50+ / 200+ / 4.9)
- ⚠️ Stats are explicitly **sample data** (“sample temple partners”, “sample rating”). Replace with real numbers or remove.
- Suggestion: **Change** (real numbers + real testimonial).

### 2.11 Stories preview (“Stories, in the shape of a real journal”)
- Suggestion: **Keep** — confirm the 6 featured stories are the ones you want.

### 2.12 “The wider DharmaTribe feed” (Instagram / YouTube / Facebook / WhatsApp cards)
- ⚠️ Cards link to `"#"` (dead links). Either connect real channels or remove.
- Suggestion: **Remove** until real social channels exist.

### 2.13 “Keep one intention going.” (Monthly Sankalp / Tithi Seva / Aarti / Annual Path)
- ⚠️ Copy itself says “Phase 3 … not part of this launch”. Risks confusing users.
- Suggestion: **Remove** for launch (re-add with Phase 3).

### 2.14 “A temple network” (Varanasi / Ayodhya / Somnath)
- ⚠️ Placeholder copy (“future temple detail route…”). Confirm only if these are real partner temples.
- Suggestion: **Remove** unless partnerships are confirmed.

### 2.15 Newsletter (“Know what is coming next.”, email + Join)
- ⚠️ Email submit currently does nothing visible (demo). Connect it or remove.
- Suggestion: **Change** (connect) or **Remove**.

---

## 3. Pujas page (`/pujas`)

- Title: “Find the puja that fits the moment.” / “क्षण के अनुरूप पूजा खोजें।”
- Filters: deity (translated: शिव, विष्णु, कृष्ण, गणेश, लक्ष्मी, दुर्गा, हनुमान, काली, नवग्रह, पितृ), purpose (**English only** — same fix as §2.8), tags, search, sort.
- Catalogue (9 pujas, Shraadh first):

| Code | Puja (EN / HI) | Deity | Temple | Price |
|---|---|---|---|---|
| PUJA-009 | Shraadh / श्राद्ध | Pitru | At Home · Temple · Gaya Ji | ₹2,100 |
| PUJA-001 | Maha Rudrabhishek / महा रुद्राभिषेक | Shiva | Kashi Vishwanath | ₹1,100 |
| PUJA-002 | Ganesh Vighnaharta Puja / गणेश विघ्नहर्ता पूजा | Ganesh | Ujjain Mahakaleshwar | ₹851 |
| PUJA-003 | Mahalakshmi Dhan Akarshan / महालक्ष्मी धन आकर्षण | Lakshmi | Lotus Temple Seva | ₹1,251 |
| PUJA-004 | Sankat Mochan Hanuman Seva / संकट मोचन हनुमान सेवा | Hanuman | Ayodhya Ram Janmabhoomi | ₹951 |
| PUJA-005 | Satyanarayan Katha / सत्यनारायण कथा | Vishnu | Badrinath Seva Mandal | ₹1,001 |
| PUJA-006 | Navagraha Shanti Homam / नवग्रह शांति होमम | Navagraha | Kanchipuram Seva | ₹1,501 |
| PUJA-007 | Durga Saptashati Path / दुर्गा सप्तशती पाठ | Durga | Kolkata Shakti Peeth Seva | ₹1,701 |
| PUJA-008 | Mahamrityunjaya Jaap / महामृत्युंजय जाप | Shiva | Somnath Temple Seva | ₹1,401 |

- ⚠️ Temple names are English-only (no Hindi). Give Hindi temple names or confirm English-only.
- ⚠️ Some puja photos repeat (Shraadh = Satyanarayan photo; Maha Rudrabhishek = one story photo). See §6.
- **Client action:** confirm puja list, prices, temples, and which photo belongs to which puja.

### Content needed per puja (please provide for each of the 9 pujas, EN + HI)

- Short description (1–2 lines, like the card text)
- Duration (e.g. 1–2 hours) and auspicious days/timings
- What is included (priest, samagri, video, prasad)
- What the devotee must arrange/keep ready
- 4 FAQs with answers (for “Questions devotees ask”)
- 2–3 photos of the actual ritual/temple

---

## 4. Puja detail page (`/pujas/:id`) + Shraadh essay (`/pujas/shraadh`)

- Sections: hero (date/time/temple/code) → About → booking widget (price breakup) → “What you receive” → Vidhi & Sankalp → gallery → “Questions devotees ask” FAQ → Book / Ask-on-WhatsApp buttons.
- Shraadh page adds the long bilingual essay (full-width, same width as other sections).
- FAQ expands full-width when opened (as requested).
- **Client action:** review Shraadh essay text in both languages; review the 4 FAQs; confirm price breakup ratios.

---

## 5. Acharyas page (`/acharyas`)

- Title: “The people who carry the tradition forward.” / “परंपरा को आगे बढ़ाने वाले लोग।”
- Filter chips by tradition (translated).
- Full cards: tradition tag below name + place, expertise, lineage, experience, **phone**, bio.

| Acharya | Tradition (EN / HI) | Photo |
|---|---|---|
| Amit Diwedy | Numerology & Palmistry / अंक ज्योतिष और हस्तरेखा | Local `/amitdiwedi.jpg` ✅ |
| Mohit Sharma | Vedic Astrology & Palmistry / वैदिक ज्योतिष और हस्तरेखा | Local `/mohitsharma.jpg` ✅ |
| Chandra Shekhar Samavedula | Graphology · Numerology · Astrology / ग्राफोलॉजी · अंकज्योतिष · ज्योतिष | Local `/chandrashekhar.jpg` ✅ |

- **Client action:** confirm bios, phone numbers shown publicly (+91 99587 28666, +91 98682 38906, +91 99582 53666), and photo consent.

---

## 6. Images — master list (approve / replace)

| Used in | Image |
|---|---|
| Home hero (2 slides) | `https://picsum.photos/seed/dharma-varanasi-sunset/2000/1250`, `https://picsum.photos/seed/dharma-temple-diya/2000/1250` ⚠️ random placeholders — replace |
| Shraadh / Satyanarayan | `https://images.unsplash.com/photo-1604608672516-f1b9c7f84d1c?auto=format&fit=crop&w=1500&q=86` ⚠️ same photo twice |
| Maha Rudrabhishek / Mahashivratri card | `https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1500&q=86` (also reused in stories/Auth) |
| Ganesh puja | `https://images.unsplash.com/photo-1567591414240-e6c5a9e0a0c4?auto=format&fit=crop&w=1500&q=86` |
| Lakshmi / Diwali | `https://images.unsplash.com/photo-1603561596112-0a132b5a965a?auto=format&fit=crop&w=1500&q=86` |
| Hanuman | `https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=1500&q=86` |
| Navagraha | `https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1500&q=86` |
| Durga | `https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1500&q=86` |
| Mahamrityunjaya | `https://images.unsplash.com/photo-1532968961962-8a0e2b6fc5f6?auto=format&fit=crop&w=1500&q=86` |
| Festivals (Ganesh/Navratri/Diwali/Mahashivratri) | `photo-1579439302394-975be7b3f46c`, `photo-1565355528125-2b3c38b7f45f`, `photo-1603561596112-0a132b5a965a`, `photo-1548013146-72479768bada` (all `w=1200&q=84`) |
| Stories (8 articles) | Unsplash IDs `1604608672516-f1b9c7f84d1c`, `1582555172866-f73bb12a2ab3`, `1604848533913-24d40c8054b9`, `1529070538774-1843cb3265df`, `1579439302394-975be7b3f46c`, `1548013146-72479768bada`, `1602774891309-b8c7b6d9b8a8`, `1524499982521-1ffd58dd89ea` (all `w=1400&q=84`) |
| Acharyas | Local files in `public/` (real photos ✅) |
| Social feed cards | Reuse of puja Unsplash photos (`w=1000&q=84`) |
| About gallery / Auth side art | Reuse of puja Unsplash photos |

**Client action:** which sections get real photography? Minimum recommended: hero (2), 9 puja cards, 3 acharyas (done ✅).

---

## 7. Other pages — quick review

| Page | Route | Status / action |
|---|---|---|
| Stories | `/stories` | Keep. ⚠️ Category filter chips are English-only; confirm Hindi categories. |
| Story article | `/stories/:id` | Keep. Article body is placeholder text — real articles needed. |
| About | `/about` | Keep. Stats 50+/200+/4.9 are sample — replace. |
| Booking flow | `/booking/:id/date → package → sankalp → payment → confirmation` | Keep. Test a full booking; confirm package prices (Individual ₹1,100 / Couple ₹1,650 / Family ₹2,100) and add-ons. |
| Tracking | `/booking/tracking` | ⚠️ Demo data (booking DT-702450912). Needs real backend or “demo” label. |
| My bookings | `/bookings` | ⚠️ Demo list, English-only. Same as above. |
| My account | `/dashboard` | Keep. Wishlist (saved hearts) lives here. |
| Login/Register | `/auth/*` | Demo only — confirm real auth scope. |
| Terms/Privacy | `/terms`, `/privacy` | Placeholder sections — legal text needed. |
| Decor preview | `/decor` | Internal design page, linked in mobile menu — suggest hiding before launch. |
| Header search | Expanding pill (desktop), overlay (mobile) | Live search across pujas/stories/acharyas; results popup currently disabled (code kept). Confirm this behavior. |
| Wishlist hearts | All puja cards + detail + header icon with count | Saved locally on device. Confirm red-heart style. |
| Hindi font | Arya (Google Fonts) applied to all Hindi text | Confirm you like the Arya look. |

---

## 8. Key headings EN / HI — proofread list

| # | English | Hindi (as shown) |
|---|---|---|
| 1 | Sacred rituals. Modern access. | पवित्र अनुष्ठान। आधुनिक सुविधा। |
| 2 | Let devotion travel with you. | अपनी भक्ति को साथ ले जाएँ। |
| 3 | The dates people are booking | लोग इन तिथियों के लिए बुक कर रहे हैं |
| 4 | The calendar keeps moving | कैलेंडर चलता रहता है |
| 5 | The people who carry the tradition. | परंपरा को आगे बढ़ाने वाले लोग। |
| 6 | What are you here to mark? | आप किस उद्देश्य से आए हैं? |
| 7 | A ritual journey with no hidden steps | एक अनुष्ठान यात्रा, बिना कोई छिपा हुआ चरण |
| 8 | Find the puja that fits the moment. | क्षण के अनुरूप पूजा खोजें। |
| 9 | Questions devotees ask | भक्तों के सवाल |
| 10 | The people who carry the tradition forward. | परंपरा को आगे बढ़ाने वाले लोग। |
| 11 | Stories that give the ritual some context. | कथाएँ जो अनुष्ठान को संदर्भ देती हैं। |
| 12 | Ancient rituals, clearer access. | प्राचीन अनुष्ठान, स्पष्ट पहुँच। |
| 13 | Browse by deity | देवता अनुसार देखें |
| 14 | How booking works | बुकिंग कैसे काम करती है |
| 15 | Book a puja | पूजा बुक करें |

**Client action:** proofread the Hindi column; also flag tone (formal vs warm) if anything feels off.

---

> **Note:** for now the wishlist only works locally and saved on browser only.
