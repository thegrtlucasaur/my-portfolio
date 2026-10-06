/**
 * Portfolio Main JavaScript Entrypoint
 * Minimal Neutral Editorial Architecture inspired by Matthieu Givelet
 * Palette: #FFFFFF | #000000 | rgba(0,0,0,0.10) | rgba(0,0,0,0.45)
 */

// ============================================================================
// 1. DATA SOURCE: POSTER PROJECTS & EDITORIAL ARCHIVE
// ============================================================================

export const projects = [
  {
    id: 'video-01',
    title: 'Video 01',
    type: 'video',
    category: 'Video',
    detail: 'Video',
    // Artist and Date intentionally omitted: metadata is unknown
    thumbnail: 'https://img.youtube.com/vi/Hs9IYRFnbw4/maxresdefault.jpg',
    image: 'https://img.youtube.com/vi/Hs9IYRFnbw4/maxresdefault.jpg',
    videoId: 'Hs9IYRFnbw4',
    videoUrl: 'https://www.youtube.com/watch?v=Hs9IYRFnbw4',
    embedUrl: 'https://www.youtube.com/embed/Hs9IYRFnbw4',
    aspect: '16/9',
    featured: true,
    alt: 'Video 01 (Hs9IYRFnbw4)'
  },
  {
    id: 'video-02',
    title: 'Video 02',
    type: 'video',
    category: 'Video',
    detail: 'Video',
    // Artist and Date intentionally omitted: metadata is unknown
    thumbnail: 'https://img.youtube.com/vi/PlxLF6Z_oRg/maxresdefault.jpg',
    image: 'https://img.youtube.com/vi/PlxLF6Z_oRg/maxresdefault.jpg',
    videoId: 'PlxLF6Z_oRg',
    videoUrl: 'https://www.youtube.com/watch?v=PlxLF6Z_oRg',
    embedUrl: 'https://www.youtube.com/embed/PlxLF6Z_oRg',
    aspect: '16/9',
    featured: true,
    alt: 'Video 02 (PlxLF6Z_oRg)'
  },
  {
    id: 'oh-yeah',
    title: 'oh yeah?',
    category: 'Poster Design',
    artist: 'Steve Lacy',
    year: '2026',
    image: '/assets/posters/featured/oh-yeah-steve-lacy.webp',
    fullImage: '/assets/posters/featured/oh-yeah-steve-lacy-full.webp',
    originalImage: '/assets/posters/featured/oh-yeah-steve-lacy.png',
    aspect: '4/5',
    featured: true,
    alt: 'oh yeah? - Steve Lacy poster design (2026)'
  },
  {
    id: 'multo',
    title: 'Multo',
    category: 'Poster Design',
    artist: 'Cup of Joe',
    year: '2025',
    image: '/assets/posters/featured/Multo.webp',
    fullImage: '/assets/posters/featured/Multo-full.webp',
    originalImage: '/assets/posters/featured/Multo.png',
    aspect: '3/4',
    featured: false,
    alt: 'Multo - Cup of Joe poster design (2025)'
  },
  {
    id: 'undressed',
    title: 'Undressed',
    category: 'Poster Design',
    artist: 'Sombr',
    year: '2025',
    image: '/assets/posters/featured/undressed.webp',
    fullImage: '/assets/posters/featured/undressed-full.webp',
    originalImage: '/assets/posters/featured/undressed.png',
    aspect: '3/4',
    featured: true,
    alt: 'Undressed - Sombr poster design (2025)'
  },
  {
    id: 'captcha',
    title: 'captcha',
    category: 'Poster Design',
    // Artist intentionally omitted: do NOT display "None", "N/A", etc.
    year: '2025',
    image: '/assets/posters/featured/captcha.webp',
    fullImage: '/assets/posters/featured/captcha-full.webp',
    originalImage: '/assets/posters/featured/captcha.png',
    aspect: '3/4',
    featured: false,
    alt: 'captcha - Poster design (2025)'
  },
  {
    id: 'its-loss',
    title: 'its it loss?',
    category: 'Poster Design',
    // Artist intentionally omitted
    year: '2025',
    image: '/assets/posters/featured/it%20it%20loss%3F.webp',
    fullImage: '/assets/posters/featured/it%20it%20loss%3F-full.webp',
    originalImage: '/assets/posters/featured/it%20it%20loss%3F.png',
    aspect: '3/4',
    featured: false,
    alt: 'its it loss? - Poster design (2025)'
  },
  {
    id: 'protected-content',
    title: 'protected content',
    category: 'Poster Design',
    // Artist intentionally omitted
    year: '2025',
    image: '/assets/posters/featured/protected%20content.webp',
    fullImage: '/assets/posters/featured/protected%20content-full.webp',
    originalImage: '/assets/posters/featured/protected%20content.png',
    aspect: '3/4',
    featured: false,
    alt: 'protected content - Poster design (2025)'
  }
];

// Configurable Featured Project Selection on Home
// Can easily be changed at any time by updating this array
export const featuredProjectIds = ['video-01', 'video-02', 'oh-yeah', 'undressed'];

export function getFeaturedProjects() {
  return featuredProjectIds
    .map(id => projects.find(p => p.id === id))
    .filter(Boolean);
}

// ============================================================================
// 2. EDITORIAL SPA ROUTER & CURTAIN TRANSITION
// ============================================================================

let currentRoute = 'home';
let isTransitioning = false;
let isInitialLoading = true;
let isIntroRunning = false;
let introHasRun = false;

const routes = {
  '/': 'home',
  '/home': 'home',
  '/work': 'work',
  '/archive': 'archive',
  '/about': 'about',
  '/contact': 'contact'
};

/**
 * Normalizes browser path or hash to route token
 */
