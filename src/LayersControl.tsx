import { Control, Layer } from 'leaflet'
import React, {
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
  StatelessComponent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { createContainerComponent } from './core/component'
import { LeafletProvider, useLeafletContext } from './core/context'
import { createUseLeafletControl } from './core/control'
import { createUseLeafletElement } from './core/element'

export interface LayersControlProps extends Control.LayersOptions {
  children?: ReactNode
}

export const useLayersControlElement = createUseLeafletElement<
  Control.Layers,
  LayersControlProps
>(
  function createLayersControl({ children: _c, ...options }, ctx) {
    const instance = new Control.Layers(undefined, undefined, options)
    const context = ctx === null ? null : { ...ctx, layersControl: instance }
    return { instance, context }
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

export const useLeafletLayersControl = createUseLeafletControl(
  useLayersControlElement,
)

export interface ControlledLayerProps {
  checked?: boolean
  children: ReactNode
  name: string
}

// @ts-ignore
export const LeafletLayersControl: ForwardRefExoticComponent<
  LayersControlProps & RefAttributes<{ element: Control.Layers | null }>
> & {
  BaseLayer: StatelessComponent<ControlledLayerProps>
  Overlay: StatelessComponent<ControlledLayerProps>
} = createContainerComponent(useLeafletLayersControl)

type AddLayerFunc = (
  layersControl: Control.Layers,
  layer: Layer,
  name: string,
) => void

export function createUseControlledLayer(addLayerToControl: AddLayerFunc) {
  return function ControlledLayer(props: ControlledLayerProps) {
    const context = useLeafletContext()
    const propsRef = useRef<ControlledLayerProps>(props)
    const [layer, setLayer] = useState<Layer | null>(null)

    const addLayer = useCallback(
      (layerToAdd: Layer) => {
        if (context !== null && context.layersControl != null) {
          if (propsRef.current.checked) {
            context.map.addLayer(layerToAdd)
          }
          addLayerToControl(
            context.layersControl,
            layerToAdd,
            propsRef.current.name,
          )
          setLayer(layerToAdd)
        }
      },
      [context],
    )
    const removeLayer = useCallback(
      (layerToRemove: Layer) => {
        if (context !== null && context.layersControl != null) {
          context.layersControl.removeLayer(layerToRemove)
        }
        setLayer(null)
      },
      [context],
    )
    const newContext = useMemo(() => {
      return context
        ? { ...context, layerContainer: { addLayer, removeLayer } }
        : null
    }, [context, addLayer, removeLayer])

    useEffect(() => {
      if (context != null && layer !== null && propsRef.current !== props) {
        if (
          props.checked === true &&
          (propsRef.current.checked == null ||
            propsRef.current.checked === false)
        ) {
          context.map.addLayer(layer)
        } else if (
          propsRef.current.checked === true &&
          (props.checked == null || props.checked === false)
        ) {
          context.map.removeLayer(layer)
        }
        propsRef.current = props
      }

      return () => {
        if (context?.layersControl != null && layer !== null) {
          context.layersControl.removeLayer(layer)
        }
      }
    })

    return props.children ? (
      <LeafletProvider value={newContext}>{props.children}</LeafletProvider>
    ) : null
  }
}

LeafletLayersControl.BaseLayer = createUseControlledLayer(function addBaseLayer(
  layersControl: Control.Layers,
  layer: Layer,
  name: string,
) {
  layersControl.addBaseLayer(layer, name)
})

LeafletLayersControl.Overlay = createUseControlledLayer(function addOverlay(
  layersControl: Control.Layers,
  layer: Layer,
  name: string,
) {
  layersControl.addOverlay(layer, name)
})
