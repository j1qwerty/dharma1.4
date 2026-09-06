# DharmaTribe - Phased implementation scope

## 1. Scope objective

This document converts the DharmaTribe website specification into a phased implementation plan.

The implementation is split into three phases:

1. **Phase 1 - Core website, booking and customer experience**
2. **Phase 2 - CMS for Phase 1 pages and content**
3. **Phase 3 - Remaining website pages and product areas**

The original page and section specification remains the source reference for the detailed content and section requirements.

---

# 2. Phase 1 - Core website, booking and customer experience

Phase 1 covers the pages required to establish the main DharmaTribe customer journey from discovery through booking, payment, confirmation, tracking and account access.

## 2.1 Pages to create

### 1. Home

Source specification: **Page 2 - Home Page**

The home page should establish the DharmaTribe proposition, showcase upcoming and evergreen pujas, surface festivals and temples, communicate trust, display testimonials and provide clear paths into the puja catalog and booking flow.

The homepage also needs the content rotation model described in the original specification so festival-specific, seasonal, evergreen and recurring content can change without changing the overall page structure.

### 2. Puja Catalog / Explore Pujas

Source specification: **Page 3 - Puja Catalog / Explore Pujas Page**

The catalog should support discovery through search, festival, deity, purpose, puja type, temple and other filters, with sorting, results, empty states and pagination/load-more behavior.

### 3. Puja Details

Source specification: **Page 10 - Puja Detail Page**

The puja detail page should provide the complete information required to make a booking decision, including date, muhurat, availability, pricing, packages, add-ons, Sankalp information, priest and temple details, participation options, video/photo delivery, prasad, reviews and FAQs.

### 4. Complete booking flow

The complete booking journey includes source pages **11 through 16**:

- **Page 11** - Booking Flow: Date / Slot
- **Page 12** - Booking Flow: Package & Add-Ons
- **Page 13** - Booking Flow: Sankalp Details
- **Page 14** - Booking Flow: Delivery / Prasad
- **Page 15** - Booking Flow: Review & Payment
- **Page 16** - Booking Confirmation

These pages together form the full customer conversion flow from selecting a date and package through payment and booking confirmation.

### 5. Customer dashboard and order tracking

Phase 1 includes source pages **17 through 19**:

- **Page 17** - Booking Tracking / Booking Detail Page
- **Page 18** - My Account / Dashboard
- **Page 19** - My Bookings Page

These pages cover booking status, the puja lifecycle, upcoming bookings, completed bookings, videos, photos, prasad tracking, notifications, saved information and booking management.

### 6. Testimonials

Testimonials are included as part of the customer-facing experience, primarily through the **Devotee Stories / Testimonials** section defined on the Home page.

The implementation should support testimonial content such as:

- Review
- Name
- Location
- Date / occasion
- Puja booked
- Optional photo / video
- Rating

### 7. Stories listing and story details

Source specification: **Pages 25 and 26**

- **Page 25** - Stories / Blog Listing Page
- **Page 26** - Story / Blog Detail Page

The story experience should support featured stories, categories, search, filters, article content, media, related pujas, related temples, related stories, sharing and newsletter CTAs.

### 8. About DharmaTribe

Source specification: **Page 28 - About DharmaTribe Page**

The page should cover the DharmaTribe story, mission, vision, values, approach to tradition, priest and temple network, ritual authenticity, technology and tradition, community, trust statistics and leadership/team information where applicable.

### 8b. Our Acharyas

A dedicated page listing the scholars and practitioners behind every ritual.

The page should communicate that DharmaTribe is built around people who understand that ritual is not performance. It is knowledge, discipline, pronunciation, procedure, intention and responsibility. The growing network should introduce each acharya with their learning, tradition, place of practice and areas of expertise clearly presented.

Page content:

- Hero with the "Our Acharyas" proposition: "The people who carry the tradition forward."
- Intro copy explaining ritual as knowledge, discipline, pronunciation, procedure, intention and responsibility.
- A tradition/place-of-learning/approach meta strip (Tradition: Vedic / Sanatan, Place of learning: Kashi & beyond, Approach: Knowledge · Discipline · Authenticity).
- The acharya network grid: cards for each acharya with photo, name, tradition badge, place of learning, expertise, lineage, experience and a short bio.
- A tradition filter to narrow the network (All, Vedic / Sanatan, Pancharatra Agama, Smarta, Devi Upasana).
- A closing trio of principle cards: Tradition, Discipline, Authenticity.

Home page preview: a dynamic horizontal slider of acharya cards on the home page, linking into the full Acharyas page.

### 9. Legal pages required in Phase 1

Phase 1 includes the following legal pages from **Page 36 - Legal Pages**:

- **Terms & Conditions**
- **Privacy Policy**

Only these two legal pages are part of Phase 1. The remaining legal pages move to Phase 3.

### 10. Authentication pages

Source specification: **Page 35 - Authentication Pages**

Phase 1 includes:

- Login
- Registration
- OTP / Verification

These pages support customer account creation, login and the account/dashboard experience.

---

## 2.2 Phase 1 customer journey

The primary Phase 1 journey is:

