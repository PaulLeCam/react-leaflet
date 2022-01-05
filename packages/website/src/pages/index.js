import classnames from 'classnames'
import React from 'react'
import Link from '@docusaurus/Link'
import useBaseUrl from '@docusaurus/useBaseUrl'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useThemeContext from '@theme/hooks/useThemeContext'
import CodeBlock from '@theme/CodeBlock'
import Layout from '@theme/Layout'

import styles from './styles.module.css'

function Title({ text }) {
  const { isDarkTheme } = useThemeContext()
  const logo = isDarkTheme ? 'logo-title-alt' : 'logo-title'

  return (
    <h1 className="hero__title">
      <img src={useBaseUrl(`img/${logo}.svg`)} alt={text} width="480" />
    </h1>
  )
}

export default function Home() {
  const { siteConfig = {} } = useDocusaurusContext()

  return (
    <Layout
      title={siteConfig.title}
      description="React components for Leaflet maps">
      <header className={classnames('hero', styles.heroBanner)}>
        <div className="container">
          <Title text={siteConfig.title} />
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={classnames(
                'button button--outline button--primary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/start-introduction')}>
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main className={styles.example}>
        <CodeBlock live noInline className="tsx">
          {`const position = [51.505, -0.09]
        
render(
  <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={position}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>
)`}
        </CodeBlock>
      </main>
    </Layout>
  )
}
