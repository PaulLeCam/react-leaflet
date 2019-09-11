import { GeoJsonObject } from 'geojson'
import { GeoJSON, GeoJSONOptions } from 'leaflet'

import { LayerGroupProps } from './LayerGroup'
import { createContainerComponent } from './core/component'
import { createUseLeafletElement } from './core/element'
import { PathProps, createUseLeafletPath } from './core/path'

export interface GeoJSONProps
  extends GeoJSONOptions,
    LayerGroupProps,
    PathProps {
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

export const LeafletGeoJSON = createContainerComponent(useLeafletGeoJSON)
