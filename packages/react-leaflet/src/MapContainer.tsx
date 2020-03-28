import { EventedProps, LeafletProvider } from '@react-leaflet/core'
import {
  FitBoundsOptions,
  LatLngBoundsExpression,
  Map as LeafletMap,
  MapOptions,
} from 'leaflet'
import React, {
  CSSProperties,
  MutableRefObject,
  ReactNode,
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

export interface MapContainerProps extends MapOptions, EventedProps {
  animate?: boolean
  bounds?: LatLngBoundsExpression
  boundsOptions?: FitBoundsOptions
  children?: ReactNode
  className?: string
  id?: string
  style?: CSSProperties
  whenCreated?: (map: LeafletMap) => void
  whenReady?: () => void
}

export function useMapElement(
  mapRef: MutableRefObject<HTMLElement | null>,
  props: MapContainerProps,
): LeafletMap | null {
  const [map, setMap] = useState<LeafletMap | null>(null)

  useEffect(() => {
    if (mapRef.current !== null && map === null) {
      const instance = new LeafletMap(mapRef.current, props)
      if (props.center != null && props.zoom != null) {
        instance.setView(props.center, props.zoom)
      } else if (props.bounds != null) {
        instance.fitBounds(props.bounds, props.boundsOptions)
      }
      if (props.whenReady != null) {
        instance.whenReady(props.whenReady)
      }
      setMap(instance)
    }
  }, [mapRef, map, props])

  return map
}

function MapComponent(
  {
    children,
    className,
    id,
    style,
    whenCreated,
    ...options
  }: MapContainerProps,
  ref: Ref<{ element: LeafletMap | null }>,
) {
  const mapRef = useRef<HTMLDivElement>(null)
  const map = useMapElement(mapRef, options)
  useImperativeHandle(ref, () => ({ element: map }))

  const createdRef = useRef<boolean>(false)
  useEffect(() => {
    if (map != null && createdRef.current === false && whenCreated != null) {
      whenCreated(map)
    }
  }, [map, whenCreated])

  const contents = map ? (
    <LeafletProvider value={{ map }}>{children}</LeafletProvider>
  ) : null
  return (
    <div ref={mapRef} className={className} id={id} style={style}>
      {contents}
    </div>
  )
}

export const MapContainer = forwardRef(MapComponent)
