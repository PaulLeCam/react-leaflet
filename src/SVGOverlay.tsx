import { SVGOverlay } from 'leaflet'
import { ReactNode, forwardRef, useImperativeHandle } from 'react'
import { createPortal } from 'react-dom'

import { ElementRef } from './core/component'
import { createUseLeafletElement } from './core/element'
import { EventedProps } from './core/events'
import { createUseLeafletLayer } from './core/layer'

import { MediaOverlayOptions, updateMediaOverlay } from './ImageOverlay'

export interface SVGOverlayProps extends MediaOverlayOptions, EventedProps {
  children?: ReactNode
}

export const useSVGOverlayElement = createUseLeafletElement<
  SVGOverlay,
  SVGOverlayProps,
  SVGSVGElement
>(function createSVGOverlay(props) {
  const { bounds, ...options } = props
  const container = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg',
  )
  const instance = new SVGOverlay(container, bounds, options)
  return { instance, container }
}, updateMediaOverlay)

export const useLeafletSVGOverlay = createUseLeafletLayer(useSVGOverlayElement)

function SVGOverlayComponent(
  { children, ...options }: SVGOverlayProps,
  ref: ElementRef<SVGOverlay>,
) {
  const elementRef = useLeafletSVGOverlay(options)

  let instance: SVGOverlay | null = null
  let container = null
  if (elementRef.current !== null) {
    instance = elementRef.current.instance
    container = elementRef.current.container
  }

  useImperativeHandle(ref, () => ({ element: instance }))

  return container == null || children == null
    ? null
    : createPortal(children, container)
}

export const LeafletSVGOverlay = forwardRef(SVGOverlayComponent)
