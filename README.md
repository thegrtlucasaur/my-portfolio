# Portfolio Website

A responsive editorial portfolio built with HTML, CSS, and vanilla JavaScript, powered by Vite.

## Project Structure

```text
my-portfolio/
├── index.html
├── package.json
├── vite.config.js
├── design.md
├── public/
│   ├── assets/
│   │   ├── about/profile.jpg
│   │   ├── icons/
│   │   └── posters/featured/  # WebP images served by the site
│   └── fonts/
├── source-assets/
│   └── posters/               # Original PNG files, kept out of the site build
└── src/
    ├── css/style.css
    └── js/main.js
```

## Getting Started

Install dependencies with `npm install`, then run `npm run dev` to start the local Vite server.

Available scripts:

- `npm run dev` — start the development server.
- `npm run build` — create the production site in `dist/`.
- `npm run preview` — preview the production build locally.

## Content and Assets

- Edit the page content and contact details in `index.html`.
- Edit project entries in the `projects` array in `src/js/main.js`. Work contains six poster designs and two videos; Archive lists all eight items.
- Runtime poster images are optimized WebP files in `public/assets/posters/featured/`.
- Original poster PNGs are kept in `source-assets/posters/` and are not served or copied into the production build.
- The About profile image is `public/assets/about/profile.jpg`.
- The contact form validates the inquiry and opens a prefilled email in the visitor's email app. The visitor still needs to send it from that app.
