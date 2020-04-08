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
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

export interface MapContainerProps extends MapOptions, EventedProps {
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

export function MapContainer({
  children,
  className,
  id,
  style,
  whenCreated,
  ...options
}: MapContainerProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const map = useMapElement(mapRef, options)

  const createdRef = useRef<boolean>(false)
  useEffect(() => {
    if (map != null && createdRef.current === false && whenCreated != null) {
      createdRef.current = true
      whenCreated(map)
    }
  }, [map, whenCreated])

  const context = useMemo(() => (map ? { map } : null), [map])

  const contents = context ? (
    <LeafletProvider value={context}>{children}</LeafletProvider>
  ) : null
  return (
    <div ref={mapRef} className={className} id={id} style={style}>
      {contents}
    </div>
  )
}
