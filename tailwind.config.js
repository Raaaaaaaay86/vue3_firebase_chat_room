module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      width: {
        75: '19rem',
        100: '25rem',
        '8/10': '80%',
      },
      minWidth: {
        8: '2rem',
        16: '4rem',
        75: '19rem',
        100: '25rem',
        '8/10': '80%',
      },
      height: {
        75: '19rem',
      },
      minHeight: {
        8: '2rem',
        16: '4rem',
        75: '19rem',
      },
      gridTemplateRows: {
        12: 'repeat(12, minmax(0, 1fr))',
      },
      gridRow: {
        'span-10': 'span 10 / span 10',
        'span-9': 'span 9 / span 9',
        'span-11': 'span 11 / span 11',
      },
    },
  },
  variants: {},
  plugins: [],
};
