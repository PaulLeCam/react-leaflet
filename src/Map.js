import isArray from 'lodash/lang/isArray';
import uniqueId from 'lodash/utility/uniqueId';

import React, { PropTypes } from 'react';
import Leaflet from 'leaflet';

import boundsType from './types/bounds';
import latlngType from './types/latlng';

import MapComponent from './MapComponent';

const normalizeCenter = pos => isArray(pos) ? pos : [pos.lat, pos.lng || pos.lon];

export default class Map extends MapComponent {
  static propTypes = {
    center: latlngType,
    className: PropTypes.string,
    id: PropTypes.string,
    maxBounds: boundsType,
    maxZoom: PropTypes.number,
    minZoom: PropTypes.number,
    style: PropTypes.object,
    zoom: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.state = {
      id: props.id || uniqueId('map')
    };
  }

  componentDidMount() {
    this.leafletElement = Leaflet.map(this.state.id, this.props);
    super.componentDidMount();
    this.setState({map: this.leafletElement});
  }

  shouldUpdateCenter(next, prev) {
    if (!prev) return true;
    next = normalizeCenter(next);
    prev = normalizeCenter(prev);
    return next[0] !== prev[0] || next[1] !== prev[1];
  }

  componentDidUpdate(prevProps) {
    const { center, zoom } = this.props;
    if (center && this.shouldUpdateCenter(center, prevProps.center)) {
      this.leafletElement.setView(center, zoom, {animate: false});
    }
    else if (zoom && zoom !== prevProps.zoom) {
      this.leafletElement.setZoom(zoom);
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    this.leafletElement.remove();
  }

  render() {
    const map = this.leafletElement;
    const children = map ? React.Children.map(this.props.children, child => {
      return child ? React.cloneElement(child, {map}) : null;
    }) : null;

    return (
      <div className={this.props.className} id={this.state.id} style={this.props.style}>
        {children}
      </div>
    );
  }
}
