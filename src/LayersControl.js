// @flow

import { Control, type Layer } from 'leaflet'
import PropTypes from 'prop-types'
import React, {
  cloneElement,
  Component,
  Children,
  type ChildrenArray,
  type Element,
} from 'react'

import MapControl from './MapControl'
import children from './propTypes/children'
import controlPosition from './propTypes/controlPosition'
import layerContainer from './propTypes/layerContainer'
import map from './propTypes/map'
import type { ControlPosition } from './types'

type AddLayerHandler = (layer: Layer, name: string, checked?: boolean) => void
type RemoveLayerHandler = (layer: Layer) => void

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

type ControlledLayerProps = {
  addBaseLayer: AddLayerHandler,
  addOverlay: AddLayerHandler,
  checked?: boolean,
  children: Element<any>,
  name: string,
  removeLayer: RemoveLayerHandler,
  removeLayerControl: RemoveLayerHandler,
}

// Abtract class for layer container, extended by BaseLayer and Overlay
class ControlledLayer extends Component<ControlledLayerProps> {
  static propTypes = baseControlledLayerPropTypes

  static contextTypes = {
    map: map,
  }

  static childContextTypes = {
    layerContainer: layerContainer,
  }

  layer: ?Layer

  getChildContext() {
    return {
      layerContainer: {
        addLayer: this.addLayer.bind(this),
        removeLayer: this.removeLayer.bind(this),
      },
    }
  }

  componentWillReceiveProps({ checked }: ControlledLayerProps) {
    // Handle dynamically (un)checking the layer => adding/removing from the map
    if (
      checked === true &&
      (this.props.checked == null || this.props.checked === false)
    ) {
      this.context.map.addLayer(this.layer)
    } else if (
      this.props.checked === true &&
      (checked == null || checked === false)
    ) {
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

  addLayer(layer: Layer) {
    this.layer = layer // Keep layer reference to handle dynamic changes of props
    const { addBaseLayer, checked, name } = this.props
    addBaseLayer(layer, name, checked)
  }
}

class Overlay extends ControlledLayer {
  static propTypes = controlledLayerPropTypes

  addLayer(layer: Layer) {
    this.layer = layer // Keep layer reference to handle dynamic changes of props
    const { addOverlay, checked, name } = this.props
    addOverlay(layer, name, checked)
  }
}

type LeafletElement = Control.Layers
type LayersControlProps = {
  children: ChildrenArray<any>,
  position?: ControlPosition,
}

export default class LayersControl extends MapControl<
  LeafletElement,
  LayersControlProps,
> {
  static BaseLayer: typeof BaseLayer
  static Overlay: typeof Overlay

  static propTypes = {
    baseLayers: PropTypes.object,
    children: children,
    overlays: PropTypes.object,
    position: controlPosition,
  }

  static contextTypes: Object = {
    layerContainer: layerContainer,
    map: map,
  }

  controlProps: {
    addBaseLayer: AddLayerHandler,
    addOverlay: AddLayerHandler,
    removeLayer: RemoveLayerHandler,
    removeLayerControl: RemoveLayerHandler,
  }

  createLeafletElement(props: LayersControlProps): LeafletElement {
    const { children: _children, ...options } = props
    return new Control.Layers(undefined, undefined, options)
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

  addBaseLayer(layer: Layer, name: string, checked: boolean = false) {
    if (checked) {
      this.context.map.addLayer(layer)
    }
    this.leafletElement.addBaseLayer(layer, name)
  }

  addOverlay(layer: Layer, name: string, checked: boolean = false) {
    if (checked) {
      this.context.map.addLayer(layer)
    }
    this.leafletElement.addOverlay(layer, name)
  }

  removeLayer(layer: Layer) {
    this.context.map.removeLayer(layer)
  }

  removeLayerControl(layer: Layer) {
    this.leafletElement.removeLayer(layer)
  }

  render() {
    const children = Children.map(this.props.children, child => {
      return child ? cloneElement(child, this.controlProps) : null
    })
    return <div style={{ display: 'none' }}>{children}</div>
  }
}

LayersControl.BaseLayer = BaseLayer
LayersControl.Overlay = Overlay