function resolveRouteFromLocation() {
  const hash = window.location.hash.replace(/^#\/?/, '');
  if (hash && ['home', 'work', 'archive', 'about', 'contact'].includes(hash)) {
    return hash;
  }

  const path = window.location.pathname.replace(/\/$/, '') || '/';
  if (routes[path]) return routes[path];

  return 'home';
}

/**
 * Sets the active route immediately without animation (used on initial page load)
 */
export function setRouteImmediate(targetRoute) {
  const validRoutes = ['home', 'work', 'archive', 'about', 'contact'];
  if (!validRoutes.includes(targetRoute)) {
    targetRoute = 'home';
  }

  document.querySelectorAll('.view-section').forEach(section => {
    section.classList.remove('is-active', 'page-entering');
  });

  const activeSection = document.getElementById(`view-${targetRoute}`);
  if (activeSection) {
    activeSection.classList.add('is-active', 'page-entering');
  }

  document.querySelectorAll('[data-route]').forEach(link => {
    const linkRoute = link.getAttribute('data-route');
    link.classList.toggle('is-active', linkRoute === targetRoute);
  });

  currentRoute = targetRoute;
  if (targetRoute === 'home') {
    if (!isInitialLoading && !isIntroRunning) {
      const box1 = document.querySelector('.home-title-box-1');
      const box2 = document.querySelector('.home-title-box-2');
      const imageBox = document.querySelector('.home-title-image-box');
      if (box1) box1.classList.add('is-animated');
      if (box2) box2.classList.add('is-animated');
      if (imageBox) imageBox.classList.add('is-animated');
      startHeroCycle();
    }
  } else {
    stopHeroCycle();
  }
  if (targetRoute === 'archive') {
    setupArchiveHover();
  }
  if (targetRoute === 'about') {
    lastAppliedProgress = null;
    lastAppliedScale = null;
    updateAboutMetrics();
    updateAboutPhotoScale();
  }
  if (!isInitialLoading) {
    setupScrollAnimations();
  }
}

/**
 * Triggers the two-layer neutral curtain transition and switches views
 */
export function navigateTo(targetRoute, updateHistory = true) {
  if (isTransitioning) return;
  if (targetRoute === currentRoute) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    closeMobileDrawer();
    return;
  }

  const validRoutes = ['home', 'work', 'archive', 'about', 'contact'];
  if (!validRoutes.includes(targetRoute)) {
    targetRoute = 'home';
  }

  isTransitioning = true;
  closeMobileDrawer();

  const overlay = document.getElementById('transitionOverlay');
  const curtainBlock = overlay?.querySelector('.transition-block');
  const curtainBack = overlay?.querySelector('.transition-back');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (updateHistory) {
    const targetUrl = targetRoute === 'home' ? '/' : `/${targetRoute}`;
    window.history.pushState({ route: targetRoute }, '', targetUrl);
  }

  const switchViews = () => {
    // Hide all views and show target
    document.querySelectorAll('.view-section').forEach(section => {
      section.classList.remove('is-active', 'page-entering');
    });

    const activeSection = document.getElementById(`view-${targetRoute}`);
    if (activeSection) {
      activeSection.classList.add('is-active');
      void activeSection.offsetWidth; // Force reflow for subtle stagger animation
      activeSection.classList.add('page-entering');
    }

    // Update navigation active states
    document.querySelectorAll('[data-route]').forEach(link => {
      const linkRoute = link.getAttribute('data-route');
      link.classList.toggle('is-active', linkRoute === targetRoute);
    });

    currentRoute = targetRoute;
    window.scrollTo(0, 0);

    if (targetRoute === 'home') {
      const box1 = document.querySelector('.home-title-box-1');
      const box2 = document.querySelector('.home-title-box-2');
      const imageBox = document.querySelector('.home-title-image-box');
      if (box1) box1.classList.add('is-animated');
      if (box2) box2.classList.add('is-animated');
      if (imageBox) imageBox.classList.add('is-animated');
      startHeroCycle();
    } else {
      stopHeroCycle();
    }

    // Refresh dynamic components if needed
    if (targetRoute === 'archive') {
      setupArchiveHover();
    }
    if (targetRoute === 'about') {
      lastAppliedProgress = null;
      lastAppliedScale = null;
      updateAboutMetrics();
      updateAboutPhotoScale();
    }

    setupScrollAnimations();
  };

  if (prefersReduced || !overlay) {
    switchViews();
    isTransitioning = false;
    return;
  }

  // Two-layer curtain animation:
  // Step 1: Curtain slides in from bottom, backdrop fades in (450ms)
  overlay.classList.add('transition');
  curtainBlock?.classList.remove('transition-out');
  curtainBack?.classList.remove('transition-out');
  curtainBlock?.classList.add('transition-in');
  curtainBack?.classList.add('transition-active');

  setTimeout(() => {
    // Step 2: Screen is covered. Switch view and reset scroll.
    switchViews();

    // Step 3: Curtain slides up and away, uncovering new page (450ms)
    curtainBlock?.classList.remove('transition-in');
    curtainBack?.classList.remove('transition-active');
    curtainBlock?.classList.add('transition-out');
    curtainBack?.classList.add('transition-out');

    setTimeout(() => {
      overlay.classList.remove('transition');
      curtainBlock?.classList.remove('transition-out');
      curtainBack?.classList.remove('transition-out');
      isTransitioning = false;
      if (targetRoute === 'about') {
        lastAppliedProgress = null;
        lastAppliedScale = null;
        updateAboutMetrics();
        updateAboutPhotoScale();
      }
    }, 450);
  }, 450);
}

/**
 * Sets up global click delegation for editorial router links
 */
function setupRouterListeners() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[data-route]');
    if (!link) return;

    if (
      link.target === '_blank' ||
      link.hasAttribute('download') ||
      link.getAttribute('rel')?.includes('external')
    ) {
      return;
    }

    e.preventDefault();
    const route = link.getAttribute('data-route');
    navigateTo(route);
  });

  window.addEventListener('popstate', (e) => {
    const route = e.state?.route || resolveRouteFromLocation();
    navigateTo(route, false);
  });

  window.addEventListener('hashchange', () => {
    const route = resolveRouteFromLocation();
    navigateTo(route, false);
  });
}

// ============================================================================
// 3. COMPONENT RENDERERS (HOME, WORK, ARCHIVE)
// ============================================================================

/**
 * Renders configurable featured projects on the Home view
 * Preserves original poster aspect ratio; subtle scale(1.02) hover without cropping
 */
export function renderFeaturedWork() {
  const container = document.getElementById('homeFeaturedGrid');
  if (!container) return;

  const featured = getFeaturedProjects();
  container.innerHTML = '';

  featured.forEach((item, index) => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.style.setProperty('--stagger-delay', `${index * 0.08}s`);
    card.dataset.id = item.id;
    if (item.type) card.dataset.type = item.type;
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    const isVideo = item.type === 'video';
    card.setAttribute(
      'aria-label',
      isVideo ? `Play video: ${item.title}` : `View poster: ${item.title}`
    );

    const numStr = String(index + 1).padStart(2, '0');
    const artistMeta = item.artist ? ` · ${item.artist}` : '';
    const metaRight = item.year
      ? `${item.year}${artistMeta}`
      : (item.detail || item.category || '');
    const imgWidth = item.aspect === '16/9' ? 1280 : (item.aspect === '4/5' ? 960 : 900);
    const imgHeight = item.aspect === '16/9' ? 720 : 1200;
    const thumbSrc = item.thumbnail || item.image;

    const playIndicatorHtml = isVideo
      ? `<div class="video-play-indicator" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="6 3 20 12 6 21"></polygon>
          </svg>
        </div>`
      : '';

    card.innerHTML = `
      <div class="project-card-box" style="aspect-ratio: ${item.aspect};">
        <img 
          src="${thumbSrc}" 
          alt="${item.alt}" 
          class="project-card-image"
          width="${imgWidth}"
          height="${imgHeight}"
          loading="eager"
          decoding="async"
        />
        ${playIndicatorHtml}
      </div>
      <div class="project-card-title-box">
        <div class="project-card-meta-left">
          <span class="project-card-title-number">${numStr}</span>
          <span class="project-card-title"><span class="link-line">${item.title}</span></span>
        </div>
        <div class="project-card-meta-right">
          <span class="project-card-year">${metaRight}</span>
          <span class="project-card-arrow" aria-hidden="true">&rarr;</span>
        </div>
      </div>
    `;

    card.addEventListener('click', () => openLightbox(item));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(item);
      }
    });

    container.appendChild(card);
  });
}

