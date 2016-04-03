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
  children: PropTypes.node.isRequired,
  layerContainer: layerContainerType,
  name: PropTypes.string.isRequired,
  removeLayer: PropTypes.func,
};

class ControlledLayer extends Component {
  static propTypes = controlledLayerPropTypes;

  componentWillUnmount() {
    this.props.removeLayer(this.layer);
  }

  render() {
    const { children, layerContainer } = this.props;
    return cloneElement(Children.only(children), {
      layerContainer,
      ref: e => {
        this.layer = e.leafletElement;
      },
    });
  }
}

class BaseLayer extends ControlledLayer {
  static propTypes = controlledLayerPropTypes;

  componentDidMount() {
    const { addBaseLayer, name } = this.props;
    addBaseLayer(this.layer, name);
  }
}

class Overlay extends ControlledLayer {
  static propTypes = controlledLayerPropTypes;

  componentDidMount() {
    const { addOverlay, name } = this.props;
    addOverlay(this.layer, name);
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

    this.legacy = !!(baseLayers || overlays);

    if (this.legacy) {
      warning(false, 'The "baseLayers" and "overlays" properties for "LayersControl" are deprecated and will be removed in the next version. You should use the "LayersControl.BaseLayer" and "LayersControl.Overlay" instead, see the documentation for more information.')
      this.leafletElement = control.layers(baseLayers, overlays, options);
    }
    else {
      this.leafletElement = control.layers(undefined, undefined, options);
      this.controlProps = {
        addBaseLayer: this.leafletElement.addBaseLayer.bind(this.leafletElement),
        addOverlay: this.leafletElement.addOverlay.bind(this.leafletElement),
        removeLayer: this.leafletElement.removeLayer.bind(this.leafletElement),
      };
    }
  }

  getClonedChildrenWithProps(extra) {
    const { children, map, layerContainer } = this.props;
    const props = assign({map, layerContainer}, extra);

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
