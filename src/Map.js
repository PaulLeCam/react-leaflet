import isArray from "lodash/lang/isArray";
import uniqueId from "lodash/utility/uniqueId";

import React from "react/addons";
import Leaflet from "leaflet";

import boundsType from "./types/bounds";
import latlngType from "./types/latlng";

import elementMixin from "./mixins/element";

let normalizeCenter = pos => isArray(pos) ? pos : [pos.lat, pos.lng || pos.lon];

let Map = React.createClass({
  displayName: "Map",

  mixins: [elementMixin],

  statics: {
    uid() {
      return uniqueId("map");
    }
  },

  propTypes: {
    center: latlngType,
    id: React.PropTypes.string,
    maxBounds: boundsType,
    maxZoom: React.PropTypes.number,
    minZoom: React.PropTypes.number,
    zoom: React.PropTypes.number
  },

  getInitialState() {
    return {
      id: this.props.id || Map.uid()
    };
  },

  componentDidMount() {
    this._leafletElement = Leaflet.map(this.state.id, this.props);
    this.bindEvents(this._leafletEvents);
    this.setState({map: this._leafletElement});
  },

  shouldUpdateCenter(next, prev) {
    if (!prev) return true;
    next = normalizeCenter(next);
    prev = normalizeCenter(prev);
    return next[0] !== prev[0] || next[1] !== prev[1];
  },

  componentDidUpdate(prevProps) {
    let {center, zoom} = this.props;
    if (center && this.shouldUpdateCenter(center, prevProps.center)) {
      this.getLeafletElement().setView(center, zoom, {animate: false});
    }
    else if (zoom && zoom !== prevProps.zoom) {
      this.getLeafletElement().setZoom(zoom);
    }
  },

  componentWillUnmount() {
    this.getLeafletElement().remove();
  },

  render() {
    let map = this.getLeafletElement();
    let children = map ? React.Children.map(this.props.children, child => {
      return child ? React.addons.cloneWithProps(child, {map}) : null;
    }) : null;

    return <div className={this.props.className} id={this.state.id}>{children}</div>;
  }
});

export default Map;