/**
 * Renders the full curated Work poster gallery
 * Preserves original poster aspect ratio; subtle scale(1.02) hover without cropping
 */
export function renderWorkPage() {
  const container = document.getElementById('workGalleryGrid');
  if (!container) return;

  container.innerHTML = '';

  projects.forEach((item, index) => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.style.setProperty('--stagger-delay', `${(index % 2) * 0.08}s`);
    card.dataset.id = item.id;
    if (item.type) card.dataset.type = item.type;
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    const isVideo = item.type === 'video';
    card.setAttribute(
      'aria-label',
      isVideo ? `Play video: ${item.title}` : `View poster: ${item.title}`
    );

    const numStr = String(index + 1).padStart(2, '0');
    const imgWidth = item.aspect === '16/9' ? 1280 : (item.aspect === '4/5' ? 960 : 900);
    const imgHeight = item.aspect === '16/9' ? 720 : 1200;
    const thumbSrc = item.thumbnail || item.image;

    const playIndicatorHtml = isVideo
      ? `<div class="video-play-indicator" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="6 3 20 12 6 21"></polygon>
          </svg>
        </div>`
      : '';

    card.innerHTML = `
      <div class="project-card-box" style="aspect-ratio: ${item.aspect};">
        <img 
          src="${thumbSrc}" 
          alt="${item.alt}" 
          class="project-card-image"
          width="${imgWidth}"
          height="${imgHeight}"
          loading="lazy"
          decoding="async"
        />
        ${playIndicatorHtml}
      </div>
      <div class="project-card-meta">
        <div class="project-card-meta-left">
          <div class="project-card-title-row">
            <span class="project-card-number">${numStr}</span>
            <h2 class="project-card-title"><span class="link-line">${item.title}</span></h2>
          </div>
          <span class="project-card-category">${item.category || item.detail || ''}</span>
        </div>
        <div class="project-card-meta-right">
          ${item.artist ? `<span class="project-card-artist">${item.artist}</span>` : ''}
          <div class="project-card-year-row">
            ${item.year ? `<span class="project-card-year">${item.year}</span>` : ''}
            <span class="project-card-arrow" aria-hidden="true">&rarr;</span>
          </div>
        </div>
      </div>
    `;

    card.addEventListener('click', () => openLightbox(item));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(item);
      }
    });

    container.appendChild(card);
  });
}

/**
 * Renders the tabular Archive index
 * Strict Rule: For items without artist information, Detail is left empty.
 */
export function renderArchivePage() {
  const container = document.getElementById('archiveList');
  if (!container) return;

  container.innerHTML = '';

  projects.forEach((item, index) => {
    const row = document.createElement('div');
    row.className = 'archive-list-el stagger-el';
    row.style.setProperty('--stagger-delay', `${index * 0.03}s`);
    row.dataset.id = item.id;
    if (item.type) row.dataset.type = item.type;
    row.dataset.aspect = item.aspect || '3/4';
    const thumbSrc = item.thumbnail || item.image;
    row.dataset.preview = thumbSrc;
    row.tabIndex = 0;
    row.setAttribute('role', 'button');
    const isVideo = item.type === 'video';
    row.setAttribute(
      'aria-label',
      isVideo ? `Video project: ${item.title}` : `Poster project: ${item.title}`
    );

    const numStr = String(index + 1).padStart(2, '0');
    // For items without artist or detail, display completely empty string — no "None", "N/A", or "Unknown"
    const detailText = item.detail || item.artist || '';

    row.innerHTML = `
      <div class="archive-list-text">
        <div class="archive-name">
          <div class="archive-mobile-thumb-wrap">
            <img 
              src="${thumbSrc}" 
              alt="${item.title}" 
              class="archive-mobile-thumb" 
              loading="lazy" 
              decoding="async" 
            />
            <span class="archive-num">${numStr}</span>
            <span class="archive-title">${item.title}</span>
          </div>
        </div>
        <div class="archive-detail">${detailText}</div>
        <div class="archive-date list-last-el">${item.year || ''}</div>
      </div>
    `;

    row.addEventListener('click', () => openLightbox(item));
    row.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(item);
      }
    });

    container.appendChild(row);
  });
}

// ============================================================================
// 4. DESKTOP ARCHIVE FLOATING HOVER PREVIEW
// Follows cursor smoothly within viewport bounds
// ============================================================================

export function setupArchiveHover() {
  const previewBox = document.getElementById('archiveFloatingPreview');
  const previewImg = document.getElementById('archiveFloatingImg');
  const archiveRows = document.querySelectorAll('.archive-list-el');

  if (!previewBox || !previewImg || !archiveRows.length) return;

  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  if (!finePointer.matches) return;

  let activeRow = null;
  let mouseX = -999;
  let mouseY = -999;
  let isMoving = false;

  function updatePreviewPosition() {
    isMoving = false;
    if (!activeRow) return;

    const isVideo = activeRow.dataset.type === 'video' || activeRow.dataset.aspect === '16/9';
    const offset = 24;
    // For 16:9 video: 260x146px; for 3:4 posters: 220x290px
    const boxW = isVideo ? 260 : 220;
    const boxH = isVideo ? 146 : 290;

    let posX = mouseX + offset;
    let posY = mouseY - (boxH / 2);

    // Viewport right edge overflow
    if (posX + boxW > window.innerWidth - 20) {
      posX = mouseX - boxW - offset;
    }

    // Viewport top/bottom overflow
    posX = Math.max(16, Math.min(posX, window.innerWidth - boxW - 16));
    posY = Math.max(16, Math.min(posY, window.innerHeight - boxH - 16));

    previewBox.style.transform = `translate3d(${Math.round(posX)}px, ${Math.round(posY)}px, 0)`;
  }

  archiveRows.forEach(row => {
    row.addEventListener('mouseenter', (e) => {
      if (!finePointer.matches) return;
      activeRow = row;
      row.classList.add('is-hover');
      const imgSrc = row.dataset.preview;
      if (imgSrc && previewImg.src !== imgSrc) {
        previewImg.src = imgSrc;
      }
      const isVideo = row.dataset.type === 'video' || row.dataset.aspect === '16/9';
      previewBox.classList.toggle('is-video', isVideo);

      previewBox.classList.add('is-active');
      mouseX = e.clientX;
      mouseY = e.clientY;
      updatePreviewPosition();
    });

    row.addEventListener('mousemove', (e) => {
      if (!finePointer.matches || !activeRow) return;
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isMoving) {
        isMoving = true;
        requestAnimationFrame(updatePreviewPosition);
      }
    });

    row.addEventListener('mouseleave', () => {
      row.classList.remove('is-hover');
      activeRow = null;
      previewBox.classList.remove('is-active', 'is-video');
    });
  });

  window.addEventListener('scroll', () => {
    activeRow = null;
    previewBox.classList.remove('is-active', 'is-video');
    document.querySelectorAll('.archive-list-el.is-hover').forEach(el => el.classList.remove('is-hover'));
  }, { passive: true });
}