**Home -> Puja Catalog -> Puja Detail -> Booking -> Payment -> Confirmation -> Booking Tracking -> My Account / My Bookings**

Stories, testimonials, About and the required legal/authentication pages support the main customer journey and brand trust.

---

## 2.3 Phase 1 implementation priorities

The Phase 1 implementation should prioritize:

1. Responsive customer-facing pages
2. Consistent navigation and global layout
3. Puja discovery and detail experience
4. End-to-end booking flow
5. Customer account and booking tracking
6. Authentication
7. Testimonials and story content
8. About and legal content
9. Reusable components for cards, sections, forms, booking summaries, timelines and content blocks
10. Data structures that can later be connected to the CMS in Phase 2

---

# 3. Phase 2 - CMS for Phase 1

Phase 2 introduces the CMS required to manage the content used by the Phase 1 customer-facing pages.

The CMS should be designed around the dynamic content models already identified in the source specification, rather than treating pages as static documents.

## 3.1 CMS scope

### Puja management

The CMS should support the Phase 1 puja catalog and puja detail experience, including:

- Create / edit / archive puja
- Puja descriptions and sections
- Categories and tags
- Deity
- Temple
- Priest
- Dates / slots
- Muhurat
- Packages
- Add-ons
- Pricing
- Availability
- Media
- FAQs
- Related content
- Festival / seasonal associations
- Evergreen / date-specific / recurring classification

### Booking configuration

The CMS/admin layer should support the information required by the Phase 1 booking flow, including:

- Available dates
- Slots / muhurat
- Packages
- Add-ons
- Prasad options
- Delivery configuration
- Pricing and fees
- Booking windows
- Booking lifecycle status configuration

### Customer and order operations

The administrative layer should support:

- Customers
- Bookings
- Booking details
- Sankalp details
- Payment status
- Booking status
- Video / photo delivery status
- Prasad and shipping status
- Cancellation / reschedule information
- Support information

### Home page content management

The CMS should allow the Phase 1 home page to be managed without changing code for routine content updates, including:

- Announcement bar
- Festival / event hero content
- Upcoming pujas
- Featured pujas
- Festival content
- Temple highlights
- Trust content
- Testimonials
- Featured stories
- Social content
- Newsletter content
- Homepage priority / ordering

The existing homepage visual structure should remain stable while CMS-managed content changes over time.

### Stories / blog CMS

The CMS should support:

- Stories
- Categories
- Authors
- Featured stories
- Story media
- Related pujas
- Related temples
- SEO metadata
- Publishing state
- Publication date

### About and legal content

The CMS should support controlled editing of the About page and the Phase 1 legal pages where appropriate.

Legal content should include publishing/version control so changes can be tracked safely.

### Testimonials

The CMS should support:

- Review text
- Customer name
- Location
- Puja booked
- Occasion
- Rating
- Optional photo / video
- Featured / hidden state
- Display order

### User/content roles

The administrative system should support role-based access for relevant content and operational users, with the final permission model defined during implementation.

---

## 3.2 Phase 2 CMS goal

After Phase 2, the Phase 1 site should no longer depend on hard-coded page content for normal operational updates.

A non-developer admin should be able to manage pujas, booking-related content, testimonials, stories, homepage content and related customer-facing data through the CMS/admin interface.

---

# 4. Phase 3 - Remaining pages and product areas

Phase 3 contains the remaining pages from the original DharmaTribe specification that are not required for the initial Phase 1 launch.

## 4.1 Discovery and devotional content

- **Page 4** - Festival Calendar
- **Page 5** - Festival Detail
- **Page 6** - Deity Listing
- **Page 7** - Deity Detail
- **Page 8** - Temple Listing
- **Page 9** - Temple Detail
- **Page 21** - Subscription / Year-Long Services Listing
- **Page 22** - Subscription Detail
- **Page 23** - Subscription Management
- **Page 24** - Find My Puja

## 4.2 Additional customer/content pages

- **Page 20** - My Blessings / Puja Archive
- **Page 27** - How It Works
- **Page 29** - Community / Social
- **Page 30** - FAQ / Help Center
- **Page 31** - Contact Us
- **Page 32** - Support / Devotee Care
- **Page 33** - Search Results
- **Page 34** - Notifications / Alerts

## 4.3 Remaining legal pages

The following legal pages move to Phase 3:

- Refund & Cancellation Policy
- Shipping & Prasad Policy
- Disclaimer
- Cookie Policy

## 4.4 Utility and error pages

The following move to Phase 3:

- 404 Page
- 500 / Service Error
- Empty state variants and related utility states

---

# 5. Scope mapping from the original report

