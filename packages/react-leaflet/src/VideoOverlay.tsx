import {
  type MediaOverlayProps,
  createLayerComponent,
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
    const instance = new LeafletVideoOverlay(url, bounds, options)
    if (options.play === true) {
      instance.getElement()?.play()
    }
    return { instance, context: { ...ctx, overlayContainer: instance } }
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
