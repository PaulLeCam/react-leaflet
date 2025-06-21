import {
  createElementObject,
  createOverlayComponent,
  type EventedProps,
  type LeafletContextInterface,
  type LeafletElement,
  type SetOpenFunc,
} from '@react-leaflet/core'
import {
  type LatLngExpression,
  Tooltip as LeafletTooltip,
  type TooltipEvent,
  type TooltipOptions,
} from 'leaflet'
import { type ReactNode, useEffect } from 'react'

export interface TooltipProps extends TooltipOptions, EventedProps {
  children?: ReactNode
  position?: LatLngExpression
}

export const Tooltip = createOverlayComponent<LeafletTooltip, TooltipProps>(
  function createTooltip(props, context) {
    const tooltip = new LeafletTooltip(props, context.overlayContainer)
    return createElementObject(tooltip, context)
  },
  function useTooltipLifecycle(
    element: LeafletElement<LeafletTooltip>,
    context: LeafletContextInterface,
    { position }: TooltipProps,
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
            if (position != null) {
              instance.setLatLng(position)
            }

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
          tooltipopen: onTooltipOpen,
          tooltipclose: onTooltipClose,
        })
        container.bindTooltip(instance)

        return function removeTooltip() {
          container.off({
            tooltipopen: onTooltipOpen,
            tooltipclose: onTooltipClose,
          })
          // @ts-ignore protected property
          if (container._map != null) {
            container.unbindTooltip()
          }
        }
      },
      [element, context, setOpen, position],
    )
  },
)
