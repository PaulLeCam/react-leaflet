var Type, eventsMixins, leaflet, noscript, react;

react = require("react/addons");

leaflet = require("leaflet");

Type = react.PropTypes;

eventsMixins = require("./mixins/events");

noscript = react.DOM.noscript;

module.exports = react.createClass({
  displayName: "GeoJson",
  mixins: [eventsMixins("geoJson")],
  propTypes: {
    data: Type.object.isRequired
  },
  getInitialState: function() {
    return {
      geoJson: leaflet.geoJson(this.props.data, this.props)
    };
  },
  render: function() {
    if (this.props.map) {
      this.state.geoJson.addTo(this.props.map);
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
