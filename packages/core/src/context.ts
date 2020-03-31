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

export function useLeafletContext(): LeafletContextInterface {
  const context = useContext(LeafletContext)
  if (context == null) {
    throw new Error(
      'No context provided: useLeafletContext() can only be used in a descendant of <MapContainer>',
    )
  }
  return context
}
