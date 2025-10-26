# 🎨 Event Website Design Review Checklist  
*(Optimized for React + shadcn/ui projects — student-focused event websites)*

---

## I. Core Design Philosophy

- [ ] **Purpose-Driven:** Every section should directly support your event’s goal — inform, excite, and convert visitors to sign up or attend.  
- [ ] **Instant Clarity:** Within 5 seconds, users should understand *what the event is*, *why it matters*, and *how to participate*.  
- [ ] **Visual Energy:** Use bold typography, motion, and colors to reflect the event’s vibe — youthful, energetic, and inspiring.  
- [ ] **Simplicity:** Keep layouts clean. Avoid overcrowding with too much text, animation, or unnecessary effects.  
- [ ] **Performance:** The site should feel instant — under 2s load, zero jank in animations or transitions.  
- [ ] **Consistency:** Use a single component design language (shadcn/ui tokens, consistent spacing, color, typography).  
- [ ] **Accessibility:** Ensure all buttons, links, and color combinations are usable by everyone (WCAG AA+).  
- [ ] **Mobile-First:** Students browse mostly on phones. The mobile experience should feel *native-like* — not a squished desktop layout.  

---

## II. Design System Foundation (shadcn/ui + Tailwind Tokens)

### 🎨 Color & Theme
- [ ] **Primary Color:** Your event brand color — used for CTAs, key highlights, and hero sections.  
- [ ] **Accent/Secondary:** Complementary tone for contrast (hover states, borders, highlights).  
- [ ] **Neutrals:** Keep backgrounds and text legible (light/dark mode support optional).  
- [ ] **Accessibility Check:** Run color contrast tests — minimum 4.5:1 for text.  

### 🔤 Typography
- [ ] **Display Font:** Strong, attention-grabbing for headlines (e.g., Outfit, Poppins, or Manrope).  
- [ ] **Body Font:** Neutral, clean sans-serif (e.g., Inter).  
- [ ] **Hierarchy:**  
  - H1: Event title  
  - H2: Section headers  
  - Body: Event info and CTAs  
  - Caption: Dates, speakers, and small details  

### 📏 Spacing & Layout
- [ ] **Base Unit:** 8px grid (Tailwind spacing scale).  
- [ ] **Container Widths:** Consistent max-width for content (e.g., `max-w-7xl mx-auto`).  
- [ ] **White Space:** Give sections breathing room — clarity > density.  

---

## III. Key Page Structure

### 🏠 Home / Landing
- [ ] **Hero Section:**  
  - [ ] Clear event name + tagline  
  - [ ] Eye-catching visuals (gradient, animation, or abstract background)  
  - [ ] Primary CTA: “Register Now” or “Learn More”  
- [ ] **About Section:**  
  - [ ] Short, powerful event story  
  - [ ] Emphasize value — “Why attend?”  
- [ ] **Highlights Section:**  
  - [ ] Key dates, activities, competitions, speakers  
  - [ ] Use cards or icons for quick scanning  
- [ ] **Sponsors/Partners Section:**  
  - [ ] Grid of logos, consistent sizing  
- [ ] **Contact or CTA Footer:**  
  - [ ] Social media links, registration buttons, and contact form  

### 🧭 Navigation & Flow
- [ ] **Sticky Navbar:** Compact and responsive.  
- [ ] **Active States:** Highlight the current section clearly.  
- [ ] **Smooth Scrolling:** For section anchors.  
- [ ] **Mobile Menu:** Collapsible and intuitive (hamburger + overlay).  

---

## IV. Interactions & Motion

- [ ] **Microinteractions:**  
  - Subtle hover effects, button ripples, fade-ins — not distracting.  
- [ ] **Entrance Animations:**  
  - Use AOS or Framer Motion to reveal sections naturally as users scroll.  
- [ ] **CTA Feedback:**  
  - Clicks should feel tactile (scale, shadow, or color shift).  
- [ ] **Performance:**  
  - Avoid overusing motion — keep FPS smooth.  

---

## V. Accessibility & Inclusivity

- [ ] All buttons, inputs, and links have visible focus states.  
- [ ] All text is legible on both light and dark backgrounds.  
- [ ] All interactive elements have proper `aria` labels.  
- [ ] Forms include labels, helper text, and validation feedback.  
- [ ] Test navigation with keyboard only — no mouse.  

---

## VI. Branding & Visual Identity

- [ ] **Logo Usage:** Fits navbar and favicon cleanly; SVG preferred.  
- [ ] **Imagery:** Use authentic, high-quality photos or vector illustrations that match the event tone.  
- [ ] **Gradients & Accents:** Keep them consistent — don’t overuse.  
- [ ] **Tone:** Fun, bold, forward-looking — but professional.  

---

## VII. Final QA Before Launch

- [ ] **Responsive Check:** Mobile, tablet, desktop — no overflow or broken layouts.  
- [ ] **Performance Test:** Lighthouse score > 90 for performance and accessibility.  
- [ ] **SEO Metadata:** Title, description, social previews (OpenGraph tags).  
- [ ] **Favicon & Manifest:** Custom favicon, PWA-ready if needed.  
- [ ] **Cross-Browser Check:** Chrome, Safari, Edge, Firefox.  
- [ ] **Error States:** 404, loading, and network error pages should look intentional.  
- [ ] **Analytics & Tracking:** (Optional) Add GA or simple click tracking for engagement insights.  

---

## VIII. Design Consistency Audit

- [ ] Buttons use consistent padding, radius, and color rules.  
- [ ] Shadows, borders, and cards follow a single elevation system.  
- [ ] Typography rhythm consistent across pages.  
- [ ] No random Tailwind values that break spacing flow.  
- [ ] All shadcn components styled to match brand color and tone.  

---

📘 *This checklist ensures your event website feels professional, fast, and cohesive — the kind that gets students excited and makes sponsors proud.*
