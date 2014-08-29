var eventsMixins, latlngListType, leaflet, noscript, react;

react = require("react/addons");

leaflet = require("leaflet");

latlngListType = require("./types/latlngList");

eventsMixins = require("./mixins/events");

noscript = react.DOM.noscript;

module.exports = react.createClass({
  displayName: "Rectangle",
  mixins: [eventsMixins("rectangle")],
  propTypes: {
    bounds: latlngListType.isRequired
  },
  getInitialState: function() {
    return {
      rectangle: leaflet.rectangle(this.props.bounds, this.props)
    };
  },
  render: function() {
    if (this.props.map) {
      this.state.rectangle.addTo(this.props.map);
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
