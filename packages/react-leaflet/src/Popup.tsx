import {
  EventedProps,
  LeafletContextInterface,
  LeafletElement,
  SetOpenFunc,
  createOverlayComponent,
} from '@react-leaflet/core'
import {
  LatLngExpression,
  Popup as LeafletPopup,
  PopupEvent,
  PopupOptions,
} from 'leaflet'
import { ReactNode } from 'react'

export interface PopupProps extends PopupOptions, EventedProps {
  children?: ReactNode
  position?: LatLngExpression
}

export const Popup = createOverlayComponent<LeafletPopup, PopupProps>(
  function createPopup(props, ctx) {
    return { instance: new LeafletPopup(props, ctx?.overlayContainer) }
  },
  function usePopupLifecycle(
    element: LeafletElement<LeafletPopup>,
    context: LeafletContextInterface | null,
    props: PopupProps,
    setOpen: SetOpenFunc,
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
  },
)
