import type { EventedProps, LeafletElement } from '@react-leaflet/core'
import { useEventHandlers } from '@react-leaflet/core'
import type {
  Circle as LeafletCircle,
  CircleMarker as LeafletCircleMarker,
  FeatureGroup as LeafletFeatureGroup,
  GeoJSON as LeafletGeoJSON,
  ImageOverlay as LeafletImageOverlay,
  LayerGroup as LeafletLayerGroup,
  LeafletMap,
  Marker as LeafletMarker,
  Polygon as LeafletPolygon,
  Polyline as LeafletPolyline,
  Rectangle as LeafletRectangle,
  SVGOverlay as LeafletSVGOverlay,
  VideoOverlay as LeafletVideoOverlay,
  WMSTileLayer as LeafletWMSTileLayer,
} from 'leaflet'
import type { CircleProps } from '../src/Circle.js'
import type { CircleMarkerProps } from '../src/CircleMarker.js'
import type { FeatureGroupProps } from '../src/FeatureGroup.js'
import type { GeoJSONProps } from '../src/GeoJSON.js'
import { useMapEvent, useMapEvents } from '../src/hooks.js'
import type { ImageOverlayProps } from '../src/ImageOverlay.js'
import type { LayerGroupProps } from '../src/LayerGroup.js'
import { Marker } from '../src/Marker.js'
import type { PolygonProps } from '../src/Polygon.js'
import type { PolylineProps } from '../src/Polyline.js'
import type { RectangleProps } from '../src/Rectangle.js'
import type { SVGOverlayProps } from '../src/SVGOverlay.js'
import { TileLayer } from '../src/TileLayer.js'
import type { VideoOverlayProps } from '../src/VideoOverlay.js'
import type { WMSTileLayerProps } from '../src/WMSTileLayer.js'

export function useConcreteMarkerHandlers(
  element: LeafletElement<LeafletMarker>,
) {
  const handlers: EventedProps<LeafletMarker>['eventHandlers'] = {
    dragend(event) {
      const marker: LeafletMarker = event.target
      marker.setLatLng([event.distance, 0])
    },
  }
  useEventHandlers(element, handlers)
  useEventHandlers(element, {
    dragend(event) {
      const marker: LeafletMarker = event.target
      marker.setLatLng([event.distance, 0])
    },
    // @ts-expect-error Unknown events must be rejected for inline handlers.
    unknownEvent() {},
  })
  return <Marker position={[0, 0]} eventHandlers={handlers} />
}

export const tileLayer = (
  <TileLayer
    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
    eventHandlers={{
      tileerror(event) {
        event.tile.remove()
        event.target.setUrl('https://tile.openstreetmap.org/{z}/{x}/{y}.png')
      },
      // @ts-expect-error Unknown events must be rejected.
      unknownEvent() {},
    }}
  />
)

export const wmsEvents: NonNullable<WMSTileLayerProps['eventHandlers']> = {
  tileerror(event) {
    const layer: LeafletWMSTileLayer = event.target
    layer.setParams({ layers: 'roads' })
    event.tile.remove()
  },
}

export const imageEvents: NonNullable<ImageOverlayProps['eventHandlers']> = {
  load(event) {
    const overlay: LeafletImageOverlay = event.target
    overlay.getElement()
  },
  error(event) {
    event.target.setUrl('overlay.png')
  },
}

export const videoEvents: NonNullable<VideoOverlayProps['eventHandlers']> = {
  load(event) {
    const overlay: LeafletVideoOverlay = event.target
    overlay.getElement()?.play()
  },
}

export const svgEvents: NonNullable<SVGOverlayProps['eventHandlers']> = {
  load(event) {
    const overlay: LeafletSVGOverlay = event.target
    overlay.getElement()
  },
}

export const featureGroupEvents: NonNullable<
  FeatureGroupProps['eventHandlers']
> = {
  layeradd(event) {
    const group: LeafletFeatureGroup = event.target
    group.hasLayer(event.layer)
  },
}

export const geoJSONEvents: NonNullable<GeoJSONProps['eventHandlers']> = {
  layerremove(event) {
    const geoJSON: LeafletGeoJSON = event.target
    geoJSON.resetStyle(event.layer)
  },
}

export const circleEvents: NonNullable<CircleProps['eventHandlers']> = {
  move(event) {
    const circle: LeafletCircle = event.target
    circle.setLatLng(event.latlng)
  },
}

export const circleMarkerEvents: NonNullable<
  CircleMarkerProps['eventHandlers']
> = {
  move(event) {
    const circleMarker: LeafletCircleMarker = event.target
    circleMarker.setLatLng(event.latlng)
  },
}

export const polylineEvents: NonNullable<PolylineProps['eventHandlers']> = {
  click(event) {
    const polyline: LeafletPolyline = event.target
    polyline.addLatLng(event.latlng)
  },
}

export const polygonEvents: NonNullable<PolygonProps['eventHandlers']> = {
  click(event) {
    const polygon: LeafletPolygon = event.target
    polygon.addLatLng(event.latlng)
  },
}

export const rectangleEvents: NonNullable<RectangleProps['eventHandlers']> = {
  click(event) {
    const rectangle: LeafletRectangle = event.target
    rectangle.addLatLng(event.latlng)
  },
}

export const layerGroupEvents: NonNullable<LayerGroupProps['eventHandlers']> = {
  click(event) {
    const group: LeafletLayerGroup = event.target
    group.getLayers()
  },
}

export function useTypedMapEvents() {
  useMapEvent('zoomend', (event) => {
    const map: LeafletMap = event.target
    map.getZoom()
  })
  useMapEvents({
    locationfound(event) {
      const map: LeafletMap = event.target
      map.panTo(event.latlng)
    },
    // @ts-expect-error Unknown map events must be rejected.
    unknownEvent() {},
  })
}
