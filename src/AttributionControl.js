// @flow

import { Control } from 'leaflet'

import { withLeaflet } from './context'
import MapControl from './MapControl'
import type { MapControlProps } from './types'

type LeafletElement = Control.Attribution
type Props = {
  prefix?: string,
} & MapControlProps

class AttributionControl extends MapControl<LeafletElement, Props> {
  createLeafletElement(props: Props): LeafletElement {
    return new Control.Attribution(props)
  }
}

export default withLeaflet<Props, AttributionControl>(AttributionControl)
