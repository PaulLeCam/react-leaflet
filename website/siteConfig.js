/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// const users = [
//   {
//     caption: 'User1',
//     image: '/test-site/img/docusaurus.svg',
//     infoLink: 'https://www.facebook.com',
//     pinned: true,
//   },
// ]

const siteConfig = {
  title: 'React-Leaflet',
  tagline: '⚛️ React components for 🍃 Leaflet maps',
  url: 'https://react-leaflet.js.org',
  baseUrl: '/',
  useEnglishUrl: true,
  headerLinks: [
    { doc: 'intro', label: 'Getting started' },
    { doc: 'components', label: 'API' },
    { page: 'help', label: 'Help' },
    { languages: true },
    { href: 'https://github.com/PaulLeCam/react-leaflet', label: 'GitHub' },
    { search: true },
  ],
  users: [],
  favicon: 'img/favicon.png',
  colors: {
    primaryColor: '#1EB300',
    secondaryColor: '#160',
  },
  copyright:
    'Copyright © ' + new Date().getFullYear() + ' Paul Le Cam and contributors',
  organizationName: 'PaulLeCam',
  projectName: 'react-leaflet',
  editUrl: 'https://github.com/PaulLeCam/react-leaflet/edit/master/docs/',
  highlight: {
    theme: 'default',
  },
  onPageNav: 'separate',
  scripts: ['https://buttons.github.io/buttons.js'],
  repoUrl: 'https://github.com/PaulLeCam/react-leaflet',
  cname: 'react-leaflet.js.org',
  algolia: {
    apiKey: '5ec5ae3523b2e316c32bbe5e948cb48d',
    indexName: 'react-leaflet',
  },
  translationRecruitingLink: 'https://crwd.in/react-leaflet',
}

module.exports = siteConfig
