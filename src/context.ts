import { Layer, LayerGroup, Map } from 'leaflet'
import { createContext, useContext } from 'react'

export interface LeafletContextInterface {
  map: Map
  layerContainer?: LayerGroup
  overlayContainer?: Layer
}

export const LeafletContext = createContext<LeafletContextInterface | null>(
  null,
)

export const LeafletProvider = LeafletContext.Provider

export function useLeafletContext() {
  return useContext(LeafletContext)
}
