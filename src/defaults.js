const defaultTheme = {
  colors: {
    white: '#ffffff',
    black: '#000000',
    slate: {
      50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1', 400: '#94a3b8',
      500: '#64748b', 600: '#475569', 700: '#334155', 800: '#1e293b', 900: '#0f172a', 950: '#020617'
    },
    blue: {
      50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb'
    },
    orange: {
      50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 300: '#fdba74', 400: '#fb923c', 500: '#f97316', 600: '#ea580c'
    },
    red: { 500: '#ef4444' },
    green: {
      100: '#d1fae5',
      500: '#10b981'
    },
    purple: {
      50: '#faf5ff', 100: '#f3e8ff', 200: '#e9d5ff', 300: '#d8b4fe', 400: '#c084fc', 500: '#a855f7', 600: '#9333ea', 700: '#7e22ce'
    },
    yellow: {
      50: '#fefce8', 100: '#fef9c3', 200: '#fef08a', 300: '#fde047', 400: '#facc15', 500: '#eab308', 600: '#ca8a04', 700: '#a16207'
    },
    pink: {
      50: '#fdf2f8', 100: '#fce7f3', 200: '#fbcfe8', 300: '#f9a8d4', 400: '#f472b6', 500: '#ec4899', 600: '#db2777', 700: '#be185d'
    },
    cyan: {
      50: '#ecfeff', 100: '#cffafe', 200: '#a5f3fc', 300: '#67e8f9', 400: '#22d3ee', 500: '#06b6d4', 600: '#0891b2', 700: '#0e7490'
    },
    indigo: {
      50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe', 300: '#a5b4fc', 400: '#818cf8', 500: '#6366f1', 600: '#4f46e5', 700: '#4338ca'
    },
    starlight: {
      blue: '#00d4ff', peach: '#ffb38a', orange: '#ff7e5f', deep: '#08081a',
    },
    transparent: 'transparent',
  },
  spacing: {
    0: '0px', px: '1px', 1: '0.25rem', 2: '0.5rem', 3: '0.75rem', 4: '1rem', 5: '1.25rem', 
    6: '1.5rem', 8: '2rem', 10: '2.5rem', 12: '3rem', 14: '3.5rem', 16: '4rem', 20: '5rem', 
    24: '6rem', 32: '8rem', 40: '10rem', 48: '12rem', 64: '16rem', 128: '32rem',
  },
  fontSize: {
    xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem', xl: '1.25rem', 
    '2xl': '1.5rem', '3xl': '2rem', '4xl': '2.5rem', '5xl': '3rem', '6xl': '4rem',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  },
  maxWidth: {
    'xs': '20rem', 'sm': '24rem', 'md': '28rem', 'lg': '32rem', 'xl': '36rem',
    '2xl': '42rem', '3xl': '48rem', '4xl': '56rem', '5xl': '64rem', '6xl': '72rem', '7xl': '80rem',
    'full': '100%', 'min': 'min-content', 'max': 'max-content', 'fit': 'fit-content', 'prose': '65ch',
  }
};

