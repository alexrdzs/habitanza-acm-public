import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// Security note (see Habitanza-ACM's vite.config.ts for the full rationale):
// we never use loadEnv() with an empty prefix here, so server-only secrets
// can't accidentally get inlined into the public client bundle. This app
// currently has zero client-side secrets — the only server secret
// (MAKE_WEBHOOK_URL) is read exclusively inside api/lead.ts via process.env.
export default defineConfig({
  // The app lives at habitanza.com/valora (rewritten from the main site's
  // Vercel project), so every asset URL needs the /valora/ prefix. The build
  // is written to dist/valora so those files exist at the same path.
  base: '/valora/',
  build: { outDir: 'dist/valora' },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@shared': path.resolve(__dirname, 'shared'),
    },
  },
});
