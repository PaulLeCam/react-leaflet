// @flow

import { Control } from 'leaflet'

import { withLeaflet } from './context'
import MapControl from './MapControl'
import type { MapControlProps } from './types'

type LeafletElement = Control.Zoom
type Props = {
  zoomInText?: string,
  zoomInTitle?: string,
  zoomOutText?: string,
  zoomOutTitle?: string,
} & MapControlProps

class ZoomControl extends MapControl<LeafletElement, Props> {
  createLeafletElement(props: Props): LeafletElement {
    return new Control.Zoom(props)
  }
}

export default withLeaflet<Props, ZoomControl>(ZoomControl)