// ============================================================================
// 5. SCROLL-BASED REVEALS & HAIRLINE BORDERS (Inspired by Matthieu Givelet)
// ============================================================================

export function setupScrollAnimations() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    document.documentElement.classList.remove('has-motion');
    return;
  }

  document.documentElement.classList.add('has-motion');

  const groups = document.querySelectorAll('.scroll-in-group');
  const borders = document.querySelectorAll('.border');
  const projectCards = document.querySelectorAll('.project-card');
  const archiveRows = document.querySelectorAll('.archive-list-el');
  const aboutPhotos = document.querySelectorAll('.about-photo-wrapper');
  const footers = document.querySelectorAll('.footer');

  function revealGroup(group) {
    group.classList.add('is-animating');
    group.querySelectorAll('.scroll-in').forEach((el, index) => {
      el.style.setProperty('--stagger-delay', `${index * 0.08}s`);
      el.classList.add('is-revealing', 'is-revealed', 'is-visible');
    });
  }

  function revealBorder(border) {
    border.classList.add('is-revealing', 'is-revealed', 'is-visible');
  }

  function revealProjectCard(card) {
    card.classList.add('is-revealed', 'is-visible');
  }

  function revealArchiveRow(row) {
    row.classList.add('is-revealed', 'is-visible');
  }

  function revealAboutPhoto(photo) {
    photo.classList.add('is-revealed', 'is-visible');
  }

  function revealFooter(footer) {
    footer.classList.add('is-revealed', 'is-visible');
    footer.querySelectorAll('.footer-col, .footer-credit').forEach((el, index) => {
      el.style.setProperty('--stagger-delay', `${index * 0.08}s`);
      el.classList.add('is-revealed', 'is-visible');
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const target = entry.target;
      if (target.classList.contains('scroll-in-group')) {
        revealGroup(target);
      } else if (target.classList.contains('border')) {
        revealBorder(target);
      } else if (target.classList.contains('project-card')) {
        revealProjectCard(target);
      } else if (target.classList.contains('archive-list-el')) {
        revealArchiveRow(target);
      } else if (target.classList.contains('about-photo-wrapper')) {
        revealAboutPhoto(target);
      } else if (target.classList.contains('footer')) {
        revealFooter(target);
      }

      observer.unobserve(target);
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px 80px 0px'
  });

  function observeOrReveal(el, revealFn) {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 50 && rect.bottom > -50) {
      revealFn(el);
    } else {
      observer.observe(el);
    }
  }

  groups.forEach((g) => observeOrReveal(g, revealGroup));
  borders.forEach((b) => observeOrReveal(b, revealBorder));
  projectCards.forEach((c) => observeOrReveal(c, revealProjectCard));
  archiveRows.forEach((r) => observeOrReveal(r, revealArchiveRow));
  aboutPhotos.forEach((p) => observeOrReveal(p, revealAboutPhoto));
  footers.forEach((f) => observeOrReveal(f, revealFooter));

  // Fail-Safe Fallback: after 350ms, guarantee all elements in active view are fully visible!
  setTimeout(() => {
    const activeView = document.querySelector('.view-section.is-active');
    if (activeView) {
      activeView.querySelectorAll('.scroll-in-group').forEach(revealGroup);
      activeView.querySelectorAll('.border').forEach(revealBorder);
      activeView.querySelectorAll('.project-card').forEach(revealProjectCard);
      activeView.querySelectorAll('.archive-list-el').forEach(revealArchiveRow);
      activeView.querySelectorAll('.about-photo-wrapper').forEach(revealAboutPhoto);
    }
    projectCards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight + 100 && rect.bottom > -100) {
        revealProjectCard(card);
      }
    });
    footers.forEach((footer) => {
      const rect = footer.getBoundingClientRect();
      if (rect.top < window.innerHeight + 100) {
        revealFooter(footer);
      }
    });
  }, 350);
}

// ============================================================================
// 6. FULL-RESOLUTION WEBP LIGHTBOX MODAL
// ============================================================================

let lastActiveElement = null;

export function openLightbox(project) {
  const lightbox = document.getElementById('projectLightbox');
  const img = document.getElementById('lightboxImg');
  const videoWrap = document.getElementById('lightboxVideoWrap');
  const closeBtn = document.getElementById('lightboxCloseBtn');

  if (!lightbox || !project) return;

  lastActiveElement = document.activeElement;

  if (project.type === 'video' || project.videoId) {
    if (img) {
      img.style.display = 'none';
      img.src = '';
    }
    if (videoWrap) {
      videoWrap.style.display = 'block';
      const embedSrc = project.embedUrl || `https://www.youtube.com/embed/${project.videoId}`;
      videoWrap.innerHTML = `
        <iframe 
          class="lightbox-video-iframe"
          src="${embedSrc}?autoplay=1&rel=0" 
          title="${project.title || 'Video'}"
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowfullscreen
        ></iframe>
      `;
    }
    lightbox.setAttribute('aria-label', `Video player: ${project.title || 'Video'}`);
  } else {
    if (videoWrap) {
      videoWrap.style.display = 'none';
      videoWrap.innerHTML = '';
    }
    if (img) {
      img.style.display = 'block';
      const fullSource = project.fullImage || project.image || project.thumbnail || '';
      img.src = fullSource;
      img.alt = project.alt || project.title || 'Project poster';
      if (project.originalImage) {
        img.dataset.original = project.originalImage;
      }
    }
    lightbox.setAttribute('aria-label', `Poster viewer: ${project.title || 'Poster'}`);
  }

  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  if (closeBtn) {
    requestAnimationFrame(() => closeBtn.focus());
  }
}

