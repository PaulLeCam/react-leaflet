import React from "react";
import Leaflet from "leaflet";

import boundsType from "./types/bounds";
import mapLayerMixin from "./mixins/mapLayer";

export default React.createClass({
  displayName: "ImageOverlay",

  mixins: [mapLayerMixin],

  propTypes: {
    url: React.PropTypes.string.isRequired,
    bounds: boundsType.isRequired,
    opacity: React.PropTypes.number,
    attribution: React.PropTypes.string
  },

  componentWillMount() {
    let {bounds, map, url, ...props} = this.props;
    this._leafletElement =  Leaflet.imageOverlay(url, bounds, props);
  },

  componentDidUpdate(prevProps) {
    if (this.props.url !== prevProps.url) {
      this.getLeafletElement().setUrl(this.props.url);
    }
    if (this.props.opacity !== prevProps.opacity) {
      this.getLeafletElement().setOpacity(this.props.opacity);
    }
  },

  render() {
    return null;
  }
});
