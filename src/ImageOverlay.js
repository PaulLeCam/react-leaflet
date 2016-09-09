/* @flow */

import { imageOverlay } from 'leaflet'
import { PropTypes } from 'react'

import boundsType from './types/bounds'
import paneType from './types/pane'
import MapLayer from './MapLayer'

export default class ImageOverlay extends MapLayer {
  static propTypes = {
    attribution: PropTypes.string,
    bounds: boundsType.isRequired,
    opacity: PropTypes.number,
    url: PropTypes.string.isRequired,
  };

  static contextTypes = {
    ...(MapLayer.contextTypes || {}),
    pane: paneType,
  };

  componentWillMount () {
    super.componentWillMount()
    const { bounds, url, ...props } = this.props
    this.leafletElement = imageOverlay(url, bounds, {
      ...props,
      pane: this.context.pane,
    })
  }

  componentDidUpdate (prevProps: Object) {
    if (this.props.url !== prevProps.url) {
      this.leafletElement.setUrl(this.props.url)
    }
    if (this.props.opacity !== prevProps.opacity) {
      this.leafletElement.setOpacity(this.props.opacity)
    }
  }

  render () {
    return null
  }
}
