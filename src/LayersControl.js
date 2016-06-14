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
}

// Abtract class for layer container, extended by BaseLayer and Overlay
class ControlledLayer extends Component {
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
        addLayer: ::this.addLayer,
        removeLayer: ::this.removeLayer,
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
  static propTypes = {
    baseLayers: PropTypes.object,
    children: childrenType,
    overlays: PropTypes.object,
  };

  static contextTypes = {
    layerContainer: layerContainerType,
    map: mapType,
  };

  componentWillMount () {
    const { children: _children, ...options } = this.props
    this.leafletElement = control.layers(undefined, undefined, options)
    this.controlProps = {
      addBaseLayer: ::this.addBaseLayer,
      addOverlay: ::this.addOverlay,
      removeLayer: ::this.removeLayer,
    }
  }

  addBaseLayer (layer, name, checked = false) {
    if (checked) {
      this.context.map.addLayer(layer)
    }
    this.leafletElement.addBaseLayer(layer, name)
  }

  addOverlay (layer, name, checked = false) {
    if (checked) {
      this.context.map.addLayer(layer)
    }
    this.leafletElement.addOverlay(layer, name)
  }

  removeLayer (layer) {
    this.context.map.removeLayer(layer)
  }

  render () {
    const children = Children.map(this.props.children, child => {
      return child ? cloneElement(child, this.controlProps) : null
    })
    return <div style={{display: 'none'}}>{children}</div>
  }
}

LayersControl.BaseLayer = BaseLayer
LayersControl.Overlay = Overlay
