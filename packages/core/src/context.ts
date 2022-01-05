import type { Control, Layer, LayerGroup, Map } from 'leaflet'
import { createContext, useContext } from 'react'

export const CONTEXT_VERSION = 1

export type ControlledLayer = {
  addLayer(layer: Layer): void
  removeLayer(layer: Layer): void
}

export type LeafletContextInterface = Readonly<{
  __version: number
  map: Map
  layerContainer?: ControlledLayer | LayerGroup
  layersControl?: Control.Layers
  overlayContainer?: Layer
  pane?: string
}>

export function extendContext(
  source: LeafletContextInterface,
  extra: Partial<LeafletContextInterface>,
): LeafletContextInterface {
  return Object.freeze({ ...source, ...extra })
}

export const LeafletContext = createContext<LeafletContextInterface | null>(
  null,
)

export const LeafletProvider = LeafletContext.Provider

export function useLeafletContext(): LeafletContextInterface {
  const context = useContext(LeafletContext)
  if (context == null) {
    throw new Error(
      'No context provided: useLeafletContext() can only be used in a descendant of <MapContainer>',
    )
  }
  return context
}
