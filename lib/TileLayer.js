var Type, leaflet, noscript, react;

react = require("react/addons");

leaflet = require("leaflet");

Type = react.PropTypes;

noscript = react.DOM.noscript;

module.exports = react.createClass({
  displayName: "TileLayer",
  propTypes: {
    url: Type.string.isRequired
  },
  getInitialState: function() {
    return {
      tileLayer: leaflet.tileLayer(this.props.url, this.props)
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