| Source page | Page / area | Phase |
|---|---|---|
| 2 | Home | Phase 1 |
| 3 | Puja Catalog / Explore Pujas | Phase 1 |
| 10 | Puja Detail | Phase 1 |
| 11 | Booking - Date / Slot | Phase 1 |
| 12 | Booking - Package & Add-Ons | Phase 1 |
| 13 | Booking - Sankalp Details | Phase 1 |
| 14 | Booking - Delivery / Prasad | Phase 1 |
| 15 | Booking - Review & Payment | Phase 1 |
| 16 | Booking Confirmation | Phase 1 |
| 17 | Booking Tracking / Booking Detail | Phase 1 |
| 18 | My Account / Dashboard | Phase 1 |
| 19 | My Bookings | Phase 1 |
| 25 | Stories / Blog Listing | Phase 1 |
| 26 | Story / Blog Detail | Phase 1 |
| 28 | About DharmaTribe | Phase 1 |
| 35 | Authentication | Phase 1 |
| 36 | Terms & Conditions | Phase 1 |
| 36 | Privacy Policy | Phase 1 |
| 4 | Festival Calendar | Phase 3 |
| 5 | Festival Detail | Phase 3 |
| 6 | Deity Listing | Phase 3 |
| 7 | Deity Detail | Phase 3 |
| 8 | Temple Listing | Phase 3 |
| 9 | Temple Detail | Phase 3 |
| 20 | My Blessings / Puja Archive | Phase 3 |
| 21 | Subscription / Year-Long Services Listing | Phase 3 |
| 22 | Subscription Detail | Phase 3 |
| 23 | Subscription Management | Phase 3 |
| 24 | Find My Puja | Phase 3 |
| 27 | How It Works | Phase 3 |
| 29 | Community / Social | Phase 3 |
| 30 | FAQ / Help Center | Phase 3 |
| 31 | Contact Us | Phase 3 |
| 32 | Support / Devotee Care | Phase 3 |
| 33 | Search Results | Phase 3 |
| 34 | Notifications / Alerts | Phase 3 |
| 36 | Refund & Cancellation Policy | Phase 3 |
| 36 | Shipping & Prasad Policy | Phase 3 |
| 36 | Disclaimer | Phase 3 |
| 36 | Cookie Policy | Phase 3 |
| 37 | Error / Utility Pages | Phase 3 |

---

# 6. Cross-phase architecture requirements

Even though the implementation is phased, the Phase 1 architecture should leave room for Phase 2 and Phase 3.

The following should be built as reusable foundations:

- Global header and footer
- Navigation and mobile navigation
- Announcement / festival bar
- Buttons and CTAs
- Cards and content grids
- Puja cards
- Temple and deity cards
- Festival badges
- Pricing and package components
- Booking progress indicator
- Booking summary
- Form fields and validation patterns
- Sankalp forms
- Order / booking status timeline
- Customer account shell
- Testimonial components
- Story cards and article layout
- Media galleries
- FAQ components
- Toasts, alerts and notifications
- Empty states
- Loading and error states
- Responsive layout primitives
- SEO and metadata foundations
- CMS-ready content models

---

# 7. Phase completion definition

## Phase 1 completion

Phase 1 is complete when all listed Phase 1 pages are implemented as a coherent customer journey, including authentication, booking, payment, confirmation, booking tracking and account access, with responsive layouts and reusable components.

## Phase 2 completion

Phase 2 is complete when the Phase 1 pages are connected to a CMS/admin layer that allows the required puja, booking configuration, homepage, testimonial, story, About and related content to be managed without routine code changes.

## Phase 3 completion

Phase 3 is complete when the remaining discovery, devotional, subscription, support, search, notification, legal and utility pages from the original specification are implemented and integrated with the common platform foundations.

---

# 8. Original source reference

This phased scope is derived from the DharmaTribe website prototype specification, which defines the global site structure, detailed page sections, booking lifecycle, homepage content rotation model and CMS concepts. The source report identifies the core conversion pages, discovery pages, content/brand pages, support/utility pages and legal/account utilities. fileciteturn0file0L1270-L1321

The detailed Home, Puja Catalog, Puja Detail, booking flow, customer account, Stories, About, Authentication and Legal requirements referenced above are defined in the source report. fileciteturn0file0L34-L200

---

---

# Appendix A - Detailed source specification

The following section retains the original detailed DharmaTribe page and section specification for implementation reference. The phase assignments above determine delivery order.

# Appendix A - Detailed DharmaTribe Website Prototype Page & Section Specification

## A.1 Global Site Structure

### Primary Navigation
- Home
- Pujas
- Festivals & Occasions
- Temples
- Deities
- Year-Long & Subscriptions
- Stories
- How It Works
- Find My Puja
- Search
- Language: English / Hindi
- Login / My Account
- Book a Puja

### Global Utility
- Announcement / festival bar
- Search overlay
- WhatsApp support / chat
- Notifications
- Breadcrumbs
- Share controls
- Mobile sticky booking CTA
- Cookie consent
- Accessibility controls
- Global footer

---

# 2. Home Page

## Sections
1. Announcement Bar
   - Upcoming festival / major occasion
   - Countdown
   - Quick booking CTA

2. Header / Navigation
   - Logo
   - Main navigation
   - Search
   - Language switch
   - Account
   - Book Now CTA

3. Hero Section
   - Dynamic festival/event artwork
   - Main headline
   - Supporting message
   - Primary CTA
   - Secondary CTA
   - Festival countdown
   - Trust indicators
   - Temple / ritual visual

