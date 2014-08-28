var Type, eventsMixins, latlngListType, leaflet, noscript, react;

react = require("react/addons");

leaflet = require("leaflet");

Type = react.PropTypes;

latlngListType = require("./types/latlngList");

eventsMixins = require("./mixins/events");

noscript = react.DOM.noscript;

module.exports = react.createClass({
  displayName: "ImageOverlay",
  mixins: [eventsMixins("imageOverlay")],
  propTypes: {
    url: Type.string.isRequired,
    bounds: latlngListType.isRequired
  },
  getInitialState: function() {
    return {
      imageOverlay: leaflet.imageOverlay(this.props.url, this.props.bounds, this.props)
    };
  },
  render: function() {
    if (this.props.map) {
      this.state.imageOverlay.addTo(this.props.map);
    }
    return noscript(null, react.Children.map(this.props.children, (function(_this) {
      return function(child) {
        return react.addons.cloneWithProps(child, {
          map: _this.props.map
        });
      };
    })(this)));
  }
});
