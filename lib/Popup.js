var leaflet, react;

react = require("react");

leaflet = require("leaflet");

module.exports = react.createClass({
  displayName: "Popup",
  getInitialState: function() {
    return {
      popup: leaflet.popup(this.props, this.props.layer)
    };
  },
  render: function() {
    var content;
    if (this.props.children) {
      content = react.renderComponentToString(this.props.children);
      if (this.props.marker) {
        this.props.marker.bindPopup(content);
      } else {
        this.state.popup.setContent(content);
        if (this.props.position) {
          this.state.popup.setLatLng(this.props.position);
        }
        if (this.props.map) {
          this.state.popup.openOn(this.props.map);
        }
      }
    }
    return null;
  }
});
