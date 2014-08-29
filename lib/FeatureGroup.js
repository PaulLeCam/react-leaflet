var Type, eventsMixins, leaflet, noscript, react;

react = require("react/addons");

leaflet = require("leaflet");

Type = react.PropTypes;

eventsMixins = require("./mixins/events");

noscript = react.DOM.noscript;

module.exports = react.createClass({
  displayName: "FeatureGroup",
  mixins: [eventsMixins("featureGroup")],
  propTypes: {
    layers: Type.array.isRequired
  },
  getInitialState: function() {
    return {
      featureGroup: leaflet.featureGroup(this.props.layers)
    };
  },
  render: function() {
    if (this.props.map) {
      this.state.featureGroup.addTo(this.props.map);
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
