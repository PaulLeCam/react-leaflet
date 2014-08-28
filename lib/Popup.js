var bindTo, eventsMixins, leaflet, react;

react = require("react");

leaflet = require("leaflet");

eventsMixins = require("./mixins/events");

bindTo = ["marker", "multiPolyline", "multiPolygon"];

module.exports = react.createClass({
  displayName: "Popup",
  mixins: [eventsMixins("popup")],
  getInitialState: function() {
    return {
      popup: leaflet.popup(this.props, this.props.layer)
    };
  },
  render: function() {
    var component, content, el, _i, _len;
    if (this.props.children) {
      content = react.renderComponentToString(this.props.children);
      for (_i = 0, _len = bindTo.length; _i < _len; _i++) {
        component = bindTo[_i];
        if (!(el = this.props[component])) {
          continue;
        }
        el.bindPopup(content);
        return null;
      }
      this.state.popup.setContent(content);
      if (this.props.position) {
        this.state.popup.setLatLng(this.props.position);
      }
      if (this.props.map) {
        this.state.popup.openOn(this.props.map);
      }
    }
    return null;
  }
});
