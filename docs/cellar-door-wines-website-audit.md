# Cellar Door Wines Website Audit

Audit date: 14 August 2026  
URL: https://cellardoorwines.co.uk/  
Audit type: Passive public-page review from HTML and response headers  
Score: 75/100

## Executive Summary

Cellar Door Wines has a solid ecommerce foundation: HTTPS is working, the page title and meta description are relevant, Shopify provides a mature commerce platform, and the site clearly signals wine retail intent.

The main opportunity is focus. The homepage appears technically and navigationally heavy, with hundreds of links, many scripts, multiple forms and a large HTML payload. That can dilute user attention, make the main shopping journey harder to follow, and reduce performance.

The highest-impact improvements are to add a clear homepage H1, reduce script and link bloat, tighten the first user journey, fix missing image alt text and add two missing privacy/security headers where Shopify/theme configuration allows.

## Key Audit Signals

- HTTP status: 200
- HTTPS: enabled
- Certificate: valid, expires 29 October 2026
- Page title: `Cellar Door Wines - Independent Online Wine Shop`
- Meta description: present and relevant
- H1: not detected
- Headings: 14
- Links: 417
- Images: 35
- Forms: 15
- Scripts: 87
- External scripts: 12
- HTML size: 411.1 KB

## Top 5 Recommendations

### 1. Add a Strong Homepage H1

Priority: High  
Area: SEO, accessibility, design clarity

The audit did not detect a clear `<h1>`. The homepage should have one primary H1 that tells search engines, screen readers and first-time visitors what the business is.

Recommended examples:

- `Independent Online Wine Shop Since 2004`
- `Cellar Door Wines | Independent Wine Merchant`
- `Discover Independent Wines, Spirits and Gifts Online`

Why it matters:

- Improves page structure for SEO.
- Gives assistive technology a clear page topic.
- Helps visitors understand the proposition immediately.

### 2. Reduce Homepage Link Density

Priority: High  
Area: User journey, conversion, crawl clarity

The homepage contains 417 links. For an ecommerce site, breadth is useful, but too many links can dilute attention and make it harder for users to choose their next step.

Recommended action:

- Prioritise the main buying routes above the fold.
- Group secondary links lower down the page.
- Reduce repeated navigation, footer and collection links where practical.
- Keep the homepage focused on the strongest commercial paths.

Suggested primary routes:

- Shop red wine
- Shop white wine
- Sparkling and Champagne
- Wine gifts
- Events and tastings
- Search

### 3. Audit Shopify Apps and Scripts

Priority: High  
Area: Performance, reliability, privacy

The page contains 87 scripts, including 12 external scripts. Some will be essential Shopify functionality, but many ecommerce sites accumulate apps, pixels and widgets over time.

Recommended action:

- Review every Shopify app and tracking integration.
- Remove apps that are not directly improving revenue, customer support or analytics.
- Defer non-critical scripts.
- Avoid loading popups, chat, reviews, loyalty tools or marketing scripts on every page unless they are actively used.

Why it matters:

- Improves page speed.
- Reduces layout instability risk.
- Improves privacy posture.
- Makes checkout and browsing more reliable.

### 4. Fix Missing Image Alt Text

Priority: Medium  
Area: Accessibility, image SEO

The audit found 4 images without alt text.

Recommended action:

- Add descriptive alt text for product, shop, event and brand images.
- Use empty `alt=""` only for decorative images.
- Avoid keyword stuffing; describe the image naturally.

Example:

```html
<img src="..." alt="Selection of independent red and white wines from Cellar Door Wines">
```

### 5. Add Missing Privacy/Security Headers

Priority: Medium  
Area: Security, privacy, trust

The site already has several useful security headers:

- `Strict-Transport-Security`
- `Content-Security-Policy`
- `X-Content-Type-Options`
- `X-Frame-Options`

Missing:

- `Referrer-Policy`
- `Permissions-Policy`

Recommended values:

```http
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
```

Implementation depends on Shopify theme/app/proxy control. If these cannot be set directly in Shopify, check whether Cloudflare rules, a Shopify app proxy, or edge configuration can add them.

## Design and Brand Presentation

The brand proposition is clear in the metadata: independent online wine store, established since 2004, more than 800 varieties in stock. That is strong trust-building material.

The page should make that proposition highly visible in the first viewport. A strong first impression would include:

- Clear H1.
- Short supporting line explaining why buy from Cellar Door Wines.
- One dominant shopping CTA.
- A small number of curated category routes.
- Trust signals: independent since 2004, stock range, delivery, expertise, events or tastings.

Avoid letting the homepage feel like a directory of every possible product path. The first screen should guide, not overwhelm.

## User Journey and Conversion

The likely visitor journeys are:

1. Buy a bottle or case now.
2. Find a gift.
3. Browse by wine type, region or occasion.
4. Learn about tastings/events.
5. Search for a known product.

Recommendations:

- Make search prominent.
- Put top categories near the top.
- Add guided routes such as “Wine for dinner”, “Gifts under £30”, “Mixed cases”, or “Staff picks”.
- Reduce competing links around the primary CTA.
- Ensure mobile navigation prioritises shopping routes and search.

## Accessibility and Content Clarity

The main accessibility issue found was missing image alt text. The missing H1 is also important for assistive technology.

Recommended checklist:

- Add one H1.
- Fix missing alt text.
- Check colour contrast on promotional banners and buttons.
- Ensure forms have visible labels and clear error states.
- Check keyboard navigation through menus, filters, popups and checkout paths.

## Technical Performance Signals

The page is heavy:

- 411.1 KB HTML
- 87 scripts
- 35 images
- 15 forms

This does not prove poor Core Web Vitals by itself, but it is a strong signal that performance should be reviewed.

Recommended next test:

```bash
pagespeed.web.dev
```

Test:

- Homepage
- Collection page
- Product page
- Cart
- Checkout entry path

Focus especially on:

- Largest Contentful Paint
- Interaction to Next Paint
- Cumulative Layout Shift
- Unused JavaScript
- Image sizing and lazy loading

## Security and Trust

The security baseline is generally good for a Shopify site. HTTPS is enabled, HSTS is present, CSP is present, frame protection is present and important Shopify cookies are marked Secure/HttpOnly/SameSite where visible.

Remaining trust improvements:

- Add `Referrer-Policy`.
- Add `Permissions-Policy`.
- Keep apps and third-party scripts under review.
- Ensure cookie consent and privacy messaging accurately reflect active trackers.

## Suggested 30-Day Action Plan

### Week 1

- Add homepage H1.
- Fix missing image alt text.
- Confirm the main above-the-fold CTA and shopping routes.

### Week 2

- Review Shopify apps and remove unused scripts/widgets.
- Run PageSpeed/Lighthouse tests across homepage, collection and product pages.

### Week 3

- Simplify homepage link density.
- Rework first viewport around the strongest commercial journeys.

### Week 4

- Add missing headers if platform configuration allows.
- Re-run passive audit and Lighthouse.
- Compare conversion signals before and after changes.

## Limits

This report is based on passive public inspection of HTML and response headers. It does not include authenticated Shopify admin access, analytics data, heatmaps, checkout testing, browser screenshots, full Lighthouse results, or penetration testing.
