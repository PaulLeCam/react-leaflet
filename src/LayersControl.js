import { control, Map } from 'leaflet';
import { assign } from 'lodash';
import React, { cloneElement, Children, Component, PropTypes } from 'react';
import warning from 'warning';

import childrenType from './types/children';
import layerContainerType from './types/layerContainer';

import MapControl from './MapControl';

const controlledLayerPropTypes = {
  addBaseLayer: PropTypes.func,
  addOverlay: PropTypes.func,
  checked: PropTypes.bool,
  children: PropTypes.node.isRequired,
  map: PropTypes.instanceOf(Map),
  name: PropTypes.string.isRequired,
  removeLayer: PropTypes.func,
};

// Abtract class for layer container, extended by BaseLayer and Overlay
class ControlledLayer extends Component {
  static propTypes = controlledLayerPropTypes;

  componentWillReceiveProps({ checked, map }) {
    // Handle dynamically (un)checking the layer => adding/removing from the map
    if (checked && !this.props.checked) {
      map.addLayer(this.layer);
    }
    else if (this.props.checked && !checked) {
      map.removeLayer(this.layer);
    }
  }

  removeLayer(layer) {
    this.props.removeLayer(layer);
  }

  render() {
    return cloneElement(Children.only(this.props.children), {
      // Proxy layer container method calls to local methods
      layerContainer: {
        addLayer: ::this.addLayer,
        removeLayer: ::this.removeLayer,
      },
      map: this.props.map,
    });
  }
}

class BaseLayer extends ControlledLayer {
  static propTypes = controlledLayerPropTypes;

  addLayer(layer) {
    this.layer = layer; // Keep layer reference to handle dynamic changes of props
    const { addBaseLayer, checked, name } = this.props;
    addBaseLayer(layer, name, checked);
  }
}

class Overlay extends ControlledLayer {
  static propTypes = controlledLayerPropTypes;

  addLayer(layer) {
    this.layer = layer; // Keep layer reference to handle dynamic changes of props
    const { addOverlay, checked, name } = this.props;
    addOverlay(layer, name, checked);
  }
}

export default class LayersControl extends MapControl {
  static propTypes = {
    baseLayers: PropTypes.object,
    children: childrenType,
    layerContainer: layerContainerType,
    map: PropTypes.instanceOf(Map),
    overlays: PropTypes.object,
  };

  componentWillMount() {
    const {
      baseLayers,
      children: _children,
      layerContainer: _lc,
      map: _map,
      overlays,
      ...options,
    } = this.props;

    // Pre-v0.11 behavior, warn in v0.11, remove in v0.12
    this.legacy = !!(baseLayers || overlays);

    if (this.legacy) {
      warning(false, 'The "baseLayers" and "overlays" properties for "LayersControl" are deprecated and will be removed in the next version. You should use the "LayersControl.BaseLayer" and "LayersControl.Overlay" instead, see the documentation for more information.')
      this.leafletElement = control.layers(baseLayers, overlays, options);
    }
    else {
      this.leafletElement = control.layers(undefined, undefined, options);
      this.controlProps = {
        addBaseLayer: ::this.addBaseLayer,
        addOverlay: ::this.addOverlay,
        removeLayer: ::this.removeLayer,
      };
    }
  }

  addBaseLayer(layer, name, checked = false) {
    if (checked) {
      this.props.map.addLayer(layer);
    }
    this.leafletElement.addBaseLayer(layer, name);
  }

  addOverlay(layer, name, checked = false) {
    if (checked) {
      this.props.map.addLayer(layer);
    }
    this.leafletElement.addOverlay(layer, name);
  }

  removeLayer(layer) {
    this.props.map.removeLayer(layer);
  }

  getClonedChildrenWithProps(extra) {
    const { children, layerContainer, map } = this.props;
    const props = assign({layerContainer, map}, extra);

    return Children.map(children, child => {
      return child ? cloneElement(child, props) : null;
    });
  }

  render() {
    if (this.legacy) {
      return null;
    }

    const children = this.getClonedChildrenWithProps(this.controlProps);
    return <div style={{display: 'none'}}>{children}</div>;
  }
}

LayersControl.BaseLayer = BaseLayer;
LayersControl.Overlay = Overlay;
