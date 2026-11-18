# Prompt: Lilac Flower Bar website

Copy everything below the line into any AI coding assistant (Claude, Cursor, v0, Bolt, etc.).
Facts marked **[VERIFY]** are assumptions. Confirm them with the owner before publishing.

---

## Role & goal

You are a senior front-end developer and editorial web designer. Build a **responsive, production-ready one-page website** for **Lilac Flower Bar**, a florist and gift shop in Addis Ababa, Ethiopia. The site must turn visitors into orders through **Telegram or a phone call**. It serves two audiences:

1. **Local customers** in Addis Ababa who want a bouquet, gift or event decoration, often at short notice.
2. **International customers**, mainly the Ethiopian diaspora and people abroad, who want flowers or gifts delivered to loved ones in Addis.

## Business facts (use exactly)

- **Name:** Lilac Flower Bar
- **Tagline:** "We deliver happiness every day"
- **About:** An established small business in Kazanchis, Addis Ababa. It has built a loyal clientele with high-quality natural flower decoration and a curated selection of gift items, and has a strong reputation in the community.
- **Location:** Kazanchis, next to Elilly Hotel, in front of ECA (UN Economic Commission for Africa), Addis Ababa, Ethiopia
- **Phone:** 0953 911 250, international format +251 95 391 1250. Link it as `tel:+251953911250`.
- **Order by Telegram DM:** @lilac234 at https://t.me/lilac234
- **WhatsApp:** +251 95 391 1250 (same number as the phone; [VERIFY]). Link: `https://wa.me/251953911250?text=Hello%20Lilac%20Flower%20Bar!%20I%27d%20like%20to%20place%20an%20order.` (opens a chat with a ready-made greeting).
  - Use the official WhatsApp glyph in brand green #25d366, as an inline SVG `<symbol id="i-wa">` reused with `<use>`.
  - **Navigation:** a round green icon button before "Order on Telegram"; in the mobile menu, a full-width green "WhatsApp" button.
  - **Hero, Visit and footer:** a green "WhatsApp" pill button next to the Telegram and Call buttons.
  - **Text links:** a WhatsApp row in the Visit details and the footer Order column, and a mention in the "How do I place an order?" FAQ answer.
  - **Floating button (desktop and tablet):** 62px round, fixed bottom-right, with a soft pulse ring and a "Chat with us on WhatsApp" hint on hover.
  - **Phones:** the floating quick-order bar becomes Call · [WhatsApp icon] · Telegram.
- **Telegram channel (portfolio):** https://t.me/lilacrak
- **Maps link:** https://www.google.com/maps/search/?api=1&query=Lilac+Flower+Bar+Kazanchis+Addis+Ababa
- **Products & services:**
  - Bouquets & arrangements: hand-tied bouquets, rose boxes, tall statement arrangements
  - Event & car decoration: weddings, wedding cars, engagements, baby showers, corporate events, helium balloon styling
  - Curated gifts: the signature custom **Jar of Notes** ("Why only give flowers when you can give them your words?"), chocolates, teddy bears and balloons, paired with flowers
- **Opening hours, prices, delivery area and fees, payment methods (local and international):** [VERIFY]. Don't invent them. Leave clearly marked placeholders.

## Tech constraints

- **Plain HTML, CSS and vanilla JavaScript only:** `index.html`, `styles.css`, `script.js`, plus an `assets/` folder. No frameworks, build step or npm. It must open by double-clicking `index.html`.
- **External requests:** only Google Fonts.
- **Progressive enhancement:** all content must be visible and usable without JavaScript.
- **Size:** keep the page light. Use `loading="lazy"` on every image below the fold, with explicit `width` and `height`. Load the hero image with `fetchpriority="high"`.

## Design direction: clean, editorial, purple

- **Mood:** a high-end print magazine. Generous whitespace, large serif headlines, restrained colour, photography as the hero. No gradient-heavy "template" look, emoji icons or stock clip-art.
- **Typography:**
  - Display: **Fraunces**, weights 400 and 600 plus italic. Use italic accent words in headlines, e.g. "We deliver *happiness* every day."
  - Body: **Manrope**, weights 400–700.
  - Headline scale: `clamp()` from about 2.8rem to 6rem for the H1, and about 2.1rem to 3.6rem for H2s. Tight letter-spacing (−0.02em), line-height around 1.08.
  - Eyebrow labels: 12px uppercase, 0.18em tracking, in the primary purple.
