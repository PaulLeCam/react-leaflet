// @flow

import { videoOverlay, latLngBounds } from 'leaflet'
import PropTypes from 'prop-types'

import boundsType from './propTypes/bounds'

import MapLayer from './MapLayer'

export default class VideoOverlay extends MapLayer {
  static propTypes = {
    attribution: PropTypes.string,
    bounds: boundsType.isRequired,
    opacity: PropTypes.number,
    play: PropTypes.bool,
    url: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
    zIndex: PropTypes.number,
  }

  createLeafletElement(props: Object): Object {
    const { bounds, url, ...options } = props
    return videoOverlay(url, bounds, this.getOptions(options))
  }

  componentDidMount() {
    super.componentDidMount()
    if (this.props.play) {
      this.leafletElement.getElement().play()
    }
  }

  updateLeafletElement(fromProps: Object, toProps: Object) {
    if (toProps.url !== fromProps.url) {
      this.leafletElement.setUrl(toProps.url)
    }
    if (toProps.bounds !== fromProps.bounds) {
      this.leafletElement.setBounds(latLngBounds(toProps.bounds))
    }
    if (toProps.opacity !== fromProps.opacity) {
      this.leafletElement.setOpacity(toProps.opacity)
    }
    if (toProps.zIndex !== fromProps.zIndex) {
      this.leafletElement.setZIndex(toProps.zIndex)
    }
    if (toProps.play && !fromProps.play) {
      this.leafletElement.getElement().play()
    } else if (!toProps.play && fromProps.play) {
      this.leafletElement.getElement().pause()
    }
  }
}
