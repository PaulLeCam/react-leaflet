import React from "react";
import Leaflet from "leaflet";

import boundsType from "./types/bounds";
import popupContainerMixin from "./mixins/popupContainer";

export default React.createClass({
  displayName: "Rectangle",

  mixins: [popupContainerMixin],

  propTypes: {
    bounds: boundsType.isRequired
  },

  componentWillMount() {
    let {bounds, map, ...props} = this.props;
    this._leafletElement = Leaflet.rectangle(bounds, props);
  },

  componentDidUpdate(prevProps) {
    if (this.props.bounds !== prevProps.bounds) {
      this.getLeafletElement().setBounds(this.props.bounds);
    }
  }
});
