// @flow

import MapEvented from './MapEvented'
import type { MapComponentProps } from './types'

export default class MapComponent<
  LeafletElement,
  Props: MapComponentProps,
> extends MapEvented<LeafletElement, Props> {
  getOptions(props: Props): Props {
    if (props.pane != null) {
      return props
    }
    if (props.leaflet != null && props.leaflet.pane != null) {
      return { ...props, pane: props.leaflet.pane }
    }
    return props
  }
}
