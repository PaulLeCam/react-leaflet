/* @flow */

import { tileLayer } from 'leaflet'
import { PropTypes } from 'react'

import GridLayer from './GridLayer'

export default class TileLayer extends GridLayer {
  static propTypes = {
    url: PropTypes.string.isRequired,
  };

  componentWillMount () {
    super.componentWillMount()
    const { url, ...props } = this.props
    this.leafletElement = tileLayer(url, this.getOptions(props))
  }

  componentDidUpdate (prevProps: Object) {
    super.componentDidUpdate(prevProps)
    const { url } = this.props
    if (url !== prevProps.url) {
      this.leafletElement.setUrl(url)
    }
  }
}
