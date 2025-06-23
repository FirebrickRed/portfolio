// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        firebrick: '#efb6d4',
        kirby: '#d74894',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            h2: {
              fontSize: '40px',
              fontWeight: '700',
              marginBottom: theme('spacing.2'),
            },
            h3: {
              fontSize: '35px',
              fontWeight: '600',
              marginBottom: theme('spacing.2'),
            },
          },
        },
      }),
    },
  },
  darkMode: 'class',
  safelist: [
    'prose-headings:text-kirby',
    'prose-a:text-firebrick'
  ],
  plugins: [require('@tailwindcss/typography')],
};
