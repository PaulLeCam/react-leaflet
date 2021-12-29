module.exports = {
  title: 'React Leaflet',
  tagline: 'React components for Leaflet maps',
  url: 'https://react-leaflet.js.org',
  baseUrl: '/',
  trailingSlash: true,
  favicon: 'img/logo.svg',
  organizationName: 'PaulLeCam',
  projectName: 'react-leaflet',
  stylesheets: ['//unpkg.com/leaflet@1.7.1/dist/leaflet.css'],
  themeConfig: {
    // algolia: {
    //   apiKey: '5ec5ae3523b2e316c32bbe5e948cb48d',
    //   indexName: 'react-leaflet',
    // },
    navbar: {
      title: 'React Leaflet',
      logo: {
        alt: 'React Leaflet Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/start-introduction',
          activeBasePath: 'docs/start',
          label: 'Getting Started',
          position: 'left',
        },
        {
          to: 'docs/example-popup-marker',
          activeBasePath: 'docs/example',
          label: 'Examples',
          position: 'left',
        },
        {
          to: 'docs/api-map',
          activeBasePath: 'docs/api',
          label: 'API',
          position: 'left',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/PaulLeCam/react-leaflet',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: 'docs/start-introduction',
            },
            {
              label: 'Examples',
              to: 'docs/example-popup-marker',
            },
          ],
        },
        {
          title: 'APIs',
          items: [
            {
              label: 'Public API',
              to: 'docs/api-map',
            },
            {
              label: 'Core API',
              to: 'docs/core-introduction',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/react-leaflet',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/PaulLeCam/react-leaflet',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Paul Le Cam and contributors`,
    },
    prism: {
      theme: require('prism-react-renderer/themes/nightOwl'),
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // lastVersion: 'current',
          // versions: {
          //   next: {
          //     label: '4.x (alpha)',
          //     path: '',
          //   },
          // },
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: ['@react-leaflet/docusaurus-plugin'],
  themes: ['@docusaurus/theme-live-codeblock'],
}
