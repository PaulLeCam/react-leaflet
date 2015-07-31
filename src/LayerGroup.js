import React from 'react';
import Leaflet from 'leaflet';
import MapLayer from './MapLayer';
import { layerGroup } from 'leaflet';

export default class LayerGroup extends MapLayer {
  componentDidMount() {
    super.componentDidMount();
    (this.props.layerGroup || this.props.map).addLayer(this.leafletElement);
  }

  componentWillMount() {
    super.componentWillMount();
    const { map, ...props } = this.props;
    this.leafletElement = layerGroup();
  }

  render() {
    const layerGroup = this.leafletElement;
    const map = this.props.map
    const children = React.Children.map(this.props.children, child => {
      return child ? React.cloneElement(child, {map, layerGroup}) : null;
    });

    return <div>{children}</div>;
  }
}
