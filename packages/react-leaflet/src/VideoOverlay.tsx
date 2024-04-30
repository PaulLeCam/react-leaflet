import {
  type MediaOverlayProps,
  createElementObject,
  createLayerComponent,
  extendContext,
  updateMediaOverlay,
} from '@react-leaflet/core'
import {
  VideoOverlay as LeafletVideoOverlay,
  type VideoOverlayOptions,
} from 'leaflet'
import type { ReactNode } from 'react'

export interface VideoOverlayProps
  extends MediaOverlayProps,
    VideoOverlayOptions {
  children?: ReactNode
  play?: boolean
  url: string | string[] | HTMLVideoElement
}

export const VideoOverlay = createLayerComponent<
  LeafletVideoOverlay,
  VideoOverlayProps
>(
  function createVideoOverlay({ bounds, url, ...options }, ctx) {
    const overlay = new LeafletVideoOverlay(url, bounds, options)
    if (options.play === true) {
      overlay.getElement()?.play()
    }
    return createElementObject(
      overlay,
      extendContext(ctx, { overlayContainer: overlay }),
    )
  },
  function updateVideoOverlay(overlay, props, prevProps) {
    updateMediaOverlay(overlay, props, prevProps)

    if (typeof props.url === 'string' && props.url !== prevProps.url) {
      overlay.setUrl(props.url)
    }

    const video = overlay.getElement()
    if (video != null) {
      if (props.play === true && !prevProps.play) {
        video.play()
      } else if (!props.play && prevProps.play === true) {
        video.pause()
      }
    }
  },
)
