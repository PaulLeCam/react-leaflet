import { Map } from 'leaflet'
import { ReactElement } from 'react'

import { useMap } from './hooks'

export interface MapConsumerProps {
  children: (map: Map) => ReactElement | null
}

export function MapConsumer({ children }: MapConsumerProps) {
  return children(useMap())
}
