/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react')

const CompLibrary = require('../../core/CompLibrary')
const Container = CompLibrary.Container

const CWD = process.cwd()

const siteConfig = require(CWD + '/siteConfig.js')
const versions = require(CWD + '/versions.json')

function docUrl(doc, language) {
  return siteConfig.baseUrl + 'docs/' + (language ? language + '/' : '') + doc
}

class Versions extends React.Component {
  render() {
    const language = this.props.language || 'en'
    const [v2, v1] = versions

    return (
      <div className="docMainWrapper wrapper">
        <Container className="mainContainer versionsContainer">
          <div className="post">
            <header className="postHeader">
              <h2>{siteConfig.title + ' versions'}</h2>
            </header>
            <p>New versions of this project are released every so often.</p>
            <h3 id="latest">Current version</h3>
            <p>
              This is the version that is configured automatically when you
              first install this project.
            </p>
            <table className="versions">
              <tbody>
                <tr>
                  <th>{v2}</th>
                  <td>
                    <a href={docUrl('intro.html', language)}>Documentation</a>
                  </td>
                  <td>
                    <a href="https://github.com/PaulLeCam/react-leaflet/releases/latest">
                      Release Notes
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
            <h3 id="latest">Previous major version</h3>
            <table className="versions">
              <tbody>
                <tr>
                  <th>{v1}</th>
                  <td>
                    <a href={docUrl('v1/intro.html', language)}>
                      Documentation
                    </a>
                  </td>
                  <td>
                    <a href="https://github.com/PaulLeCam/react-leaflet/releases/tag/v1.9.1">
                      Release Notes
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
            {/* <h3 id="rc">Pre-release versions</h3>
            <table className="versions">
              <tbody>
                <tr>
                  <th>master</th>
                  <td>
                    <a href={''}>Documentation</a>
                  </td>
                  <td>
                    <a href={''}>Release Notes</a>
                  </td>
                </tr>
              </tbody>
            </table> */}
            <h3 id="archive">Past versions</h3>
            {/* <table className="versions">
              <tbody>
                {versions.map(
                  version =>
                    version !== latestVersion && (
                      <tr>
                        <th>{version}</th>
                        <td>
                          <a href={''}>Documentation</a>
                        </td>
                        <td>
                          <a href={''}>Release Notes</a>
                        </td>
                      </tr>
                    ),
                )}
              </tbody>
            </table> */}
            <p>
              You can find past versions of this project{' '}
              <a href="https://github.com/PaulLeCam/react-leaflet/releases">
                on GitHub
              </a>.
            </p>
          </div>
        </Container>
      </div>
    )
  }
}

module.exports = Versions