4. Upcoming Sacred Pujas
   - Next 7 days
   - Upcoming dates
   - Festival badges
   - Puja cards
   - Date / Muhurat
   - Temple
   - Starting price
   - Availability / slots
   - CTA

5. Upcoming Festivals
   - Festival calendar strip
   - Current month
   - Next month
   - Festival date
   - Festival artwork
   - Related pujas
   - Explore festival CTA

6. Featured / Most-Booked Pujas
   - Bestseller cards
   - Evergreen pujas
   - Seasonal pujas
   - Purpose labels
   - Deity
   - Temple
   - Price
   - CTA

7. Browse by Intention / Purpose
   - Health & Well-being
   - Peace & Protection
   - Wealth & Prosperity
   - Marriage & Family
   - Career & Success
   - Education
   - New Beginnings
   - Ancestral Peace
   - Spiritual Growth
   - Dosha Remedies

8. Browse by Deity
   - Shiva
   - Vishnu
   - Krishna
   - Ganesh
   - Lakshmi
   - Durga
   - Hanuman
   - Kali
   - Navagraha
   - Other deities

9. Featured Temples
   - Temple cards
   - Temple location
   - Deity
   - Temple significance
   - Available pujas
   - Explore temple CTA

10. How DharmaTribe Works
    - Choose Puja
    - Select package
    - Provide Sankalp details
    - Puja performed
    - Live participation where available
    - Video / photos delivered
    - Prasad delivery where included

11. Why DharmaTribe / Trust
    - Verified priests
    - Temple partnerships
    - Traditional ritual process
    - Personalized Sankalp
    - Video proof
    - Secure payments
    - Delivery / support
    - Platform statistics

12. Year-Long & Recurring Seva
    - Monthly pujas
    - Annual Sankalp
    - Monthly tithi seva
    - Daily aarti sponsorship
    - Annual path / jaap
    - Group homam
    - Subscription CTA

13. Featured Ritual Experience
    - Puja video previews
    - Ceremony photographs
    - Priest performing ritual
    - Temple visuals
    - Prasad presentation
    - View puja CTA

14. Devotee Stories / Testimonials
    - Reviews
    - Name
    - Location
    - Date / occasion
    - Puja booked
    - Optional photo/video
    - Rating

15. Featured Stories
    - Festival guides
    - Deity stories
    - Temple histories
    - Ritual explainers
    - Devotee stories
    - View all stories CTA

16. Social Media / Community
    - Instagram reels / posts
    - YouTube videos / Shorts
    - Facebook content
    - WhatsApp Channel
    - Telegram where applicable
    - Follow DharmaTribe CTA

17. Newsletter / Stay Connected
    - Email signup
    - Festival reminders
    - New puja alerts
    - Spiritual content
    - Optional Panchang / calendar updates

18. Footer
    - Explore links
    - Puja categories
    - Festivals
    - Temples
    - Stories
    - Support
    - Legal
    - Social links
    - Contact details
    - Disclaimer

---

# 3. Puja Catalog / Explore Pujas Page

## Sections
1. Page Header
2. Search Pujas
3. Browse by Festival
4. Browse by Deity
5. Browse by Purpose
6. Browse by Dosha / Remedy
7. Browse by Puja Type
   - Havan
   - Homam
   - Abhishek
   - Jaap / Jap
   - Path
   - Archana
   - Tarpan
   - Chadhava / Offering
8. Browse by Temple
9. Evergreen Pujas
10. Festival Pujas
11. Seasonal Pujas
12. Date-Specific Pujas
13. Year-Long / Recurring Pujas
14. Filter Controls
   - Date
   - Festival
   - Deity
   - Purpose
   - Type
   - Temple
   - Price
   - Live participation
   - Prasad available
   - Availability
15. Sort Controls
   - Upcoming
   - Popular
   - Recommended
   - Price
16. Puja Results Grid / List
17. Empty State
18. Pagination / Load More

### Puja Card Sections
- Image
- Festival / category badge
- Puja name
- Deity
- Temple
- Date
- Muhurat
- Starting price
- Package indicator
- Bestseller / Featured / Limited Slots badge
- Book CTA

---

# 4. Festival Calendar Page

## Sections
1. Festival Calendar Header
2. Monthly Calendar
3. Upcoming Festival Timeline
4. Panchang / Tithi indicators
5. Today / This Week / This Month
6. Festival Categories
7. Festival Detail Cards
8. Related Pujas
9. Related Temples
10. Festival Stories
11. Festival Reminders
12. Subscribe / Add to Calendar CTA

---

# 5. Festival Detail Page

## Sections
1. Breadcrumbs
2. Festival Hero
3. Festival Name / Date
4. Countdown
5. Festival Overview
6. Significance / Tradition
7. Important Dates / Tithis
8. Rituals & Observances
9. Recommended Pujas
10. Special Festival Packages
11. Featured Temples
12. Festival Gallery
13. Festival Videos
14. Related Deities
15. Stories / Articles
16. FAQs
17. Newsletter / Reminder CTA
18. Related Festivals

---

# 6. Deity Listing Page

