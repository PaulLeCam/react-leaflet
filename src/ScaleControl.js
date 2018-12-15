// @flow

import { Control } from 'leaflet'

import { withLeaflet } from './context'
import MapControl from './MapControl'
import type { MapControlProps } from './types'

type LeafletElement = Control.Scale
type Props = {
  imperial?: boolean,
  maxWidth?: number,
  metric?: boolean,
  updateWhenIdle?: boolean,
} & MapControlProps

class ScaleControl extends MapControl<LeafletElement, Props> {
  createLeafletElement(props: Props): LeafletElement {
    return new Control.Scale(props)
  }
}

export default withLeaflet<Props, ScaleControl>(ScaleControl)