- **Logo:** use the official illustrated logo, a flower cart with the "Li-lac / Flower Bar" script, as `assets/logo.svg`. It's a vector export from the owner's Illustrator file, cropped to the artwork with a transparent background. Also provide `assets/logo.png` (512px) and `assets/favicon.png` (192px).
  - **Navigation:** 72px tall on desktop, 62px on mobile. Don't recreate it as text.
  - **Footer:** at 110–150px on an off-white rounded-square tile, never a circle, because a circle clips the "Flower Bar" text. The plum footer background is too dark for the logo directly.
- **Colour tokens** (CSS custom properties on `:root`), sampled from the logo:
  - `--ink: #23142f` (deep aubergine text) · `--ink-soft: #5a4a66`
  - `--plum: #3d2266` (primary, matches the logo script #382060) · `--plum-deep: #27143f`
  - `--violet: #785890` (logo vases) · `--rose: #c2569a` (logo blossoms, small accents only: card numbers, badge label)
  - `--lilac: #b89ad8` (accents) · `--lilac-soft: #ece3f5`
  - `--paper: #fbf8f4` (warm off-white background) · `--paper-2: #f4eef6` (tinted section) · `--line: #e3d9e9`
- **Shapes:** 18px card radius, pill-shaped buttons. The hero photo sits in an **arched frame** (fully rounded top corners) with a thin offset lilac outline behind it.
- **Motion and interactivity** (vanilla JS; all of it switches off under `prefers-reduced-motion`):
  - Hero: headline words slide up one by one on load. The hero photo crossfades through 4 images every 4.5s, with slow zoom and dot controls. Blurred lilac and pink colour blobs drift behind it, and a few lilac petals fall gently.
  - Floating hero cards bob up and down and move with a light parallax as you scroll.
  - A thin rose-to-plum scroll-progress bar runs across the top of the screen.
  - The navigation hides when scrolling down and returns when scrolling up.
  - Scroll-triggered fade-up reveals with staggered delays. Number count-up ("680+").
  - Mouse-only effects: service cards tilt in 3D toward the cursor; main buttons have a light shine sweep and "magnetic" pull.
  - Collection: animated filter chips, fade and scale transitions, "Show more" paging.
  - Lightbox: previous/next buttons, arrow keys and swipe.
  - Videos autoplay muted only while on screen.
  - Phone screens: a floating "Call / Order on Telegram" bar appears after the hero.

## Page structure (in this order)

1. **Sticky navigation bar**
   - Logo: the official logo image (`assets/logo.svg`) on the left, linking to the top of the page.
   - Links: Services, Gallery, Kind words, FAQ, Contact, plus a pill CTA "Order on Telegram".
   - Translucent paper background with backdrop blur, and a hairline border and soft shadow once scrolled.
   - Highlight the active section's link with a scroll-spy underline.
   - Mobile (≤860px): a hamburger that animates into an X and opens a full-width dropdown. Closes on link click or Esc. Keep `aria-expanded` correct.
2. **Hero:** two columns on desktop, stacked on mobile.
   - Eyebrow: "Welcome · እንኳን ደህና መጡ" (English and Amharic).
   - H1: "We deliver *happiness* every day."
   - Lede: one or two sentences on natural flowers, event decoration and curated gifts, hand-made next to Elilly Hotel, for neighbours across Addis and loved ones ordering from abroad.
   - Buttons: primary "Order on Telegram", ghost "Call 0953 911 250".
   - Three facts in serif, divided by a hairline: Fresh natural flowers · Custom to your budget · Local & abroad orders.
   - Right column: the signature purple bouquet in the arched frame, with a floating white badge reading "Signature / The Lilac Bouquet".
3. **Services:** an exactly-three-card grid.
   - Each card has a 4:4.2 photo, a serif number (01/02/03), an H3, two lines of copy and a text link with an arrow.
   - Cards: Bouquets & arrangements · Event & car decoration · Curated gifts.
   - The gifts card uses the **Jar of Notes video** (`autoplay muted loop playsinline`, with a poster image).
   - Layout: 3 columns on desktop, 2+1 on tablet, 1 on mobile.
   - **After the services:** add an **occasions marquee**, a plum strip tilted slightly that scrolls endlessly: Birthdays · Anniversaries · Weddings · Baby showers · Graduations · Corporate gifts · Get well soon · Just because.
   - **Collection** ("Find the one that says *it all*"): about 57 real product photos tagged Roses, Bouquets, Boxes & baskets, Balloons & gifts, and Events.
     - Filter chips with counts; 4:5 cards in 4 columns, then 3, then 2.
     - On hover, a caption appears with the category, a description and "Order similar →" linking to Telegram.
     - Show 12 at first (8 on phones), then a "Show more" button. Add a link to the Telegram channel for the 680+ more.
   - **Chocolates** ("Flowers taste better with *chocolate*"): a dark cocoa-to-plum gradient section with gold accents.
     - Copy about adding chocolates or a full gift set.
     - Brand pills: Ferrero Rocher, Raffaello, Milka, merci [VERIFY stock].
     - A 3×3 photo mosaic of the chocolates and the flower-and-chocolate sets.
   - **Reels** ("Little moments, *delivered*"): a horizontal scroll-snap row of 9:16 muted looping clips from Telegram, each trimmed to 8 seconds and under about 600KB, with a caption pill on each. End the row with a Jar of Notes quote card.
   - **Visit** ("Come smell the *roses*"): a photo of the shop's neon sign, then address, phone and Telegram (and hours [VERIFY]), and "Get directions" (Google listing link) and "Call" buttons.
     - Beside it, a **visible embedded Google Map**: `https://www.google.com/maps?q=9.0142987,38.768717&z=17&output=embed` (the shop's exact coordinates from Google Maps), with a "Lilac Flower Bar" pin label over it.
     - Behind the map, a styled fallback link in case the map fails to load.
   - **Reviews:** a **rotating 3D carousel**: the active review sits in the centre with an animated gradient border, and the previous and next reviews are angled away on either side (rotateY about ±32°, pushed back and faded). It auto-advances every 6s, and the active dot fills like a progress bar. Arrows, dots, clicking a side card, swipe and arrow keys all move it. It pauses on mouse hover or keyboard focus and when scrolled off screen, and stays still under reduced motion. Without JavaScript it falls back to a 2×2 grid (1 column on phones). Include a "Read our reviews on Google" button (https://share.google/XOSzthTEbGT7KG9g3). Never invent or edit reviews.
     - Use these seven real 5-star Google reviews **verbatim**, each linking to the original:
       - **Betty Misganaw** (https://share.google/BCNM0vGBubCLQJHiC), tag "Fresh & flawless": "I’ve getting flowers from Lilac Flower, and I love everything they do! The flowers are always fresh, and the bouquet styles are super cute and perfectly match the occasion. Plus, the service is always polite and delivery is flawless. I highly recommend them!"
       - **Camilla Talam** (https://share.google/adptMan2kZyk9s0GT), tag "Ordered from abroad": "I received lovely flowers from my birthday from Lilac Flower bar as a surprise from someone abroad. They provided great advise, delivered on time and communicated so seamlessly. I highly recommend them even for those in the diaspora looking to do something special for loved ones in Addis Ababa."
       - **Jacana** (https://share.google/fjgbt8UvvArpjkFhn), tag "Mother's Day": "I had an amazing experience with Lilac Flower Bar in Addis Ababa for Mother's Day. I ordered a beautiful flower arrangement and a torta cake, and everything was perfect. The product was stunning, delivered in a timely manner, and the owner, Rakik, is outstanding she provides the best customer service. I highly recommend them!"
       - **Hemen Yilma** (https://share.google/PBZ4JzLMtQEwdc8tm), tag "Delivery in Addis": "Lilac flower bar has been my go to for flower delivery in Addis. They have really beautiful arrangements and the staff take their time in preparing the packaging and on time delivery. Thank you Lilac, I will be coming back."
       - **Reda Christian** (https://share.google/oPEqFJsUwCnoLipCA), tag "Ordered from Sweden": "Ordered all the way from Sweden and had flowers delivered to my girlfriend in Addis Ababa  and they pulled it off flawlessly! The delivery was incredibly fast for an international order, and the arrangement was absolutely beautiful. She was so surprised and happy. It’s not easy coordinating something like this across continents, but this shop made it look effortless. If you’re abroad and want to make someone back home in Ethiopia feel special, this is exactly who you call. Cannot recommend them enough! 🌸🇪🇹"
       - **Takijo** (https://share.google/DE47ss6L2pSlmmYqi), tag "Urgent order": "I wanted some flowers as a gift urgently. Contacted them and they immediately replied. Showed them a picture of some flowers I wanted replicated and they did it exactly the same and executed any additional wishes I had. Most definitely can only recommend them if you want some nice flowers for someone, and are in a hurry."
       - **Bianca Levrini** (https://share.google/STizq8sqGtK7HnXc9), tag "Ordered from Italy": "I ordered a bouquet of flowers from Italy for a friend who was working in Addis. Despite the short notice, she was incredibly kind, and the flowers arrived at their destination. Thank you so much!"
     - Carousel order: Betty, Reda, Camilla, Jacana, Takijo, Hemen, Bianca, so the reviews from abroad are spread out.
     - Each card shows 5 gold stars, a small rose-pink tag pill, the quote in Fraunces, and an initial avatar with the name and a "Google review" link.
4. **Quote band:** a full-width deep-plum section with soft lilac radial glows.
   - Large italic serif quote: "Why only give flowers when you can give them your words?"
   - Subline: "Beyond bouquets — the custom Jar of Notes, designed to your style and size."
5. **Gallery** ("Fresh from the *studio*")
   - A masonry-style CSS grid: 4 columns, `grid-auto-flow: dense`, two tall tiles. Use 10 photos so the grid has no holes; it drops to 3 columns, then 2.
   - Each tile is a `<button>` that opens a native `<dialog>` lightbox. It closes on the × button, a backdrop click or Esc.
   - Add a "See more on Telegram" button linking to t.me/lilacrak.
6. **Testimonials** ("Loved in Kazanchis, *and beyond*"): three quote cards on a tinted background.
   - One for a local birthday, one for a wedding, one for an order from abroad.
   - **Use only real customer reviews.** If none are supplied, use visible placeholder text such as "Add a real review here…" and an HTML comment telling the owner to replace it. Never invent reviews or names.
7. **FAQ** ("Before you *order*")
   - Two columns: the heading plus a Telegram help line on the left, an accordion on the right. Build it with native `<details>/<summary>`, a custom +/× icon, and only one item open at a time.
   - Questions:
     - How do I place an order?
     - Can I order from outside Ethiopia? [VERIFY payment]
     - Do you deliver? [VERIFY areas and fees]
     - How far in advance should I order? [VERIFY lead times]
     - Can you match my colours or theme?
8. **Contact footer:** a solid plum background.
   - The logo on an off-white rounded tile next to a large serif CTA, "Let's make someone's *day*.", with buttons "Message @lilac234" (white) and "Call 0953 911 250" (outline).
   - Three columns: Visit (address plus "Open in Google Maps →") · Order (phone, Telegram) · Follow (Telegram channel).
   - Base row: © current year (set by JS) and "Back to top ↑".

## Assets

Pull real photos and video from the business's Telegram channel, https://t.me/lilacrak. Its public web preview is at https://t.me/s/lilacrak. Save them locally in `assets/` with descriptive names:

| File | Use |
|---|---|
| `hero-purple-bouquet.jpg` | Hero (deep purple statice bouquet, on-brand) |
| `bouquet-pink-roses.jpg` | Service card 1 |
| `decor-wedding-car.jpg` | Service card 2 |
| `gift-jar-of-notes.mp4` + `.jpg` poster | Service card 3 |
| `gallery-*.jpg`, `decor-lilac-bow.jpg` | Gallery (10 images) |

Avoid photos dominated by third-party brand packaging (chocolate boxes and similar) in prominent positions. Write a meaningful `alt` text for every image that describes the flowers and colours.

## SEO & sharing

- **Title:** "Lilac Flower Bar · Flowers & Gifts in Kazanchis, Addis Ababa". Add a meta description, Open Graph tags, `theme-color` #382060 and the favicon.
- **Structured data:** JSON-LD `Florist` schema with name, logo, telephone, address (Kazanchis, Addis Ababa, ET) and `sameAs` pointing to the Telegram channel.

## Accessibility & quality bar

- **Contrast and semantics:** WCAG AA contrast, a skip link, semantic landmarks (`header`, `nav`, `main`, `section` with `aria-labelledby`, `footer`).
- **Interaction:** visible `:focus-visible` rings, touch targets of at least 44×44px.
- **Layout:** no horizontal scroll from 320px to 1440px. Side gutter of at least 16px on mobile, container max 1180px.
- **Hover:** must never be the only way to discover something.
- **Robustness:** no console errors, and every link works (tel: and Telegram).

## Deliverables

1. `index.html`, `styles.css`, `script.js` and `assets/`, ready to open locally.
2. A short README listing every **[VERIFY]** item and placeholder the owner must fill in: reviews, hours, prices, delivery and payment details.
3. Optional next steps:
   - An Amharic version (EN/አማርኛ toggle)
   - A WhatsApp button if the business uses WhatsApp
   - An embedded Google Map
   - Real Google reviews
   - Hosting on Netlify or GitHub Pages with a custom domain
