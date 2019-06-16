import { Control, Layer, LayerGroup, Map } from 'leaflet'
import { createContext, useContext } from 'react'

interface ControlledLayer {
  addLayer(layer: Layer): void
  removeLayer(layer: Layer): void
}

export interface LeafletContextInterface {
  map: Map
  layerContainer?: ControlledLayer | LayerGroup
  layersControl?: Control.Layers
  overlayContainer?: Layer
  pane?: string
}

export const LeafletContext = createContext<LeafletContextInterface | null>(
  null,
)

export const LeafletProvider = LeafletContext.Provider

export function useLeafletContext() {
  return useContext(LeafletContext)
}
