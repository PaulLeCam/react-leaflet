// @flow

import { control } from 'leaflet'
import PropTypes from 'prop-types'
import React, { cloneElement, Component, Children } from 'react'

import childrenType from './propTypes/children'
import controlPositionType from './propTypes/controlPosition'
import layerContainerType from './propTypes/layerContainer'
import mapType from './propTypes/map'

import MapControl from './MapControl'

const baseControlledLayerPropTypes = {
  checked: PropTypes.bool,
  children: PropTypes.node.isRequired,
  removeLayer: PropTypes.func,
  removeLayerControl: PropTypes.func,
}

const controlledLayerPropTypes = {
  ...baseControlledLayerPropTypes,
  addBaseLayer: PropTypes.func,
  addOverlay: PropTypes.func,
  name: PropTypes.string.isRequired,
}

// Abtract class for layer container, extended by BaseLayer and Overlay
class ControlledLayer extends Component {
  static propTypes = baseControlledLayerPropTypes

  static contextTypes = {
    map: mapType,
  }

  static childContextTypes = {
    layerContainer: layerContainerType,
  }

  layer: ?Object

  getChildContext() {
    return {
      layerContainer: {
        addLayer: this.addLayer.bind(this),
        removeLayer: this.removeLayer.bind(this),
      },
    }
  }

  componentWillReceiveProps({ checked }) {
    // Handle dynamically (un)checking the layer => adding/removing from the map
    if (checked && !this.props.checked) {
      this.context.map.addLayer(this.layer)
    } else if (this.props.checked && !checked) {
      this.context.map.removeLayer(this.layer)
    }
  }

  componentWillUnmount() {
    this.props.removeLayerControl(this.layer)
  }

  addLayer() {
    throw new Error('Must be implemented in extending class')
  }

  removeLayer(layer) {
    this.props.removeLayer(layer)
  }

  render() {
    return this.props.children || null
  }
}

class BaseLayer extends ControlledLayer {
  static propTypes = controlledLayerPropTypes

  addLayer(layer) {
    this.layer = layer // Keep layer reference to handle dynamic changes of props
    const { addBaseLayer, checked, name } = this.props
    addBaseLayer(layer, name, checked)
  }
}

class Overlay extends ControlledLayer {
  static propTypes = controlledLayerPropTypes

  addLayer(layer) {
    this.layer = layer // Keep layer reference to handle dynamic changes of props
    const { addOverlay, checked, name } = this.props
    addOverlay(layer, name, checked)
  }
}

export default class LayersControl extends MapControl {
  static BaseLayer: any
  static Overlay: any

  static propTypes = {
    baseLayers: PropTypes.object,
    children: childrenType,
    overlays: PropTypes.object,
    position: controlPositionType,
  }

  static contextTypes = {
    layerContainer: layerContainerType,
    map: mapType,
  }

  controlProps: {
    addBaseLayer: (layer: Object, name: string, checked: boolean) => void,
    addOverlay: (layer: Object, name: string, checked: boolean) => void,
    removeLayer: (layer: Object) => void,
    removeLayerControl: (layer: Object) => void,
  }

  createLeafletElement(props: Object): Object {
    const { children: _children, ...options } = props
    return control.layers(undefined, undefined, options)
  }

  componentWillMount() {
    super.componentWillMount()
    this.controlProps = {
      addBaseLayer: this.addBaseLayer.bind(this),
      addOverlay: this.addOverlay.bind(this),
      removeLayer: this.removeLayer.bind(this),
      removeLayerControl: this.removeLayerControl.bind(this),
    }
  }

  componentWillUnmount() {
    setTimeout(() => {
      super.componentWillUnmount()
    }, 0)
  }

  addBaseLayer(layer: Object, name: string, checked: boolean = false) {
    if (checked) {
      this.context.map.addLayer(layer)
    }
    this.leafletElement.addBaseLayer(layer, name)
  }

  addOverlay(layer: Object, name: string, checked: boolean = false) {
    if (checked) {
      this.context.map.addLayer(layer)
    }
    this.leafletElement.addOverlay(layer, name)
  }

  removeLayer(layer: Object) {
    this.context.map.removeLayer(layer)
  }

  removeLayerControl(layer: Object) {
    this.leafletElement.removeLayer(layer)
  }

  render(): null | React.Element<*> {
    const children = Children.map(this.props.children, child => {
      return child ? cloneElement(child, this.controlProps) : null
    })
    return <div style={{ display: 'none' }}>{children}</div>
  }
}

LayersControl.BaseLayer = BaseLayer
LayersControl.Overlay = Overlay
