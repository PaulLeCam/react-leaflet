import { assign } from 'lodash';
import React, { PropTypes } from 'react';
import { Map } from 'leaflet';
import { layerContainer as layerContainerType } from './types';
import MapComponent from './MapComponent';

export default class MapLayer extends MapComponent {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    layerContainer: layerContainerType.isRequired,
    map: PropTypes.instanceOf(Map).isRequired,
  };

  componentDidMount() {
    super.componentDidMount();
    this.props.layerContainer.addLayer(this.leafletElement);
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    this.props.layerContainer.removeLayer(this.leafletElement);
  }

  getClonedChildrenWithMap(extra) {
    const { children, map, layerContainer } = this.props;
    const props = assign({map, layerContainer}, extra);

    return React.Children.map(children, child => {
      return child ? React.cloneElement(child, props) : null;
    });
  }

  renderChildrenWithProps(props) {
    const children = this.getClonedChildrenWithMap(props);
    return <div style={{display: 'none'}}>{children}</div>;
  }
}
