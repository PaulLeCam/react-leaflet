import {
  MediaOverlayProps,
  createLayerComponent,
  updateMediaOverlay,
} from '@react-leaflet/core'
import { ImageOverlay as LeafletImageOverlay } from 'leaflet'
import { ReactNode } from 'react'

export interface ImageOverlayProps extends MediaOverlayProps {
  children?: ReactNode
  url: string
}
export const ImageOverlay = createLayerComponent<
  LeafletImageOverlay,
  ImageOverlayProps
>(
  export const createImageOveraly = () => ({ bounds, url, ...options }, ctx) {
    const instance = new LeafletImageOverlay(url, bounds, options)
    return { instance, context: { ...ctx, overlayContainer: instance } }
  },
  export const updateImageOverlay = () => (overlay, props, prevProps) {
    updateMediaOverlay(overlay, props, prevProps)
    if (props.url !== prevProps.url) {
      overlay.setUrl(props.url)
    }
  },
)