const utilityMaps = {
  flex: { property: 'display', value: 'flex' },
  grid: { property: 'display', value: 'grid' },
  hidden: { property: 'display', value: 'none' },
  block: { property: 'display', value: 'block' },
  'inline-block': { property: 'display', value: 'inline-block' },
  'items-center': { property: 'align-items', value: 'center' },
  'items-start': { property: 'align-items', value: 'flex-start' },
  'items-end': { property: 'align-items', value: 'flex-end' },
  'justify-center': { property: 'justify-content', value: 'center' },
  'justify-between': { property: 'justify-content', value: 'space-between' },
  'flex-col': { property: 'flex-direction', value: 'column' },
  'flex-row': { property: 'flex-direction', value: 'row' },
  'flex-1': { property: 'flex', value: '1 1 0%' },
  'flex-shrink-0': { property: 'flex-shrink', value: '0' },
  'w-full': { property: 'width', value: '100%' },
  'h-full': { property: 'height', value: '100%' },
  'min-w-0': { property: 'min-width', value: '0' },
  'overflow-hidden': { property: 'overflow', value: 'hidden' },
  'overflow-visible': { property: 'overflow', value: 'visible' },
  'bg-clip-text': { property: ['background-clip', '-webkit-background-clip'], value: ['text', 'text'] },
  'border-none': { property: 'border-width', value: '0' },
  'bg-transparent': { property: 'background-color', value: 'transparent' },
  'relative': { property: 'position', value: 'relative' },
  'absolute': { property: 'position', value: 'absolute' },
  'top-1/2': { property: 'top', value: '50%' },
  'left-4': { property: 'left', value: '1rem' },
  'pl-12': { property: 'padding-left', value: '3rem' },
  '-translate-y-1/2': { property: 'transform', value: 'translateY(-50%)' },
  'pointer-events-none': { property: 'pointer-events', value: 'none' },
  'w-5': { property: 'width', value: '1.25rem' },
  'h-5': { property: 'height', value: '1.25rem' },
  'z-10': { property: 'z-index', value: '10' },
  'svg-fluid': {
    property: ['width', 'height', 'max-width', 'display'],
    value: ['100%', 'auto', '100%', 'block']
  },
  'svg-contain': { property: 'object-fit', value: 'contain' },
  'svg-cover': { property: 'object-fit', value: 'cover' },
  'vector-non-scaling': { property: 'vector-effect', value: 'non-scaling-stroke' },
  'overlay-base': {
    property: ['position', 'top', 'left', 'transform'],
    value: ['absolute', '50%', '50%', 'translate(-50%, -50%)']
  },
  'overlay-top-left': { property: ['position', 'top', 'left'], value: ['absolute', '0', '0'] },
  'overlay-top-right': { property: ['position', 'top', 'right'], value: ['absolute', '0', '0'] },
  'overlay-bottom-left': { property: ['position', 'bottom', 'left'], value: ['absolute', '0', '0'] },
  'overlay-bottom-right': { property: ['position', 'bottom', 'right'], value: ['absolute', '0', '0'] },
  'nav-base': {
    property: ['display', 'flex-direction', 'align-items', 'width', 'position', 'top', 'z-index'],
    value: ['flex', 'row', 'center', '100%', 'sticky', '0', '1000']
  },
  'card-base': {
    property: ['display', 'flex-direction', 'align-items', 'padding', 'overflow', 'border-radius', 'transition', 'position'],
    value: ['flex', 'column', 'stretch', 'var(--q-space-10)', 'hidden', 'var(--q-radius-lg)', 'all 0.3s ease', 'relative']
  },
  'btn-base': {
    property: ['display', 'align-items', 'justify-content', 'cursor', 'transition', 'font-weight', 'border-radius', 'border'],
    value: ['inline-flex', 'center', 'center', 'pointer', 'all 0.2s ease', '600', 'var(--q-radius-md)', 'none']
  },
  'input-base': {
    property: ['display', 'width', 'appearance', 'transition', 'border-radius', 'border', 'line-height'],
    value: ['block', '100%', 'none', 'all 0.2s ease', 'var(--q-radius-md)', 'none', 'normal']
  },
  'dialog-base': {
    property: ['display', 'flex-direction', 'align-items', 'padding', 'overflow-y', 'border-radius', 'position'],
    value: ['flex', 'column', 'stretch', 'var(--q-space-10)', 'auto', 'var(--q-radius-xl)', 'relative']
  },
  'modal-fixed': {
    property: ['position', 'top', 'left', 'transform', 'max-width', 'max-height', 'z-index'],
    value: ['fixed', '50%', '50%', 'translate(-50%, -50%)', '90vw', '90vh', '2000']
  },
  'badge-base': {
    property: ['display', 'align-items', 'justify-content', 'font-size', 'font-weight', 'text-transform', 'letter-spacing', 'border-radius', 'border'],
    value: ['inline-flex', 'center', 'center', '0.75rem', '600', 'uppercase', '0.05em', 'var(--q-radius-sm)', 'none']
  },
  'form-row': {
    property: ['display', 'justify-content', 'align-items', 'gap'],
    value: ['flex', 'space-between', 'center', '1rem']
  },
  'dialog-close': {
    property: ['position', 'top', 'right', 'width', 'height', 'border-radius', 'display', 'align-items', 'justify-content', 'cursor'],
    value: ['absolute', '1.5rem', '1.5rem', '2rem', '2rem', '50%', 'flex', 'center', 'center', 'pointer']
  },
  'glass': {
    property: ['background-color', 'backdrop-filter', '-webkit-backdrop-filter', 'border-width', 'border-color'], 
    value: ['rgba(255, 255, 255, 0.03)', 'blur(16px)', 'blur(16px)', '1px', 'rgba(255, 255, 255, 0.1)'] 
  },
  'bg-starlight': { property: 'background', value: 'linear-gradient(135deg, var(--q-color-starlight-peach) 0%, var(--q-color-starlight-blue) 100%)' },
  'text-gradient-starlight': {
    property: ['background', '-webkit-background-clip', '-webkit-text-fill-color', 'display'], 
    value: ['linear-gradient(to right, var(--q-color-starlight-peach), var(--q-color-starlight-blue))', 'text', 'transparent', 'inline-block'] 
  },
  'theme-starlight': {
    property: ['background', 'color', 'border-color', 'box-shadow'],
    value: ['linear-gradient(135deg, var(--q-color-starlight-peach) 0%, var(--q-color-starlight-blue) 100%)', '#000', 'transparent', '0 0 30px rgba(0, 212, 255, 0.2)']
  },
  'theme-glass': {
    property: ['background-color', 'backdrop-filter', '-webkit-backdrop-filter', 'border-color', 'border-width'],
    value: ['rgba(255, 255, 255, 0.05)', 'blur(16px)', 'blur(16px)', 'rgba(255, 255, 255, 0.1)', '1px']
  },
  'theme-glass-dark': {
    property: ['background-color', 'backdrop-filter', '-webkit-backdrop-filter', 'border-color', 'border-width'],
    value: ['rgba(255, 255, 255, 0.05)', 'blur(16px)', 'blur(16px)', 'rgba(255, 255, 255, 0.1)', '1px']
  },
  'glow-blue': { property: 'box-shadow', value: '0 0 30px rgba(0, 212, 255, 0.25)' },
  'glow-starlight': { property: 'box-shadow', value: '0 0 30px rgba(0, 212, 255, 0.25)' },
  'glow-peach': { property: 'box-shadow', value: '0 0 30px rgba(255, 179, 138, 0.25)' },
  'glow-orange': { property: 'box-shadow', value: '0 0 30px rgba(255, 126, 95, 0.25)' },
  'focus-glow': {
    property: ['outline', 'box-shadow'],
    value: ['none !important', '0 0 0 4px rgba(0, 212, 255, 0.25), 0 0 30px rgba(0, 212, 255, 0.5) !important'],
    variant: 'focus'
  },
  'btn-starlight': 'btn-base theme-starlight h-12 px-6',
  'btn-secondary': 'btn-base theme-glass-dark h-12 px-6 border-white/15',
  'input-starlight': 'input-base theme-glass-dark h-12 px-4 border-white/15',
  'textarea-starlight': 'input-base theme-glass-dark p-4 min-h-32 border-white/15',
  'checkbox-starlight': 'btn-base theme-glass-dark w-5 h-5 border-white/20',
  'search-container': 'relative block w-full',
    'search-input': 'pl-12 w-full',
    'search-icon': 'absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10 w-5 h-5',
    'nav-glass': 'nav-base theme-glass-dark',
    'starlight-card': 'card-base theme-glass-dark',
    'starlight-nav': 'nav-base theme-glass-dark w-full',
    'starlight-search': 'search-container theme-glass-dark rounded-xl',
    'starlight-dashboard': 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
    'starlight-gallery': 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4',
    'starlight-form': 'starlight-card grid grid-cols-1 md:grid-cols-2 gap-8 items-start',
    'starlight-dialog': 'dialog-base modal-fixed theme-glass-dark ani-scale-in'
  };
  
  module.exports = { defaultTheme, utilityMaps };
