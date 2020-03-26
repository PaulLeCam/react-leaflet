import { VideoOverlay, VideoOverlayOptions } from 'leaflet'

import { createLeafComponent } from './core/component'
import { createUseLeafletElement } from './core/element'
import { EventedProps } from './core/events'
import { createUseLeafletLayer } from './core/layer'

import { MediaOverlayOptions, updateMediaOverlay } from './ImageOverlay'

export interface VideoOverlayProps
  extends MediaOverlayOptions,
    VideoOverlayOptions,
    EventedProps {
  play?: boolean
  url: string | string[] | HTMLVideoElement
}

export const useVideoOverlayElement = createUseLeafletElement<
  VideoOverlay,
  VideoOverlayProps
>(
  function createVideoOverlay({ bounds, url, ...options }) {
    const instance = new VideoOverlay(url, bounds, options)
    if (options.play === true) {
      instance.getElement()?.play()
    }
    return { instance }
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

export const useLeafletVideoOverlay = createUseLeafletLayer(
  useVideoOverlayElement,
)

export const LeafletVideoOverlay = createLeafComponent(useLeafletVideoOverlay)