export function closeLightbox() {
  const lightbox = document.getElementById('projectLightbox');
  const videoWrap = document.getElementById('lightboxVideoWrap');
  const img = document.getElementById('lightboxImg');

  if (!lightbox || !lightbox.classList.contains('is-open')) return;

  // Immediately stop and unmount any playing YouTube iframe
  if (videoWrap) {
    videoWrap.innerHTML = '';
    videoWrap.style.display = 'none';
  }
  if (img) {
    img.src = '';
    img.style.display = 'none';
  }

  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
    lastActiveElement.focus();
  }
}

export function setupLightbox() {
  const lightbox = document.getElementById('projectLightbox');
  const closeBtn = document.getElementById('lightboxCloseBtn');
  const backdrop = document.getElementById('lightboxBackdrop');

  if (!lightbox) return;

  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }
  if (backdrop) {
    backdrop.addEventListener('click', closeLightbox);
  }

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === backdrop) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });
}

// ============================================================================
// 7. MOBILE DRAWER NAVIGATION
// ============================================================================

export function toggleMobileDrawer() {
  const drawer = document.getElementById('mobileDrawer');
  const toggleBtn = document.getElementById('navToggleMobile');

  if (!drawer || !toggleBtn) return;

  const isOpen = drawer.classList.contains('is-open');

  if (isOpen) {
    closeMobileDrawer();
  } else {
    drawer.classList.add('is-open');
    toggleBtn.classList.add('is-open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
  }
}

export function closeMobileDrawer() {
  const drawer = document.getElementById('mobileDrawer');
  const toggleBtn = document.getElementById('navToggleMobile');

  if (!drawer) return;

  drawer.classList.remove('is-open');
  document.body.classList.remove('menu-open');

  if (toggleBtn) {
    toggleBtn.classList.remove('is-open');
    toggleBtn.setAttribute('aria-expanded', 'false');
  }
}

export function setupMobileNav() {
  const toggleBtn = document.getElementById('navToggleMobile');
  const overlay = document.getElementById('mobileDrawerOverlay');
  const closeBtn = document.getElementById('mobileDrawerCloseBtn');
  const drawer = document.getElementById('mobileDrawer');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleMobileDrawer);
  }
  if (overlay) {
    overlay.addEventListener('click', closeMobileDrawer);
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', closeMobileDrawer);
  }

  // Ensure any click on links inside mobile drawer closes it
  if (drawer) {
    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        closeMobileDrawer();
      });
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
      closeMobileDrawer();
    }
  });
}

// ============================================================================
// 8. CONTACT FORM VALIDATION & SUBMISSION
// ============================================================================

export function setupContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const fields = [
    {
      id: 'name',
      errorId: 'name-error',
      validate: (v) => v.trim().length > 0,
      msg: 'Please provide your name.'
    },
    {
      id: 'email',
      errorId: 'email-error',
      validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
      msg: 'Please enter a valid email address.'
    },
    {
      id: 'subject',
      errorId: 'subject-error',
      validate: (v) => v.trim().length > 0,
      msg: 'Please provide a subject.'
    },
    {
      id: 'budget',
      errorId: 'budget-error',
      validate: (v) => Boolean(v && v.trim().length > 0),
      msg: 'Please select an estimated budget tier.'
    },
    {
      id: 'message',
      errorId: 'message-error',
      validate: (v) => v.trim().length > 0,
      msg: 'Please provide project details.'
    }
  ];

  fields.forEach(({ id, errorId }) => {
    const el = document.getElementById(id);
    if (!el) return;
    const evt = el.tagName.toLowerCase() === 'select' ? 'change' : 'input';
    el.addEventListener(evt, () => {
      const err = document.getElementById(errorId);
      if (err) err.textContent = '';
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let hasError = false;
    let firstErr = null;

    fields.forEach(({ id, errorId, validate, msg }) => {
      const el = document.getElementById(id);
      const err = document.getElementById(errorId);
      if (!el) return;

      if (!validate(el.value)) {
        hasError = true;
        if (err) err.textContent = msg;
        if (!firstErr) firstErr = el;
      } else {
        if (err) err.textContent = '';
      }
    });

    if (hasError) {
      if (firstErr) firstErr.focus();
      return;
    }

    const data = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      subject: document.getElementById('subject').value.trim(),
      budget: document.getElementById('budget').value,
      message: document.getElementById('message').value.trim(),
      submittedAt: new Date().toISOString()
    };

    console.log('Inquiry submitted:', data);

    const status = document.getElementById('form-status');
    if (status) {
      status.className = 'form-status-alert is-success';
      status.textContent = 'Thank you! Your inquiry has been received.';
    }

    form.reset();
  });
}

// ============================================================================
// 9. FIGMA-STYLE CUSTOM SVG CURSOR
// Precise pointer hotspot at (2px, 1.5px), active on fine-pointer desktop
// ============================================================================

export function setupCustomCursor() {
  const cursor = document.getElementById('customCursor');
  if (!cursor) return;

  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  let isVisible = false;

  function updatePosition(clientX, clientY) {
    // Hotspot offset: tip of Figma arrow path is at (2px, 1.5px) in 20x22 SVG
    cursor.style.transform = `translate3d(${clientX - 2}px, ${clientY - 1.5}px, 0)`;
    if (!isVisible) {
      cursor.style.opacity = '1';
      isVisible = true;
    }
  }

  window.addEventListener('pointermove', (e) => {
    if (!finePointer.matches) return;
    updatePosition(e.clientX, e.clientY);
  }, { passive: true });

  document.documentElement.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    isVisible = false;
  });

  document.documentElement.addEventListener('mouseenter', () => {
    if (finePointer.matches) {
      cursor.style.opacity = '1';
      isVisible = true;
    }
  });

  window.addEventListener('blur', () => {
    cursor.style.opacity = '0';
    isVisible = false;
  });

  if (typeof finePointer.addEventListener === 'function') {
    finePointer.addEventListener('change', (e) => {
      if (!e.matches) {
        cursor.style.opacity = '0';
        isVisible = false;
      }
    });
  }
}

// ----------------------------------------------------------------------------
// HERO MONOGRAM APERTURE (Timed automatic poster preview within title)
// Hard-cut instant image swap on a 1500ms timer with zero pointer dependency
// ----------------------------------------------------------------------------

let heroAutoCycleTimer = null;
let advanceHeroImage = null;

