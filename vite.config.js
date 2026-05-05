import { resolve } from 'path'

export default {
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ausili: resolve(__dirname, 'ausili.html'),
        contatti: resolve(__dirname, 'contatti.html'),
        creme: resolve(__dirname, 'creme.html'),
        cuscini: resolve(__dirname, 'cuscini.html'),
        elettromedicali: resolve(__dirname, 'elettromedicali.html'),
        inventario: resolve(__dirname, 'inventario.html'),
        ortopedici: resolve(__dirname, 'ortopedici.html'),
      }
    }
  }
}
