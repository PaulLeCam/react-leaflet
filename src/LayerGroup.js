/* @flow */

import { layerGroup } from 'leaflet'

import layerContainerType from './types/layerContainer'
import paneType from './types/pane'

import MapLayer from './MapLayer'

export default class LayerGroup extends MapLayer {
  static childContextTypes = {
    layerContainer: layerContainerType,
  };

  static contextTypes = {
    ...MapLayer.contextTypes,
    pane: paneType,
  };

  getChildContext () {
    return {
      layerContainer: this.leafletElement,
    }
  }

  componentWillMount () {
    super.componentWillMount()
    this.leafletElement = layerGroup({
      pane: this.context.pane,
    })
  }
}
