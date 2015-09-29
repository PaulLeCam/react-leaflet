import assign from 'lodash/object/assign';
import React from 'react';
import MapComponent from './MapComponent';

export default class MapLayer extends MapComponent {
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
}
