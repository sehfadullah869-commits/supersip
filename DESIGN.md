# Design Brief: SuperSip E-commerce

## Tone
Fresh, modern, energetic—vibrant yet refined. Premium beverage brand with contemporary digital presence. Approachable and trustworthy.

## Purpose & Problem
SuperSip sells beverages online (cold drinks, mineral water, juice). Design must inspire purchase confidence while communicating energy and vitality. Shopping experience should feel premium, not generic.

## Color Palette

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| Primary (Orange) | `0.58 0.22 45` | `0.72 0.20 45` | CTAs, highlights, hero accents, energy |
| Secondary (Teal) | `0.55 0.15 200` | `0.65 0.14 200` | Secondary actions, accents, refreshment |
| Accent (Citrus) | `0.68 0.18 50` | `0.78 0.16 50` | Tertiary highlights, badges |
| Background | `0.99 0.01 45` | `0.12 0.01 45` | Warm cream base (light), deep charcoal (dark) |
| Card | `1.0 0.01 45` | `0.16 0.01 45` | Product cards, modals, elevated surfaces |
| Foreground | `0.15 0.01 45` | `0.92 0.01 45` | Body text, primary content |
| Muted | `0.93 0.02 45` | `0.2 0.01 45` | Secondary text, disabled states |
| Destructive | `0.55 0.22 25` | `0.65 0.19 22` | Error, remove, cancel actions |

## Typography
- **Display**: Bricolage Grotesque (geometric, bold, modern) — hero, product names, nav emphasis
- **Body**: DM Sans (humanist, clean, legible) — body copy, product descriptions, UI labels
- **Mono**: System monospace — pricing, order numbers, code blocks

## Elevation & Depth
- **Header**: Elevated with warm tint (`--card`), bottom border separator
- **Cards**: Soft rounded corners, `shadow-card` for subtle lift
- **Modals/Popovers**: `shadow-elevated` for prominence
- **Hover states**: Primary button brighten via accent color, cards lift slightly
- **Border radius**: 12px base, 8px on tight components, 16px on large hero sections

## Structural Zones

| Zone | Treatment | Purpose |
|------|-----------|---------|
| Header/Nav | Elevated card background, bottom border | Navigation prominence, clear separation |
| Hero | Full-width background with accent overlay, featured product | Brand presence, shopping intent |
| Product Grid | Cards with `shadow-card`, alternating subtle backgrounds | Product browsing, scannable grid |
| Cart/Checkout | Modal with `shadow-elevated`, orange primary CTA | Purchase confidence, clear funnel |
| Footer | `bg-muted/40`, text-muted-foreground, minimal text | Information anchor, unobtrusive |

## Spacing & Rhythm
- **Unit**: 0.25rem (4px)
- **Padding**: 8px, 12px, 16px, 24px, 32px
- **Margins**: 16px, 24px, 32px, 48px
- **Product cards**: 16px internal padding, 24px gap between cards
- **Breathing room**: 32px margin above/below major sections

## Component Patterns
- **Primary Button**: Orange background, white text, rounded 8px, hover: brighter orange
- **Secondary Button**: Teal background, white text, rounded 8px
- **Card**: White/card background, `shadow-card`, rounded 12px, overflow hidden for images
- **Input**: Light gray border, focus ring in primary orange, rounded 8px
- **Product Badge**: Small rounded pill, accent background, small text
- **Navigation**: Top fixed bar, left sidebar for admin dashboard

## Motion
- **Transitions**: `transition-smooth` (0.3s cubic-bezier) for all interactive states
- **Hover**: Button fill + slight scale up (1.02x)
- **Entrance**: Fade + slide up (200ms) for cards, modals
- **Loading**: Pulsing skeleton cards during fetch

## Constraints
- Light mode default; dark mode supported
- Mobile-first responsive (sm, md, lg breakpoints)
- High contrast for accessibility (AA+)
- No generic blue; all colors tied to beverage brand story
- Animations serve function, never pure decoration

## Signature Detail
**Warm orange + cool teal juxtaposition** creates distinctive energy. Most e-commerce defaults to blue or purple—SuperSip's citrus palette is instantly memorable. Combined with geometric Bricolage display font, the brand reads "premium, contemporary, vital" rather than "corporate" or "playful."
