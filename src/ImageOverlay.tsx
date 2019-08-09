import {
  LatLngBounds,
  LatLngBoundsExpression,
  ImageOverlay,
  ImageOverlayOptions,
  VideoOverlay,
} from 'leaflet'
import { ReactNode } from 'react'

import { createContextComponent } from './core/component'
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
  E extends ImageOverlay | VideoOverlay,
  P extends MediaOverlayOptions
>(el: E, props: P, prevProps: P) {
  if (
    props.bounds instanceof LatLngBounds &&
    props.bounds !== prevProps.bounds
  ) {
    el.setBounds(props.bounds)
  }
  if (props.opacity != null && props.opacity !== prevProps.opacity) {
    el.setOpacity(props.opacity)
  }
  if (props.zIndex != null && props.zIndex !== prevProps.zIndex) {
    // @ts-ignore missing in definition but inherited from ImageOverlay
    el.setZIndex(props.zIndex)
  }
}

export const useImageOverlayElement = createUseLeafletElement<
  ImageOverlay,
  ImageOverlayProps
>(
  (props, context) => {
    const { bounds, url, ...options } = props
    const el = new ImageOverlay(url, bounds, options)
    return {
      el,
      context: context === null ? null : { ...context, overlayContainer: el },
    }
  },
  (el, props, prevProps) => {
    updateMediaOverlay(el, props, prevProps)
    if (props.url !== prevProps.url) {
      el.setUrl(props.url)
    }
  },
)

export const useLeafletImageOverlay = createUseLeafletLayer(
  useImageOverlayElement,
)

export const LeafletImageOverlay = createContextComponent(
  useLeafletImageOverlay,
)
