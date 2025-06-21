import {
  createElementObject,
  createPathComponent,
  extendContext,
  type PathProps,
} from '@react-leaflet/core'
import type { GeoJsonObject } from 'geojson'
import { type GeoJSONOptions, GeoJSON as LeafletGeoJSON } from 'leaflet'

import type { LayerGroupProps } from './LayerGroup.js'

export interface GeoJSONProps
  extends GeoJSONOptions,
    LayerGroupProps,
    PathProps {
  data: GeoJsonObject
}

export const GeoJSON = createPathComponent<LeafletGeoJSON, GeoJSONProps>(
  function createGeoJSON({ data, ...options }, ctx) {
    const geoJSON = new LeafletGeoJSON(data, options)
    return createElementObject(
      geoJSON,
      extendContext(ctx, { overlayContainer: geoJSON }),
    )
  },
  function updateGeoJSON(layer, props, prevProps) {
    if (props.style !== prevProps.style) {
      if (props.style == null) {
        layer.resetStyle()
      } else {
        layer.setStyle(props.style)
      }
    }
  },
)
