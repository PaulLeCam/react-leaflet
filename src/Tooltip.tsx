import {
  LatLngExpression,
  Tooltip,
  TooltipEvent,
  TooltipOptions,
} from 'leaflet'
import { ReactNode } from 'react'

import { createOverlayComponent } from './core/component'
import { LeafletContextInterface } from './core/context'
import { createUseLeafletDivOverlay, SetOpen } from './core/div-overlay'
import { createUseLeafletElement, LeafletElement } from './core/element'
import { EventedProps } from './core/events'

export interface TooltipProps extends TooltipOptions, EventedProps {
  children?: ReactNode
  position?: LatLngExpression
}

export const useTooltipElement = createUseLeafletElement<Tooltip, TooltipProps>(
  function createTooltip(props, context) {
    const el = new Tooltip(
      props,
      context === null ? undefined : context.overlayContainer,
    )
    return { el }
  },
)

export function useTooltipLifecycle(
  element: LeafletElement<Tooltip>,
  context: LeafletContextInterface | null,
  props: TooltipProps,
  setOpen: SetOpen,
) {
  if (element === null || context == null) {
    return
  }
  const { el } = element

  const onOpen = (event: TooltipEvent) => {
    if (event.tooltip === el) {
      el.update()
      setOpen(true)
    }
  }

  const onClose = (event: TooltipEvent) => {
    if (event.tooltip === el) {
      setOpen(false)
    }
  }

  const container = context.overlayContainer
  if (container == null) {
    return
  }

  container.on({
    // @ts-ignore emits TooltipEvent instead of LeafletEvent
    tooltipopen: onOpen,
    // @ts-ignore emits TooltipEvent instead of LeafletEvent
    tooltipclose: onClose,
  })
  container.bindTooltip(el)

  return () => {
    container.off({
      // @ts-ignore emits TooltipEvent instead of LeafletEvent
      tooltipopen: onOpen,
      // @ts-ignore emits TooltipEvent instead of LeafletEvent
      tooltipclose: onClose,
    })
    container.unbindTooltip()
  }
}

export const useLeafletTooltip = createUseLeafletDivOverlay(
  useTooltipElement,
  useTooltipLifecycle,
)

export const LeafletTooltip = createOverlayComponent(useLeafletTooltip)
