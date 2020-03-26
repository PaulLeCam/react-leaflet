import { LatLngExpression, Popup, PopupEvent, PopupOptions } from 'leaflet'
import { ReactNode } from 'react'

import { createOverlayComponent } from './core/component'
import { LeafletContextInterface } from './core/context'
import { createUseLeafletDivOverlay, SetOpen } from './core/div-overlay'
import { createUseLeafletElement, LeafletElement } from './core/element'
import { EventedProps } from './core/events'

export interface PopupProps extends PopupOptions, EventedProps {
  children?: ReactNode
  position?: LatLngExpression
}

export const usePopupElement = createUseLeafletElement<Popup, PopupProps>(
  function createPopup(props, ctx) {
    return { instance: new Popup(props, ctx?.overlayContainer) }
  },
)

export function usePopupLifecycle(
  element: LeafletElement<Popup>,
  context: LeafletContextInterface | null,
  props: PopupProps,
  setOpen: SetOpen,
) {
  if (element === null || context == null) {
    return
  }
  const { instance } = element

  function onPopupOpen(event: PopupEvent) {
    if (event.popup === instance) {
      instance.update()
      setOpen(true)
    }
  }

  function onPopupClose(event: PopupEvent) {
    if (event.popup === instance) {
      setOpen(false)
    }
  }

  context.map.on({
    // @ts-ignore emits PopupEvent instead of LeafletEvent
    popupopen: onPopupOpen,
    // @ts-ignore emits PopupEvent instead of LeafletEvent
    popupclose: onPopupClose,
  })

  if (context.overlayContainer != null) {
    // Attach to container component
    context.overlayContainer.bindPopup(instance)
  } else {
    // Attach to a Map
    if (props.position != null) {
      instance.setLatLng(props.position)
    }
    instance.openOn(context.map)
  }

  return () => {
    context.map.off({
      // @ts-ignore emits PopupEvent instead of LeafletEvent
      popupopen: onPopupOpen,
      // @ts-ignore emits PopupEvent instead of LeafletEvent
      popupclose: onPopupClose,
    })
    context.map.removeLayer(instance)
  }
}

export const useLeafletPopup = createUseLeafletDivOverlay(
  usePopupElement,
  usePopupLifecycle,
)

export const LeafletPopup = createOverlayComponent(useLeafletPopup)
