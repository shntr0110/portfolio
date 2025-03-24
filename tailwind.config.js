import containerQueries from '@tailwindcss/container-queries';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import postcss from 'postcss';
import animate from 'tailwindcss-animate';
import plugin from 'tailwindcss/plugin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Loads CSS files through Tailwind’s plugin system to enable IntelliSense support.
 *
 * This plugin scans CSS files from `src/styles/{base,components,utilities}` and appends them to
 * their respective layers.
 */
const cssFiles = plugin(({ addBase, addComponents, addUtilities }) => {
  const layers = ['base', 'components', 'utilities'];
  const stylesDir = path.join(__dirname, 'src/styles');
  const addStylesMap = {
    base: addBase,
    components: addComponents,
    utilities: addUtilities,
  };

  for (const layer of layers) {
    const layerDir = path.join(stylesDir, layer);
    const fileNames = fs.readdirSync(layerDir);
    const addStyles = addStylesMap[layer];

    for (const fileName of fileNames) {
      if (path.extname(fileName) === '.css') {
        const filePath = path.join(layerDir, fileName);
        const content = fs.readFileSync(filePath, 'utf8');
        const styles = postcss.parse(content);
        addStyles(styles.nodes);
      }
    }
  }
});

/**
 * Create a responsive grid layout without media queries using CSS Grid.
 *
 * This plugin is based on a method provided by Andy Bell on piccalil.li.
 * See: https://piccalil.li/tutorial/create-a-responsive-grid-layout-with-no-media-queries-using-css-grid/
 */
const autoGrid = plugin(
  ({ addComponents, matchComponents, theme }) => {
    const values = theme('autoGrid');

    matchComponents(
      {
        'auto-grid': (value) => ({
          display: 'grid',
          'grid-template-columns': `repeat(auto-fill, minmax(min(${value}, 100%), 1fr))`,
        }),
      },
      { values },
    );

    addComponents({
      '.auto-grid-none': {
        display: 'revert',
        'grid-template-columns': 'revert',
      },
    });
  },
  {
    theme: {
      autoGrid: ({ theme }) => ({
        ...theme('spacing'),
      }),
    },
  },
);

const container = plugin(function ({ addComponents }) {
  addComponents({
    '.container': {
      boxSizing: 'content-box',
      maxWidth: '100%',
      paddingRight: rem(24),
      paddingLeft: rem(24),
      marginRight: 'auto',
      marginLeft: 'auto',
      '@screen md': {
        paddingRight: rem(97),
        paddingLeft: rem(97),
      },
      '@screen lg': {
        maxWidth: rem(1100),
      },
    },
    '.container-lg': {
      maxWidth: '100%',
      paddingRight: rem(24),
      paddingLeft: rem(24),
      marginRight: 'auto',
      marginLeft: 'auto',
      '@screen md': {
        paddingRight: rem(97),
        paddingLeft: rem(97),
      },
      '@screen lg': {
        maxWidth: rem(1440),
      },
    },
  });
});

const rem = (px) => `${px / 16}rem`;

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    screen: {
      xs: '540px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
    },
    extend: {
      fontFamily: {
        sans: ['sans-serif'],
        notoSansJp: ['Noto Sans JP', 'sans-serif'],
      },
      colors: {
        white: '#ffffff',
        black: '#333333',
        blue: '#388DB9',
        lightBlue: '#c6eaff',
      },
      fontSize: {
        ...[
          8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 43,
          48, 52, 56, 60, 64, 68, 74, 78, 87,
        ].reduce((previousValue, currentValue) => {
          previousValue[currentValue] = rem(currentValue);
          return previousValue;
        }, {}),
      },
      lineHeight: {
        ...[100, 110, 120, 130, 140, 145, 150, 160, 170, 180, 200].reduce(
          (previousValue, currentValue) => {
            previousValue[currentValue] = `${currentValue}%`;
            return previousValue;
          },
          {},
        ),
      },
      letterSpacing: {
        ...['01', '02', '04', '05', '06', '07', '09', '11', '12', '18'].reduce(
          (previousValue, currentValue) => {
            previousValue[currentValue] = `0.${currentValue}em`;
            return previousValue;
          },
          {},
        ),
      },
      transitionTimingFunction: {
        InOutExpo: 'cubic-bezier(0.87,0,0.13,1)',
        InOutQuickStart: 'cubic-bezier(.7,0.09,0.11,1)',
        InOutQuint: 'cubic-bezier(0.83,0,0.17,1)',
        InOutQuad: 'cubic-bezier(.46,0.03,0.2,0.95)',
        InOutQuart: 'cubic-bezier(0.76,0,0.24,1)',
        InOutSine: 'cubic-bezier(0.41,0,0.58,1)',
        OutCubic: 'cubic-bezier(0.33,1,0.68, 1)',
        OutCirc: 'cubic-bezier(.06,0.47,0.45,1)',
        OutQuad: 'cubic-bezier(0.5,1,0.89,1)',
        OutQuart: 'cubic-bezier(0.25,1,0.5,1)',
        OutQuint: 'cubic-bezier(0.22,1,0.36,1)',
        OutExpo: 'cubic-bezier(.16,1,0.3,1)',
        SmoothIn: 'cubic-bezier(.37,0.07,0.94,0.54)',
        SmoothOut: 'cubic-bezier(.18,0.38,0.43,1)',
        Bounce: 'cubic-bezier(0,0,0.47,1.62)',
        Normal: 'cubic-bezier(0.4,0,0.2,1)',
      },
      transitionDuration: {
        50: '50ms',
        400: '400ms',
        600: '600ms',
        800: '800ms',
        1000: '1000ms',
        1200: '1200ms',
      },
      transitionDelay: {
        400: '400ms',
        600: '600ms',
        800: '800ms',
        1000: '1000ms',
        1200: '1200ms',
      },
    },
  },
  corePlugins: {
    container: false,
  },
  plugins: [containerQueries, animate, cssFiles, autoGrid, container],
};