export function startHeroCycle() {
  stopHeroCycle();
  if (typeof window === 'undefined') return;
  if (isInitialLoading || isIntroRunning) return;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;
  if (typeof advanceHeroImage === 'function') {
    heroAutoCycleTimer = setInterval(advanceHeroImage, 1500);
  }
}

export function stopHeroCycle() {
  if (heroAutoCycleTimer) {
    clearInterval(heroAutoCycleTimer);
    heroAutoCycleTimer = null;
  }
}

export function setupHeroMonogram() {
  const imgEl = document.getElementById('heroTitleImg');
  if (!imgEl) return;

  const posters = [
    { src: '/assets/posters/featured/oh-yeah-steve-lacy.webp', alt: 'Mark Bryan - Steve Lacy poster design' },
    { src: '/assets/posters/featured/undressed.webp', alt: 'Mark Bryan - Undressed poster design' },
    { src: '/assets/posters/featured/Multo.webp', alt: 'Mark Bryan - Multo poster design' },
    { src: '/assets/posters/featured/captcha.webp', alt: 'Mark Bryan - Captcha poster design' }
  ];

  // Preload all poster images immediately to guarantee zero flash or empty frames
  posters.forEach((p, idx) => {
    const preloader = new Image();
    preloader.src = p.src;
    if (idx === 0 && typeof preloader.decode === 'function') {
      preloader.decode().catch(() => {});
    }
  });

  let currentIndex = 0;

  function switchImage(nextIndex) {
    currentIndex = nextIndex % posters.length;
    // Hard cut: instant swap, NO opacity transition, NO transform animation
    imgEl.src = posters[currentIndex].src;
    imgEl.alt = posters[currentIndex].alt;
  }

  advanceHeroImage = function () {
    const nextIdx = (currentIndex + 1) % posters.length;
    switchImage(nextIdx);
  };

  // Tab visibility: pause rotation when tab is hidden, resume when tab is active on home
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      stopHeroCycle();
    } else if (
      document.visibilityState === 'visible' &&
      currentRoute === 'home' &&
      !isInitialLoading &&
      !isIntroRunning
    ) {
      startHeroCycle();
    }
  });

  // Reduced motion preference listener
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (typeof motionQuery.addEventListener === 'function') {
    motionQuery.addEventListener('change', (e) => {
      if (e.matches) {
        stopHeroCycle();
      } else if (
        currentRoute === 'home' &&
        document.visibilityState === 'visible' &&
        !isInitialLoading &&
        !isIntroRunning
      ) {
        startHeroCycle();
      }
    });
  }

  // NOTE: Normal hero image cycling begins strictly AFTER the post-preloader entrance finishes.
}

// ----------------------------------------------------------------------------
// ABOUT PROFILE PHOTO SCROLL-PROGRESS SCALE INTERACTION
// Initial state: scale(1.45) at 0% About section progress (strongly zoomed in)
// Scale smoothly and reversibly decreases as the user scrolls down:
// 0%   progress -> scale 1.45 (zoomed in at start of photo section)
// 25%  progress -> scale ~1.34
// 50%  progress -> scale ~1.23
// ----------------------------------------------------------------------------
// ABOUT PROFILE PHOTO SCROLL-PROGRESS SCALE INTERACTION (SCOPED TO PHOTO SECTION)
// - Start scale: scale(1.45) at start of About photo section (progress = 0)
// - End scale: scale(1) at end of About photo interaction range (progress = 1)
// - Interaction range: Strictly the height of the About photo container (~500px)
// - Once user scrolls past the photo range (into lower About, Contact, or Footer),
//   the scale is strictly locked at scale(1) and scroll calculation is halted.
// - Footer scrolling has ZERO effect on the photo scale.
// - Reverses smoothly when scrolling back up through the photo range.
// - Applied strictly to .about-photo with transform-origin: center center.
// ----------------------------------------------------------------------------

let cachedPhotoEl = null;
let cachedPhotoBox = null;
let cachedAboutSection = null;
let cachedAboutEl = null;
let cachedPhotoStartScroll = 0;
let cachedPhotoScrollRange = 0;
let lastAppliedProgress = null;
let lastAppliedScale = null;

export function updateAboutMetrics() {
  if (!cachedAboutSection) {
    cachedAboutSection = document.getElementById('view-about');
  }
  if (!cachedAboutEl) {
    cachedAboutEl = document.querySelector('.about');
  }
  if (!cachedPhotoBox) {
    cachedPhotoBox = document.querySelector('.about-photo-box');
  }
  if (!cachedPhotoEl) {
    cachedPhotoEl = document.querySelector('.about-photo') || document.getElementById('aboutProfileImg');
  }

  if (!cachedAboutSection || !cachedAboutEl || !cachedAboutSection.classList.contains('is-active')) return;

  const rect = cachedAboutEl.getBoundingClientRect();
  const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
  cachedPhotoStartScroll = rect.top + currentScrollY;

  // The interaction range is strictly isolated to the height of the photo container (~380-512px),
  // completely decoupled from the rest of the About page, Contact, and Footer.
  const boxHeight = cachedPhotoBox ? cachedPhotoBox.offsetHeight : 512;
  const docHeight = Math.max(
    document.documentElement ? document.documentElement.scrollHeight : 0,
    document.body ? document.body.scrollHeight : 0
  );
  const maxDocScroll = Math.max(0, docHeight - window.innerHeight);

  let range = Math.max(150, boxHeight);
  if (maxDocScroll > 0 && maxDocScroll < range + 60) {
    // On exceptionally tall viewports (e.g. tablet portrait 820x1180) where max scroll is very short,
    // finish the zoom well before the user reaches the footer so scale(1.00) is reached inside the photo section.
    range = Math.max(60, Math.floor(maxDocScroll * 0.5));
  }
  cachedPhotoScrollRange = range;
}

