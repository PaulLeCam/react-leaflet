import { GeoJsonObject } from 'geojson'
import { GeoJSON, GeoJSONOptions } from 'leaflet'

import { LayerGroupProps } from './LayerGroup'
import { createContextComponent } from './core/component'
import { createUseLeafletElement } from './core/element'
import { EventedProps } from './core/events'
import { createUseLeafletPath } from './core/path'

export interface GeoJSONProps
  extends EventedProps,
    GeoJSONOptions,
    LayerGroupProps {
  data: GeoJsonObject
}

export const useGeoJSONElement = createUseLeafletElement<GeoJSON, GeoJSONProps>(
  function createGeoJSON(props, context) {
    const { data, ...options } = props
    const el = new GeoJSON(data, options)
    return {
      el,
      context: context === null ? null : { ...context, overlayContainer: el },
    }
  },
)

export const useLeafletGeoJSON = createUseLeafletPath(useGeoJSONElement)

export const LeafletGeoJSON = createContextComponent(useLeafletGeoJSON)