## Sections
1. Deity Explorer Header
2. Featured Deities
3. Deity Categories
4. Deity Grid
5. Popular Deity-Specific Pujas
6. Festival Associations
7. Related Temples
8. Related Stories

---

# 7. Deity Detail Page

## Sections
1. Deity Hero
2. Deity Name
3. Introduction / Significance
4. Sacred Forms / Names
5. Major Festivals
6. Recommended Pujas
7. Associated Temples
8. Offerings / Seva Options
9. Stories / Scriptures / Educational Content
10. Videos
11. FAQs
12. Related Deities

---

# 8. Temple Listing Page

## Sections
1. Temple Explorer Header
2. Search / Filter
3. Featured Sacred Temples
4. Temple Categories / Regions
5. Temple Grid
6. Temple Locations
7. Popular Temple Pujas
8. Upcoming Temple Events
9. Temple Stories

---

# 9. Temple Detail Page

## Sections
1. Temple Hero
2. Temple Name
3. Location
4. Deity
5. Temple Overview
6. History
7. Spiritual / Cultural Significance
8. Temple Timings where applicable
9. Available Pujas
10. Upcoming Events
11. Chadhava / Seva Options
12. Priest / Ritual Information
13. Temple Gallery
14. Ceremony Videos
15. Reviews / Devotee Experiences
16. Temple Stories
17. FAQs
18. Book a Puja CTA

---

# 10. Puja Detail Page

## Sections
1. Breadcrumbs
2. Hero / Puja Gallery
3. Festival / Occasion Badge
4. Puja Name
5. Short Summary
6. Deity
7. Temple / Location
8. Date
9. Muhurat / Time
10. Availability / Slots
11. Starting Price
12. Trust Badges
13. Primary Book CTA
14. Share CTA

15. Puja Overview
    - What the puja is
    - Traditional purpose
    - Occasion

16. Significance
    - Religious significance
    - Cultural context
    - Traditional associations

17. Benefits / Intended Purpose
    - Traditional devotional purposes
    - Appropriate use cases
    - Non-guarantee disclaimer where required

18. Puja Vidhi / Process
    - Ritual steps
    - Materials / samagri
    - Duration

19. Sankalp Information
    - Required devotee data
    - Name / gotra
    - Family participation
    - Rashi / nakshatra where applicable

20. Packages & Pricing
    - Individual
    - Couple
    - Family
    - Extended Family / other packages

21. Package Comparison
    - Included ritual
    - Photos
    - Video
    - Live access
    - Prasad
    - Additional offerings

22. Add-Ons
    - Prasad
    - Chadhava
    - Garland
    - Annadanam / Bhog
    - Additional Sankalp
    - Live participation
    - Certificate
    - Other puja-specific offerings

23. What's Included
24. What the Devotee Needs to Do
25. Priest / Acharya Information
26. Temple Information
27. Live Participation Information
28. Video / Photo Delivery Information
29. Prasad Delivery Information
30. Past Puja Gallery
31. Video Preview
32. Reviews
33. Puja-Specific FAQs
34. Related Pujas
35. Related Festival
36. Related Temple
37. Sticky Mobile Book CTA

---

# 11. Booking Flow — Step 1: Date / Slot

## Sections
1. Booking Progress Indicator
2. Puja Summary
3. Available Dates
4. Available Slots / Muhurat
5. Festival Date Information
6. Booking Window / Closing Time
7. Timezone Information where applicable
8. Continue CTA

---

# 12. Booking Flow — Step 2: Package & Add-Ons

## Sections
1. Selected Puja
2. Package Selection
3. Package Comparison
4. Devotee Count
5. Add-Ons
6. Live Participation Option
7. Prasad Option
8. Price Summary
9. Continue CTA

---

# 13. Booking Flow — Step 3: Sankalp Details

## Sections
1. Sankalp Introduction
2. Primary Devotee
   - Full name
   - Gotra
   - Gender where applicable
   - DOB where applicable
   - Place of birth where applicable
   - Rashi
   - Nakshatra
3. Purpose / Manokamna
4. Family Members
5. Add Family Member
6. Gotra Help
7. Rashi / Nakshatra Help
8. “I Don't Know” Support Flow
9. Review Sankalp Information
10. Data Privacy Notice
11. Continue CTA

---

# 14. Booking Flow — Step 4: Delivery / Prasad

## Sections
1. Delivery Requirement
2. Prasad Selection
3. Recipient Name
4. Address
5. City / State / Postal Code
6. Country
7. Phone
8. Delivery Method
9. Shipping Cost
10. International Delivery Notice where applicable
11. Tracking Information
12. Continue CTA

---

# 15. Booking Flow — Step 5: Review & Payment

## Sections
1. Booking Summary
2. Puja Details
3. Date / Muhurat
4. Devotee / Sankalp Summary
5. Package
6. Add-Ons
7. Prasad / Shipping
8. Taxes / Fees
9. Total Amount
10. Coupon / Promo Code
11. Payment Options
    - UPI
    - Cards
    - Net Banking
    - Wallets where supported
12. Terms Acceptance
13. Consent / Communication Preferences
14. Secure Payment Indicators
15. Complete Booking CTA

---

# 16. Booking Confirmation Page

