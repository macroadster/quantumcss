const defaultTheme = {
  colors: {
    white: '#ffffff',
    black: '#000000',
    primary: {
      50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa',
      500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a'
    },
    secondary: '#64748b',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    neutral: '#6b7280',
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
    accent: 'var(--q-color-primary)',
    transparent: 'transparent',
  },
  spacing: {
    0: '0px', px: '1px', 1: '0.25rem', 2: '0.5rem', 3: '0.75rem', 4: '1rem', 5: '1.25rem',
    6: '1.5rem', 8: '2rem', 10: '2.5rem', 12: '3rem', 14: '3.5rem', 16: '4rem', 20: '5rem',
    24: '6rem', 32: '8rem', 40: '10rem', 48: '12rem', 64: '16rem', 128: '32rem',
  },
  borderRadius: {
    none: '0px', sm: '0.125rem', md: '0.375rem', lg: '0.5rem', xl: '0.75rem',
    '2xl': '1rem', '3xl': '1.5rem', full: '9999px',
  },
  fontSize: {
    xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem', xl: '1.25rem',
    '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.25rem', '5xl': '3rem',
  },
  fontWeight: {
    light: '300', normal: '400', medium: '500', semibold: '600', bold: '700', extrabold: '800', black: '900',
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
  },
  duration: {
    75: '75ms', 100: '100ms', 150: '150ms', 200: '200ms', 300: '300ms',
    500: '500ms', 700: '700ms', 1000: '1000ms',
  },
  easing: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  transition: {
    fast: '150ms ease-in-out',
    base: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '400ms ease-in-out',
  },
  semantic: {
    bgPrimary: 'var(--q-bg-primary)',
    cardBg: 'rgba(255 255 255 / 5%)',
    cardBorder: 'rgba(255 255 255 / 8%)',
    textPrimary: '#f1f5f9',
    textSecondary: 'rgb(241 245 249 / 70%)',
    textMuted: 'rgb(241 245 249 / 45%)',
    glassBg: 'rgb(255 255 255 / 3%)',
    glassBorder: 'rgb(255 255 255 / 5%)',
    glassBlur: 'blur(16px)',
  },
  light: {
    bg: '#f1f5f9',
    text: '#1e293b',
    textMuted: '#64748b',
    cardBg: '#fff',
    cardBorder: 'rgb(0 0 0 / 6%)',
  },
};

