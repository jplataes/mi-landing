// Configuración de Tailwind CSS para regenerar css/tailwind.css (ver README.md).
// Misma paleta que se usaba con el CDN.
module.exports = {
  content: ['./index.html', './js/*.js'],
  theme: {
    extend: {
      colors: {
        navy: { 950: '#050b1f', 900: '#0a1430', 800: '#111d42', 700: '#1b2a5a' },
        cyan: { glow: '#22d3ee' },
        violet: { glow: '#a78bfa' }
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace']
      }
    }
  }
};
