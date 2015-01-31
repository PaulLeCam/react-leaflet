import React from "react";
import Leaflet from "leaflet";

import latlngType from "./types/latlng";
import elementMixin from "./mixins/element";

export default React.createClass({
  displayName: "Popup",

  mixins: [elementMixin],

  propTypes: {
    map: React.PropTypes.object.isRequired,
    position: latlngType
  },

  componentWillMount() {
    let {children, map, ...props} = this.props;
    this._leafletElement = Leaflet.popup(props);
  },

  componentDidUpdate(prevProps) {
    let {children, map, popupContainer, position, ...props} = this.props;
    if (children !== prevProps.children) {
      let content = React.renderToStaticMarkup(children);
      if (popupContainer) {
        popupContainer.bindPopup(content, props);
      }
      else {
        let el = this.getLeafletElement();
        el.setContent(content);
        if (position !== prevProps.position) el.setLatLng(position);
      }
    }
  },

  componentWillUnmount() {
    this.props.map.removeLayer(this.getLeafletElement());
  },

  render() {
    let {children, map, popupContainer, position, ...props} = this.props;
    if (children) {
      let content = React.renderToStaticMarkup(children);
      // Attach to container component
      if (popupContainer) {
        popupContainer.bindPopup(content, props);
        return null;
      }
      // Attach to a Map
      let el = this.getLeafletElement();
      el.setContent(content);
      if (position) el.setLatLng(position);
      el.openOn(map);
    }
    return null;
  }
});
