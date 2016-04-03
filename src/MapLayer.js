import { assign } from 'lodash';
import React, { cloneElement, Children, PropTypes } from 'react';
import { Map } from 'leaflet';

import childrenType from './types/children';
import layerContainerType from './types/layerContainer';

import MapComponent from './MapComponent';

export default class MapLayer extends MapComponent {
  static propTypes = {
    children: childrenType,
    layerContainer: layerContainerType,
    map: PropTypes.instanceOf(Map),
  };

  componentDidMount() {
    super.componentDidMount();
    this.props.layerContainer.addLayer(this.leafletElement);
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    this.props.layerContainer.removeLayer(this.leafletElement);
  }

  getClonedChildrenWithProps(extra) {
    const { children, map, layerContainer } = this.props;
    const props = assign({map, layerContainer}, extra);

    return Children.map(children, child => {
      return child ? cloneElement(child, props) : null;
    });
  }

  renderChildrenWithProps(props) {
    const children = this.getClonedChildrenWithProps(props);
    return <div style={{display: 'none'}}>{children}</div>;
  }
}
