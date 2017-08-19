// @flow

import { Control } from 'leaflet'
import PropTypes from 'prop-types'

import MapControl from './MapControl'
import controlPosition from './propTypes/controlPosition'
import type { ControlPosition } from './types'

type LeafletElement = Control.Attribution
type Props = {
  position?: ControlPosition,
  prefix?: string,
}

export default class AttributionControl extends MapControl<
  LeafletElement,
  Props,
> {
  static propTypes = {
    position: controlPosition,
    prefix: PropTypes.string,
  }

  createLeafletElement(props: Props): LeafletElement {
    return new Control.Attribution(props)
  }
}
