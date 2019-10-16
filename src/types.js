// @flow

import type {
  LatLng as LeafletLatLng,
  LatLngBounds as LeafletLatLngBounds,
  Layer,
  Map,
  Point as LeafletPoint,
  Renderer,
} from 'leaflet'
import type { Node } from 'react'

export type AddLayerHandler = (
  layer: Layer,
  name: string,
  checked?: boolean,
) => void
export type RemoveLayerHandler = (layer: Layer) => void

export type LayerContainer = {
  addLayer: AddLayerHandler,
  removeLayer: RemoveLayerHandler,
}

export type LeafletContext = {
  map?: Map,
  pane?: ?string,
  layerContainer?: ?LayerContainer,
  popupContainer?: ?Layer,
}

export type LatLng = LeafletLatLng | Array<number> | Object

export type LatLngBounds = LeafletLatLngBounds | Array<LatLng>

export type ControlPosition =
  | 'topleft'
  | 'topright'
  | 'bottomleft'
  | 'bottomright'

export type Point = [number, number] | LeafletPoint

export type Viewport = {
  center: ?[number, number],
  zoom: ?number,
}

export type GridLayerOptions = {
  tileSize?: number | LeafletPoint,
  opacity?: number,
  updateWhenIdle?: boolean,
  updateWhenZooming?: boolean,
  updateInterval?: number,
  zIndex?: number,
  bounds?: LeafletLatLngBounds,
  minZoom?: number,
  maxZoom?: number,
  minNativeZoom?: number,
  maxNativeZoom?: number,
  noWrap?: boolean,
  className?: string,
  keepBuffer?: number,
} & MapLayerProps

export type PathOptions = {
  stroke?: boolean,
  color?: string,
  weight?: number,
  opacity?: number,
  lineCap?: 'butt' | 'round' | 'square' | 'inherit',
  lineJoin?: 'miter' | 'round' | 'bevel' | 'inherit',
  dashArray?: string,
  dashOffset?: string,
  fill?: boolean,
  fillColor?: string,
  fillOpacity?: number,
  fillRule?: 'nonzero' | 'evenodd' | 'inherit',
  bubblingMouseEvents?: boolean,
  renderer?: Renderer,
  className?: string,
  interactive?: boolean,
  pane?: string,
  attribution?: string,
}

export type DivOverlayOptions = {
  children: Node,
  className?: string,
  offset?: LeafletPoint,
  onClose?: () => void,
  onOpen?: () => void,
}

export type CrossOrigin = boolean | string

export type ImageOverlayOptions = {
  opacity?: number,
  alt?: string,
  interactive?: boolean,
  attribution?: string,
  crossOrigin?: CrossOrigin,
  errorOverlayUrl?: string,
  zIndex?: number,
  className?: string,
}

export type LeafletProps = { leaflet: LeafletContext }

export type MapControlProps = {
  leaflet: LeafletContext,
  position?: ControlPosition,
}

export type MapComponentProps = { leaflet: LeafletContext, pane?: string }

export type DivOverlayProps = MapComponentProps & DivOverlayOptions

export type MapLayerProps = {
  attribution?: string,
  children?: Node,
} & MapComponentProps

export type GridLayerProps = MapLayerProps & GridLayerOptions

export type PathProps = MapLayerProps & PathOptions

export type SVGOverlayProps = MapComponentProps &
  ImageOverlayOptions & {
    bounds: LatLngBounds,
    children?: Node,
  }
