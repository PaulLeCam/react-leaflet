import {
  type MediaOverlayProps,
  createElementHook,
  createLayerHook,
  updateMediaOverlay,
} from '@react-leaflet/core'
import { SVGOverlay as LeafletSVGOverlay } from 'leaflet'
import {
  type ReactNode,
  type Ref,
  forwardRef,
  useImperativeHandle,
} from 'react'
import { createPortal } from 'react-dom'

export interface SVGOverlayProps extends MediaOverlayProps {
  attributes?: Record<string, string>
  children?: ReactNode
}

export const useSVGOverlayElement = createElementHook<
  LeafletSVGOverlay,
  SVGOverlayProps,
  SVGSVGElement
>(function createSVGOverlay(props, context) {
  const { attributes, bounds, ...options } = props

  const container = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg',
  )
  container.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  if (attributes != null) {
    Object.keys(attributes).forEach((name) => {
      container.setAttribute(name, attributes[name])
    })
  }

  return {
    instance: new LeafletSVGOverlay(container, bounds, options),
    container,
    context,
  }
}, updateMediaOverlay)

export const useSVGOverlay = createLayerHook(useSVGOverlayElement)

function SVGOverlayComponent(
  { children, ...options }: SVGOverlayProps,
  ref: Ref<LeafletSVGOverlay>,
) {
  const { instance, container } = useSVGOverlay(options).current
  useImperativeHandle(ref, () => instance)

  return container == null || children == null
    ? null
    : createPortal(children, container)
}

export const SVGOverlay = forwardRef(SVGOverlayComponent)
