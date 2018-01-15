// @flow

import { ImageOverlay as LeafletImageOverlay, latLngBounds } from 'leaflet'
import PropTypes from 'prop-types'

import MapLayer from './MapLayer'
import bounds from './propTypes/bounds'
import children from './propTypes/children'
import layer from './propTypes/layer'
import type { LatLngBounds, MapLayerProps } from './types'

type LeafletElement = LeafletImageOverlay
type Props = {
  attribution?: string,
  bounds?: LatLngBounds,
  opacity?: number,
  url: string | HTMLImageElement,
  zIndex?: number,
} & MapLayerProps

export default class ImageOverlay extends MapLayer<LeafletElement, Props> {
  static propTypes = {
    attribution: PropTypes.string,
    bounds: bounds.isRequired,
    children: children,
    opacity: PropTypes.number,
    url: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(HTMLImageElement),
    ]).isRequired,
    zIndex: PropTypes.number,
  }

  static childContextTypes = {
    popupContainer: layer,
  }

  getChildContext(): { popupContainer: LeafletElement } {
    return {
      popupContainer: this.leafletElement,
    }
  }

  createLeafletElement(props: Props): LeafletElement {
    return new LeafletImageOverlay(
      props.url,
      props.bounds,
      this.getOptions(props),
    )
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
  }
}
