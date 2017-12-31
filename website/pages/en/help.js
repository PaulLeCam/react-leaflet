/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react')

const CompLibrary = require('../../core/CompLibrary.js')
const Container = CompLibrary.Container
const GridBlock = CompLibrary.GridBlock

// const siteConfig = require(process.cwd() + '/siteConfig.js')

class Help extends React.Component {
  render() {
    const supportLinks = [
      {
        content:
          'Learn more using the [documentation on this site](/react-leaflet/docs/en/intro.html).',
        title: 'Browse docs',
      },
      {
        content:
          'You can use the ["react-leaflet" tag on Stack Overflow](https://stackoverflow.com/questions/tagged/react-leaflet).',
        title: 'Ask questions',
      },
      {
        content:
          'Found a bug? Please [open an issue in GitHub](https://github.com/PaulLeCam/react-leaflet/issues).',
        title: 'Report issues',
      },
    ]

    return (
      <div className="docMainWrapper wrapper">
        <Container
          className="mainContainer documentContainer postContainer"
          padding={['bottom']}>
          <div className="post">
            <header className="postHeader">
              <h2>Need help?</h2>
            </header>
            <p>Here are some options depending on your needs.</p>
            <GridBlock contents={supportLinks} layout="threeColumn" />
          </div>
        </Container>
      </div>
    )
  }
}

module.exports = Help
