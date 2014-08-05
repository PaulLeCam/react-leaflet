var Type, latlngType, leaflet, noscript, react;

react = require("react/addons");

leaflet = require("leaflet");

Type = react.PropTypes;

latlngType = require("./types/latlng");

noscript = react.DOM.noscript;

module.exports = react.createClass({
  displayName: "Marker",
  propTypes: {
    position: latlngType.isRequired
  },
  getInitialState: function() {
    return {
      marker: leaflet.marker(this.props.position, this.props)
    };
  },
  render: function() {
    if (this.props.map) {
      this.state.marker.addTo(this.props.map);
    }
    return noscript(null, react.Children.map(this.props.children, (function(_this) {
      return function(child) {
        return react.addons.cloneWithProps(child, {
          map: _this.props.map,
          layer: _this.props.layer,
          marker: _this.state.marker
        });
      };
    })(this)));
  }
});
