module.exports = {
  title: 'React Leaflet',
  tagline: 'React components for Leaflet maps',
  url: 'https://react-leaflet.js.org',
  baseUrl: '/',
  favicon: 'img/logo.svg',
  organizationName: 'PaulLeCam',
  projectName: 'react-leaflet',
  stylesheets: ['//unpkg.com/leaflet@1.6.0/dist/leaflet.css'],
  themeConfig: {
    navbar: {
      title: 'React Leaflet',
      logo: {
        alt: 'React Leaflet Logo',
        src: 'img/logo.svg',
      },
      links: [
        {
          to: 'docs/installation',
          label: 'Installation',
          position: 'left',
        },
        {
          to: 'docs/examples',
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
          href: 'https://github.com/PaulLeCam/react-leaflet',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      // links: [
      //   {
      //     title: 'Docs',
      //     items: [
      //       {
      //         label: 'Style Guide',
      //         to: 'docs/doc1',
      //       },
      //       {
      //         label: 'Second Doc',
      //         to: 'docs/doc2',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'Community',
      //     items: [
      //       {
      //         label: 'Stack Overflow',
      //         href: 'https://stackoverflow.com/questions/tagged/docusaurus',
      //       },
      //       {
      //         label: 'Discord',
      //         href: 'https://discordapp.com/invite/docusaurus',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'Social',
      //     items: [
      //       {
      //         label: 'Blog',
      //         to: 'blog',
      //       },
      //       {
      //         label: 'GitHub',
      //         href: 'https://github.com/facebook/docusaurus',
      //       },
      //       {
      //         label: 'Twitter',
      //         href: 'https://twitter.com/docusaurus',
      //       },
      //     ],
      //   },
      // ],
      copyright: `Copyright © ${new Date().getFullYear()} Paul Le Cam and contributors`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // editUrl:
          //   'https://github.com/facebook/docusaurus/edit/master/website/',
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
