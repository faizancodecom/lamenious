<div align="center">

# EMANS
### HAUTE COUTURE & LUXURY SARTORIAL ATELIER

*The Architecture of Confidence &mdash; Designed in Paris, Tailored for the World.*

<br/>

[![React 19](https://img.shields.io/badge/React-19.0.0-black?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-black?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-black?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![TailwindCSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-black?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-ScrollTrigger-black?style=for-the-badge&logo=greensock)](https://greensock.com/gsap/)
[![Lenis](https://img.shields.io/badge/Lenis-Smooth_Scroll-black?style=for-the-badge)](https://lenis.darkroom.engineering/)

<br/>

[Overview](#-overview) &bull;
[Key Experiences](#-cinematic-experiences--features) &bull;
[Design Philosophy](#-design-system--editorial-philosophy) &bull;
[Tech Stack](#-technology-stack) &bull;
[Architecture](#-project-structure) &bull;
[Quickstart](#-getting-started) &bull;
[Ateliers](#-flagship-ateliers)

---

</div>

<br/>

## Overview

**EMANS** is an avant-garde, editorial digital experience crafted for a premier haute couture atelier and luxury shirtmaker. Built upon the premise that clothing is not merely fabric, but the silent language of identity and personal expression, this web application pushes the boundaries of modern creative frontend engineering.

The digital atelier combines ultra-fluid physics-based smooth scrolling, multi-layer GSAP scroll orchestrations, SVG displacement liquid distortions, 3D typography transforms, and cinematic editorial photography to deliver an unforgettable brand showcase.

---

## Cinematic Experiences & Features

### 1. Kinetic Typography & 3D Hero Realm
* **Staggered 3D Perspective Reveals:** Individual glyphs animate in 3D space with perspective transforms, custom eases, and dynamic scale shifts.
* **Scroll-Reactive Kinetic Tilt:** Subtle rotation and skew on the massive `EMANS` typography as the user begins their journey down the runway.
* **Scroll-Triggered Character Glitch:** Micro-glitch character mutation algorithm that decrypts letters during scroll acceleration.

### 2. Physics-Based Smooth Inertial Scrolling
* Powered by **Lenis** to provide momentum scrolling, eliminating browser stutter and delivering a cohesive editorial rhythm.
* Optimized frame pacing synchronizes seamlessly with GSAP `ScrollTrigger` instances.

### 3. Liquid Distortion Filter
* Real-time SVG `<feDisplacementMap>` and turbulence shaders respond dynamically to scroll velocity, creating an organic fluid ripple over featured silhouettes.

### 4. Interactive Editorial Lookbook
* Pinned multi-slide presentation featuring layered blur crossfades, depth scaling, and tilt angles that mirror luxury editorial print magazines.

### 5. Signature Piece Deep-Dive
* Interactive inspection of signature garments:
  * **Slit-reveal image masking** using geometric polygon clip paths.
  * **Interactive Fabric Anatomy:** Exploded view of single-needle stitching, natural horn buttons, and floating canvas structure.

### 6. Horizontal Runway Gallery
* GSAP pinned horizontal scroll runway that transforms vertical scroll motion into a continuous lateral exhibition of seasonal cuts.

### 7. Tactile Micro-Interactions
* **Bespoke Dual-Ring Cursor:** Magnetic smoothing cursor with `mix-blend-mode: difference` for high-contrast cursor tracking across light and dark elements.
* **Organic Analog Noise Layer:** Film grain texture overlay simulating high-end editorial grain and film chemistry.

---

## Design System & Editorial Philosophy

| Token | Value | Description |
| :--- | :--- | :--- |
| **Ink** | `#0a0a0a` | Deep nocturnal black background evoking bespoke tailoring ateliers |
| **Paper** | `#f5f5f4` | High-grade warm cream archival paper tone for typography and accents |
| **Stone** | `#1c1c1c` | Subtle structural borders, card backdrops, and muted dividers |
| **Serif Typeface** | `Cormorant Garamond` | Traditional haute-couture editorial typography |
| **Sans Typeface** | `Inter` | Clean, geometric grotesque for technical specs and navigation |

---

## Technology Stack

* **Framework:** [React 19](https://react.dev/)
* **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict type safety)
* **Build System:** [Vite 6](https://vitejs.dev/) with Fast Refresh
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with native CSS theme variables
* **Motion & Animation Engine:** [GSAP 3](https://greensock.com/gsap/) (`ScrollTrigger`, `Timeline`) & [Motion](https://motion.dev/)
* **Smooth Scrolling:** [Lenis](https://lenis.darkroom.engineering/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Deployment Target:** [Netlify](https://www.netlify.com/) (Configuration ready via `netlify.toml`)

---

## Project Structure

```text
lamenious/
├── public/                 # Static public assets
├── src/
│   ├── components/         # Modular cinematic UI components
│   │   ├── Craftsmanship.tsx       # Hand-tailored precision & artisan details
│   │   ├── CustomCursor.tsx        # Dynamic magnetic blend cursor
│   │   ├── DepthScene.tsx          # Multi-layer parallax depth exhibition
│   │   ├── FabricScience.tsx       # Sea Island & Giza 45 cotton breakdown
│   │   ├── FeaturedShirt.tsx       # Signature shirt anatomy & interactive slit reveal
│   │   ├── Footer.tsx              # Editorial footer with massive ambient branding
│   │   ├── Hero.tsx                # 3D typographic kinetic entrance
│   │   ├── HorizontalGallery.tsx   # Pinned horizontal runway gallery
│   │   ├── LiquidFilter.tsx        # Dynamic SVG turbulence displacement shader
│   │   ├── Locations.tsx           # Global flagship atelier directory
│   │   ├── Lookbook.tsx            # Multi-layer seasonal editorial lookbook
│   │   ├── Manifesto.tsx           # Atelier philosophy & slow fashion ethos
│   │   ├── Materials.tsx           # Sourcing transparency & natural materials
│   │   ├── Navbar.tsx              # Minimalist luxury navigation header
│   │   ├── Noise.tsx               # Film grain analog overlay
│   │   ├── Philosophy.tsx          # Architectural tailoring philosophy
│   │   ├── ScrubText.tsx           # Scroll-scrub kinetic quote reveals
│   │   ├── Silhouette.tsx          # Precision cut & drape analysis
│   │   ├── SmoothScroll.tsx        # Lenis smooth scroll provider
│   │   ├── Story.tsx               # Chapter 01: The Origin narrative
│   │   └── TheProcess.tsx          # 6-step bespoke creation process
│   ├── App.tsx             # Root application orchestrator
│   ├── index.css           # Design tokens, web fonts, and Tailwind v4 setup
│   └── main.tsx            # React application entry point
├── .gitignore              # Clean version control exclusions
├── index.html              # Document shell with SEO & typography headers
├── netlify.toml            # Production deployment configuration
├── package.json            # Dependencies and development scripts
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build pipeline and plugin setup
```

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
* [Node.js](https://nodejs.org/) (Version 18.x, 20.x, or higher)
* `npm`, `pnpm`, or `yarn`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/emans-luxury-atelier.git
   cd emans-luxury-atelier
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to experience the atelier.

---

## Available Scripts

| Script | Command | Purpose |
| :--- | :--- | :--- |
| `dev` | `npm run dev` | Launches the local development server on port `3000` |
| `build` | `npm run build` | Compiles TypeScript and builds production-ready bundles into `dist/` |
| `preview` | `npm run preview` | Serves the production build locally for verification |
| `lint` | `npm run lint` | Performs static type verification using TypeScript compiler |
| `clean` | `npm run clean` | Removes the compiled `dist/` build output |

---

## Flagship Ateliers

* **Paris:** Rue Saint-Honor&eacute;, 75001 Paris, France
* **London:** Mayfair, W1K 2AL London, United Kingdom
* **New York:** SoHo, Manhattan, NY 10012, United States
* **Tokyo:** Omotesando, Minato City, Tokyo 107-0062, Japan

---

## Production Deployment

This project is optimized for deployment on modern edge platforms such as **Netlify**, **Vercel**, or **GitHub Pages**:

```bash
# Build the production distribution
npm run build
```

The output directory `dist/` contains all optimized JavaScript, CSS, and HTML assets ready for immediate static delivery.

---

## License

This project is licensed under the [Apache-2.0 License](LICENSE).

<br/>

<div align="center">
  <sub>Crafted with passion for haute horlogerie, bespoke sartorial tailoring, and modern web motion.</sub>
</div>
