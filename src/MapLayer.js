import assign from 'lodash/assign';
import React, { PropTypes } from 'react';
import { Map } from 'leaflet';

import MapComponent from './MapComponent';

export default class MapLayer extends MapComponent {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    map: PropTypes.instanceOf(Map),
  };

  componentDidMount() {
    super.componentDidMount();
    (this.props.layerGroup || this.props.map).addLayer(this.leafletElement);
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    (this.props.layerGroup || this.props.map).removeLayer(this.leafletElement);
  }

  getClonedChildrenWithMap(extra) {
    const { children, map } = this.props;
    const props = assign({map}, extra);

    return React.Children.map(children, child => {
      return child ? React.cloneElement(child, props) : null;
    });
  }

  renderChildrenWithProps(props) {
    const children = this.getClonedChildrenWithMap(props);
    return <div style={{display: 'none'}}>{children}</div>;
  }
}
