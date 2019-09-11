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
  function createVideoOverlay(props) {
    const { bounds, url, ...options } = props
    const el = new VideoOverlay(url, bounds, options)
    if (options.play === true) {
      const video = el.getElement()
      if (video != null) video.play()
    }
    return { el }
  },
  function updateVideoOverlay(el, props, prevProps) {
    updateMediaOverlay(el, props, prevProps)
    if (typeof props.url === 'string' && props.url !== prevProps.url) {
      el.setUrl(props.url)
    }
    const video = el.getElement()
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
