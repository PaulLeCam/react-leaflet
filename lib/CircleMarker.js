var eventsMixins, latlngType, leaflet, noscript, react;

react = require("react/addons");

leaflet = require("leaflet");

latlngType = require("./types/latlng");

eventsMixins = require("./mixins/events");

noscript = react.DOM.noscript;

module.exports = react.createClass({
  displayName: "CircleMarker",
  mixins: [eventsMixins("circleMarker")],
  propTypes: {
    center: latlngType.isRequired
  },
  getInitialState: function() {
    return {
      circleMarker: leaflet.circleMarker(this.props.center, this.props)
    };
  },
  render: function() {
    if (this.props.map) {
      this.state.circleMarker.addTo(this.props.map);
    }
    return noscript(null, react.Children.map(this.props.children, (function(_this) {
      return function(child) {
        return react.addons.cloneWithProps(child, {
          map: _this.props.map,
          layer: _this.props.layer
        });
      };
    })(this)));
  }
});
