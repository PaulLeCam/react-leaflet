import {
  LatLngBounds,
  LatLngBoundsExpression,
  ImageOverlay as LeafletImageOverlay,
  ImageOverlayOptions,
  SVGOverlay as LeafletSVGOverlay,
  VideoOverlay as LeafletVideoOverlay,
} from 'leaflet'

import { EventedProps } from './events'

export interface MediaOverlayProps extends ImageOverlayOptions, EventedProps {
  bounds: LatLngBoundsExpression
}

export function updateMediaOverlay<
  E extends LeafletImageOverlay | LeafletSVGOverlay | LeafletVideoOverlay,
  P extends MediaOverlayProps
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
    // @ts-ignore missing in definition but inherited from ImageOverlay
    overlay.setZIndex(props.zIndex)
  }
}
