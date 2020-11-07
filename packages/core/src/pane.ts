import { LayerOptions } from 'leaflet'

import { LeafletContextInterface } from './context'

export function withPane<P extends LayerOptions>(
  props: P,
  context: LeafletContextInterface,
): P {
  const pane = props.pane ?? context.pane
  return pane ? { ...props, pane } : props
}
