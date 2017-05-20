// @flow

import { layerGroup } from 'leaflet'

import layerContainerType from './propTypes/layerContainer'

import MapLayer from './MapLayer'

export default class LayerGroup extends MapLayer {
  static childContextTypes = {
    layerContainer: layerContainerType,
  }

  getChildContext(): { layerContainer: Object } {
    return {
      layerContainer: this.leafletElement,
    }
  }

  createLeafletElement(): Object {
    return layerGroup(this.getOptions())
  }
}
