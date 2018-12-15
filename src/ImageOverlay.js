// @flow

import { ImageOverlay as LeafletImageOverlay, latLngBounds } from 'leaflet'

import { withLeaflet } from './context'
import MapLayer from './MapLayer'
import type { LatLngBounds, MapLayerProps } from './types'

type LeafletElement = LeafletImageOverlay
type Props = {
  attribution?: string,
  bounds?: LatLngBounds,
  opacity?: number,
  url: string | HTMLImageElement,
  zIndex?: number,
} & MapLayerProps

class ImageOverlay extends MapLayer<LeafletElement, Props> {
  createLeafletElement(props: Props): LeafletElement {
    const el = new LeafletImageOverlay(
      props.url,
      props.bounds,
      this.getOptions(props),
    )
    this.contextValue = { ...props.leaflet, popupContainer: el }
    return el
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

export default withLeaflet<Props, ImageOverlay>(ImageOverlay)
