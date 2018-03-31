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

const translate = require('../../server/translate.js').translate

// const siteConfig = require(process.cwd() + '/siteConfig.js')

class Help extends React.Component {
  render() {
    const supportLinks = [
      {
        content: (
          <translate>
            Learn more using the [documentation on this
            site](/docs/en/intro.html).
          </translate>
        ),
        title: <translate>Browse docs</translate>,
      },
      {
        content: (
          <translate>
            You can use the [react-leaflet tag on Stack
            Overflow](https://stackoverflow.com/questions/tagged/react-leaflet).
          </translate>
        ),
        title: <translate>Ask questions</translate>,
      },
      {
        content: (
          <translate>
            Found a bug? Please [open an issue in
            GitHub](https://github.com/PaulLeCam/react-leaflet/issues).
          </translate>
        ),
        title: <translate>Report issues</translate>,
      },
    ]

    return (
      <div className="docMainWrapper wrapper">
        <Container
          className="mainContainer documentContainer postContainer"
          padding={['bottom']}>
          <div className="post">
            <header className="postHeader">
              <h2>
                <translate>Need help?</translate>
              </h2>
            </header>
            <p>
              <translate>
                Here are some options depending on your needs.
              </translate>
            </p>
            <GridBlock contents={supportLinks} layout="threeColumn" />
          </div>
        </Container>
      </div>
    )
  }
}

module.exports = Help
