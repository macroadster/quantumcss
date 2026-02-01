module.exports = {
  content: ['./index.html', './blog.html', './travel.html', './game.html', './demo.html', './starlight.html'],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#6b7280',
        accent: '#f59e0b',
        starlight: '#00d4ff',
        'starlight-peach': '#ffb38a',
        'starlight-orange': '#ff7e5f',
        'starlight-deep': '#0a0a1a',
        'travel-blue': '#0ea5e9',
        'game-green': '#22c55e',
        'game-bg': '#020617',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
      }
    }
  },
  plugins: [],
};
