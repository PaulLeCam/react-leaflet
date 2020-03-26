import { GridLayer, GridLayerOptions } from 'leaflet'

export function updateGridLayer<E extends GridLayer>(
  layer: E,
  props: GridLayerOptions,
  prevProps: GridLayerOptions,
) {
  const { opacity, zIndex } = props
  if (opacity != null && opacity !== prevProps.opacity) {
    layer.setOpacity(opacity)
  }
  if (zIndex != null && zIndex !== prevProps.zIndex) {
    layer.setZIndex(zIndex)
  }
}
