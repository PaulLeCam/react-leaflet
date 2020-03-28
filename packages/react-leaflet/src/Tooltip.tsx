import {
  EventedProps,
  LeafletContextInterface,
  LeafletElement,
  SetOpenFunc,
  createOverlayComponent,
} from '@react-leaflet/core'
import {
  LatLngExpression,
  Tooltip as LeafletTooltip,
  TooltipEvent,
  TooltipOptions,
} from 'leaflet'
import { ReactNode } from 'react'

export interface TooltipProps extends TooltipOptions, EventedProps {
  children?: ReactNode
  position?: LatLngExpression
}

export const Tooltip = createOverlayComponent<LeafletTooltip, TooltipProps>(
  function createTooltip(props, ctx) {
    return { instance: new LeafletTooltip(props, ctx?.overlayContainer) }
  },
  function useTooltipLifecycle(
    element: LeafletElement<LeafletTooltip>,
    context: LeafletContextInterface | null,
    props: TooltipProps,
    setOpen: SetOpenFunc,
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
  },
)
