const plugin = require('tailwindcss/plugin');

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
  variants: {
    extend: {
      margin: ['hover'],
    },
  },
  plugins: [
    plugin(function ({ addUtilities, e, theme }) {
      const colors = theme('colors', {});

      const utility = Object.keys(colors).reduce((acc, key) => {
        if (typeof colors[key] === 'string') {
          return {
            ...acc,
            [`.decoration-${e(key)}`]: {
              'text-decoration-color': colors[key],
            },
          };
        }

        const variants = Object.keys(colors[key]);

        return {
          ...acc,
          ...variants.reduce((a, variant) => {
            const utilSuffix = variant === 'DEFAULT' ? '' : `-${variant}`;

            return {
              ...a,
              [`.decoration-${e(key)}${utilSuffix}`]: {
                'text-decoration-color': colors[key][variant],
              },
            };
          }, {}),
        };
      }, {});

      addUtilities(utility);
    }),
  ],
};
