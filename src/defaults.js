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
  'border-none': { property: 'border-width', value: '0' },
  'bg-transparent': { property: 'background-color', value: 'transparent' },
  'glass': {
    property: ['background-color', 'backdrop-filter', '-webkit-backdrop-filter', 'border-width', 'border-color'], 
    value: ['rgba(255, 255, 255, 0.03)', 'blur(16px)', 'blur(16px)', '1px', 'rgba(255, 255, 255, 0.1)'] 
  },
  'glow-blue': { property: 'box-shadow', value: '0 0 30px rgba(0, 212, 255, 0.25)' },
  'bg-starlight': { property: 'background', value: 'linear-gradient(135deg, #ffb38a 0%, #00d4ff 100%)' },
  'text-gradient-starlight': {
    property: ['background', '-webkit-background-clip', '-webkit-text-fill-color', 'display'], 
    value: ['linear-gradient(to right, #ffb38a, #00d4ff)', 'text', 'transparent', 'inline-block'] 
  },
  'btn-starlight': {
    property: ['background', 'color', 'border', 'box-shadow', 'font-weight', 'transition', 'height', 'padding', 'display', 'align-items', 'justify-content', 'border-radius', 'cursor'],
    value: ['linear-gradient(135deg, #ffb38a 0%, #00d4ff 100%)', '#000', 'none', '0 0 20px rgba(0, 212, 255, 0.3)', '700', 'all 0.2s ease', '3rem', '0 1.5rem', 'inline-flex', 'center', 'center', '0.5rem', 'pointer']
  },
  'btn-secondary': {
    property: ['background', 'color', 'border', 'font-weight', 'transition', 'height', 'padding', 'display', 'align-items', 'justify-content', 'border-radius', 'cursor', 'backdrop-filter', '-webkit-backdrop-filter'],
    value: ['rgba(255, 255, 255, 0.05)', '#ffffff', '1px solid rgba(255, 255, 255, 0.15)', '700', 'all 0.2s ease', '3rem', '0 1.5rem', 'inline-flex', 'center', 'center', '0.5rem', 'pointer', 'blur(12px)', 'blur(12px)']
  },
  'input-starlight': {
    property: ['background-color', 'border', 'color', 'border-radius', 'padding', 'appearance', 'transition', 'height'],
    value: ['rgba(255, 255, 255, 0.04)', '1px solid rgba(255, 255, 255, 0.15)', 'inherit', '0.75rem', '0 1rem', 'none', 'all 0.2s ease', '3rem']
  },
  'textarea-starlight': {
    property: ['background-color', 'border', 'color', 'border-radius', 'padding', 'appearance', 'transition', 'min-height', 'width', 'display'],
    value: ['rgba(255, 255, 255, 0.04)', '1px solid rgba(255, 255, 255, 0.15)', 'inherit', '0.75rem', '1rem', 'none', 'all 0.2s ease', '8rem', '100%', 'block']
  },
  'checkbox-starlight': {
    property: ['appearance', 'width', 'height', 'background', 'border', 'border-radius', 'cursor', 'transition', 'position', 'display', 'align-items', 'justify-content'],
    value: ['none', '1.25rem', '1.25rem', 'rgba(255, 255, 255, 0.05)', '1px solid rgba(255, 255, 255, 0.2)', '0.375rem', 'pointer', 'all 0.2s ease', 'relative', 'inline-flex', 'center', 'center']
  }
};

module.exports = { defaultTheme, utilityMaps };
