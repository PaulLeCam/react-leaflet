/* @flow */

import { tileLayer } from 'leaflet'
import { PropTypes } from 'react'

import BaseTileLayer from './BaseTileLayer'
import childrenType from './types/children'

export default class TileLayer extends BaseTileLayer {
  static propTypes = {
    children: childrenType,
    opacity: PropTypes.number,
    url: PropTypes.string.isRequired,
    zIndex: PropTypes.number,
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
