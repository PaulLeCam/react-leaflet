import {
  LeafletProvider,
  createContainerComponent,
  createControlHook,
  createElementHook,
  useLeafletContext,
} from '@react-leaflet/core'
import { Control, type Layer } from 'leaflet'
import React, {
  type ForwardRefExoticComponent,
  type FunctionComponent,
  type ReactNode,
  type RefAttributes,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

export interface LayersControlProps extends Control.LayersOptions {
  children?: ReactNode
}

export const useLayersControlElement = createElementHook<
  Control.Layers,
  LayersControlProps
>(
  function createLayersControl({ children: _c, ...options }, ctx) {
    const instance = new Control.Layers(undefined, undefined, options)
    return { instance, context: { ...ctx, layersControl: instance } }
  },
  function updateLayersControl(control, props, prevProps) {
    if (props.collapsed !== prevProps.collapsed) {
      if (props.collapsed === true) {
        control.collapse()
      } else {
        control.expand()
      }
    }
  },
)

export const useLayersControl = createControlHook(useLayersControlElement)

export interface ControlledLayerProps {
  checked?: boolean
  children: ReactNode
  name: string
}

// @ts-ignore
export const LayersControl: ForwardRefExoticComponent<
  LayersControlProps & RefAttributes<Control.Layers>
> & {
  BaseLayer: FunctionComponent<ControlledLayerProps>
  Overlay: FunctionComponent<ControlledLayerProps>
} = createContainerComponent(useLayersControl)

type AddLayerFunc = (
  layersControl: Control.Layers,
  layer: Layer,
  name: string,
) => void

export function createControlledLayer(addLayerToControl: AddLayerFunc) {
  return function ControlledLayer(props: ControlledLayerProps) {
    const parentContext = useLeafletContext()
    const propsRef = useRef<ControlledLayerProps>(props)
    const [layer, setLayer] = useState<Layer | null>(null)

    const { layersControl, map } = parentContext
    const addLayer = useCallback(
      (layerToAdd: Layer) => {
        if (layersControl != null) {
          if (propsRef.current.checked) {
            map.addLayer(layerToAdd)
          }
          addLayerToControl(layersControl, layerToAdd, propsRef.current.name)
          setLayer(layerToAdd)
        }
      },
      [layersControl, map],
    )
    const removeLayer = useCallback(
      (layerToRemove: Layer) => {
        layersControl?.removeLayer(layerToRemove)
        setLayer(null)
      },
      [layersControl],
    )
    const context = useMemo(
      () => ({ ...parentContext, layerContainer: { addLayer, removeLayer } }),
      [parentContext, addLayer, removeLayer],
    )

    useEffect(() => {
      if (layer !== null && propsRef.current !== props) {
        if (
          props.checked === true &&
          (propsRef.current.checked == null ||
            propsRef.current.checked === false)
        ) {
          map.addLayer(layer)
        } else if (
          propsRef.current.checked === true &&
          (props.checked == null || props.checked === false)
        ) {
          map.removeLayer(layer)
        }
        propsRef.current = props
      }
    })

    return props.children ? (
      <LeafletProvider value={context}>{props.children}</LeafletProvider>
    ) : null
  }
}

LayersControl.BaseLayer = createControlledLayer(function addBaseLayer(
  layersControl: Control.Layers,
  layer: Layer,
  name: string,
) {
  layersControl.addBaseLayer(layer, name)
})

LayersControl.Overlay = createControlledLayer(function addOverlay(
  layersControl: Control.Layers,
  layer: Layer,
  name: string,
) {
  layersControl.addOverlay(layer, name)
})
