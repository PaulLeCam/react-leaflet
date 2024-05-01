import {
  LeafletContext,
  type LeafletContextInterface,
  createLeafletContext,
} from '@react-leaflet/core'
import {
  type FitBoundsOptions,
  type LatLngBoundsExpression,
  Map as LeafletMap,
  type MapOptions,
} from 'leaflet'
import React, {
  type CSSProperties,
  type ReactNode,
  type Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

export interface MapContainerProps extends MapOptions {
  bounds?: LatLngBoundsExpression
  boundsOptions?: FitBoundsOptions
  children?: ReactNode
  className?: string
  id?: string
  placeholder?: ReactNode
  style?: CSSProperties
  whenReady?: () => void
}

function MapContainerComponent<
  Props extends MapContainerProps = MapContainerProps,
>(
  {
    bounds,
    boundsOptions,
    center,
    children,
    className,
    id,
    placeholder,
    style,
    whenReady,
    zoom,
    ...options
  }: Props,
  forwardedRef: Ref<LeafletMap | undefined>,
) {
  const [props] = useState({ className, id, style })
  const [context, setContext] = useState<LeafletContextInterface | null>(null)
  const mapInstanceRef = useRef<LeafletMap>(undefined)
  useImperativeHandle(forwardedRef, () => mapInstanceRef.current)

  const mapRef = (node?: HTMLDivElement | null) => {
    if (node != null && !mapInstanceRef.current) {
      const map = new LeafletMap(node, options)
      mapInstanceRef.current = map
      if (center != null && zoom != null) {
        map.setView(center, zoom)
      } else if (bounds != null) {
        map.fitBounds(bounds, boundsOptions)
      }
      if (whenReady != null) {
        map.whenReady(whenReady)
      }
      setContext(createLeafletContext(map))
    }
  }

  useEffect(() => {
    return () => {
      context?.map.remove()
    }
  }, [context])

  const contents = context ? (
    <LeafletContext value={context}>{children}</LeafletContext>
  ) : (
    placeholder ?? null
  )
  return (
    <div {...props} ref={mapRef}>
      {contents}
    </div>
  )
}

export const MapContainer = forwardRef(MapContainerComponent)
