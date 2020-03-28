import { EventedProps, createLayerComponent } from '@react-leaflet/core'
import {
  LatLngBounds,
  LatLngBoundsExpression,
  ImageOverlay as LeafletImageOverlay,
  ImageOverlayOptions,
  SVGOverlay as LeafletSVGOverlay,
  VideoOverlay as LeafletVideoOverlay,
} from 'leaflet'
import { ReactNode } from 'react'

export interface MediaOverlayOptions extends ImageOverlayOptions, EventedProps {
  bounds: LatLngBoundsExpression
}

export interface ImageOverlayProps extends MediaOverlayOptions {
  children?: ReactNode
  url: string
}

export function updateMediaOverlay<
  E extends LeafletImageOverlay | LeafletSVGOverlay | LeafletVideoOverlay,
  P extends MediaOverlayOptions
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

export const ImageOverlay = createLayerComponent<
  LeafletImageOverlay,
  ImageOverlayProps
>(
  function createImageOveraly({ bounds, url, ...options }, ctx) {
    const instance = new LeafletImageOverlay(url, bounds, options)
    const context = ctx === null ? null : { ...ctx, overlayContainer: instance }
    return { instance, context }
  },
  function updateImageOverlay(overlay, props, prevProps) {
    updateMediaOverlay(overlay, props, prevProps)
    if (props.url !== prevProps.url) {
      overlay.setUrl(props.url)
    }
  },
)
