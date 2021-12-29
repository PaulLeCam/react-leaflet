import type { LayerOptions } from 'leaflet'

import type { LeafletContextInterface } from './context.js'

export function withPane<P extends LayerOptions>(
  props: P,
  context: LeafletContextInterface,
): P {
  const pane = props.pane ?? context.pane
  return pane ? { ...props, pane } : props
}
