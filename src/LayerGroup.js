// @flow

import { LayerGroup as LeafletLayerGroup } from 'leaflet'

import MapLayer from './MapLayer'
import layerContainer from './propTypes/layerContainer'
import type { MapLayerProps } from './types'

export default class LayerGroup<
  LeafletElement: LeafletLayerGroup,
  Props: MapLayerProps,
> extends MapLayer<LeafletElement, Props> {
  static childContextTypes = {
    layerContainer: layerContainer,
  }

  getChildContext(): { layerContainer: LeafletElement } {
    return {
      layerContainer: this.leafletElement,
    }
  }

  createLeafletElement(): LeafletElement {
    return new LeafletLayerGroup(this.getOptions(this.props))
  }
}
