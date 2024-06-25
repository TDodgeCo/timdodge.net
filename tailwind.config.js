/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./node_modules/flowbite/**/*.js",
    "./resources/**/*.{edge,js,ts,jsx,tsx,vue}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      gridTemplateColumns: {
        '20': 'repeat(20, minmax(0, 1fr))',
      },
      backgroundImage: {
        'denver-1': "url('../images/backgrounds/denver/denver-1.svg')",
        'denver-2': "url('../images/backgrounds/denver/denver-2.svg')",
        'denver-3': "url('../images/backgrounds/denver/denver-3.svg')",
        'denver-4': "url('../images/backgrounds/denver/denver-4.svg')",
        'denver-5': "url('../images/backgrounds/denver/denver-5.svg')",
        'denver-6': "url('../images/backgrounds/denver/denver-6.svg')",
        'denver-7': "url('../images/backgrounds/denver/denver-7.svg')",
        'denver-8': "url('../images/backgrounds/denver/denver.svg')",
        'fuji-tokyo-nights': "url('../images/backgrounds/fuji-tokyo-nights.svg')",
        'fuji-bw': "url('../images/backgrounds/fuji-bw.svg')",
        'wave-1-1': "url('../images/patterns/pattern-waves-1-1.svg')",
        'wave-1-2': "url('../images/patterns/pattern-waves-1-2.svg')",
        'wave-1-3': "url('../images/patterns/pattern-waves-1-3.svg')",
        'wave-1-4': "url('../images/patterns/pattern-waves-1-4.svg')",
        'wave-1-5': "url('../images/patterns/pattern-waves-1-5.svg')",
        'wave-1-6': "url('../images/patterns/pattern-waves-1-6.svg')",
        'wave-1-7': "url('../images/patterns/pattern-waves-1-7.svg')",
        'wave-ol-1-1': "url('../images/patterns/pattern-waves-1-outline-1.svg')",
        'wave-ol-1-2': "url('../images/patterns/pattern-waves-1-outline-2.svg')",
        'wave-ol-1-3': "url('../images/patterns/pattern-waves-1-outline-3.svg')",
        'wave-ol-1-4': "url('../images/patterns/pattern-waves-1-outline-4.svg')",
        'wave-2-1': "url('../images/patterns/pattern-waves-2-1.svg')",
        'wave-2-2': "url('../images/patterns/pattern-waves-2-2.svg')",
        'wave-2-3': "url('../images/patterns/pattern-waves-2-3.svg')",
        'wave-2-4': "url('../images/patterns/pattern-waves-2-4.svg')",
        'wave-2-5': "url('../images/patterns/pattern-waves-2-5.svg')",
        'wave-2-6': "url('../images/patterns/pattern-waves-2-6.svg')",
        'wave-ol-2-1': "url('../images/patterns/pattern-waves-2-outline-1.svg')",
        'wave-ol-2-2': "url('../images/patterns/pattern-waves-2-outline-2.svg')",
        'wave-ol-2-3': "url('../images/patterns/pattern-waves-2-outline-3.svg')",
        'wave-ol-2-4': "url('../images/patterns/pattern-waves-2-outline-4.svg')",
        'skulls-1': "url('../images/patterns/pattern-skulls-1.svg')",
        'skulls-2': "url('../images/patterns/pattern-skulls-2.svg')",
        'skulls-3': "url('../images/patterns/pattern-skulls-3.svg')",
        'skulls-4': "url('../images/patterns/pattern-skulls-4.svg')",
        'skulls-5': "url('../images/patterns/pattern-skulls-5.svg')",
      },
      backgroundSize: {
        '50%': '50%',
        '25%': '25%',
        '20%': '20%',
        '10%': '10%',
        '16': '4rem',
      },
      colors: {
        primary: {
          "50": "#fffbeb",
          "100": "#fef3c7",
          "200": "#fde68a",
          "300": "#fcd34d",
          "400": "#fbbf24",
          "500": "#f59e0b",
          "600": "#d97706",
          "700": "#b45309",
          "800": "#92400e",
          "900": "#78350f",
          "950": "#451a03"
        }
      }
    },
    fontFamily: {
      'body': [
        'system-ui',
        'Oswald',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'system-ui',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ],
      'sans': [
        'system-ui',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'system-ui',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji',
        ...defaultTheme.fontFamily.sans
      ]
    }
  },
  plugins: [
    require('flowbite/plugin'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