## Sections
1. Booking Success State
2. Booking ID
3. Puja Name
4. Temple
5. Date
6. Muhurat
7. Sankalp Summary
8. Package
9. Add-Ons
10. Payment Summary
11. Expected Video Delivery Date
12. Prasad Delivery Summary
13. Live Participation Information
14. WhatsApp Confirmation
15. Email Confirmation
16. Add to Calendar
17. Manage Booking CTA
18. View My Bookings CTA
19. Support CTA

---

# 17. Booking Tracking / Booking Detail Page

## Sections
1. Booking Status
2. Puja Timeline
   - Booking confirmed
   - Sankalp submitted
   - Preparation
   - Puja scheduled
   - Puja performed
   - Video processing
   - Video delivered
   - Prasad dispatched
   - Prasad delivered
3. Puja Details
4. Sankalp Details
5. Live Link
6. Video
7. Photos
8. Prasad Tracking
9. Documents / Certificate
10. Download / Share
11. Support
12. Cancellation / Reschedule information

---

# 18. My Account / Dashboard

## Sections
1. Welcome / Profile Summary
2. Upcoming Bookings
3. Next Puja Countdown
4. Recent Completed Pujas
5. My Blessings
6. Puja Videos
7. Photo Gallery
8. Prasad Tracking
9. Active Subscriptions
10. Saved Pujas
11. Saved Sankalp / Family Details
12. Notifications
13. Festival Reminders
14. Recommended Pujas
15. Support

---

# 19. My Bookings Page

## Sections
1. Upcoming
2. Completed
3. Cancelled
4. Rescheduled
5. Booking Search
6. Filters
7. Booking Cards
8. Booking Detail CTA
9. Video / Photo CTA
10. Tracking CTA
11. Rebook CTA

---

# 20. My Blessings / Puja Archive Page

## Sections
1. Archive Header
2. Completed Pujas
3. Puja Videos
4. Photos
5. Sankalp Records
6. Certificates
7. Temple Details
8. Date / Occasion
9. Download
10. Share
11. Rebook Similar Puja

---

# 21. Subscription / Year-Long Services Listing

## Sections
1. Subscription Hero
2. Why Year-Long Seva
3. Monthly Services
4. Annual Sankalp
5. Daily Aarti Sponsorship
6. Monthly Tithi Seva
7. Annual Path / Jaap
8. Group Homam
9. Festival / Annual Passes
10. Family Plans
11. Subscription Comparison
12. FAQs
13. Start Subscription CTA

---

# 22. Subscription Detail Page

## Sections
1. Subscription Hero
2. Service Overview
3. Duration
4. Frequency
5. Ritual Schedule
6. Sankalp Personalization
7. Temple / Priest
8. Deliverables
9. Video / Photo Access
10. Prasad Details
11. Family Participation
12. Pricing
13. Billing / Renewal
14. Pause / Cancel Rules
15. FAQs
16. Subscribe CTA

---

# 23. Subscription Management Page

## Sections
1. Active Subscriptions
2. Subscription Details
3. Upcoming Rituals
4. Billing Status
5. Renewal Date
6. Payment Method
7. Update Plan
8. Pause
9. Cancel
10. Resume
11. Subscription History

---

# 24. Find My Puja Page

## Sections
1. Intro
2. What Do You Seek?
   - Peace
   - Health
   - Wealth
   - Family
   - Marriage
   - Career
   - Education
   - Protection
   - Ancestors
   - Spiritual Growth
3. Occasion
4. Preferred Deity
5. Festival / Date
6. Optional Birth / Astrology Details
7. Recommendation Result
8. Recommended Pujas
9. Why These Pujas
10. Compare Recommendations
11. Book CTA
12. Expert / Support CTA

---

# 25. Stories / Blog Listing Page

## Sections
1. Stories Hero
2. Featured Story
3. Latest Stories
4. Trending Stories
5. Categories
   - Festivals
   - Deity Stories
   - Rituals / Puja Vidhi
   - Temple Histories
   - Vedic Culture
   - Dosh & Remedies
   - Vrat / Tithi Guides
   - Devotee Stories
   - Spiritual Lifestyle
6. Search
7. Category Filters
8. Story Cards
9. Newsletter
10. Load More / Pagination

---

# 26. Story / Blog Detail Page

## Sections
1. Breadcrumbs
2. Featured Image
3. Category
4. Title
5. Author
6. Published Date
7. Reading Time
8. Article Content
9. Images / Video
10. Festival / Ritual Facts
11. Related Puja CTA
12. Related Temple CTA
13. Related Stories
14. Social Share
15. Newsletter CTA

---

# 27. How It Works Page

## Sections
1. Hero
2. What is DharmaTribe?
3. Choose a Puja
4. Select Package
5. Submit Sankalp
6. Priest / Temple Performs Puja
7. Live Participation
8. Video / Photo Delivery
9. Prasad Delivery
10. My Blessings / Archive
11. Timeline Example
12. FAQs
13. Book a Puja CTA

---

# 28. About DharmaTribe Page

