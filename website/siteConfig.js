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
  url: 'https://PaulLeCam.github.io',
  baseUrl: '/react-leaflet/',
  projectName: 'react-leaflet',
  useEnglishUrl: true,
  headerLinks: [
    { doc: 'intro', label: 'Getting started' },
    { doc: 'prop-types', label: 'API' },
    { page: 'help', label: 'Help' },
    // { search: true },
    { href: 'https://github.com/PaulLeCam/react-leaflet', label: 'GitHub' },
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
  scripts: ['https://buttons.github.io/buttons.js'],
  repoUrl: 'https://github.com/PaulLeCam/react-leaflet',
}

module.exports = siteConfig
