import {
  type ImageOverlayOptions,
  LatLngBounds,
  type LatLngBoundsExpression,
  type ImageOverlay as LeafletImageOverlay,
  type SVGOverlay as LeafletSVGOverlay,
  type VideoOverlay as LeafletVideoOverlay,
} from 'leaflet'

import type { InteractiveLayerProps } from './layer.js'

export type MediaOverlay =
  | LeafletImageOverlay
  | LeafletSVGOverlay
  | LeafletVideoOverlay

export interface MediaOverlayProps<T extends MediaOverlay = LeafletImageOverlay>
  extends ImageOverlayOptions,
    InteractiveLayerProps<T> {
  bounds: LatLngBoundsExpression
}

export function updateMediaOverlay<
  E extends MediaOverlay,
  P extends MediaOverlayProps<E>,
>(overlay: E, props: P, prevProps: P) {
  if (
    props.bounds instanceof LatLngBounds &&
    props.bounds !== prevProps.bounds
  ) {
    overlay.setBounds(props.bounds)
  }
  if (props.opacity != null && props.opacity !== prevProps.opacity) {
    overlay.setOpacity(props.opacity)
  }
  if (props.zIndex != null && props.zIndex !== prevProps.zIndex) {
    overlay.setZIndex(props.zIndex)
  }
}
