const defaultTheme = {
  colors: {
    white: '#ffffff',
    black: '#000000',
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    blue: {
      50: '#eff6ff',
      500: '#3b82f6',
      600: '#2563eb',
    },
    red: {
      500: '#ef4444',
    },
    green: {
      500: '#10b981',
    },
    starlight: {
      blue: '#00d4ff',
      peach: '#ffb38a',
      orange: '#ff7e5f',
      deep: '#08081a',
    }
  },
  spacing: {
    0: '0px',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    32: '8rem',
    64: '16rem',
    128: '32rem',
    144: '36rem',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '2rem',
    '4xl': '2.5rem',
    '5xl': '3.5rem',
    '6xl': '4.5rem',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  }
};

const utilityMaps = {
  // Layout
  flex: { property: 'display', value: 'flex' },
  grid: { property: 'display', value: 'grid' },
  hidden: { property: 'display', value: 'none' },
  block: { property: 'display', value: 'block' },
  'inline-block': { property: 'display', value: 'inline-block' },
  
  // Alignment
  'items-center': { property: 'align-items', value: 'center' },
  'items-start': { property: 'align-items', value: 'flex-start' },
  'items-end': { property: 'align-items', value: 'flex-end' },
  'justify-center': { property: 'justify-content', value: 'center' },
  'justify-between': { property: 'justify-content', value: 'space-between' },
  'justify-start': { property: 'justify-content', value: 'flex-start' },
  'justify-end': { property: 'justify-content', value: 'flex-end' },
  
  // Flex/Grid specific
  'flex-col': { property: 'flex-direction', value: 'column' },
  'flex-grow': { property: 'flex-grow', value: '1' },
  'flex-wrap': { property: 'flex-wrap', value: 'wrap' },
  
  // Sizing
  w: 'width',
  h: 'height',
  'w-full': { property: 'width', value: '100%' },
  'h-full': { property: 'height', value: '100%' },
  'max-w-prose': { property: 'max-width', value: '65ch' },
  'min-h-screen': { property: 'min-height', value: '100vh' },
  
  // Spacing
  m: 'margin',
  mt: 'margin-top',
  mr: 'margin-right',
  mb: 'margin-bottom',
  ml: 'margin-left',
  mx: ['margin-left', 'margin-right'],
  my: ['margin-top', 'margin-bottom'],
  p: 'padding',
  pt: 'padding-top',
  pr: 'padding-right',
  pb: 'padding-bottom',
  pl: 'padding-left',
  px: ['padding-left', 'padding-right'],
  py: ['padding-top', 'padding-bottom'],
  gap: 'gap',
  
  // Typography
  text: 'font-size',
  'font-bold': { property: 'font-weight', value: '700' },
  'font-medium': { property: 'font-weight', value: '500' },
  'font-light': { property: 'font-weight', value: '300' },
  'tracking-tighter': { property: 'letter-spacing', value: '-0.05em' },
  'tracking-tight': { property: 'letter-spacing', value: '-0.025em' },
  'text-center': { property: 'text-align', value: 'center' },
  'text-left': { property: 'text-align', value: 'left' },
  'text-right': { property: 'text-align', value: 'right' },
  
  // Visuals
  bg: 'background-color',
  rounded: 'border-radius',
  'rounded-full': { property: 'border-radius', value: '9999px' },
  'rounded-xl': { property: 'border-radius', value: '0.75rem' },
  border: { property: 'border-width', value: '1px' },
  'border-t': { property: 'border-top-width', value: '1px' },
  'border-b': { property: 'border-bottom-width', value: '1px' },
  shadow: 'box-shadow',
  
  // Interactivity & States
  transition: { property: 'transition', value: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' },
  'scale-105': { property: 'transform', value: 'scale(1.05)' },
  'active-scale': { property: 'transform', value: 'scale(0.96)' },
  'cursor-pointer': { property: 'cursor', value: 'pointer' },
  'overflow-hidden': { property: 'overflow', value: 'hidden' },

  // Starlight Primitives
  'glass': {
    property: ['background-color', 'backdrop-filter', '-webkit-backdrop-filter', 'border', 'box-shadow'], 
    value: ['rgba(255, 255, 255, 0.03)', 'blur(16px)', 'blur(16px)', '1px solid rgba(255, 255, 255, 0.1)', '0 8px 32px 0 rgba(0, 0, 0, 0.37)'] 
  },
  'glow-blue': { property: 'box-shadow', value: '0 0 30px rgba(0, 212, 255, 0.25)' },
  'bg-starlight': { property: 'background', value: 'linear-gradient(135deg, #ffb38a 0%, #00d4ff 100%)' },
  'text-gradient-starlight': {
    property: ['background', '-webkit-background-clip', '-webkit-text-fill-color', 'display'], 
    value: ['linear-gradient(to right, #ffb38a, #00d4ff)', 'text', 'transparent', 'inline-block'] 
  },

  // Components
  'btn-starlight': {
    property: ['background', 'color', 'border', 'box-shadow', 'font-weight', 'transition', 'height', 'padding', 'display', 'align-items', 'justify-content', 'border-radius', 'cursor'],
    value: ['linear-gradient(135deg, #ffb38a 0%, #00d4ff 100%)', '#000', 'none', '0 0 20px rgba(0, 212, 255, 0.3)', '700', 'all 0.2s ease', '3rem', '0 1.5rem', 'inline-flex', 'center', 'center', '0.75rem', 'pointer']
  },
  'btn-secondary': {
    property: ['background', 'color', 'border', 'font-weight', 'transition', 'height', 'padding', 'display', 'align-items', 'justify-content', 'border-radius', 'cursor'],
    value: ['rgba(255, 255, 255, 0.05)', 'inherit', '1px solid rgba(255, 255, 255, 0.15)', '700', 'all 0.2s ease', '3rem', '0 1.5rem', 'inline-flex', 'center', 'center', '0.75rem', 'pointer']
  },
  'input-starlight': {
    property: ['background-color', 'border', 'color', 'border-radius', 'padding', 'appearance', 'background-image', 'background-repeat', 'background-position', 'background-size', 'transition', 'height'],
    value: [
      'rgba(255, 255, 255, 0.04)', 
      '1px solid rgba(255, 255, 255, 0.15)', 
      'inherit', 
      '0.75rem', 
      '0 2.5rem 0 1rem',
      'none',
      'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'rgba(255,255,255,0.4)\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M8 9l4 4 4-4\' /%3E%3C/svg%3E")',
      'no-repeat',
      'right 1rem center',
      '1rem',
      'all 0.2s ease',
      '3rem'
    ]
  },
  'checkbox-starlight': {
    property: ['appearance', 'width', 'height', 'background', 'border', 'border-radius', 'cursor', 'transition', 'position', 'display', 'align-items', 'justify-content'],
    value: ['none', '1.25rem', '1.25rem', 'rgba(255, 255, 255, 0.05)', '1px solid rgba(255, 255, 255, 0.2)', '0.375rem', 'pointer', 'all 0.2s ease', 'relative', 'inline-flex', 'center', 'center']
  },
  'radio-starlight': {
    property: ['appearance', 'width', 'height', 'background', 'border', 'border-radius', 'cursor', 'transition', 'position', 'display', 'align-items', 'justify-content'],
    value: ['none', '1.25rem', '1.25rem', 'rgba(255, 255, 255, 0.05)', '1px solid rgba(255, 255, 255, 0.2)', '50%', 'pointer', 'all 0.2s ease', 'relative', 'inline-flex', 'center', 'center']
  },
  
  // Dialog & Menu
  'dialog-overlay': {
    property: ['position', 'top', 'left', 'width', 'height', 'background', 'backdrop-filter', 'display', 'align-items', 'justify-content', 'z-index'],
    value: ['fixed', '0', '0', '100vw', '100vh', 'rgba(0, 0, 0, 0.6)', 'blur(12px)', 'flex', 'center', 'center', '400']
  },
  'dialog-content': {
    property: ['background-color', 'backdrop-filter', 'border', 'border-radius', 'width', 'max-width', 'box-shadow', 'overflow', 'position'],
    value: ['rgba(10, 10, 20, 0.98)', 'blur(20px)', '1px solid rgba(255, 255, 255, 0.1)', '1.5rem', '90%', '600px', '0 25px 50px -12px rgba(0, 0, 0, 0.5)', 'hidden', 'relative']
  },
  'dropdown-menu': {
    property: ['background-color', 'backdrop-filter', 'border', 'border-radius', 'padding', 'box-shadow', 'min-width', 'z-index', 'margin-top'],
    value: ['rgba(15, 15, 30, 0.98)', 'blur(20px)', '1px solid rgba(255, 255, 255, 0.1)', '1rem', '0.5rem', '0 20px 40px rgba(0,0,0,0.4)', '200px', '600', '0.5rem']
  },
  'dropdown-item': {
    property: ['padding', 'color', 'border-radius', 'display', 'width', 'text-align', 'transition', 'cursor', 'font-size'],
    value: ['0.625rem 1rem', 'rgba(255,255,255,0.7)', '0.625rem', 'block', '100%', 'left', 'all 0.2s', 'pointer', '0.875rem']
  },

  // Tooltip
  'tooltip': {
    property: ['position', 'bottom', 'left', 'transform', 'padding', 'background-color', 'backdrop-filter', 'border', 'border-radius', 'color', 'font-size', 'white-space', 'pointer-events', 'opacity', 'transition', 'z-index', 'box-shadow'],
    value: ['absolute', '125%', '50%', 'translateX(-50%)', '0.5rem 0.75rem', 'rgba(10, 10, 30, 0.98)', 'blur(12px)', '1px solid rgba(0, 212, 255, 0.3)', '0.5rem', '#f1f5f9', '0.75rem', 'nowrap', 'none', '0', 'all 0.2s ease', '800', '0 4px 15px rgba(0, 0, 0, 0.4)']
  },

  // Skeleton
  'skeleton': {
    property: ['background-color', 'background-image', 'background-size', 'background-repeat', 'border-radius', 'width', 'height'],
    value: ['rgba(255, 255, 255, 0.1)', 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)', '200% 100%', 'no-repeat', '0.5rem', '100%', '1rem']
  }
};

module.exports = { defaultTheme, utilityMaps };