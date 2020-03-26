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
  function createGeoJSON({ data, ...options }, ctx) {
    const instance = new GeoJSON(data, options)
    const context = ctx === null ? null : { ...ctx, overlayContainer: instance }
    return { instance, context }
  },
)

export const useLeafletGeoJSON = createUseLeafletPath(useGeoJSONElement)

export const LeafletGeoJSON = createContainerComponent(useLeafletGeoJSON)
