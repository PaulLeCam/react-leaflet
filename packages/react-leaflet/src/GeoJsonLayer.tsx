import {
  Feature,
  GeoJSON,
  LineString,
  MultiLineString,
  MultiPoint,
  MultiPolygon,
  Point,
  Polygon as PolygonType,
  Position,
} from 'geojson'
import { GeoJSON as LeafletGeoJSON, LatLng, LeafletEventHandlerFnMap } from 'leaflet'
import React from 'react'
import {
  CircleMarker,
  CircleMarkerProps,
  FeatureGroup,
  GeoJSONProps,
  Marker,
  MarkerProps,
  Polygon,
  PolygonProps,
  Polyline,
  PolylineProps,
} from 'react-leaflet'

import { hasProperty, isGeometry } from './typeGuards'


export type GeoJsonLayerProps = GeoJSONProps & {
  data: GeoJSON
  pointToLayer?: never
  onEachFeature?: never
  coordsToLatLng?: (coords: number[]) => LatLng

  feature?: Feature
  eventHandlerFn?: (feature: Feature) => LeafletEventHandlerFnMap | undefined
  getChildren?: (feature: Feature) => React.ReactNode
  lineProps?: Partial<PolylineProps> | (
    (featureLine?: Feature<LineString | MultiLineString>) => Partial<PolylineProps>
  )
  polygonProps?: Partial<PolygonProps> | (
    (featurePolygon?: Feature<PolygonType | MultiPolygon>) => Partial<PolylineProps>
  )
} & ({
  pointAsMarker: true
  pointProps?: Partial<MarkerProps> | (
    (featurePoint?: Feature<Point | MultiPoint>) => Partial<MarkerProps>
  )
} | {
  pointAsMarker?: false
  pointProps?: Partial<CircleMarkerProps> | (
    (featurePoint?: Feature<Point | MultiPoint>) => Partial<CircleMarkerProps>
  )
})

const defaultFilter = () => true

const defaultCoordsToLatLng = (coords: Position) => LeafletGeoJSON.coordsToLatLng([
  coords[0] ?? NaN,
  coords[1] ?? NaN,
  coords[2] ?? NaN,
])

const GeoJsonLayer: React.FC<GeoJsonLayerProps> = ({
  data,
  style,
  filter = defaultFilter,
  coordsToLatLng = defaultCoordsToLatLng,

  eventHandlerFn,
  feature,
  pointAsMarker,
  pointProps,
  lineProps,
  polygonProps,
  getChildren,

  children,
  ...featureGroupProps
}) => {
  // Override (N.B.: only for feature group)
  featureGroupProps.pathOptions = {
    ...featureGroupProps.pathOptions,
    ...(typeof style === 'function' ? style(isGeometry(feature?.geometry) ? feature : undefined) : style)
  }

  switch (data.type) {

    case 'Point':  // Fall-through
    case 'MultiPoint': {
      const points = data.type === 'Point' ? [data.coordinates] : data.coordinates
      const markerProps = typeof pointProps === 'function'
        ? pointProps(feature as Feature<Point | MultiPoint> | undefined)
        : pointProps
      if (pointAsMarker) {
        return (
          <FeatureGroup {...featureGroupProps}>
            {points.map((position, i) => (
              <Marker {...markerProps} key={i} position={coordsToLatLng(position)} />
            ))}
            {children}
          </FeatureGroup>
        )
      }
      return (
        <FeatureGroup {...featureGroupProps}>
          {points.map((position, i) => (
            <CircleMarker {...markerProps} key={i} center={coordsToLatLng(position)} />
          ))}
          {children}
        </FeatureGroup>
      )
    }

    case 'LineString': // Fall-through
    case 'MultiLineString': {
      const lines = data.type === 'LineString' ? [data.coordinates] : data.coordinates
      const polylineProps = typeof lineProps === 'function'
        ? lineProps(feature as Feature<LineString | MultiLineString> | undefined)
        : lineProps
      return (
        <FeatureGroup {...featureGroupProps}>
          {lines.map((line, i) => (
            <Polyline {...polylineProps} key={i} positions={line.map(position => coordsToLatLng(position))} />
          ))}
          {children}
        </FeatureGroup>
      )
    }

    case 'Polygon': // Fall-through
    case 'MultiPolygon': {
      const polygons = data.type === 'Polygon' ? [data.coordinates] : data.coordinates
      const polyProps = typeof polygonProps === 'function'
        ? polygonProps(feature as Feature<PolygonType | MultiPolygon> | undefined)
        : polygonProps
      return (
        <FeatureGroup {...featureGroupProps}>
          {polygons.map((polygon, i) => (
            <Polygon
              {...polyProps}
              key={i}
              positions={polygon.map(line => line.map(position => coordsToLatLng(position)))}
            />
          ))}
          {children}
        </FeatureGroup>
      )
    }

    case 'Feature': // Fall-through
    case 'FeatureCollection': {
      const features = data.type === 'Feature' ? [data] : data.features
      return (
        <FeatureGroup {...featureGroupProps}>
          {features.filter(filter).map((feature, i) => (
            <GeoJsonLayer
              {...featureGroupProps}

              key={feature.id ?? (
                hasProperty(feature.properties, 'id', 'string', 'number')
                  ? feature.properties.id
                  : i
              )}

              data={feature.geometry}
              style={style}
              filter={filter}
              coordsToLatLng={coordsToLatLng}
              eventHandlers={eventHandlerFn ? eventHandlerFn(feature) : undefined}
              children={getChildren ? getChildren(feature) : undefined}

              eventHandlerFn={eventHandlerFn}
              getChildren={getChildren}
              feature={feature}
              pointAsMarker={pointAsMarker}
              pointProps={pointProps}
              lineProps={lineProps}
              polygonProps={polygonProps}
            />
          ))}
          {children}
        </FeatureGroup>
      )
    }

    case 'GeometryCollection': {
      const geometries = data.geometries
      return (
        <FeatureGroup {...featureGroupProps}>
          {geometries.map((geometry, i) => (
            <GeoJsonLayer
              {...featureGroupProps}

              key={i}

              data={geometry}
              style={style}
              filter={filter}
              coordsToLatLng={coordsToLatLng}
              eventHandlers={undefined}
              children={undefined}

              eventHandlerFn={eventHandlerFn}
              getChildren={getChildren}
              feature={feature}
              pointAsMarker={pointAsMarker}
              pointProps={pointProps}
              lineProps={lineProps}
              polygonProps={polygonProps}
            />
          ))}
          {children}
        </FeatureGroup>
      )
    }
  }
}

export default React.memo(GeoJsonLayer)
