/* @flow */

import { control } from 'leaflet'
import React, { cloneElement, Children, Component, PropTypes } from 'react'

import childrenType from './types/children'
import layerContainerType from './types/layerContainer'
import mapType from './types/map'

import MapControl from './MapControl'

const controlledLayerPropTypes = {
  addBaseLayer: PropTypes.func,
  addOverlay: PropTypes.func,
  checked: PropTypes.bool,
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  removeLayer: PropTypes.func,
  removeLayerControl: PropTypes.func,
}

// Abtract class for layer container, extended by BaseLayer and Overlay
class ControlledLayer extends Component {
  layer: ?Object;

  static propTypes = controlledLayerPropTypes;

  static contextTypes = {
    map: mapType,
  };

  static childContextTypes = {
    layerContainer: layerContainerType,
  };

  getChildContext () {
    return {
      layerContainer: {
        addLayer: this.addLayer.bind(this),
        removeLayer: this.removeLayer.bind(this),
      },
    }
  }

  componentWillReceiveProps ({ checked }) {
    // Handle dynamically (un)checking the layer => adding/removing from the map
    if (checked && !this.props.checked) {
      this.context.map.addLayer(this.layer)
    } else if (this.props.checked && !checked) {
      this.context.map.removeLayer(this.layer)
    }
  }

  componentWillUnmount () {
    this.props.removeLayerControl(this.layer)
  }

  addLayer () {
    throw new Error('Must be implemented in extending class')
  }

  removeLayer (layer) {
    this.props.removeLayer(layer)
  }

  render () {
    return this.props.children || null
  }
}

class BaseLayer extends ControlledLayer {
  static propTypes = controlledLayerPropTypes;

  addLayer (layer) {
    this.layer = layer // Keep layer reference to handle dynamic changes of props
    const { addBaseLayer, checked, name } = this.props
    addBaseLayer(layer, name, checked)
  }
}

class Overlay extends ControlledLayer {
  static propTypes = controlledLayerPropTypes;

  addLayer (layer) {
    this.layer = layer // Keep layer reference to handle dynamic changes of props
    const { addOverlay, checked, name } = this.props
    addOverlay(layer, name, checked)
  }
}

export default class LayersControl extends MapControl {
  static BaseLayer: any;
  static Overlay: any;

  static propTypes = {
    baseLayers: PropTypes.object,
    children: childrenType,
    overlays: PropTypes.object,
  };

  static contextTypes = {
    layerContainer: layerContainerType,
    map: mapType,
  };

  controlProps: {
    addBaseLayer: Function,
    addOverlay: Function,
    removeLayer: Function,
    removeLayerControl: Function,
  };

  componentWillMount () {
    const { children: _children, ...options } = this.props
    this.leafletElement = control.layers(undefined, undefined, options)
    this.controlProps = {
      addBaseLayer: this.addBaseLayer.bind(this),
      addOverlay: this.addOverlay.bind(this),
      removeLayer: this.removeLayer.bind(this),
      removeLayerControl: this.removeLayerControl.bind(this),
    }
  }

  componentWillUnmount () {
    setTimeout(() => {
      super.componentWillUnmount()
    }, 0)
  }

  addBaseLayer (layer: Object, name: string, checked: boolean = false) {
    if (checked) {
      this.context.map.addLayer(layer)
    }
    this.leafletElement.addBaseLayer(layer, name)
  }

  addOverlay (layer: Object, name: string, checked: boolean = false) {
    if (checked) {
      this.context.map.addLayer(layer)
    }
    this.leafletElement.addOverlay(layer, name)
  }

  removeLayer (layer: Object) {
    this.context.map.removeLayer(layer)
  }

  removeLayerControl (layer: Object) {
    this.leafletElement.removeLayer(layer)
  }

  render (): any {
    const children = Children.map(this.props.children, child => {
      return child ? cloneElement(child, this.controlProps) : null
    })
    return <div style={{display: 'none'}}>{children}</div>
  }
}

LayersControl.BaseLayer = BaseLayer
LayersControl.Overlay = Overlay
