import {
  createLeafletContext,
  LeafletContext,
  type LeafletContextInterface,
} from '@react-leaflet/core'
import {
  type FitBoundsOptions,
  type LatLngBoundsExpression,
  Map as LeafletMap,
  type MapOptions,
} from 'leaflet'
import {
  type CSSProperties,
  forwardRef,
  type ReactNode,
  type Ref,
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

export type MapRef = LeafletMap | null

export interface MapContainerProps extends MapOptions {
  bounds?: LatLngBoundsExpression
  boundsOptions?: FitBoundsOptions
  children?: ReactNode
  className?: string
  id?: string
  placeholder?: ReactNode
  style?: CSSProperties
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
    zoom,
    ...options
  }: Props,
  forwardedRef: Ref<MapRef>,
) {
  const [props] = useState({ className, id, style })
  const [context, setContext] = useState<LeafletContextInterface | null>(null)
  const mapInstanceRef = useRef<LeafletMap>(undefined)
  useImperativeHandle<MapRef, MapRef>(
    forwardedRef,
    () => context?.map ?? null,
    [context],
  )

  // biome-ignore lint/correctness/useExhaustiveDependencies: ref callback
  const mapRef = useCallback((node: HTMLDivElement | null) => {
    if (node !== null && !mapInstanceRef.current) {
      const map = new LeafletMap(node, options)
      mapInstanceRef.current = map
      if (center != null && zoom != null) {
        map.setView(center, zoom)
      } else if (bounds != null) {
        map.fitBounds(bounds, boundsOptions)
      }
      setContext(createLeafletContext(map))
    }
  }, [])

  useLayoutEffect(() => {
    return () => {
      const map = context?.map
      // @ts-expect-error map internals
      const containerId = map?._containerId
      // @ts-expect-error map internals
      const containerLeafletId = map?._container?._leaflet_id
      if (
        map != null &&
        containerId != null &&
        containerId === containerLeafletId
      ) {
        map.remove()
      }
    }
  }, [context])

  const contents = context ? (
    <LeafletContext value={context}>{children}</LeafletContext>
  ) : (
    (placeholder ?? null)
  )
  return (
    <div {...props} ref={mapRef}>
      {contents}
    </div>
  )
}

export const MapContainer = forwardRef(MapContainerComponent)
