import {
  LeafletProvider,
  type LeafletContextInterface,
  createLeafletContext,
} from '@react-leaflet/core'
import {
  type FitBoundsOptions,
  type LatLngBoundsExpression,
  Map as LeafletMap,
  type MapOptions,
  type DragEndEventHandlerFn,
  type ErrorEventHandlerFn,
  type LayerEventHandlerFn,
  type LayersControlEventHandlerFn,
  type LeafletEventHandlerFn,
  type LeafletEventHandlerFnMap,
  type LeafletKeyboardEventHandlerFn,
  type LeafletMouseEventHandlerFn,
  type LocationEventHandlerFn,
  type PopupEventHandlerFn,
  type ResizeEventHandlerFn,
  type TileErrorEventHandlerFn,
  type TileEventHandlerFn,
  type TooltipEventHandlerFn,
  type ZoomAnimEventHandlerFn,
} from 'leaflet'
import React, {
  type CSSProperties,
  type ReactNode,
  type Ref,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'

export interface CamelLeafletEventHandlerFnMap {
  onBaseLayerChange?: LayersControlEventHandlerFn | undefined;
  onOverlayAdd?: LayersControlEventHandlerFn | undefined;
  onOverlayRemove?: LayersControlEventHandlerFn | undefined;

  onLayerAdd?: LayerEventHandlerFn | undefined;
  onLayerRemove?: LayerEventHandlerFn | undefined;

  onZoomLevelsChange?: LeafletEventHandlerFn | undefined;
  onUnload?: LeafletEventHandlerFn | undefined;
  onViewReset?: LeafletEventHandlerFn | undefined;
  onLoad?: LeafletEventHandlerFn | undefined;
  onZoomStart?: LeafletEventHandlerFn | undefined;
  onMoveStart?: LeafletEventHandlerFn | undefined;
  onZoom?: LeafletEventHandlerFn | undefined;
  onMove?: LeafletEventHandlerFn | undefined;
  onZoomEnd?: LeafletEventHandlerFn | undefined;
  onMoveEnd?: LeafletEventHandlerFn | undefined;
  onAutoPanStart?: LeafletEventHandlerFn | undefined;
  onDragStart?: LeafletEventHandlerFn | undefined;
  onDrag?: LeafletEventHandlerFn | undefined;
  onAdd?: LeafletEventHandlerFn | undefined;
  onRemove?: LeafletEventHandlerFn | undefined;
  onLoading?: LeafletEventHandlerFn | undefined;
  onError?: LeafletEventHandlerFn | undefined;
  onUpdate?: LeafletEventHandlerFn | undefined;
  onDown?: LeafletEventHandlerFn | undefined;
  onPreDrag?: LeafletEventHandlerFn | undefined;

  onResize?: ResizeEventHandlerFn | undefined;

  onPopupOpen?: PopupEventHandlerFn | undefined;
  onPopupClose?: PopupEventHandlerFn | undefined;

  onTooltipOpen?: TooltipEventHandlerFn | undefined;
  onTooltipClose?: TooltipEventHandlerFn | undefined;

  onLocationError?: ErrorEventHandlerFn | undefined;

  onLocationFound?: LocationEventHandlerFn | undefined;

  onClick?: LeafletMouseEventHandlerFn | undefined;
  onDblClick?: LeafletMouseEventHandlerFn | undefined;
  onMouseDown?: LeafletMouseEventHandlerFn | undefined;
  onMouseUp?: LeafletMouseEventHandlerFn | undefined;
  onMouseOver?: LeafletMouseEventHandlerFn | undefined;
  onMouseOut?: LeafletMouseEventHandlerFn | undefined;
  onMouseMove?: LeafletMouseEventHandlerFn | undefined;
  onContextMenu?: LeafletMouseEventHandlerFn | undefined;
  onPreClick?: LeafletMouseEventHandlerFn | undefined;

  onKeyPress?: LeafletKeyboardEventHandlerFn | undefined;
  onKeyDown?: LeafletKeyboardEventHandlerFn | undefined;
  onKeyUp?: LeafletKeyboardEventHandlerFn | undefined;

  onZoomAnim?: ZoomAnimEventHandlerFn | undefined;

  onDragEnd?: DragEndEventHandlerFn | undefined;

  onTileUnload?: TileEventHandlerFn | undefined;
  onTileLoadStart?: TileEventHandlerFn | undefined;
  onTileLoad?: TileEventHandlerFn | undefined;
  onTileAbort?: TileEventHandlerFn | undefined;

  onTileError?: TileErrorEventHandlerFn | undefined;

  // [name: string]: any;
  // You are able add additional properties, but it makes this interface uncheckable.
}

export interface MapContainerProps extends MapOptions, CamelLeafletEventHandlerFnMap {
  bounds?: LatLngBoundsExpression
  boundsOptions?: FitBoundsOptions
  children?: ReactNode
  className?: string
  id?: string
  placeholder?: ReactNode
  style?: CSSProperties
  whenReady?: () => void
}

const reg = /^on[A-Z]/

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
    ...optionsAndEventHandlers
  }: Props,
  forwardedRef: Ref<LeafletMap | null>,
) {
  const [props] = useState({ className, id, style })
  const [context, setContext] = useState<LeafletContextInterface | null>(null)
  const eventHandlers: LeafletEventHandlerFnMap = {}
  const options = { ...optionsAndEventHandlers } as Omit<Props, "bounds" | "zoom" | "boundsOptions" | "center" | "children" | "className" | "id" | "placeholder" | "style" | "whenReady" | keyof CamelLeafletEventHandlerFnMap>

  Object.keys(optionsAndEventHandlers).forEach((key) => {
    if (reg.test(key)) {
      eventHandlers[key.slice(2).toLowerCase() as keyof LeafletEventHandlerFnMap] = optionsAndEventHandlers[key as keyof CamelLeafletEventHandlerFnMap] as any
      delete options[key as keyof typeof options]
    }
  })

  useImperativeHandle(forwardedRef, () => context?.map ?? null, [context])

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
      setContext(createLeafletContext(map))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    return () => {
      context?.map.remove()
    }
  }, [context])

  useEffect(() => {
    context?.map.on(eventHandlers)
    return () => {
      context?.map.off(eventHandlers)
    }
  }, [context?.map, eventHandlers])

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

export const MapContainer = forwardRef(MapContainerComponent)
