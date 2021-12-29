import {
  CONTEXT_VERSION,
  LeafletProvider,
  type LeafletContextInterface,
} from '@react-leaflet/core'
import {
  type FitBoundsOptions,
  type LatLngBoundsExpression,
  Map as LeafletMap,
  type MapOptions,
} from 'leaflet'
import React, { CSSProperties, ReactNode, useCallback, useState } from 'react'

export interface MapContainerProps extends MapOptions {
  bounds?: LatLngBoundsExpression
  boundsOptions?: FitBoundsOptions
  children?: ReactNode
  className?: string
  id?: string
  placeholder?: ReactNode
  style?: CSSProperties
  whenCreated?: (map: LeafletMap) => void
  whenReady?: () => void
}

export function MapContainer<
  Props extends MapContainerProps = MapContainerProps,
>({
  bounds,
  boundsOptions,
  center,
  children,
  className,
  id,
  placeholder,
  style,
  whenCreated,
  whenReady,
  zoom,
  ...options
}: Props) {
  const [props] = useState({ className, id, style })

  const [context, setContext] = useState<LeafletContextInterface | null>(null)

  const mapRef = useCallback((node: HTMLDivElement | null) => {
    if (node !== null && context === null) {
      const map = new LeafletMap(node, options)
      if (center != null && zoom != null) {
        map.setView(center, zoom)
      } else if (bounds != null) {
        map.fitBounds(bounds, boundsOptions)
      }
      if (whenReady != null) {
        map.whenReady(whenReady)
      }
      setContext({ __version: CONTEXT_VERSION, map })
      if (whenCreated != null) {
        whenCreated(map)
      }
    }
  }, [])

  const contents = context ? (
    <LeafletProvider value={context}>{children}</LeafletProvider>
  ) : (
    placeholder ?? null
  )
  return (
    <div {...props} ref={mapRef}>
      {contents}
    </div>
  )
}
