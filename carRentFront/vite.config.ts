import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    exclude: [
      '@angular/core',
      '@angular/common',
      '@angular/router',
      'rxjs',
      'zone.js',
      // Ajoutez d'autres dépendances problématiques si nécessaire
    ]
  }
});

