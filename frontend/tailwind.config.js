function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}


module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      colors: {
        primary: {
          // Customize it on globals.css :root
          50: withOpacity('--tw-clr-primary-50'),
          100: withOpacity('--tw-clr-primary-100'),
          200: withOpacity('--tw-clr-primary-200'),
          300: withOpacity('--tw-clr-primary-300'),
          400: withOpacity('--tw-clr-primary-400'),
          500: withOpacity('--tw-clr-primary-500'),
          600: withOpacity('--tw-clr-primary-600'),
          700: withOpacity('--tw-clr-primary-700'),
          800: withOpacity('--tw-clr-primary-800'),
          900: withOpacity('--tw-clr-primary-900'),
        },
        cinder: {
          50: '#f6f5fa',
          100: '#ebeaf4',
          200: '#d1cfe8',
          300: '#a7a6d3',
          400: '#7775bb',
          500: '#5654a3',
          600: '#444188',
          700: '#3a366e',
          800: '#322f5d',
          900: '#11101d',
      },
        dark: '#1c1c1c',
        darkLighter: '#4c4c4c',
        light: '#e5e7eb',
        warning: '#feff07',
        danger: '#f61f1f',
        success: '#37e348',

      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
