// @flow

import { VideoOverlay as LeafletVideoOverlay, latLngBounds } from 'leaflet'
import PropTypes from 'prop-types'

import MapLayer from './MapLayer'
import bounds from './propTypes/bounds'
import type { LatLngBounds, MapLayerProps } from './types'

type LeafletElement = LeafletVideoOverlay
type Props = {
  attribution?: string,
  bounds: LatLngBounds,
  opacity?: number,
  play?: boolean,
  url: string | string[] | HTMLVideoElement,
  zIndex?: number,
} & MapLayerProps

export default class VideoOverlay extends MapLayer<LeafletElement, Props> {
  static propTypes = {
    attribution: PropTypes.string,
    bounds: bounds.isRequired,
    opacity: PropTypes.number,
    play: PropTypes.bool,
    url: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.instanceOf(HTMLVideoElement),
    ]).isRequired,
    zIndex: PropTypes.number,
  }

  createLeafletElement(props: Props): LeafletElement {
    return new LeafletVideoOverlay(
      props.url,
      props.bounds,
      this.getOptions(props),
    )
  }

  componentDidMount() {
    super.componentDidMount()
    if (this.props.play === true) {
      this.leafletElement.getElement().play()
    }
  }

  updateLeafletElement(fromProps: Props, toProps: Props) {
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
    // flowlint-next-line sketchy-null-bool:off
    if (toProps.play === true && !fromProps.play) {
      this.leafletElement.getElement().play()
      // flowlint-next-line sketchy-null-bool:off
    } else if (!toProps.play && fromProps.play === true) {
      this.leafletElement.getElement().pause()
    }
  }
}
