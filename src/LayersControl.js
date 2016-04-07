import { control, Map } from 'leaflet';
import { assign } from 'lodash';
import React, { cloneElement, Children, Component, PropTypes } from 'react';
import warning from 'warning';

import childrenType from './types/children';
import layerContainerType from './types/layerContainer';

import MapControl from './MapControl';

const controlledLayerPropTypes = {
  addBaseLayer: PropTypes.func.isRequired,
  addOverlay: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  map: PropTypes.instanceOf(Map).isRequired,
  name: PropTypes.string.isRequired,
  removeLayer: PropTypes.func.isRequired,
};

class ControlledLayer extends Component {
  static propTypes = controlledLayerPropTypes;

  removeLayer(layer) {
    this.props.removeLayer(layer);
  }

  render() {
    const { children, map } = this.props;
    const child = cloneElement(Children.only(this.props.children), { map, layerContainer: this });
    return (
      <div style={{display:'none'}}>{child}</div>
    );
  }
}

class BaseLayer extends ControlledLayer {
  addLayer(layer) {
    const { addBaseLayer, name, defaultAdded } = this.props;
    addBaseLayer(layer, name, defaultAdded);
  }
}

class Overlay extends ControlledLayer {
  addLayer(layer) {
    const { addOverlay, name, defaultAdded } = this.props;
    addOverlay(layer, name, defaultAdded);
  }
}

export default class LayersControl extends MapControl {
  static propTypes = {
    baseLayers: PropTypes.object,
    children: childrenType,
    map: PropTypes.instanceOf(Map).isRequired,
    overlays: PropTypes.object,
  };

  addBaseLayer(layer, name, defaultAdded) {
    if (defaultAdded) {
      this.map.addLayer(layer); // The L.control.layers can only control layers in the map, and not in LayerGroup or FeatureGroup
    }
    this.leafletElement.addBaseLayer(layer, name);
  }

  addOverlay(layer, name, defaultAdded) {
    if (defaultAdded) {
      this.map.addLayer(layer);
    }
    this.leafletElement.addOverlay(layer, name);
  }

  removeLayer(layer) {
    this.leafletElement.removeLayer(layer);
    this.map.removeLayer(layer);
  }
  
  componentWillMount() {
    const {
      baseLayers,
      children: _children,
      layerContainer: _lc,
      map: _map,
      overlays,
      ...options,
    } = this.props;

    this.legacy = !!(baseLayers || overlays);

    if (this.legacy) {
      warning(false, 'The "baseLayers" and "overlays" properties for "LayersControl" are deprecated and will be removed in the next version. You should use the "LayersControl.BaseLayer" and "LayersControl.Overlay" instead, see the documentation for more information.')
      this.leafletElement = control.layers(baseLayers, overlays, options);
    }
    else {
      this.leafletElement = control.layers(undefined, undefined, options);
      this.controlProps = {
        addBaseLayer: this.addBaseLayer.bind(this),
        addOverlay: this.addOverlay.bind(this),
        removeLayer: this.removeLayer.bind(this)
      };
    }
  }

  getClonedChildrenWithProps(extra) {
    const { children, map } = this.props;
    const props = assign({map}, extra);

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
