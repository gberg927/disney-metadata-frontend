module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    fontFamily: {
      sans: ['Vollkorn', 'sans-serif'],
    },
    extend: {
      spacing: { 128: '32rem' },
    },
    stroke: (theme) => ({
      current: 'currentColor',
      black: theme('colors.black'),
    }),
    fill: (theme) => ({
      current: 'currentColor',
      purple: theme('colors.purple.500'),
    }),
  },
  variants: {},
  plugins: [],
};
