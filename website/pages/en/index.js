/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable react/prop-types */

const React = require('react')

const CompLibrary = require('../../core/CompLibrary.js')
const Container = CompLibrary.Container

const Code = require(process.cwd() + '/core/Code.js')
const Logo = require(process.cwd() + '/core/Logo.js')
const siteConfig = require(process.cwd() + '/siteConfig.js')

function docUrl(doc, language) {
  return siteConfig.baseUrl + 'docs/' + (language ? language + '/' : '') + doc
}

function pageUrl(page, language) {
  return siteConfig.baseUrl + (language ? language + '/' : '') + page
}

class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    )
  }
}

Button.defaultProps = {
  target: '_self',
}

const SplashContainer = props => (
  <div className="homeContainer">
    <div className="homeSplashFade">
      <div className="wrapper homeWrapper">{props.children}</div>
    </div>
  </div>
)

const ProjectTitle = () => (
  <h2 className="projectTitle">
    <Logo />
    <small>{siteConfig.tagline}</small>
  </h2>
)

const PromoSection = props => (
  <div className="section promoSection">
    <div className="promoRow">
      <div className="pluginRowBlock">{props.children}</div>
    </div>
  </div>
)

class HomeSplash extends React.Component {
  render() {
    return (
      <SplashContainer>
        <div className="inner">
          <ProjectTitle />
          <PromoSection>
            <Button href={docUrl('intro.html', this.props.language)}>
              Getting started
            </Button>&nbsp;
            <Button href={docUrl('context.html', this.props.language)}>
              API reference
            </Button>
          </PromoSection>
        </div>
      </SplashContainer>
    )
  }
}

const Description = props => (
  <Container background="highlight" padding={['bottom', 'top']}>
    <p>
      React-Leaflet provides an abstraction of{' '}
      <a href="http://leafletjs.com/">🍃 Leaflet</a> as{' '}
      <a href="https://facebook.github.io/react/">⚛️ React components</a>.
    </p>
    <p>
      It <strong>does not</strong> replace Leaflet, only leverages{' '}
      <a href="https://reactjs.org/docs/react-component.html#the-component-lifecycle">
        ⚛️ React&apos;s lifecycle methods
      </a>{' '}
      to call the relevant Leaflet handlers. You can read more information about
      the lifecycle process in the{' '}
      <a href={docUrl('intro.html', props.language)}>introduction</a> page of
      this documentation. Please make sure you understand all the{' '}
      <a href={docUrl('intro.html#core-concepts', props.language)}>
        core concepts
      </a>{' '}
      and{' '}
      <a href={docUrl('intro.html#limitations', props.language)}>limitations</a>{' '}
      to evaluate if this library is appropriate for your needs.
    </p>
    <p>
      This documentation only presents concepts specific to React-Leaflet, you
      should already be familiar with both React and Leaflet to use this
      library. Otherwise, please make sure to go through React and
      Leaflet&apos;s getting started guides and examples first.
    </p>
  </Container>
)

const CodeSample = (props = {}) => (
  <Container padding={['top']}>
    <p>
      React-Leaflet allows to convert this{' '}
      <a href="http://leafletjs.com/">
        🍃 sample code from Leaflet&apos;s documentation
      </a>:
    </p>
    <Code
      lang="javascript"
      source={`import L from 'leaflet'

const position = [51.505, -0.09]
const map = L.map('map').setView(position, 13)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map)

L.marker(position)
  .addTo(map)
  .bindPopup('A pretty CSS3 popup. <br> Easily customizable.')`}
    />
    <p>to React components:</p>
    <Code
      lang="jsx"
      source={`import React from 'react'
import { render } from 'react-dom'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

const position = [51.505, -0.09]
const map = (
  <Map center={position} zoom={13}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
    />
    <Marker position={position}>
      <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
    </Marker>
  </Map>
)

render(map, document.getElementById('map-container'))`}
    />
    <p>
      Note that the <code>&lt;Map&gt;</code> component creates its own{' '}
      <code>&lt;div&gt;</code> container for the map, it does not get attached
      to an existing node.
    </p>
    <p>
      The example code above is only meant to present the syntax change, it will
      not work as-is.<br />
      You can run an example code using React-Leaflet in{' '}
      <a href="https://codepen.io/PaulLeCam/pen/gzVmGw">▶️ this CodePen</a>.
    </p>
    <PromoSection>
      <Button href={docUrl('intro.html', props.language)}>Get started</Button>
    </PromoSection>
  </Container>
)

const Showcase = props => {
  if ((siteConfig.users || []).length === 0) {
    return null
  }
  const showcase = siteConfig.users
    .filter(user => {
      return user.pinned
    })
    .map((user, i) => {
      return (
        <a href={user.infoLink} key={i}>
          <img src={user.image} title={user.caption} />
        </a>
      )
    })

  return (
    <div className="productShowcaseSection">
      <h2>{"Who's Using This?"}</h2>
      <p>This project is used by all these people</p>
      <div className="logos">{showcase}</div>
      <div className="more-users">
        <a className="button" href={pageUrl('users.html', props.language)}>
          More {siteConfig.title} Users
        </a>
      </div>
    </div>
  )
}

class Index extends React.Component {
  render() {
    const language = this.props.language || 'en'
    return (
      <div>
        <HomeSplash language={language} />
        <div className="mainContainer">
          <Description language={language} />
          <CodeSample language={language} />
          <Showcase language={language} />
        </div>
      </div>
    )
  }
}

module.exports = Index