export function updateAboutPhotoScale() {
  if (!cachedPhotoEl) {
    cachedPhotoEl = document.querySelector('.about-photo') || document.getElementById('aboutProfileImg');
  }
  if (!cachedPhotoEl) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced || window.innerWidth <= 768) {
    cachedPhotoEl.style.transform = 'scale(1)';
    cachedPhotoEl.style.transformOrigin = 'center center';
    lastAppliedProgress = null;
    lastAppliedScale = 1;
    return;
  }

  if (!cachedAboutSection) {
    cachedAboutSection = document.getElementById('view-about');
  }
  if (!cachedAboutSection || !cachedAboutSection.classList.contains('is-active')) {
    return;
  }

  if (cachedPhotoScrollRange === 0) {
    updateAboutMetrics();
  }

  const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
  const relativeScroll = currentScrollY - cachedPhotoStartScroll;

  // 1. Past the photo interaction range (lower About, Contact, or Footer):
  // Lock at scale(1) and immediately return without further calculation.
  if (relativeScroll >= cachedPhotoScrollRange) {
    if (lastAppliedProgress !== 1) {
      lastAppliedProgress = 1;
      lastAppliedScale = 1;
      cachedPhotoEl.style.transform = 'scale(1)';
      cachedPhotoEl.style.transformOrigin = 'center center';
    }
    return;
  }

  // 2. At or above the start of the photo interaction range:
  // Lock at scale(1.45) and return.
  if (relativeScroll <= 0) {
    if (lastAppliedProgress !== 0) {
      lastAppliedProgress = 0;
      lastAppliedScale = 1.45;
      cachedPhotoEl.style.transform = 'scale(1.45)';
      cachedPhotoEl.style.transformOrigin = 'center center';
    }
    return;
  }

  // 3. Inside the local photo interaction range (0 < relativeScroll < cachedPhotoScrollRange):
  const progress = relativeScroll / (cachedPhotoScrollRange || 1);
  const targetScale = Math.max(1, Math.min(1.45, 1.45 - (progress * 0.45)));

  if (lastAppliedScale !== targetScale) {
    lastAppliedScale = targetScale;
    lastAppliedProgress = progress;
    cachedPhotoEl.style.transform = `scale(${targetScale.toFixed(4)})`;
    cachedPhotoEl.style.transformOrigin = 'center center';
  }
}

export function setupAboutScrollZoom() {
  let ticking = false;
  function onScroll() {
    if (window.innerWidth <= 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    if (!cachedAboutSection) {
      cachedAboutSection = document.getElementById('view-about');
    }
    if (!cachedAboutSection || !cachedAboutSection.classList.contains('is-active')) {
      return;
    }

    const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
    const relScroll = currentScrollY - cachedPhotoStartScroll;

    // Completely bypass RAF if scrolling outside interaction range with final scale already applied
    if (relScroll >= cachedPhotoScrollRange && lastAppliedProgress === 1) {
      return;
    }
    if (relScroll <= 0 && lastAppliedProgress === 0) {
      return;
    }

    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      updateAboutPhotoScale();
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    lastAppliedProgress = null;
    lastAppliedScale = null;
    updateAboutMetrics();
    updateAboutPhotoScale();
  }, { passive: true });

  if (typeof document !== 'undefined' && document.fonts && typeof document.fonts.ready?.then === 'function') {
    document.fonts.ready.then(() => {
      if (currentRoute === 'about') {
        lastAppliedProgress = null;
        lastAppliedScale = null;
        updateAboutMetrics();
        updateAboutPhotoScale();
      }
    });
  }

  updateAboutMetrics();
  updateAboutPhotoScale();
}

// ============================================================================
// 10. INITIALIZATION & PRELOADER
// ============================================================================

/**
 * Smoothly steps the numeric percentage (0% -> 100%)
 * based on genuine initial readiness milestones.
 * Guaranteed to reach exactly 100%, never exceed 100%,
 * never stall, and terminate all animation frames cleanly.
 */
function createProgressTracker(counterEl) {
  let displayedVal = 0;
  let targetVal = 0;
  let rafId = null;
  let isFinished = false;
  let lastTime = 0;
  let holdTimeoutId = null;
  const frameInterval = 16; // ~60fps cadence for consistent visual pacing

  const updateDisplay = (val) => {
    if (counterEl) {
      counterEl.textContent = `${Math.round(val)}%`;
    }
  };

  /**
   * Calculates a controlled, intentional numeric step size.
   * Prevents large leaps across frames while remaining responsive.
   */
  const calculateStep = (diff) => {
    if (diff > 40) return 3;
    if (diff > 15) return 2;
    return 1;
  };

  const step = (now) => {
    if (!lastTime) lastTime = now;
    const elapsed = now - lastTime;

    if (elapsed >= frameInterval) {
      lastTime = now;
      if (displayedVal < targetVal) {
        const diff = targetVal - displayedVal;
        const increment = calculateStep(diff);
        displayedVal = Math.min(targetVal, displayedVal + increment);
        updateDisplay(displayedVal);
      }
    }

    if (displayedVal < targetVal && !isFinished) {
      rafId = requestAnimationFrame(step);
    } else {
      rafId = null;
    }
  };

  return {
    setTarget(val) {
      if (val > targetVal && val <= 100) {
        targetVal = val;
        if (!rafId && displayedVal < targetVal) {
          lastTime = 0;
          rafId = requestAnimationFrame(step);
        }
      }
    },
    async finish() {
      if (isFinished) return;
      isFinished = true;
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }

      // Smoothly advance from current displayedVal to exactly 100%
      return new Promise((resolve) => {
        let finalizeLastTime = 0;

        const finalizeStep = (now) => {
          if (!finalizeLastTime) finalizeLastTime = now;
          const elapsed = now - finalizeLastTime;

          if (elapsed >= frameInterval) {
            finalizeLastTime = now;
            if (displayedVal < 100) {
              const diff = 100 - displayedVal;
              const increment = calculateStep(diff);
              displayedVal = Math.min(100, displayedVal + increment);
              updateDisplay(displayedVal);
              if (displayedVal < 100) {
                rafId = requestAnimationFrame(finalizeStep);
                return;
              }
            }
          } else if (displayedVal < 100) {
            rafId = requestAnimationFrame(finalizeStep);
            return;
          }

          // Lock to exactly 100%
          displayedVal = 100;
          updateDisplay(100);
          rafId = null;

          // Deliberate hold for 200ms (within 150ms - 250ms range)
          // allowing the eye to register completion before the exit reveal begins
          holdTimeoutId = setTimeout(() => {
            holdTimeoutId = null;
            resolve();
          }, 200);
        };

        rafId = requestAnimationFrame(finalizeStep);
      });
    },
    destroy() {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      if (holdTimeoutId) {
        clearTimeout(holdTimeoutId);
        holdTimeoutId = null;
      }
    }
  };
}

/**
 * Resolves when genuine initial page readiness is reached:
 * - Document fonts ready (Neue Montreal)
 * - Critical above-the-fold asset for the active route (e.g. hero image or about photo)
 * Safeguarded with a strict 650ms timeout so it never hangs or delays perceived performance.
 * Does NOT preload large lazy-loaded poster files.
 */
