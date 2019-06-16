import { LatLngExpression, Popup, PopupEvent, PopupOptions } from 'leaflet'
import { ReactNode } from 'react'

import { createDivOverlayComponent } from './core/component'
import { LeafletContextInterface } from './core/context'
import { createUseLeafletDivOverlay, SetOpen } from './core/div-overlay'
import { createUseLeafletElement, LeafletElement } from './core/element'

export interface PopupProps extends PopupOptions {
  children?: ReactNode
  position?: LatLngExpression
}

export const usePopupElement = createUseLeafletElement<Popup, PopupProps>(
  (props, context) => {
    const el = new Popup(
      props,
      context === null ? undefined : context.overlayContainer,
    )
    return { el }
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
  const { el } = element

  const onOpen = (event: PopupEvent) => {
    if (event.popup === el) {
      el.update()
      setOpen(true)
    }
  }

  const onClose = (event: PopupEvent) => {
    if (event.popup === el) {
      setOpen(false)
    }
  }

  context.map.on({
    // @ts-ignore emits PopupEvent instead of LeafletEvent
    popupopen: onOpen,
    // @ts-ignore emits PopupEvent instead of LeafletEvent
    popupclose: onClose,
  })

  if (context.overlayContainer != null) {
    // Attach to container component
    context.overlayContainer.bindPopup(el)
  } else {
    // Attach to a Map
    if (props.position != null) {
      el.setLatLng(props.position)
    }
    el.openOn(context.map)
  }

  return () => {
    context.map.off({
      // @ts-ignore emits PopupEvent instead of LeafletEvent
      popupopen: onOpen,
      // @ts-ignore emits PopupEvent instead of LeafletEvent
      popupclose: onClose,
    })
    context.map.removeLayer(el)
  }
}

export const useLeafletPopup = createUseLeafletDivOverlay(
  usePopupElement,
  usePopupLifecycle,
)

export const LeafletPopup = createDivOverlayComponent(useLeafletPopup)
