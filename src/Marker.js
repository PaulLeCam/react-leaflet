// @flow

import { type Icon, Marker as LeafletMarker } from 'leaflet'
import React from 'react'

import { LeafletProvider, withLeaflet } from './context'
import MapLayer from './MapLayer'
import type { LatLng, MapLayerProps } from './types'

type LeafletElement = LeafletMarker
type Props = {
  icon?: Icon,
  draggable?: boolean,
  opacity?: number,
  position: LatLng,
  zIndexOffset?: number,
} & MapLayerProps

class Marker extends MapLayer<LeafletElement, Props> {
  createLeafletElement(props: Props): LeafletElement {
    const el = new LeafletMarker(props.position, this.getOptions(props))
    this.contextValue = { ...props.leaflet, popupContainer: el }
    return el
  }

  updateLeafletElement(fromProps: Props, toProps: Props) {
    if (toProps.position !== fromProps.position) {
      this.leafletElement.setLatLng(toProps.position)
    }
    if (toProps.icon !== fromProps.icon) {
      this.leafletElement.setIcon(toProps.icon)
    }
    if (toProps.zIndexOffset !== fromProps.zIndexOffset) {
      this.leafletElement.setZIndexOffset(toProps.zIndexOffset)
    }
    if (toProps.opacity !== fromProps.opacity) {
      this.leafletElement.setOpacity(toProps.opacity)
    }
    if (toProps.draggable !== fromProps.draggable) {
      if (toProps.draggable === true) {
        this.leafletElement.dragging.enable()
      } else {
        this.leafletElement.dragging.disable()
      }
    }
  }

  render() {
    const { children } = this.props
    return children == null || this.contextValue == null ? null : (
      <LeafletProvider value={this.contextValue}>{children}</LeafletProvider>
    )
  }
}

export default withLeaflet<Props, Marker>(Marker)
