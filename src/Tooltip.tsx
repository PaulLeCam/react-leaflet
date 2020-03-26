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
  function createTooltip(props, ctx) {
    return { instance: new Tooltip(props, ctx?.overlayContainer) }
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
  const { instance } = element

  const onTooltipOpen = (event: TooltipEvent) => {
    if (event.tooltip === instance) {
      instance.update()
      setOpen(true)
    }
  }

  const onTooltipClose = (event: TooltipEvent) => {
    if (event.tooltip === instance) {
      setOpen(false)
    }
  }

  const container = context.overlayContainer
  if (container == null) {
    return
  }

  container.on({
    // @ts-ignore emits TooltipEvent instead of LeafletEvent
    tooltipopen: onTooltipOpen,
    // @ts-ignore emits TooltipEvent instead of LeafletEvent
    tooltipclose: onTooltipClose,
  })
  container.bindTooltip(instance)

  return () => {
    container.off({
      // @ts-ignore emits TooltipEvent instead of LeafletEvent
      tooltipopen: onTooltipOpen,
      // @ts-ignore emits TooltipEvent instead of LeafletEvent
      tooltipclose: onTooltipClose,
    })
    container.unbindTooltip()
  }
}

export const useLeafletTooltip = createUseLeafletDivOverlay(
  useTooltipElement,
  useTooltipLifecycle,
)

export const LeafletTooltip = createOverlayComponent(useLeafletTooltip)
