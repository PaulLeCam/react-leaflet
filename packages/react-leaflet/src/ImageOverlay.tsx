import {
  type MediaOverlayProps,
  createElementObject,
  createLayerComponent,
  extendContext,
  updateMediaOverlay,
} from '@react-leaflet/core'
import { LatLngBounds, ImageOverlay as LeafletImageOverlay } from 'leaflet'
import type { ReactNode } from 'react'

export interface ImageOverlayProps extends MediaOverlayProps {
  children?: ReactNode
  url: string
}
export const ImageOverlay = createLayerComponent<
  LeafletImageOverlay,
  ImageOverlayProps
>(
  function createImageOverlay({ bounds, url, ...options }, ctx) {
    const overlay = new LeafletImageOverlay(url, bounds, options)
    return createElementObject(
      overlay,
      extendContext(ctx, { overlayContainer: overlay }),
    )
  },
  function updateImageOverlay(overlay, props, prevProps) {
    updateMediaOverlay(overlay, props, prevProps)
    if (props.bounds !== prevProps.bounds) {
      const bounds =
        props.bounds instanceof LatLngBounds
          ? props.bounds
          : new LatLngBounds(props.bounds)
      overlay.setBounds(bounds)
    }
    if (props.url !== prevProps.url) {
      overlay.setUrl(props.url)
    }
  },
)
