import {
  type EventedProps,
  type LeafletContextInterface,
  type LeafletElement,
  type SetOpenFunc,
  createOverlayComponent,
} from '@react-leaflet/core'
import {
  type LatLngExpression,
  Popup as LeafletPopup,
  type PopupEvent,
  type PopupOptions,
} from 'leaflet'
import { type ReactNode, useEffect } from 'react'

export interface PopupProps extends PopupOptions, EventedProps {
  children?: ReactNode
  onClose?: () => void
  onOpen?: () => void
  position?: LatLngExpression
}

export const Popup = createOverlayComponent<LeafletPopup, PopupProps>(
  function createPopup(props, context) {
    return {
      instance: new LeafletPopup(props, context.overlayContainer),
      context,
    }
  },
  function usePopupLifecycle(
    element: LeafletElement<LeafletPopup>,
    context: LeafletContextInterface,
    props: PopupProps,
    setOpen: SetOpenFunc,
  ) {
    const { onClose, onOpen, position } = props

    useEffect(
      function addPopup() {
        const { instance } = element

        function onPopupOpen(event: PopupEvent) {
          if (event.popup === instance) {
            instance.update()
            setOpen(true)
            onOpen?.()
          }
        }

        function onPopupClose(event: PopupEvent) {
          if (event.popup === instance) {
            setOpen(false)
            onClose?.()
          }
        }

        context.map.on({
          popupopen: onPopupOpen,
          popupclose: onPopupClose,
        })

        if (context.overlayContainer == null) {
          // Attach to a Map
          if (position != null) {
            instance.setLatLng(position)
          }
          instance.openOn(context.map)
        } else {
          // Attach to container component
          context.overlayContainer.bindPopup(instance)
        }

        return function removePopup() {
          context.map.off({
            popupopen: onPopupOpen,
            popupclose: onPopupClose,
          })
          context.overlayContainer?.unbindPopup()
          context.map.removeLayer(instance)
        }
      },
      [element, context, setOpen, onClose, onOpen, position],
    )
  },
)
