import React, { PropTypes } from 'react';
import { layerGroup, Map } from 'leaflet';

import MapLayer from './MapLayer';

export default class LayerGroup extends MapLayer {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    map: PropTypes.instanceOf(Map),
  };

  componentWillMount() {
    super.componentWillMount();
    this.leafletElement = layerGroup();
  }

  render() {
    const children = React.Children.map(this.props.children, child => {
      return child ? React.cloneElement(child, {
        layerGroup: this.leafletElement,
        map: this.props.map,
      }) : null;
    });

    return <div style={{display: 'none'}}>{children}</div>;
  }
}
