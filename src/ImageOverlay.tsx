import {
  LatLngBounds,
  LatLngBoundsExpression,
  ImageOverlay,
  ImageOverlayOptions,
  SVGOverlay,
  VideoOverlay,
} from 'leaflet'
import { ReactNode } from 'react'

import { createContainerComponent } from './core/component'
import { createUseLeafletElement } from './core/element'
import { EventedProps } from './core/events'
import { createUseLeafletLayer } from './core/layer'

export interface MediaOverlayOptions extends ImageOverlayOptions, EventedProps {
  bounds: LatLngBoundsExpression
}

export interface ImageOverlayProps extends MediaOverlayOptions {
  children?: ReactNode
  url: string
}

export function updateMediaOverlay<
  E extends ImageOverlay | SVGOverlay | VideoOverlay,
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

export const useImageOverlayElement = createUseLeafletElement<
  ImageOverlay,
  ImageOverlayProps
>(
  function createImageOveraly({ bounds, url, ...options }, ctx) {
    const instance = new ImageOverlay(url, bounds, options)
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

export const useLeafletImageOverlay = createUseLeafletLayer(
  useImageOverlayElement,
)

export const LeafletImageOverlay = createContainerComponent(
  useLeafletImageOverlay,
)
