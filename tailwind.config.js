// tailwind.config.js
module.exports = {
    theme: {
      extend: {
        colors: {
          firebrick: '#B22222',
          kirby: '#FF69B4',
        },
      },
    },
    darkMode: 'class',
    safelist: [
      'prose-headings:text-kirby',
      'prose-a:text-firebrick'
    ],
  };
  