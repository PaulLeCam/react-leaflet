var Type, eventsMixins, latlngType, leaflet, noscript, react;

react = require("react/addons");

leaflet = require("leaflet");

Type = react.PropTypes;

latlngType = require("./types/latlng");

eventsMixins = require("./mixins/events");

noscript = react.DOM.noscript;

module.exports = react.createClass({
  displayName: "Circle",
  mixins: [eventsMixins("circle")],
  propTypes: {
    center: latlngType.isRequired,
    radius: Type.number.isRequired
  },
  getInitialState: function() {
    return {
      circle: leaflet.circle(this.props.center, this.props.radius, this.props)
    };
  },
  render: function() {
    if (this.props.map) {
      this.state.circle.addTo(this.props.map);
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