## Sections
1. Brand Hero
2. DharmaTribe Story
3. Mission
4. Vision
5. Values
6. Approach to Tradition
7. Priest / Temple Network
8. Ritual Authenticity
9. Technology + Tradition
10. Community
11. Trust Statistics
12. Leadership / Team where applicable
13. Contact CTA

---

# 29. Community / Social Page

## Sections
1. Community Hero
2. Instagram
3. YouTube
4. Facebook
5. WhatsApp Channel
6. Devotee Reels
7. Puja Videos
8. Temple Moments
9. Prasad Unboxing
10. Festival Highlights
11. User Stories
12. Follow / Subscribe CTAs

---

# 30. FAQ / Help Center Page

## Sections
1. Search Help
2. Getting Started
3. Pujas
4. Sankalp
5. Gotra / Rashi / Nakshatra
6. Booking
7. Payments
8. Live Participation
9. Video Delivery
10. Photo Delivery
11. Prasad
12. Shipping
13. International Orders
14. Cancellation
15. Refunds
16. Rescheduling
17. Subscriptions
18. Account
19. Privacy / Data
20. Contact Support

---

# 31. Contact Us Page

## Sections
1. Contact Hero
2. General Enquiry
3. Booking Support
4. Puja Support
5. Prasad / Shipping Support
6. Subscription Support
7. WhatsApp
8. Email
9. Phone where applicable
10. Contact Form
11. Office / Registered Address where applicable
12. Support Hours
13. FAQ CTA

---

# 32. Support / Devotee Care Page

## Sections
1. Support Hero
2. Booking Help
3. Puja Timing Help
4. Sankalp Help
5. Video Help
6. Prasad Tracking
7. Payment Help
8. Cancellation / Refund Help
9. WhatsApp Support
10. Email Support
11. Ticket / Query Form
12. Chat / Assistant where implemented

---

# 33. Search Results Page

## Sections
1. Search Bar
2. Suggested Searches
3. Puja Results
4. Festival Results
5. Temple Results
6. Deity Results
7. Story Results
8. Filters
9. Sort
10. Empty Search State
11. Popular Searches

---

# 34. Notifications / Alerts Page

## Sections
1. Booking Updates
2. Puja Reminders
3. Festival Reminders
4. Live Puja Alerts
5. Video Ready Alerts
6. Prasad Dispatch Alerts
7. Subscription Alerts
8. Promotional Notifications
9. Read / Unread State
10. Notification Preferences

---

# 35. Authentication Pages

## Login Page
### Sections
1. Logo
2. Login
3. Mobile / Email
4. OTP / Password
5. Social login where supported
6. Forgot Password
7. Create Account
8. Terms / Privacy

## Registration Page
### Sections
1. Name
2. Email
3. Mobile
4. Password / OTP
5. Country
6. Communication Preferences
7. Terms / Privacy
8. Create Account

## OTP / Verification Page
### Sections
1. OTP Input
2. Resend OTP
3. Change Number / Email
4. Verification Status

---

# 36. Legal Pages

## Terms & Conditions
### Sections
1. Introduction
2. Definitions
3. Nature of Devotional Services
4. Eligibility
5. Booking Rules
6. Sankalp Information Responsibility
7. Puja Performance
8. Video / Photo Delivery
9. Live Participation
10. Prasad Delivery
11. Pricing / Taxes
12. Payment
13. Cancellation
14. Refunds
15. Rescheduling
16. Force Majeure
17. Third-Party Temple / Shipping Services
18. Intellectual Property
19. Liability
20. Disclaimer
21. Governing Law
22. Contact

## Privacy Policy
### Sections
1. Scope
2. Data Collected
3. Account Information
4. Sankalp / Religious Data
5. Birth / Astrology Data
6. Address / Shipping Data
7. Payment Data
8. Device / Usage Data
9. Cookies
10. Purpose of Processing
11. Sharing with Priests / Temples
12. Shipping / Payment Partners
13. Data Security
14. Data Retention
15. User Rights
16. Account Deletion
17. Children / Minors
18. International Data
19. Policy Updates
20. Contact

## Refund & Cancellation Policy
### Sections
1. Cancellation Before Ritual
2. Cancellation After Sankalp
3. Rescheduling
4. Puja Not Performed
5. Missed Live Session
6. Video Delay
7. Video / Photo Delivery Failure
8. Prasad Damage / Loss
9. Non-Returnable Items
10. Force Majeure / Temple Closure
11. Refund Timeline
12. Contact

## Shipping & Prasad Policy
### Sections
1. Eligible Products
2. Domestic Shipping
3. International Shipping
4. Processing Time
5. Delivery Estimates
6. Tracking
7. Address Changes
8. Lost / Damaged Shipments
9. Customs / Duties
10. Non-Delivery
11. Returns / Replacements
12. Contact

## Disclaimer
### Sections
1. Devotional Service Nature
2. Traditional / Religious Context
3. No Guaranteed Outcomes
4. Astrology / Spiritual Content Disclaimer
5. Medical / Financial / Legal Disclaimer
6. User Responsibility
7. Third-Party Information

## Cookie Policy
### Sections
1. What Cookies Are
2. Essential Cookies
3. Analytics
4. Marketing
5. Preferences
6. Consent
7. Managing Cookies
8. Contact

