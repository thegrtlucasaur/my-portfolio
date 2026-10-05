    # Matthieu Givelet Portfolio Design System

    ![Hero Viewport (1440x900)](images/hero-light.png)
    ![Full Page Capture](images/full-page.png)

    ## 1. Visual Theme & Atmosphere

    The design system of Matthieu Givelet presents a refined, gallery-grade digital portfolio atmosphere designed to

convey senior-level craftsmanship in front-end development and design. The site serves as a high-end personal brand
showcase directed at design agencies, tech studios, and discerning collaborators looking for bespoke digital  
 craftsmanship.

    The dominant visual language is strict editorial Swiss-style minimalism executed in high-contrast monochrome with

fluid typography, ultra-delicate 1px hairline dividers, and fluid viewport-scaled proportions. Rather than relying
on drop shadows, heavy cards, or colorful decoration, the interface uses abundant negative space, precision  
 typographic rhythm, and sculptural kinetic micro-interactions to create depth and authority.

    ### Key Characteristics
    - Stark monochrome foundation (#FFFFFF background, #000000 text) with razor-sharp black-and-white contrast.
    - Single electric neon accent (#FFFB24) reserved exclusively for title image container highlights.
    - Fluid viewport-based typography (`vw` units combined with `clamp()`) creating scale-invariant editorial

hierarchy.  
 - Deliberate 1px hairline horizontal separators (`#0000001A`) replacing surface elevation across all page  
 sections.  
 - Distinctive hero monogram layout with custom letterforms split across an embedded project image carousel.  
 - Directional hover animations: hover underlines that wipe across from right-to-left, and subtle project card  
 zoom with spring arrow reveals.  
 - Curated typographic brackets and index markers (`[ Approach ]`, `[ Open ]`, `[ Contact ]`, `01`, `(8)`)  
 reinforcing technical precision.

    ## 2. Color Palette & Roles

    The color strategy is strictly monochromatic and editorial, anchored on pure white and solid black with

calibrated translucent alpha overlays for hairlines and modals. The site operates exclusively in a crisp light mode
posture without a dark mode toggle or `prefers-color-scheme` variant.

    ### Primary
    | Hex | Role | Where seen |
    | --- | --- | --- |
    | `#FFFFFF` | Core surface background | `html`, `body`, `:root --color-background`, `.nav-logo`, `.burger-button`,

`.transition-block` |  
 | `#000000` | Primary text and headings | `html`, `body`, `:root --color-text`, `.home-hero-subtitle`, `.project-
  card-title`, `.home-title-letter` |

    ### Accent
    | Hex | Role | Where seen |
    | --- | --- | --- |
    | `#FFFB24` | Electric yellow highlight | `.work-title-image` background placeholder / highlight block |

    ### Semantic
    | Hex | Role | Where seen |
    | --- | --- | --- |
    | `#000000` | Neutral focus & active indicator | Link hover underlines (`.link-line::before`), active links |

    ### Surfaces
    | Hex | Role | Where seen |
    | --- | --- | --- |
    | `#FFFFFF` | Base canvas surface | `body`, `header`, `main` |
    | `#000000` | Fullscreen transition overlay | `:root --color-overlay`, `.transition-overlay` |
    | `#0000003B` | Scrim / loader backdrop (23% black) | `.loader-transition-back`, `.transition-back` |
    | `#00000022` | Modal backdrop scrim (13% black) | `.burger-mobile-overlay` |

    ### Borders
    | Hex | Role | Where seen |
    | --- | --- | --- |
    | `#0000001A` | Subtle hairline border (10% black) | `:root --color-border`, `.border`, `.burger-button` box-

shadow inset |  
 | `#00000061` | Active archive row divider (38% black) | `.archive-list-el::after` |

    ### Notes
    Color is deliberately restricted to maximize typographic focus and showcase project photography without chromatic

competition. Pure `#000000` is used for all text content and kinetic underlines. The singular chromatic pop  
 `#FFFB24` (fluorescent lemon) is strictly utilitarian, marking image thumbnail placeholders in the work directory.
No semantic status colors (green/red) are utilized; communication is conveyed purely through text labels and counts.

    ## 3. Typography Rules

    The typography system is anchored on `Neue Montreal` (loaded locally as `neuemontreal-regular.woff2`), a

contemporary geometric grotesque with clean humanist proportions. It handles all roles from colossal display titles
down to micro data tags, maintaining uniformity through varied viewport-relative sizing and tight tracking.

    ### Hierarchy
    | Role | Font | Size | Weight | Line height | Letter spacing |
    | --- | --- | --- | --- | --- | --- |
    | Display (Hero Title) | Neue Montreal | 11vw (desktop) / 13vw (mobile) | 400 | 95-100% | -0.015em |
    | Display (Page Titles) | Neue Montreal | 8vw (desktop) / clamp(1.5rem, 15vw, 4rem) | 400 | 100% | 0 |
    | Hero Subtitle (Secondary) | Neue Montreal | 2.8vw (desktop) / 5.8vw (mobile) | 400 | 112% | -0.02em |
    | H2 (Section Header) | Neue Montreal | 3.6vw (desktop) / 6vw (mobile) | 400 | 110% | 0 |
    | H3 / Subheading | Neue Montreal | 2vw / `var(--font-size-l)` | 400 | 120% | 0 |
    | Body Large / Lead | Neue Montreal | 1.55vw / `var(--font-size-m)` | 400 | 120% | 0 |
    | Body Regular / Nav | Neue Montreal | 1.25vw / `var(--font-size-s)` | 400 | 130% | 0 |
    | Caption / Secondary | Neue Montreal | 1vw / `var(--font-size-xs)` | 400 | 130% | 0 |
    | Location / Meta Tag | Neue Montreal | 0.95vw / clamp(0.82rem, 0.95vw, 1.1rem) | 400 | 120% | 0.04em |
    | Micro / Section Brackets | Neue Montreal | 0.8vw / `var(--font-size-xxs)` | 400 | 120% | 0 |

    ### Principles
    - A single typeface (`Neue Montreal`) powers all headings, body copy, and metadata, creating high typographic

cohesion.  
 - Proportional scaling is driven by viewport widths (`vw`), ensuring the typography scales fluidly between  
 standard laptop and large desktop viewports.  
 - Mobile viewports enforce minimum and maximum boundaries using CSS `clamp()` (e.g. `clamp(.8rem, 3.7vw, 1.      
  5rem)`).  
 - Tight vertical rhythm with line heights locked between 90% and 130% keeps multi-line editorial headings compact. - Text measures are strictly bounded: descriptive lead copy (`.infos-box-text`) is constrained to `max-width:    
  21vw`.  
 - Numerical indicators and structural tags are wrapped in square brackets (`[ Approach ]`, `[ Open ]`, `[ Contact
  ]`) and formatted at `0.8vw` for an architectural ledger feel.

    ## 4. Component Stylings

    ### Buttons
    - **Primary / Nav Button**:
      - Background: `var(--color-background)` (`#FFFFFF`)
      - Text color: `var(--color-text)` (`#000000`)
      - Border: None
      - Radius: `var(--radius-xs)` (`3px`)
      - Padding: `0.3vw 0.7vw` (desktop), `1vw 2vw` (mobile)
      - Hover state: Triggers `.link-line` underline wipe via pseudo-element.
    - **Mobile Menu Trigger (Burger Button)**:
      - Background: `var(--color-background)` (`#FFFFFF`)
      - Text color: `var(--color-text)` (`#000000`)
      - Border / Ring: `box-shadow: 0 0 0 1px inset var(--color-border)`
      - Radius: `var(--radius-xs)` (`3px`)
      - Padding: `1vw 2vw`
      - Entrance: `animation: burger-button-in 1s cubic-bezier(.18,.66,.18,1) both`

    ### Navigation Links
    - **Links with Raised Editorial Counts**:
      - Links for `Work` and `Archive` feature raised superscript project counts (`(8)`, `(16)`), while `About` has no count.
      - HTML structure: `<span class="nav-link-label link-line">Work</span><span class="nav-link-count" aria-label="8 projects">(8)</span>`
      - Positioning & Scale: `position: relative; top: 0; margin-left: 0.08em; font-size: 0.48em; line-height: 1; align-items: flex-start;`
      - Underline Behavior: The animated underline (`.link-line::before`) belongs strictly to the navigation label; the raised count is visually attached to the word shoulder and is not independently underlined or animated.

    ### Cards
    - **Project Grid Card (`.project-card`)**:
      - Surface: Transparent container
      - Media container (`.project-card-box`): `height: 33vw` (desktop) / `60vw` (mobile), `border-radius: var(--

radius-s)` (`4px`), `overflow: clip`                                                                               
      - Border: None                                                                                                 
      - Shadow: None                                                                                                 
      - Padding: 0                                                                                                   
      - Hover shift: Image scales slightly (`transform: scale(1.02)`with`1s cubic-bezier(.21,.83,.27,1.01)`). Title
  reveals right arrow icon sliding in from `translateX(-0.3vw)` with opacity fade.

    ### Inputs
    - **Input Posture**:
      - The portfolio deliberately avoids standard form inputs, routing inquiries through direct `mailto:` and

WhatsApp deep links.  
 - Derived spec (grounded in `:root` tokens): Background `#FFFFFF`, border `1px solid #0000001A`, focus ring  
 `1px solid #000000`, border-radius `3px` (`--radius-xs`), padding `0.6vw 0.8vw`, typography `var(--font-size-s)`.

    ### Navigation
    - **Desktop Navigation**:
      - Three-part split header: Left anchor (`©MatthieuGivelet`), center pill container (`Work (8)`, `Archive (16)`,

`About`), right contact button (`Get in touch`).  
 - Centering: `.nav-links-wrapper` absolutely positioned at `left: 50%`, `transform: translateX(-50%)`.  
 - Padding: `1.7vw 1.8vw`.  
 - Active states: `.link-line-active` with permanent 1px solid underline.  
 - **Mobile Navigation**:  
 - Collapses into floating top bar (`padding: 4vw`) with burger button.  
 - Fullscreen sliding drawer (`.burger-mobile`) with `#00000022` backdrop overlay, bracketed navigation title `[
  Navigation ]`, and large staggered link list with project counts.

    ### Image Treatment
    - Border radius: Standardized at `var(--radius-s)` (`4px`) on cards, `var(--radius-xs)` (`3px`) on thumbnail

boxes.  
 - Aspect ratios: Wide landscape container `height: 33vw` on 50% grid cards (~16:9 ratio).  
 - Object fit: `object-fit: cover` with `width: 100%`, `height: 100%`.  
 - Overlay / Gradients: Clean unadorned photography with no color grade or tint overlays.

    ### Distinctive Components
    1. **Interactive Monogram & Split Hero Title**:
       - Distinctive "Mark [IMAGE] Bryan" hero title with embedded artwork aperture (`.home-title-image-box`) automatically rotating featured poster artwork every 1500ms with zero cursor interaction.                                                                                    
    2. **Animated Hairline Separator (`.border`)**:                                                                  
       - 1px divider with `background: var(--color-border)` (`#0000001A`), scaling smoothly from left to right       
  (`transform: scaleX(0) -> scaleX(1)`) via `animation: border-in 1.7s cubic-bezier(.18,.66,.18,1)`.                 
    3. **Bi-directional Hover Underline (`.link-line`)**:                                                            
       - 1px line anchored to the bottom of links. Rest state: `scaleX(0)`with`transform-origin: bottom right`.    
  Hover state: `scaleX(1)`with`transform-origin: bottom left`, producing a directional pass-through underline      
  motion.                                                                                                            
    4. **Editorial Monospace Meta Labels**:                                                                          
       - Category tags and section markers framed with square brackets (`[ Approach ]`, `[ Open ]`, `[ Contact ]`, `[
Queensland ]`) set at `var(--font-size-xxs)` (`0.8vw`).

    ## 5. Layout Principles

    ### Spacing Scale
    Layout spacing is anchored on fluid viewport percentage units (`vw`) for macroscopic layout, paired with small

pixel values for tight hairpins:  
 - Fluid Spacing Ramp: `0.3vw` (4px), `0.5vw` (7px), `0.7vw` (10px), `1vw` (14px), `1.5vw` (21px), `1.8vw` (26px),
`2vw` (28px), `2.5vw` (36px), `3.5vw` (50px), `5vw` (72px), `7vw` (100px), `9vw` (130px).  
 - Fixed Spacing Steps: `1px` (hairline dividers), `3px` (grid gutter).

    ### Grid
    - Container: Full-bleed fluid canvas with consistent horizontal inset margins:
      - Desktop: `margin: 0 2.5vw 4vw` or `padding: 0 2.5vw` (providing a balanced 95vw content width).
      - Mobile: `margin: 0 4vw 15vw` or `padding: 0 4vw`.
    - Card Grid: Strict 2-column equal split (`grid-template-columns: 1fr 1fr; gap: 3px;`).
    - Info / Meta Grid: Asymmetric 2-column layout (`grid-template-columns: 1fr 1fr;`) pairing section category tags

on the left with descriptive lead copy on the right.

    ### Whitespace
    Whitespace philosophy is expansive, editorial, and Scandinavian/Swiss-inspired. Ample vertical breathing room

(`5vw` to `9vw` section padding on desktop; up to `25vw` on mobile) gives every project card and typographic block
singular presence, mirroring physical museum catalogue page layouts.

    ### Radius Scale
    - `xs`: `3px` (`--radius-xs`) — Used for buttons, navigation capsules, and badge icons.
    - `s`: `4px` (`--radius-s`) — Used for project card image containers and work image blocks.
    - `none`: `0px` — Used for main dividers, cards, and page layout containers.

    ## 6. Depth & Elevation

    ### Levels
    | Level | Use | Shadow |
    | --- | --- | --- |
    | 0 | Canvas background & all content cards | `none` |
    | 1 | Border-defined controls (Burger button) | `box-shadow: 0 0 0 1px inset #0000001A` |
    | 2 | Mobile Drawer Scrim | `background: #00000022` |
    | 3 | Page Transition & Loader Blocks | `background: #0000003B` / `#000000` |

    ### Philosophy
    The design system entirely rejects traditional skeuomorphic elevation, drop shadows, and card blur effects. Depth

is achieved exclusively through 1px translucent hairline borders (`#0000001A`), layered z-index sequencing  
 (`transition-overlay`, `loader`, `burger-mobile`), and full-bleed opacity curtains.

    ## 7. Interaction & Motion

    ### Hover States
    - **Links (`.link-line`)**:
      - Resting: Pseudo-element `::before` at `scaleX(0)`, `transform-origin: bottom right`.
      - Hover: Pseudo-element transforms to `scaleX(1)`, `transform-origin: bottom left` with duration `0.7s cubic-

bezier(.18, .83, .27, 1)`.                                                                                         
    - **Project Cards (`.project-card`)**:                                                                           
      - Image: Scales to `1.02`with`transition: transform 1s cubic-bezier(.21,.83,.27,1.01)`.                      
      - Arrow Icon: Fades from `opacity: 0`to`opacity: 1`and translates from`translateX(-0.3vw)`to              
 `translateX(0)`.                                                                                                   
    - **Archive Rows (`.archive-list-el`)**:                                                                         
      - Underline pseudo-element fades in (`opacity: 1`, `#00000061`).

    ### Focus States
    - Keyboard focus is handled through default high-contrast browser outline rings (`2px solid #000000`) with no

destructive `outline: none` overrides on interactive elements.

    ### Transitions
    - Standard Entrance / Scroll Curve: `cubic-bezier(.18, .66, .18, 1)` with durations `0.7s`, `0.8s`, `1.2s`, `1.

7s`.                                                                                                               
    - Interactive Spring Curve: `cubic-bezier(.21, .83, .27, 1.01)`with duration`1s`.                              
    - Linear / Whip Transitions: `cubic-bezier(.76, 0, .47, .95)`with duration`1s`(used for page wipe transitions).
    - Hero Monogram Perspective:`cubic-bezier(.28, .54, .39, 1)`(duration`1.5s`) for 3D rotation and scale.       
    - Properties animated: `transform`, `opacity`, `scaleX`. Layout reflow properties (`width`, `margin`) are avoided
during animation.

    ## 8. Responsive Behavior

    ### Breakpoints
    | Name | Max width | Primary changes |
    | --- | --- | --- |
    | Mobile (`md`) | `768px` | Navbar collapses to burger button; navigation switches to fullscreen drawer; project

grid shifts from 2 columns (`1fr 1fr`) to 1 column (`flex-direction: column`); card height increases from `33vw` to
`60vw`; padding expands from `2.5vw` to `4vw`; typography scales via `clamp()`. |  
 | Desktop | `> 768px` | Full 3-part horizontal navbar; 2-column project cards with `3px` hairline gap; fluid `vw`
typography. |

    ### Touch Targets
    On mobile devices (`<= 768px`), all touch targets meet or exceed 44x44px. The mobile burger button occupies an

explicit `padding: 1vw 2vw` envelope, drawer links feature substantial vertical rhythm (`gap: 0.7rem` to `1vw`),  
 and project cards become full-width tap surfaces.

    ### Collapsing Strategy
    - Header navigation hides desktop links (`.desktop-el { display: none; }`) and presents a floating capsule burger

button.  
 - Two-column project grid collapses into a single vertical column with `gap: 7vw` and `margin-bottom: 24vw`.  
 - The hero monogram maintains proportionality by increasing letter height from `11vw` to `14vw` while stacking  
 the subtitle lines compactly.  
 - Hover-only link lines automatically lock to visible rest state (`.link-line::before { transform: scaleX(1); }`)
since touch devices lack cursor hovering.

    ### Image Behavior
    Images use `object-fit: cover` within containers governed by viewport percentages. Card containers maintain a

crisp aspect ratio without layout shift using CSS `overflow: clip` and `border-radius: var(--radius-s)`.

    ## 9. Agent Prompt Guide

    ### Quick Color Reference
    ```text
    #FFFFFF  // surface.base / primary background
    #000000  // text.primary / brand black
    #0000001A  // border.subtle (10% opacity hairline)
    #FFFB24  // accent.highlight (electric yellow thumbnail background)
    #00000022  // surface.scrim-subtle (13% opacity drawer backdrop)
    #0000003B  // surface.scrim-deep (23% opacity transition block)
    #00000061  // border.active-row (38% opacity archive divider)


### Example Prompts

1. Hero Header Prompt:  
   │ "Build a minimalist portfolio hero section using pure white #FFFFFF background, solid black #000000 typography in
   │ Neue Montreal, and fluid viewport typography. Place a centered 3-part header with logo on left, floating pill  
   │ navigation in center, and a 'Get in touch' link with a 3px radius. Render a massive centered display title with  
   │ tight letter spacing, accompanied by an editorial subtitle and a 1px hairline horizontal divider (#0000001A) that
   │ scales into view from the left."  

2. Project Grid Card Prompt:  
   │ "Create a 2-column project showcase grid separated by a 3px hairline gap. Each card features an image container  
   │ with a 4px border-radius, height: 33vw, and overflow: clip. On hover, the image scales subtly by 1.02 over a 1-  
   │ second spring cubic-bezier(.21, .83, .27, 1.01). Below each image, show an index number (e.g. '01') in 0.8vw text,
   │ the project title in 1.55vw text, and an arrow icon that slides in from translateX(-0.3vw) while fading in on  
   card  
   │ hover."  

3. Directional Link Animation Prompt:  
   │ "Implement a Swiss-inspired text link component in #000000 text with a custom underline wipe. The link has a  
   │ pseudo-element ::before anchored at bottom: 0, height: 1px, background: #000000. At rest, set transform:  
   scaleX(0)  
   │ with transform-origin: bottom right. On hover, set transform: scaleX(1) with transform-origin: bottom left using
   │ transition: transform 0.7s cubic-bezier(0.18, 0.83, 0.27, 1). On viewports <= 768px, permanently display the  
   │ underline with scaleX(1)."

### Iteration Guide

• Adjusting Negative Space: Keep desktop page container padding at 2.5vw and mobile at 4vw. If tightening layout  
 for denser information architecture, reduce section vertical padding from 5vw to 3vw, but preserve the 3px fixed  
 gutter in the project grid.  
 • Modifying Accent Tones: Replace #FFFB24 with any high-chroma neon (e.g. electric lime #39FF14 or cyan #00F0FF)  
 for image thumbnail placeholders without disrupting the monochrome foundation. Never apply high-chroma accents to  
 body text or background surfaces.  
 • Introducing Dark Mode: If creating an inverted variant, map #FFFFFF to #0B0B0B, #000000 to #F5F5F5, and hairline
border #0000001A to #FFFFFF1F (12% white). Keep easing curves and border radii identical.  
 • Maintaining Motion Rigor: Always pair entrance animations with cubic-bezier(.18, .66, .18, 1) and interactive  
 hovers with cubic-bezier(.21, .83, .27, 1.01). Avoid generic ease-in-out curves.

    The file is saved on disk at:
    - **`design.md`**: design.md
    - **Screenshots**:  (hero-light.png, full-page.png)
