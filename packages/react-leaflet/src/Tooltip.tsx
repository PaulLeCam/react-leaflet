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
import { ReactNode, useEffect } from 'react'

export interface TooltipProps extends TooltipOptions, EventedProps {
  children?: ReactNode
  position?: LatLngExpression
}

export const Tooltip = createOverlayComponent<LeafletTooltip, TooltipProps>(
  function createTooltip(props, context) {
    return {
      instance: new LeafletTooltip(props, context.overlayContainer),
      context,
    }
  },
  function useTooltipLifecycle(
    element: LeafletElement<LeafletTooltip>,
    context: LeafletContextInterface,
    props: TooltipProps,
    setOpen: SetOpenFunc,
  ) {
    useEffect(
      function addTooltip() {
        const container = context.overlayContainer
        if (container == null) {
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

        container.on({
          // @ts-ignore emits TooltipEvent instead of LeafletEvent
          tooltipopen: onTooltipOpen,
          // @ts-ignore emits TooltipEvent instead of LeafletEvent
          tooltipclose: onTooltipClose,
        })
        container.bindTooltip(instance)

        return function removeTooltip() {
          container.off({
            // @ts-ignore emits TooltipEvent instead of LeafletEvent
            tooltipopen: onTooltipOpen,
            // @ts-ignore emits TooltipEvent instead of LeafletEvent
            tooltipclose: onTooltipClose,
          })
          container.unbindTooltip()
        }
      },
      [element, context, setOpen],
    )
  },
)
