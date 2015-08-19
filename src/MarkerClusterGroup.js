import React from 'react';
import MapLayer from './MapLayer';
import { markerClusterGroup } from 'leaflet';

export default class MarkerClusterGroup extends MapLayer {
  componentDidMount() {
    super.componentDidMount();
    (this.props.layerGroup || this.props.map).addLayer(this.leafletElement);
  }

  componentWillMount() {
    super.componentWillMount();
    const { map, ...props } = this.props;
    this.leafletElement = markerClusterGroup(props);
  }

  render() {
    const layerGroup = this.leafletElement;
    const map = this.props.map;
    const children = React.Children.map(this.props.children, child => {
      return child ? React.cloneElement(child, {map, layerGroup}) : null;
    });

    return <div>{children}</div>;
  }
}
