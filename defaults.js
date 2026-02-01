const defaultTheme = {
  colors: {
    white: '#ffffff',
    black: '#000000',
    starlight: {
      blue: '#00d4ff',
      peach: '#ffb38a',
      orange: '#ff7e5f',
    }
  },
  spacing: {
    0: '0px', 1: '0.25rem', 2: '0.5rem', 3: '0.75rem', 4: '1rem', 6: '1.5rem', 8: '2rem', 10: '2.5rem', 12: '3rem', 16: '4rem', 32: '8rem', 64: '16rem', 128: '32rem', 144: '36rem',
  },
  fontSize: {
    xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem', xl: '1.25rem', '2xl': '1.5rem', '3xl': '2rem', '4xl': '2.5rem', '5xl': '3.5rem', '6xl': '4.5rem',
  }
};

const utilityMaps = {
  // Layout & Base
  flex: { property: 'display', value: 'flex' },
  grid: { property: 'display', value: 'grid' },
  hidden: { property: 'display', value: 'none' },
  block: { property: 'display', value: 'block' },
  'items-center': { property: 'align-items', value: 'center' },
  'justify-center': { property: 'justify-content', value: 'center' },
  'justify-between': { property: 'justify-content', value: 'space-between' },
  'flex-col': { property: 'flex-direction', value: 'column' },
  'w-full': { property: 'width', value: '100%' },
  'h-full': { property: 'height', value: '100%' },
  
  // Spacing
  m: 'margin', mt: 'margin-top', mb: 'margin-bottom', p: 'padding', pt: 'padding-top', pb: 'padding-bottom', px: ['padding-left', 'padding-right'], py: ['padding-top', 'padding-bottom'], gap: 'gap',

  // Typography
  text: 'font-size',
  'font-bold': { property: 'font-weight', value: '700' },
  'text-center': { property: 'text-align', value: 'center' },
  'text-muted': { property: 'color', value: 'var(--text-muted)' },
  'text-starlight': { property: 'color', value: 'var(--color-starlight-blue)' },
  'text-gradient-starlight': { 
    property: ['background', '-webkit-background-clip', '-webkit-text-fill-color', 'display'], 
    value: ['linear-gradient(to right, #ffb38a, #00d4ff)', 'text', 'transparent', 'inline-block'] 
  },

  // Starlight Premium Components (FULLY TRANSFERABLE)
  'starlight-card': {
    property: ['background', 'border', 'border-radius', 'padding', 'backdrop-filter', 'transition', 'position', 'z-index'],
    value: ['var(--bg-card)', '1px solid var(--border-card)', '1.5rem', '2.5rem', 'blur(16px)', 'var(--transition-starlight)', 'relative', '1']
  },
  'btn-starlight': {
    property: ['background', 'color', 'border', 'box-shadow', 'font-weight', 'transition', 'height', 'padding', 'display', 'align-items', 'justify-content', 'border-radius', 'cursor'],
    value: ['linear-gradient(135deg, #ffb38a 0%, #00d4ff 100%)', '#000', 'none', '0 0 20px rgba(0, 212, 255, 0.3)', '700', 'all 0.2s ease', '3rem', '0 1.5rem', 'inline-flex', 'center', 'center', '0.75rem', 'pointer']
  },
  'btn-secondary': {
    property: ['background', 'color', 'border', 'font-weight', 'transition', 'height', 'padding', 'display', 'align-items', 'justify-content', 'border-radius', 'cursor'],
    value: ['var(--bg-card)', 'var(--text-main)', '1px solid var(--border-card)', '700', 'all 0.2s ease', '3rem', '0 1.5rem', 'inline-flex', 'center', 'center', '0.75rem', 'pointer']
  },
  'input-starlight': {
    property: ['background-color', 'border', 'color', 'border-radius', 'padding', 'appearance', 'background-image', 'background-repeat', 'background-position', 'background-size', 'transition', 'height'],
    value: [
      'var(--bg-card)', '1px solid var(--border-card)', 'var(--text-main)', '0.75rem', '0 2.5rem 0 1rem', 'none',
      'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'rgba(128,128,128,0.5)\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M8 9l4 4 4-4\' /%3E%3C/svg%3E")',
      'no-repeat', 'right 1rem center', '1rem', 'all 0.2s ease', '3rem'
    ]
  },
  'dropdown-menu': {
    property: ['background', 'backdrop-filter', 'border', 'border-radius', 'padding', 'box-shadow', 'min-width', 'z-index'],
    value: ['var(--glass-bg)', 'blur(20px)', '1px solid var(--glass-border)', '1rem', '0.5rem', 'var(--shadow-premium)', '200px', '600']
  },
  'dropdown-item': {
    property: ['padding', 'color', 'border-radius', 'display', 'width', 'text-align', 'transition', 'cursor', 'font-size'],
    value: ['0.625rem 1rem', 'var(--text-muted)', '0.625rem', 'block', '100%', 'left', 'all 0.2s', 'pointer', '0.875rem']
  },
  'dialog-overlay': {
    property: ['position', 'top', 'left', 'width', 'height', 'background', 'backdrop-filter', 'display', 'align-items', 'justify-content', 'z-index'],
    value: ['fixed', '0', '0', '100vw', '100vh', 'rgba(0, 0, 0, 0.6)', 'blur(12px)', 'flex', 'center', 'center', '400']
  },
  'dialog-content': {
    property: ['background', 'backdrop-filter', 'border', 'border-radius', 'width', 'max-width', 'box-shadow', 'overflow', 'position'],
    value: ['var(--glass-bg)', 'blur(20px)', '1px solid var(--glass-border)', '1.5rem', '90%', '600px', 'var(--shadow-premium)', 'hidden', 'relative']
  },
  'tooltip': {
    property: ['position', 'bottom', 'left', 'transform', 'padding', 'background', 'backdrop-filter', 'border', 'border-radius', 'color', 'font-size', 'opacity', 'transition', 'z-index', 'box-shadow'],
    value: ['absolute', '125%', '50%', 'translateX(-50%)', '0.5rem 0.75rem', 'var(--bg-deep)', 'blur(12px)', '1px solid var(--color-starlight-blue)', '0.5rem', 'var(--text-main)', '0.75rem', '0', 'all 0.2s ease', '800', 'var(--shadow-premium)']
  },
  'skeleton': {
    property: ['background-color', 'background-image', 'background-size', 'background-repeat', 'border-radius'],
    value: ['var(--skeleton-base)', 'linear-gradient(90deg, transparent, var(--skeleton-shimmer), transparent)', '200% 100%', 'no-repeat', '0.5rem']
  }
};

module.exports = { defaultTheme, utilityMaps };