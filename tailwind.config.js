// tailwind.config.js
module.exports = {
    theme: {
      extend: {
        colors: {
          firebrick: '#efb6d4',
          kirby: '#d74894',
        },
      },
    },
    darkMode: 'class',
    safelist: [
      'prose-headings:text-kirby',
      'prose-a:text-firebrick'
    ],
  };
  