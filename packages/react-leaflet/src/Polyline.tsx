import {
  type PathProps,
  createElementObject,
  createPathComponent,
  extendContext,
} from '@react-leaflet/core'
import {
  type LatLngExpression,
  Polyline as LeafletPolyline,
  type PolylineOptions,
} from 'leaflet'
import type { ReactNode } from 'react'

export interface PolylineProps extends PolylineOptions, PathProps {
  children?: ReactNode
  positions: LatLngExpression[] | LatLngExpression[][]
}

export const Polyline = createPathComponent<LeafletPolyline, PolylineProps>(
  function createPolyline({ positions, ...options }, ctx) {
    const polyline = new LeafletPolyline(positions, options)
    return createElementObject(
      polyline,
      extendContext(ctx, { overlayContainer: polyline }),
    )
  },
  function updatePolyline(layer, props, prevProps) {

    if (props.positions !== prevProps.positions) {
      layer.setLatLngs(props.positions);
    }
    if (props.dashArray !== prevProps.dashArray) {
      layer.setStyle({ dashArray: props.dashArray });
    }
    if (props.dashOffset !== prevProps.dashOffset) {
      layer.setStyle({ dashOffset: props.dashOffset });
    }
    if (props.opacity !== prevProps.opacity) {
      layer.setStyle({ opacity: props.opacity });
    }
    if (props.fill !== prevProps.fill) {
      layer.setStyle({ fill: props.fill });
    }
    if (props.fillColor !== prevProps.fillColor) {
      layer.setStyle({ fillColor: props.fillColor });
    }
    if (props.fillOpacity !== prevProps.fillOpacity) {
      layer.setStyle({ fillOpacity: props.fillOpacity });
    }
    if (props.weight !== prevProps.weight) {
      layer.setStyle({ weight: props.weight });
    }
    if (props.color !== prevProps.color) {
      layer.setStyle({ color: props.color });
    }
    if (props.lineCap !== prevProps.lineCap) {
      layer.setStyle({ lineCap: props.lineCap });
    }
    if (props.lineJoin !== prevProps.lineJoin) {
      layer.setStyle({ lineJoin: props.lineJoin });
    }

    if (props.fillRule !== prevProps.fillRule) {
      layer.setStyle({ fillRule: props.fillRule });
    }
    if (props.className !== prevProps.className) {
      const el = layer.getElement();
      prevProps.className && el?.classList.remove(prevProps.className);
      props.className && el?.classList.add(props.className);
    }
  },
)
