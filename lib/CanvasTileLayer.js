var Type, eventsMixins, leaflet, noscript, react;

react = require("react/addons");

leaflet = require("leaflet");

Type = react.PropTypes;

eventsMixins = require("./mixins/events");

noscript = react.DOM.noscript;

module.exports = react.createClass({
  displayName: "CanvasTileLayer",
  mixins: [eventsMixins("tileLayer")],
  getInitialState: function() {
    return {
      tileLayer: leaflet.tileLayer.canvas(this.props)
    };
  },
  render: function() {
    if (this.props.map) {
      this.state.tileLayer.addTo(this.props.map);
    }
    return noscript(null, react.Children.map(this.props.children, (function(_this) {
      return function(child) {
        return react.addons.cloneWithProps(child, {
          map: _this.props.map,
          layer: _this.state.tileLayer
        });
      };
    })(this)));
  }
});
