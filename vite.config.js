import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

function createPosterMiddleware() {
  return (req, res, next) => {
    const rawUrl = req.url || '';
    if (rawUrl.includes('/assets/posters/featured/')) {
      let decodedUrl = '';
      try {
        decodedUrl = decodeURIComponent(rawUrl.split('?')[0]);
      } catch (e) {
        decodedUrl = rawUrl;
      }

      if (rawUrl.includes('loss') || decodedUrl.includes('loss')) {
        const isWebp = rawUrl.includes('.webp') || decodedUrl.includes('.webp');
        const isFull = rawUrl.includes('-full') || decodedUrl.includes('-full');
        const isThumb = rawUrl.includes('-thumb') || decodedUrl.includes('-thumb');

        let targetFile = 'it it loss?.png';
        let mime = 'image/png';
        if (isWebp) {
          mime = 'image/webp';
          if (isFull) {
            targetFile = 'it it loss?-full.webp';
          } else if (isThumb) {
            targetFile = 'it it loss?-thumb.webp';
          } else {
            targetFile = 'it it loss?.webp';
          }
        }

        const filePath = path.resolve(__dirname, 'public/assets/posters/featured', targetFile);
        if (fs.existsSync(filePath)) {
          const stat = fs.statSync(filePath);
          res.writeHead(200, {
            'Content-Type': mime,
            'Content-Length': stat.size,
            'Cache-Control': 'no-cache',
            'Last-Modified': stat.mtime.toUTCString()
          });
          return fs.createReadStream(filePath).pipe(res);
        }
      }
    }
    next();
  };
}

export default defineConfig({
  plugins: [
    {
      name: 'serve-poster-assets',
      configureServer(server) {
        server.middlewares.use(createPosterMiddleware());
      },
      configurePreviewServer(server) {
        server.middlewares.use(createPosterMiddleware());
      }
    }
  ]
});
