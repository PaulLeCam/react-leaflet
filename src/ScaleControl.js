// @flow

import { Control } from 'leaflet'
import PropTypes from 'prop-types'

import MapControl from './MapControl'
import controlPositionType from './propTypes/controlPosition'
import type { ControlPosition } from './types'

type LeafletElement = Control.Scale
type Props = {
  imperial?: boolean,
  maxWidth?: number,
  metric?: boolean,
  position?: ControlPosition,
  updateWhenIdle?: boolean,
}

export default class ScaleControl extends MapControl<LeafletElement, Props> {
  static propTypes = {
    imperial: PropTypes.bool,
    maxWidth: PropTypes.number,
    metric: PropTypes.bool,
    position: controlPositionType,
    updateWhenIdle: PropTypes.bool,
  }

  createLeafletElement(props: Props): LeafletElement {
    return new Control.Scale(props)
  }
}