const utilityMaps = {
  flex: { property: 'display', value: 'flex' },
  grid: { property: 'display', value: 'grid' },
  hidden: { property: 'display', value: 'none' },
  block: { property: 'display', value: 'block' },
  'inline-block': { property: 'display', value: 'inline-block' },
  'inline-flex': { property: 'display', value: 'inline-flex' },
  'inline-grid': { property: 'display', value: 'inline-grid' },
  'inline': { property: 'display', value: 'inline' },

  'flex-row': { property: 'flex-direction', value: 'row' },
  'flex-row-reverse': { property: 'flex-direction', value: 'row-reverse' },
  'flex-col': { property: 'flex-direction', value: 'column' },
  'flex-col-reverse': { property: 'flex-direction', value: 'column-reverse' },

  'flex-wrap': { property: 'flex-wrap', value: 'wrap' },
  'flex-wrap-reverse': { property: 'flex-wrap', value: 'wrap-reverse' },
  'flex-nowrap': { property: 'flex-wrap', value: 'nowrap' },

  'items-start': { property: 'align-items', value: 'flex-start' },
  'items-end': { property: 'align-items', value: 'flex-end' },
  'items-center': { property: 'align-items', value: 'center' },
  'items-baseline': { property: 'align-items', value: 'baseline' },
  'items-stretch': { property: 'align-items', value: 'stretch' },

  'justify-start': { property: 'justify-content', value: 'flex-start' },
  'justify-end': { property: 'justify-content', value: 'flex-end' },
  'justify-center': { property: 'justify-content', value: 'center' },
  'justify-between': { property: 'justify-content', value: 'space-between' },
  'justify-around': { property: 'justify-content', value: 'space-around' },
  'justify-evenly': { property: 'justify-content', value: 'space-evenly' },

  'flex-1': { property: 'flex', value: '1 1 0%' },
  'flex-auto': { property: 'flex', value: '1 1 auto' },
  'flex-initial': { property: 'flex', value: '0 1 auto' },
  'flex-none': { property: 'flex', value: 'none' },

  'grid-cols-1': { property: 'grid-template-columns', value: 'repeat(1, minmax(0, 1fr))' },
  'grid-cols-2': { property: 'grid-template-columns', value: 'repeat(2, minmax(0, 1fr))' },
  'grid-cols-3': { property: 'grid-template-columns', value: 'repeat(3, minmax(0, 1fr))' },
  'grid-cols-4': { property: 'grid-template-columns', value: 'repeat(4, minmax(0, 1fr))' },
  'grid-cols-5': { property: 'grid-template-columns', value: 'repeat(5, minmax(0, 1fr))' },
  'grid-cols-6': { property: 'grid-template-columns', value: 'repeat(6, minmax(0, 1fr))' },
  'grid-cols-12': { property: 'grid-template-columns', value: 'repeat(12, minmax(0, 1fr))' },

  'gap-0': { property: 'gap', value: '0px' },
  'gap-1': { property: 'gap', value: '0.25rem' },
  'gap-2': { property: 'gap', value: '0.5rem' },
  'gap-3': { property: 'gap', value: '0.75rem' },
  'gap-4': { property: 'gap', value: '1rem' },
  'gap-5': { property: 'gap', value: '1.25rem' },
  'gap-6': { property: 'gap', value: '1.5rem' },
  'gap-8': { property: 'gap', value: '2rem' },
  'gap-10': { property: 'gap', value: '2.5rem' },
  'gap-12': { property: 'gap', value: '3rem' },
  'gap-16': { property: 'gap', value: '4rem' },
  'gap-20': { property: 'gap', value: '5rem' },
  'gap-24': { property: 'gap', value: '6rem' },
  'gap-32': { property: 'gap', value: '8rem' },

  'm-0': { property: 'margin', value: '0px' },
  'm-1': { property: 'margin', value: '0.25rem' },
  'm-2': { property: 'margin', value: '0.5rem' },
  'm-3': { property: 'margin', value: '0.75rem' },
  'm-4': { property: 'margin', value: '1rem' },
  'm-5': { property: 'margin', value: '1.25rem' },
  'm-6': { property: 'margin', value: '1.5rem' },
  'm-8': { property: 'margin', value: '2rem' },
  'm-10': { property: 'margin', value: '2.5rem' },
  'm-12': { property: 'margin', value: '3rem' },
  'm-16': { property: 'margin', value: '4rem' },
  'm-20': { property: 'margin', value: '5rem' },
  'm-24': { property: 'margin', value: '6rem' },
  'm-32': { property: 'margin', value: '8rem' },
  'm-auto': { property: 'margin', value: 'auto' },

  'mx-0': { property: ['margin-left', 'margin-right'], value: ['0px', '0px'] },
  'mx-1': { property: ['margin-left', 'margin-right'], value: ['0.25rem', '0.25rem'] },
  'mx-2': { property: ['margin-left', 'margin-right'], value: ['0.5rem', '0.5rem'] },
  'mx-4': { property: ['margin-left', 'margin-right'], value: ['1rem', '1rem'] },
  'mx-auto': { property: ['margin-left', 'margin-right'], value: ['auto', 'auto'] },

  'my-0': { property: ['margin-top', 'margin-bottom'], value: ['0px', '0px'] },
  'my-1': { property: ['margin-top', 'margin-bottom'], value: ['0.25rem', '0.25rem'] },
  'my-2': { property: ['margin-top', 'margin-bottom'], value: ['0.5rem', '0.5rem'] },
  'my-4': { property: ['margin-top', 'margin-bottom'], value: ['1rem', '1rem'] },
  'my-auto': { property: ['margin-top', 'margin-bottom'], value: ['auto', 'auto'] },

  'mt-0': { property: 'margin-top', value: '0px' },
  'mt-1': { property: 'margin-top', value: '0.25rem' },
  'mt-2': { property: 'margin-top', value: '0.5rem' },
  'mt-4': { property: 'margin-top', value: '1rem' },
  'mt-6': { property: 'margin-top', value: '1.5rem' },
  'mt-8': { property: 'margin-top', value: '2rem' },
  'mt-16': { property: 'margin-top', value: '4rem' },

  'mb-0': { property: 'margin-bottom', value: '0px' },
  'mb-1': { property: 'margin-bottom', value: '0.25rem' },
  'mb-2': { property: 'margin-bottom', value: '0.5rem' },
  'mb-4': { property: 'margin-bottom', value: '1rem' },
  'mb-6': { property: 'margin-bottom', value: '1.5rem' },
  'mb-8': { property: 'margin-bottom', value: '2rem' },
  'mb-16': { property: 'margin-bottom', value: '4rem' },

  'ml-0': { property: 'margin-left', value: '0px' },
  'ml-1': { property: 'margin-left', value: '0.25rem' },
  'ml-2': { property: 'margin-left', value: '0.5rem' },
  'ml-4': { property: 'margin-left', value: '1rem' },
  'ml-auto': { property: 'margin-left', value: 'auto' },

  'mr-0': { property: 'margin-right', value: '0px' },
  'mr-1': { property: 'margin-right', value: '0.25rem' },
  'mr-2': { property: 'margin-right', value: '0.5rem' },
  'mr-4': { property: 'margin-right', value: '1rem' },

  'p-0': { property: 'padding', value: '0px' },
  'p-1': { property: 'padding', value: '0.25rem' },
  'p-2': { property: 'padding', value: '0.5rem' },
  'p-3': { property: 'padding', value: '0.75rem' },
  'p-4': { property: 'padding', value: '1rem' },
  'p-5': { property: 'padding', value: '1.25rem' },
  'p-6': { property: 'padding', value: '1.5rem' },
  'p-8': { property: 'padding', value: '2rem' },
  'p-10': { property: 'padding', value: '2.5rem' },
  'p-12': { property: 'padding', value: '3rem' },
  'p-16': { property: 'padding', value: '4rem' },
  'p-20': { property: 'padding', value: '5rem' },
  'p-24': { property: 'padding', value: '6rem' },
  'p-32': { property: 'padding', value: '8rem' },

  'px-0': { property: ['padding-left', 'padding-right'], value: ['0px', '0px'] },
  'px-1': { property: ['padding-left', 'padding-right'], value: ['0.25rem', '0.25rem'] },
  'px-2': { property: ['padding-left', 'padding-right'], value: ['0.5rem', '0.5rem'] },
  'px-4': { property: ['padding-left', 'padding-right'], value: ['1rem', '1rem'] },
  'px-6': { property: ['padding-left', 'padding-right'], value: ['1.5rem', '1.5rem'] },
  'px-8': { property: ['padding-left', 'padding-right'], value: ['2rem', '2rem'] },
  'px-12': { property: ['padding-left', 'padding-right'], value: ['3rem', '3rem'] },

  'py-0': { property: ['padding-top', 'padding-bottom'], value: ['0px', '0px'] },
  'py-1': { property: ['padding-top', 'padding-bottom'], value: ['0.25rem', '0.25rem'] },
  'py-2': { property: ['padding-top', 'padding-bottom'], value: ['0.5rem', '0.5rem'] },
  'py-4': { property: ['padding-top', 'padding-bottom'], value: ['1rem', '1rem'] },
  'py-6': { property: ['padding-top', 'padding-bottom'], value: ['1.5rem', '1.5rem'] },
  'py-8': { property: ['padding-top', 'padding-bottom'], value: ['2rem', '2rem'] },
  'py-16': { property: ['padding-top', 'padding-bottom'], value: ['4rem', '4rem'] },
  'py-24': { property: ['padding-top', 'padding-bottom'], value: ['6rem', '6rem'] },

  'pt-0': { property: 'padding-top', value: '0px' },
  'pt-4': { property: 'padding-top', value: '1rem' },
  'pt-6': { property: 'padding-top', value: '1.5rem' },
  'pt-8': { property: 'padding-top', value: '2rem' },

  'pb-0': { property: 'padding-bottom', value: '0px' },
  'pb-4': { property: 'padding-bottom', value: '1rem' },
  'pb-6': { property: 'padding-bottom', value: '1.5rem' },
  'pb-8': { property: 'padding-bottom', value: '2rem' },
  'pb-12': { property: 'padding-bottom', value: '3rem' },

  'pl-0': { property: 'padding-left', value: '0px' },
  'pl-4': { property: 'padding-left', value: '1rem' },
  'pl-6': { property: 'padding-left', value: '1.5rem' },
  'pl-12': { property: 'padding-left', value: '3rem' },

  'pr-0': { property: 'padding-right', value: '0px' },
  'pr-4': { property: 'padding-right', value: '1rem' },
  'pr-6': { property: 'padding-right', value: '1.5rem' },

  'text-xs': { property: ['font-size', 'line-height'], value: ['0.75rem', '1rem'] },
  'text-sm': { property: ['font-size', 'line-height'], value: ['0.875rem', '1.25rem'] },
  'text-base': { property: ['font-size', 'line-height'], value: ['1rem', '1.5rem'] },
  'text-lg': { property: ['font-size', 'line-height'], value: ['1.125rem', '1.75rem'] },
  'text-xl': { property: ['font-size', 'line-height'], value: ['1.25rem', '1.75rem'] },
  'text-2xl': { property: ['font-size', 'line-height'], value: ['1.5rem', '2rem'] },
  'text-3xl': { property: ['font-size', 'line-height'], value: ['1.875rem', '2.25rem'] },
  'text-4xl': { property: ['font-size', 'line-height'], value: ['2.25rem', '2.5rem'] },
  'text-5xl': { property: ['font-size', 'line-height'], value: ['3rem', '1.2'] },

  'font-light': { property: 'font-weight', value: '300' },
  'font-normal': { property: 'font-weight', value: '400' },
  'font-medium': { property: 'font-weight', value: '500' },
  'font-semibold': { property: 'font-weight', value: '600' },
  'font-bold': { property: 'font-weight', value: '700' },
  'font-extrabold': { property: 'font-weight', value: '800' },
  'font-black': { property: 'font-weight', value: '900' },

  'text-left': { property: 'text-align', value: 'left' },
  'text-center': { property: 'text-align', value: 'center' },
  'text-right': { property: 'text-align', value: 'right' },
  'text-justify': { property: 'text-align', value: 'justify' },

  'truncate': { property: ['white-space', 'overflow', 'text-overflow'], value: ['nowrap', 'hidden', 'ellipsis'] },

  'text-primary': { property: 'color', value: 'var(--q-text-primary)' },
  'text-secondary': { property: 'color', value: 'var(--q-text-secondary)' },
  'text-muted': { property: 'color', value: 'var(--q-text-muted)' },
  'text-accent': { property: 'color', value: 'var(--q-color-primary)' },
  'text-success': { property: 'color', value: 'var(--q-color-success)' },
  'text-warning': { property: 'color', value: 'var(--q-color-warning)' },
  'text-error': { property: 'color', value: 'var(--q-color-error)' },
  'text-neutral': { property: 'color', value: 'var(--q-color-neutral)' },
  'text-white': { property: 'color', value: '#fff' },
  'text-black': { property: 'color', value: '#000' },

  'bg-primary': { property: 'background-color', value: 'var(--q-bg-primary)' },
  'bg-accent': { property: 'background-color', value: 'var(--q-color-primary)' },
  'bg-secondary': { property: 'background-color', value: 'var(--q-color-secondary)' },
  'bg-success': { property: 'background-color', value: 'var(--q-color-success)' },
  'bg-warning': { property: 'background-color', value: 'var(--q-color-warning)' },
  'bg-error': { property: 'background-color', value: 'var(--q-color-error)' },
  'bg-neutral': { property: 'background-color', value: 'var(--q-color-neutral)' },
  'bg-white': { property: ['background-color', 'color'], value: ['#fff', '#0f172a'] },
  'bg-black': { property: ['background-color', 'color'], value: ['#000', '#fff'] },

  'border-0': { property: 'border-width', value: '0' },
  'border': { property: 'border-width', value: '1px' },
  'border-2': { property: 'border-width', value: '2px' },
  'border-4': { property: 'border-width', value: '4px' },

  'border-solid': { property: 'border-style', value: 'solid' },
  'border-dashed': { property: 'border-style', value: 'dashed' },
  'border-dotted': { property: 'border-style', value: 'dotted' },

  'rounded-none': { property: 'border-radius', value: '0px' },
  'rounded-sm': { property: 'border-radius', value: '0.125rem' },
  'rounded-md': { property: 'border-radius', value: '0.375rem' },
  'rounded-lg': { property: 'border-radius', value: '0.5rem' },
  'rounded-xl': { property: 'border-radius', value: '0.75rem' },
  'rounded-2xl': { property: 'border-radius', value: '1rem' },
  'rounded-3xl': { property: 'border-radius', value: '1.5rem' },
  'rounded-full': { property: 'border-radius', value: '9999px' },

  'shadow-none': { property: 'box-shadow', value: 'none' },
  'shadow-sm': { property: 'box-shadow', value: 'var(--q-shadow-sm)' },
  'shadow-md': { property: 'box-shadow', value: 'var(--q-shadow-md)' },
  'shadow-lg': { property: 'box-shadow', value: 'var(--q-shadow-lg)' },
  'shadow-xl': { property: 'box-shadow', value: 'var(--q-shadow-xl)' },
  'shadow-2xl': { property: 'box-shadow', value: 'var(--q-shadow-2xl)' },

  'static': { property: 'position', value: 'static' },
  'fixed': { property: 'position', value: 'fixed' },
  'absolute': { property: 'position', value: 'absolute' },
  'relative': { property: 'position', value: 'relative' },
  'sticky': { property: 'position', value: 'sticky' },

  'inset-0': { property: 'inset', value: '0' },
  'top-0': { property: 'top', value: '0' },
  'right-0': { property: 'right', value: '0' },
  'bottom-0': { property: 'bottom', value: '0' },
  'left-0': { property: 'left', value: '0' },

  'w-auto': { property: 'width', value: 'auto' },
  'w-full': { property: 'width', value: '100%' },
  'w-screen': { property: 'width', value: '100vw' },
  'w-fit': { property: 'width', value: 'fit-content' },

  'w-0': { property: 'width', value: '0px' },
  'w-1': { property: 'width', value: '0.25rem' },
  'w-2': { property: 'width', value: '0.5rem' },
  'w-3': { property: 'width', value: '0.75rem' },
  'w-4': { property: 'width', value: '1rem' },
  'w-5': { property: 'width', value: '1.25rem' },
  'w-6': { property: 'width', value: '1.5rem' },
  'w-8': { property: 'width', value: '2rem' },
  'w-10': { property: 'width', value: '2.5rem' },
  'w-12': { property: 'width', value: '3rem' },
  'w-16': { property: 'width', value: '4rem' },
  'w-20': { property: 'width', value: '5rem' },
  'w-24': { property: 'width', value: '6rem' },
  'w-32': { property: 'width', value: '8rem' },

  'h-auto': { property: 'height', value: 'auto' },
  'h-full': { property: 'height', value: '100%' },
  'h-screen': { property: 'height', value: '100vh' },
  'h-fit': { property: 'height', value: 'fit-content' },

  'h-0': { property: 'height', value: '0px' },
  'h-1': { property: 'height', value: '0.25rem' },
  'h-2': { property: 'height', value: '0.5rem' },
  'h-3': { property: 'height', value: '0.75rem' },
  'h-4': { property: 'height', value: '1rem' },
  'h-5': { property: 'height', value: '1.25rem' },
  'h-6': { property: 'height', value: '1.5rem' },
  'h-8': { property: 'height', value: '2rem' },
  'h-10': { property: 'height', value: '2.5rem' },
  'h-12': { property: 'height', value: '3rem' },
  'h-16': { property: 'height', value: '4rem' },
  'h-20': { property: 'height', value: '5rem' },
  'h-24': { property: 'height', value: '6rem' },
  'h-32': { property: 'height', value: '8rem' },

  'min-w-0': { property: 'min-width', value: '0px' },
  'min-w-full': { property: 'min-width', value: '100%' },

  'min-h-0': { property: 'min-height', value: '0px' },
  'min-h-full': { property: 'min-height', value: '100%' },

  'max-w-0': { property: 'max-width', value: '0px' },
  'max-w-full': { property: 'max-width', value: '100%' },
  'max-w-screen': { property: 'max-width', value: '100vw' },

  'max-h-full': { property: 'max-height', value: '100%' },
  'max-h-screen': { property: 'max-height', value: '100vh' },

  'cursor-pointer': { property: 'cursor', value: 'pointer' },
  'cursor-default': { property: 'cursor', value: 'default' },
  'cursor-not-allowed': { property: 'cursor', value: 'not-allowed' },

  'select-none': { property: 'user-select', value: 'none' },
  'select-text': { property: 'user-select', value: 'text' },
  'select-all': { property: 'user-select', value: 'all' },

  'pointer-events-none': { property: 'pointer-events', value: 'none' },
  'pointer-events-auto': { property: 'pointer-events', value: 'auto' },

  'sr-only': {
    property: ['position', 'width', 'height', 'padding', 'margin', 'overflow', 'clip', 'clip-path', 'white-space', 'border-width'],
    value: ['absolute', '1px', '1px', '0', '-1px', 'hidden', 'rect(0, 0, 0, 0)', 'inset(50%)', 'nowrap', '0']
  },
  'not-sr-only': {
    property: ['position', 'width', 'height', 'padding', 'margin', 'overflow', 'clip', 'clip-path', 'white-space'],
    value: ['static', 'auto', 'auto', '0', '0', 'visible', 'auto', 'none', 'normal']
  },

  'z-auto': { property: 'z-index', value: 'auto' },
  'z-n10': { property: 'z-index', value: '-10' },
  'z-n1': { property: 'z-index', value: '-1' },
  'z-0': { property: 'z-index', value: '0' },
  'z-10': { property: 'z-index', value: '10' },
  'z-20': { property: 'z-index', value: '20' },
  'z-30': { property: 'z-index', value: '30' },
  'z-40': { property: 'z-index', value: '40' },
  'z-50': { property: 'z-index', value: '50' },
  'z-100': { property: 'z-index', value: '100' },
  'z-200': { property: 'z-index', value: '200' },
  'z-300': { property: 'z-index', value: '300' },
  'z-400': { property: 'z-index', value: '400' },
  'z-500': { property: 'z-index', value: '500' },

  'scale-95': { property: 'transform', value: 'scale(0.95)' },
  'scale-100': { property: 'transform', value: 'scale(1)' },
  'scale-105': { property: 'transform', value: 'scale(1.05)' },
  'scale-110': { property: 'transform', value: 'scale(1.1)' },

  'rotate-0': { property: 'transform', value: 'rotate(0deg)' },
  'rotate-45': { property: 'transform', value: 'rotate(45deg)' },
  'rotate-90': { property: 'transform', value: 'rotate(90deg)' },
  'rotate-180': { property: 'transform', value: 'rotate(180deg)' },

  'transition-none': { property: 'transition-property', value: 'none' },
  'transition-all': {
    property: 'transition',
    value: 'all var(--q-ease-in-out) var(--q-duration-150)'
  },
  'transition-colors': {
    property: 'transition',
    value: 'color, background-color, border-color, text-decoration-color, fill, stroke var(--q-ease-in-out) var(--q-duration-150)'
  },

  'flex-shrink-0': { property: 'flex-shrink', value: '0' },
  'overflow-hidden': { property: 'overflow', value: 'hidden' },
  'overflow-visible': { property: 'overflow', value: 'visible' },
  'bg-clip-text': { property: ['background-clip', '-webkit-background-clip'], value: ['text', 'text'] },
  'border-none': { property: 'border-width', value: '0' },
  'bg-transparent': { property: 'background-color', value: 'transparent' },
  'top-1/2': { property: 'top', value: '50%' },
  'left-4': { property: 'left', value: '1rem' },
  '-translate-y-1_2': { property: 'transform', value: 'translateY(-50%)' },

  'svg-fluid': {
    property: ['width', 'height', 'max-width', 'display'],
    value: ['100%', 'auto', '100%', 'block']
  },
  'svg-contain': { property: 'object-fit', value: 'contain' },
  'svg-cover': { property: 'object-fit', value: 'cover' },
  'vector-non-scaling': { property: 'vector-effect', value: 'non-scaling-stroke' },
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
    property: ['display', 'flex-direction', 'align-items', 'width', 'min-width', 'position', 'top', 'left', 'right', 'z-index'],
    value: ['flex', 'row', 'center', '100%', '100%', 'sticky', '0', '0', '0', '1000']
  },
  'card-base': {
    property: ['display', 'flex-direction', 'align-items', 'padding', 'overflow', 'border-radius', 'transition', 'position'],
    value: ['flex', 'column', 'stretch', 'var(--q-space-10)', 'hidden', 'var(--q-radius-lg)', 'all 0.3s ease', 'relative']
  },
  'btn-base': {
    property: ['display', 'align-items', 'justify-content', 'cursor', 'transition', 'font-weight', 'border-radius', 'border', 'height'],
    value: ['inline-flex', 'center', 'center', 'pointer', 'all 0.2s ease', '600', 'var(--q-radius-md)', 'none', '3rem']
  },
  'input-base': {
    property: ['display', 'width', 'appearance', 'transition', 'border-radius', 'border', 'line-height', 'height'],
    value: ['block', '100%', 'none', 'all 0.2s ease', 'var(--q-radius-md)', 'none', '1.2', '3rem']
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
    property: ['background-color', 'backdrop-filter', '-webkit-backdrop-filter', 'border-width', 'border-style', 'border-color'], 
    value: ['rgba(255, 255, 255, 0.03)', 'blur(16px)', 'blur(16px)', '1px', 'solid', 'rgba(255, 255, 255, 0.1)'] 
  },
  'bg-starlight': { property: 'background', value: 'var(--q-gradient-primary)' },
  'text-gradient': {
    property: ['background', '-webkit-background-clip', '-webkit-text-fill-color', 'display'], 
    value: ['linear-gradient(to right, var(--q-color-starlight-peach), var(--q-color-starlight-blue))', 'text', 'transparent', 'inline-block'] 
  },
  'theme-starlight': {
    property: ['background', 'color', 'border-color', 'box-shadow'],
    value: ['linear-gradient(135deg, var(--q-color-starlight-peach) 0%, var(--q-color-starlight-blue) 100%)', '#000', 'transparent', '0 0 30px color-mix(in srgb, var(--q-color-starlight-blue), transparent 80%)']
  },
  'theme-glass': {
    property: ['background-color', 'backdrop-filter', '-webkit-backdrop-filter', 'border-color', 'border-width', 'border-style'],
    value: ['rgba(255, 255, 255, 0.05)', 'blur(16px)', 'blur(16px)', 'rgba(255, 255, 255, 0.1)', '1px', 'solid']
  },
  'theme-glass-dark': {
    property: ['background-color', 'border-color', 'border-width', 'border-style'],
    value: ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.1)', '1px', 'solid']
  },
  'dialog-bg': { 
    property: ['background-color', 'backdrop-filter', '-webkit-backdrop-filter'], 
    value: ['rgba(8, 8, 26, 0.05) !important', 'blur(24px) !important', 'blur(24px) !important'] 
  },
  'glow-blue': { property: 'box-shadow', value: '0 0 30px color-mix(in srgb, var(--q-color-starlight-blue), transparent 75%)' },
  'glow-starlight': { property: 'box-shadow', value: '0 0 30px color-mix(in srgb, var(--q-color-starlight-blue), transparent 75%)' },
  'glow-peach': { property: 'box-shadow', value: '0 0 30px rgba(255, 179, 138, 0.25)' },
  'glow-orange': { property: 'box-shadow', value: '0 0 30px rgba(255, 126, 95, 0.25)' },
  'focus-glow': {
    property: ['outline', 'box-shadow'],
    value: ['none !important', '0 0 0 4px color-mix(in srgb, var(--q-color-starlight-blue), transparent 60%), 0 0 35px color-mix(in srgb, var(--q-color-starlight-blue), transparent 30%) !important'],
    variant: 'focus'
  },
  'btn-starlight': 'btn-base theme-starlight px-6',
  'btn-secondary': 'btn-base theme-glass-dark px-6 border-white_15',
  'input-starlight': 'input-base theme-glass-dark px-4 border-white_15',
  'textarea-starlight': 'input-base theme-glass-dark p-4 min-h-32 border-white_15',
  'checkbox-starlight': 'btn-base theme-glass-dark w-5 h-5 border-white_20',
  'search-container': 'relative block w-full h-12',
    'search-input': 'pl-12 w-full h-12',
    'search-icon': 'absolute left-4 top-1_2 -translate-y-1_2 pointer-events-none z-10 w-5 h-5',
    'nav-glass': 'nav-base theme-glass-dark border-b',
    'starlight-card': 'card-base theme-glass-dark',
    'starlight-card-interactive': 'card-base theme-glass-dark hover:border-white_20 hover:-translate-y-1 transition-all duration-300',
    'nav-header': 'nav-base theme-glass-dark w-full sticky top-0 z-50 border-b',
    'starlight-hero': 'container mx-auto px-6 py-16 md:py-24 text-center relative overflow-hidden',
    'starlight-footer': 'border-t border-white_10 py-12 mt-20 bg-black_20 backdrop-blur-md',
    'aside-nav': 'flex flex-col h-full backdrop-blur-xl border-r border-white_10',
    'nav-reverse': { property: 'flex-direction', value: 'row-reverse' },
    'nav-center': { property: 'display', value: 'grid' },
    'hamburger-left': { property: 'order', value: '-1' },
    'search': 'search-container theme-glass-dark rounded-xl',
    'dashboard': 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
    'gallery': 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4',
    'form': 'card-base theme-glass-dark grid grid-cols-1 md:grid-cols-2 gap-8 items-start',
    'dialog': 'dialog-base modal-fixed theme-glass-dark dialog-bg ani-scale-in',
    'starlight-sidebar': 'flex flex-col h-screen w-72 fixed left-0 top-0 bg-black_40 backdrop-blur-xl border-r border-white_10 p-6 z-40',
    'starlight-feed-card': 'flex flex-col bg-white_03 backdrop-blur-md border border-white_10 rounded-2xl p-6 transition-all duration-300 ease',
    'starlight-auth-form': 'flex flex-col max-w-md mx-auto bg-white_05 backdrop-blur-xl border border-white_10 rounded-2xl p-10 shadow-2xl',

    'email-nav': 'flex flex-col h-full bg-black_40 backdrop-blur-xl border-r border-white_10 p-4 overflow-y-auto',
    'email-feed': 'flex flex-col h-full bg-white_05 backdrop-blur-md border-r border-white_10 overflow-y-auto',
    'email-content': 'flex flex-col h-full overflow-y-auto',
    
    'music-nav': 'flex flex-col h-full bg-black_40 backdrop-blur-xl border-r border-white_10 p-4 overflow-y-auto',
    'music-content': 'flex flex-col h-full overflow-y-auto',
    'music-footer': 'flex items-center justify-between px-6 py-4 bg-black_40 backdrop-blur-xl border-t border-white_10',
    
    'chat-sidebar': 'flex flex-col h-full bg-black_40 backdrop-blur-xl border-r border-white_10 overflow-hidden',
    'chat-content': 'flex flex-col h-full overflow-hidden',
    
    'admin-sidebar': 'flex flex-col h-full bg-black_40 backdrop-blur-xl border-r border-white_10 p-4 overflow-y-auto',
    'admin-content': 'flex flex-col h-full overflow-y-auto',
    
    'analytics-sidebar': 'flex flex-col h-full bg-black_40 backdrop-blur-xl border-r border-white_10 p-4 overflow-y-auto',
    'analytics-content': 'flex flex-col h-full overflow-y-auto',

    'layout-email-3col': 'grid h-screen grid-cols-[280px_320px_1fr] overflow-hidden',
    'layout-music-2col': 'grid h-screen grid-rows-[1fr_auto] overflow-hidden',
    'layout-music-row': 'grid grid-cols-[280px_1fr] overflow-hidden',
    'layout-chat-2col': 'grid h-screen grid-cols-[320px_1fr] overflow-hidden',
    'layout-admin-2col': 'grid h-screen grid-cols-[260px_1fr] overflow-hidden',
    'layout-analytics-2col': 'grid h-screen grid-cols-[240px_1fr] overflow-hidden',

    'starlight-stat': 'flex flex-col gap-2 p-5 bg-white_03 border border-white_08 rounded-xl transition-all duration-300',
    'starlight-stat-header': 'flex items-center justify-between',
    'starlight-stat-icon': 'flex items-center justify-center w-10 h-10 rounded-lg',
    'starlight-stat-value': 'text-3xl font-bold text-starlight-blue',
    'starlight-stat-label': 'text-sm uppercase tracking-wide text-white_60',

    'starlight-avatar': 'flex items-center justify-center rounded-full font-semibold text-white',
    'starlight-avatar-sm': 'w-8 h-8 text-xs',
    'starlight-avatar-md': 'w-10 h-10 text-sm',
    'starlight-avatar-lg': 'w-12 h-12 text-base',
    'starlight-avatar-xl': 'w-16 h-16 text-lg',

    'starlight-theme-toggle': 'flex items-center justify-center w-10 h-10 rounded-full bg-white_05 border border-white_10 cursor-pointer transition-all duration-300',
    'starlight-notification': 'relative flex items-center justify-center w-10 h-10 bg-transparent border-none cursor-pointer',
    'starlight-notification-dot': 'absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse',

    'starlight-table-container': 'bg-white_03 border border-white_08 rounded-xl overflow-hidden',
    'starlight-table-header': 'flex items-center justify-between p-4 border-b border-white_08',
    'starlight-table': 'w-full border-collapse',
    'starlight-table-footer': 'flex items-center justify-between p-4 border-t border-white_08 text-white_60',

    'starlight-chart': 'bg-white_03 border border-white_08 rounded-xl overflow-hidden',
    'starlight-chart-header': 'flex items-center justify-between p-4 border-b border-white_05',
    'starlight-chart-tabs': 'flex gap-1',
    'starlight-chart-tab': 'px-3 py-1 text-xs font-medium bg-transparent border-none rounded-md cursor-pointer transition-all',
    'starlight-chart-tab.active': 'bg-starlight-blue_15 text-starlight-blue',

    'starlight-breadcrumb': 'flex items-center gap-2 text-sm',
    'starlight-breadcrumb-item': 'text-white_60 no-underline transition-colors',
    'starlight-breadcrumb-separator': 'text-white_40',
    'starlight-breadcrumb-current': 'font-medium',

    'gallery-grid': 'grid gap-4',
    'gallery-item': 'relative aspect-video rounded-lg overflow-hidden',
    'gallery-overlay': 'absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black_80 to-transparent opacity-0 transition-opacity',

    'starlight-progress': 'flex items-center gap-3',
    'starlight-progress-bar': 'flex-1 h-2 bg-white_10 rounded-full overflow-hidden',
    'starlight-progress-fill': 'h-full bg-gradient-to-r from-starlight-blue to-starlight-peach rounded-full transition-all duration-500',

    'starlight-player-controls': 'flex items-center gap-4',
    'starlight-player-btn': 'flex items-center justify-center w-10 h-10 bg-transparent border-none cursor-pointer transition-all',
    'starlight-player-btn-primary': 'w-12 h-12 bg-starlight-blue rounded-full text-black hover:bg-starlight-peach',

    'starlight-page-header': 'flex items-center justify-between p-6',
    'starlight-page-title': 'text-3xl font-bold',
    'starlight-page-subtitle': 'text-sm text-white_60 mt-1'
  };
  
  module.exports = { defaultTheme, utilityMaps };
