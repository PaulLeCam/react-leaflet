import { PathProps, createPathComponent } from '@react-leaflet/core'
import { GeoJsonObject } from 'geojson'
import { GeoJSON as LeafletGeoJSON, GeoJSONOptions } from 'leaflet'

import { LayerGroupProps } from './LayerGroup'

export interface GeoJSONProps
  extends GeoJSONOptions,
    LayerGroupProps,
    PathProps {
  data: GeoJsonObject
}

export const GeoJSON = createPathComponent<LeafletGeoJSON, GeoJSONProps>(
  function createGeoJSON({ data, ...options }, ctx) {
    const instance = new LeafletGeoJSON(data, options)
    return { instance, context: { ...ctx, overlayContainer: instance } }
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