---

# 37. Error / Utility Pages

## 404 Page
### Sections
- DharmaTribe illustration
- Page not found message
- Search
- Upcoming Pujas CTA
- Home CTA

## 500 / Service Error
### Sections
- Error message
- Retry
- Home
- Support

## Empty States
### Variants
- No upcoming bookings
- No completed pujas
- No search results
- No saved items
- No notifications
- No subscriptions

---

# 38. Operational / Product Concepts to Support the Prototype

## Puja Content Types
- Evergreen
- Festival-specific
- Seasonal
- Date-specific
- Monthly recurring
- Weekly recurring
- Annual
- Subscription
- Group ritual
- Campaign / collection

## Dynamic Festival Content
- Festival date
- Tithi
- Start / end date
- Countdown
- Linked pujas
- Linked temples
- Homepage priority
- Banner
- Story collection
- Reminder campaign

## Puja Deliverables
- Sankalp
- Photos
- Video
- Live participation
- Certificate
- Prasad
- Chadhava
- Annadanam / Bhog
- Other offerings

## Booking Lifecycle
- Draft / selection
- Payment initiated
- Confirmed
- Sankalp submitted
- Scheduled
- In preparation
- Puja performed
- Video processing
- Video delivered
- Prasad dispatched
- Prasad delivered
- Completed
- Cancelled / rescheduled

## Customer Communication
- Booking confirmation
- Payment confirmation
- Sankalp confirmation
- Reminder
- Live session notification
- Puja completed notification
- Video ready
- Prasad shipped
- Delivery update
- Subscription renewal
- Festival reminder

## Communication Channels
- Email
- WhatsApp
- SMS where required
- In-app notifications

---

# 39. Admin / CMS Concepts Required for a Complete Product Prototype

## Dashboard
- Orders
- Revenue
- Upcoming pujas
- Upcoming festivals
- Active subscriptions
- Video pending
- Prasad pending
- Support tickets

## Puja Management
- Create / edit / archive puja
- Packages
- Add-ons
- Dates / slots
- Muhurat
- Temple
- Priest
- Media
- FAQs
- Related content

## Festival Management
- Calendar
- Festival dates
- Tithis
- Featured pujas
- Homepage priority
- Countdown
- Campaign banners

## Temple Management
- Temple details
- Location
- Deity
- Gallery
- Priests
- Pujas
- Events

## Content Management
- Stories
- Categories
- Authors
- Featured content
- Social content
- SEO metadata

## Order Management
- Booking details
- Sankalp details
- Payment
- Video
- Photos
- Prasad
- Shipping
- Refund
- Reschedule

## Subscription Management
- Plans
- Billing
- Renewals
- Subscribers
- Deliverables

## Communication Management
- Email templates
- WhatsApp templates
- Notifications
- Festival campaigns
- Reminders

## User Management
- Customers
- Priest / operator accounts
- Roles
- Permissions
- Support users

---

# 40. Recommended Core Prototype Pages

## Priority 1 — Core Conversion
1. Home
2. Puja Catalog
3. Puja Detail
4. Booking — Date / Slot
5. Booking — Package
6. Booking — Sankalp
7. Booking — Delivery / Prasad
8. Booking — Payment
9. Booking Confirmation
10. Booking Detail / Tracking
11. My Account
12. My Blessings

## Priority 2 — Discovery
13. Festival Calendar
14. Festival Detail
15. Temple Listing
16. Temple Detail
17. Deity Listing
18. Deity Detail
19. Find My Puja
20. Year-Long / Subscription Listing
21. Subscription Detail

## Priority 3 — Content / Brand
22. Stories Listing
23. Story Detail
24. Community / Social
25. How It Works
26. About DharmaTribe

## Priority 4 — Support / Utility
27. FAQ / Help Center
28. Contact
29. Support / Devotee Care
30. Search Results
31. Notifications

## Priority 5 — Legal / Account Utilities
32. Login
33. Registration
34. OTP / Verification
35. Terms & Conditions
36. Privacy Policy
37. Refund & Cancellation
38. Shipping & Prasad Policy
39. Disclaimer
40. Cookie Policy
41. 404
42. Error / Empty States

---

# 41. Core Homepage Content Rotation Model

The visual homepage structure remains fixed while content rotates automatically.

## Always Present
- Hero
- How It Works
- Trust
- Popular Pujas
- Temples
- Stories
- Social
- Testimonials
- Footer

## Date-Driven
- Announcement
- Hero festival
- Upcoming pujas
- Festival strip
- Countdown
- Festival campaign

## Seasonal
- Shravan
- Navratri
- Pitru Paksha
- Diwali
- Chhath
- Janmashtami
- Mahashivratri
- Other major occasions

## Evergreen
- Rudrabhishek
- Mahamrityunjaya
- Satyanarayan
- Ganesh Puja
- Lakshmi Puja
- Navagraha
- Other year-round rituals

## Recurring
- Monthly Sankalp
- Tithi Seva
- Daily Aarti
- Annual Sankalp
- Year-long Path / Jaap
- Group Homam


