import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgr from "vite-plugin-svgr";


// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'build',
  },
  server: {
    open: true,
    port: 3000,
  },
  plugins: [
    svgr({ exportAsDefault: true }),
    react({
      include: '**/*.tsx',
    }),
    viteTsconfigPaths(),
  ],
  
});