async function waitForInitialReadiness(route, tracker) {
  // Step 1: Document & Fonts readiness
  const fontPromise = (typeof document !== 'undefined' && document.fonts && document.fonts.ready)
    ? document.fonts.ready.then(() => {
        if (tracker) tracker.setTarget(70);
      }).catch(() => {})
    : Promise.resolve();

  // Step 2: Critical active-route image readiness
  let assetPromise = Promise.resolve();
  if (route === 'home') {
    const heroImg = document.getElementById('heroTitleImg');
    if (heroImg && !heroImg.complete) {
      assetPromise = new Promise((resolve) => {
        const done = () => {
          if (tracker) tracker.setTarget(92);
          resolve();
        };
        if (typeof heroImg.decode === 'function') {
          heroImg.decode().then(done).catch(done);
        } else {
          heroImg.addEventListener('load', done, { once: true });
          heroImg.addEventListener('error', done, { once: true });
        }
      });
    } else {
      if (tracker) tracker.setTarget(92);
    }
  } else if (route === 'about') {
    const aboutImg = document.querySelector('.about-photo');
    if (aboutImg && !aboutImg.complete) {
      assetPromise = new Promise((resolve) => {
        const done = () => {
          if (tracker) tracker.setTarget(92);
          resolve();
        };
        if (typeof aboutImg.decode === 'function') {
          aboutImg.decode().then(done).catch(done);
        } else {
          aboutImg.addEventListener('load', done, { once: true });
          aboutImg.addEventListener('error', done, { once: true });
        }
      });
    } else {
      if (tracker) tracker.setTarget(92);
    }
  } else {
    if (tracker) tracker.setTarget(92);
  }

  // Strict timeout safeguard: Never hold the preloader longer than 650ms
  const timeoutPromise = new Promise((resolve) => setTimeout(resolve, 650));

  await Promise.race([
    Promise.all([fontPromise, assetPromise]),
    timeoutPromise
  ]);

  if (tracker) {
    await tracker.finish();
  }
}

export async function init() {
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const loader = document.getElementById('pageLoader');
  const counter = document.getElementById('loaderCounter');

  if (loader && !prefersReduced) {
    document.body.classList.add('is-loading');
  }

  const tracker = (counter && !prefersReduced) ? createProgressTracker(counter) : null;
  if (tracker) {
    tracker.setTarget(25);
  }

  renderFeaturedWork();
  renderWorkPage();
  renderArchivePage();

  setupRouterListeners();
  setupArchiveHover();
  setupLightbox();
  setupMobileNav();
  setupContactForm();
  setupCustomCursor();
  setupHeroMonogram();
  setupAboutScrollZoom();

  // Initialize initial route based on URL path or hash
  const initialRoute = resolveRouteFromLocation();
  setRouteImmediate(initialRoute);

  window.setRouteImmediate = setRouteImmediate;
  window.navigateTo = navigateTo;

  if (tracker) {
    tracker.setTarget(50);
  }

  if (prefersReduced || !loader) {
    isInitialLoading = false;
    isIntroRunning = false;
    introHasRun = true;
    if (loader) loader.remove();
    document.body.classList.remove('is-loading');
    setupScrollAnimations();
    const box1 = document.querySelector('.home-title-box-1');
    const box2 = document.querySelector('.home-title-box-2');
    const imageBox = document.querySelector('.home-title-image-box');
    if (box1) box1.classList.add('is-animated');
    if (box2) box2.classList.add('is-animated');
    if (imageBox) imageBox.classList.add('is-animated');
    if (initialRoute === 'home' && !prefersReduced) {
      startHeroCycle();
    }
    return;
  }

  // Await genuine initial page readiness (fonts + critical initial asset + progress tracking to 100% + hold)
  await waitForInitialReadiness(initialRoute, tracker);

  // Trigger solid transition block vertical entry (translateY(102%) -> translateY(0))
  loader.classList.add('is-loaded');

  const transitionDuration = 650; // matches 0.65s var(--ease-transition)

  let cleanedUp = false;
  const cleanUpLoader = () => {
    if (cleanedUp) return;
    cleanedUp = true;
    if (tracker && tracker.destroy) {
      tracker.destroy();
    }
    if (loader && loader.parentNode) {
      loader.remove();
    }
    document.body.classList.remove('is-loading');
    isInitialLoading = false;

    // Enable motion & trigger upward reveals and home intro sequence
    document.documentElement.classList.add('has-motion');
    setupScrollAnimations();

    if (initialRoute === 'home') {
      triggerHomeIntroSequence();
    }
  };

  const curtainBlock = loader.querySelector('.loader-transition-block');
  if (curtainBlock) {
    curtainBlock.addEventListener('animationend', cleanUpLoader, { once: true });
  }
  setTimeout(cleanUpLoader, transitionDuration + 50);
}

/**
 * Choreographed Post-Preloader Home Entrance inspired by Matthieu Givelet:
 * STAGE 1: Text reveal - "Mark" and "Bryan" reveal upward from below clipping area (1.2s cubic-bezier(.18, .66, .18, 1))
 *          with the image slot reserved in layout between them (initially hidden)
 * STAGE 2: Text settles cleanly into baseline (~800ms)
 * STAGE 3: Hero image cleanly pops/reveals into the aperture via subtle 2D scale and translateY
 * FINAL: Normal 1500ms automatic image cycling begins ONLY after the intro entrance has completely settled
 */
export async function triggerHomeIntroSequence() {
  if (introHasRun || isIntroRunning) return;
  introHasRun = true;
  isIntroRunning = true;
  stopHeroCycle();

  const box1 = document.querySelector('.home-title-box-1');
  const box2 = document.querySelector('.home-title-box-2');
  const imageBox = document.querySelector('.home-title-image-box');
  const heroImg = document.getElementById('heroTitleImg');
  const border = document.querySelector('.home-hero .border') || document.querySelector('.infos-box .border');

  if (border) {
    border.classList.add('is-revealing');
  }

  if (box1) box1.classList.add('is-animated');
  if (box2) box2.classList.add('is-animated');

  // Pre-decode first hero image before entrance to guarantee zero one-frame raster lag
  if (heroImg) {
    if (!heroImg.complete) {
      await new Promise((resolve) => {
        heroImg.addEventListener('load', resolve, { once: true });
        heroImg.addEventListener('error', resolve, { once: true });
      });
    }
    if (typeof heroImg.decode === 'function') {
      try {
        await heroImg.decode();
      } catch (_) {}
    }
  }

  // Force reflow so initial state is completely solid
  void document.body.offsetWidth;

  // STAGE 2 & 3: Once "Mark Bryan" text settles upward (~800ms), reveal the image via 3D flip
  setTimeout(() => {
    if (imageBox) {
      imageBox.classList.add('is-animated');
    }

    // Once 3D flip entrance finishes and settles (1100ms transition + 300ms buffer = 1400ms),
    // mark intro finished and start the normal 1500ms hero rotation
    setTimeout(() => {
      isIntroRunning = false;
      if (currentRoute === 'home') {
        startHeroCycle();
      }
    }, 1400);
  }, 800);
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}
