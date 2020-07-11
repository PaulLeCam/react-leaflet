import { GridLayer, GridLayerOptions } from 'leaflet'

export function updateGridLayer<
  E extends GridLayer,
  P extends GridLayerOptions
>(layer: E, props: P, prevProps: P) {
  const { opacity, zIndex } = props
  if (opacity != null && opacity !== prevProps.opacity) {
    layer.setOpacity(opacity)
  }
  if (zIndex != null && zIndex !== prevProps.zIndex) {
    layer.setZIndex(zIndex)
  }
}
