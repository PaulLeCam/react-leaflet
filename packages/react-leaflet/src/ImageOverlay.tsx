import {
  type MediaOverlayProps,
  createElementObject,
  createLayerComponent,
  extendContext,
  updateMediaOverlay,
} from '@react-leaflet/core'
import { ImageOverlay as LeafletImageOverlay } from 'leaflet'
import type { ReactNode } from 'react'

export interface ImageOverlayProps extends MediaOverlayProps {
  children?: ReactNode
  url: string
}
export const ImageOverlay = createLayerComponent<
  LeafletImageOverlay,
  ImageOverlayProps
>(
  function createImageOveraly({ bounds, url, ...options }, ctx) {
    const overlay = new LeafletImageOverlay(url, bounds, options)
    return createElementObject(
      overlay,
      extendContext(ctx, { overlayContainer: overlay }),
    )
  },
  function updateImageOverlay(overlay, props, prevProps) {
    updateMediaOverlay(overlay, props, prevProps)
    if (props.url !== prevProps.url) {
      overlay.setUrl(props.url)
    }
  },
)
