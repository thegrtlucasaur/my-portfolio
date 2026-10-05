# Portfolio Website

A fast, responsive, and editorial portfolio website built with clean HTML, Modern CSS, and Vanilla JavaScript, powered by Vite.

## Project Structure

```
my-portfolio/
├── index.html           # Main HTML entry point
├── package.json         # Project configuration and Vite scripts
├── public/
│   └── images/          # Static assets (project screenshots, posters, videos)
├── src/
│   ├── css/
│   │   └── style.css    # Clean, responsive CSS with design tokens
│   └── js/
│       └── main.js      # Vanilla JS for dynamic work rendering & category filtering
└── README.md            # Documentation & customization guide
```

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```
The optimized static build will be generated in `dist/`.

### 4. Preview Production Build
```bash
npm run preview
```

## How to Customize

- **Name & Hero Text**: Edit the headline and subtitle in [index.html](file:///Users/thegrtlcs/Documents/Projects/my-portfolio/index.html).
- **Projects / Selected Works**: Update the `projects` array in [src/js/main.js](file:///Users/thegrtlcs/Documents/Projects/my-portfolio/src/js/main.js). You can change titles, years, categories (`poster`, `graphic`, `video`), and color themes.
- **Images**: Add real project images into `public/images/`.
- **About Bio & Skills**: Edit the paragraphs and list items under `<section id="about">` in `index.html`.
- **Contact Details**: Update the email address and social links in `<footer id="contact">` in `index.html`.
