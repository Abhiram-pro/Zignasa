# Mobile Website Loading Instructions for Windsurf

## Objective
Ensure that the React-based Windsurf event website loads correctly and responsively on all mobile devices and browsers.

## Key Requirements

1. **Viewport Configuration**
   - Include the following meta tag in the `<head>`:
     ```html
     <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
     ```
   - Prevent layout shifts and scaling bugs by enforcing device width as viewport width.

2. **Responsive CSS Strategy**
   - Use flexible layout units (`%`, `vw`, `vh`, `rem`) instead of fixed pixels.
   - Define breakpoints for small (≤600px), medium (600–1024px), and large (≥1024px) screens.
   - Example (SCSS/CSS):
     ```css
     @media (max-width: 600px) {
       .hero-text { font-size: 1.1rem; text-align: center; }
       .nav-links { flex-direction: column; gap: 10px; }
       .event-card { width: 90vw; margin: 0 auto; }
     }
     ```

3. **React Component Adjustments**
   - Replace fixed container sizes with responsive components (e.g., `maxWidth: "100%"` or `width: "90vw"`).
   - For images:
     ```jsx
     <img src="/event.jpg" alt="Event" style={{ width: "100%", height: "auto" }} />
     ```
   - Use responsive grids:
     ```jsx
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
     ```

4. **Mobile Navigation**
   - Implement a collapsible mobile navbar (hamburger menu).
   - Ensure touch targets are at least 44px tall.

5. **Testing**
   - Use Playwright MCP to simulate:
     - iPhone 14 Pro, Galaxy S23, Pixel 8
   - Confirm no horizontal scrolling or element overlap occurs.

6. **Performance**
   - Defer non-essential scripts.
   - Use lazy loading for images below the fold.
   - Optimize Google Fonts with `display=swap`.

---

## Validation Checklist

✅ No horizontal scroll on mobile  
✅ All text fits within viewport  
✅ Buttons are tappable (≥44px height)  
✅ Images and sections scale smoothly  
✅ Navbar collapses properly  
✅ Lighthouse Mobile Performance ≥ 90
