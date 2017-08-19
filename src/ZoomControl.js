// @flow

import { Control } from 'leaflet'
import PropTypes from 'prop-types'

import MapControl from './MapControl'
import controlPositionType from './propTypes/controlPosition'
import type { ControlPosition } from './types'

type LeafletElement = Control.Zoom
type Props = {
  position?: ControlPosition,
  zoomInText?: string,
  zoomInTitle?: string,
  zoomOutText?: string,
  zoomOutTitle?: string,
}

export default class ZoomControl extends MapControl<LeafletElement, Props> {
  static propTypes = {
    position: controlPositionType,
    zoomInText: PropTypes.string,
    zoomInTitle: PropTypes.string,
    zoomOutText: PropTypes.string,
    zoomOutTitle: PropTypes.string,
  }

  createLeafletElement(props: Props): LeafletElement {
    return new Control.Zoom(props)
  }
}
