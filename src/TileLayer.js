import React from "react";
import Leaflet from "leaflet";

import tileLayerMixin from "./mixins/tileLayer";

export default React.createClass({
  displayName: "TileLayer",

  mixins: [tileLayerMixin],

  propTypes: {
    url: React.PropTypes.string.isRequired
  },

  componentWillMount() {
    let {map, url, ...props} = this.props;
    this._leafletElement =  Leaflet.tileLayer(url, props);
  },

  componentDidUpdate(prevProps) {
    let {url} = this.props;
    if (url && url !== prevProps.url) {
      this.getLeafletElement().setUrl(url);
    }
  }
});
