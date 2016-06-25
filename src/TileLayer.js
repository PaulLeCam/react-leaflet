/* @flow */

import { tileLayer } from 'leaflet'
import { PropTypes } from 'react'

import BaseTileLayer from './BaseTileLayer'

export default class TileLayer extends BaseTileLayer {
  static propTypes = {
    url: PropTypes.string.isRequired,
  };

  componentWillMount () {
    super.componentWillMount()
    const { url, ...props } = this.props
    this.leafletElement = tileLayer(url, props)
  }

  componentDidUpdate (prevProps: Object) {
    super.componentDidUpdate(prevProps)
    const { url } = this.props
    if (url !== prevProps.url) {
      this.leafletElement.setUrl(url)
    }
  }
}
