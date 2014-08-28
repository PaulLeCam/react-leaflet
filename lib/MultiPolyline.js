var Type, eventsMixins, latlngListType, leaflet, noscript, react;

react = require("react/addons");

leaflet = require("leaflet");

Type = react.PropTypes;

latlngListType = require("./types/latlngList");

eventsMixins = require("./mixins/events");

noscript = react.DOM.noscript;

module.exports = react.createClass({
  displayName: "MultiPolyline",
  mixins: [eventsMixins("multiPolyline")],
  propTypes: {
    polylines: Type.arrayOf(latlngListType).isRequired
  },
  getInitialState: function() {
    return {
      multiPolyline: leaflet.multiPolyline(this.props.polylines, this.props)
    };
  },
  render: function() {
    if (this.props.map) {
      this.state.multiPolyline.addTo(this.props.map);
    }
    return noscript(null, react.Children.map(this.props.children, (function(_this) {
      return function(child) {
        return react.addons.cloneWithProps(child, {
          map: _this.props.map,
          layer: _this.props.layer,
          multiPolyline: _this.state.multiPolyline
        });
      };
    })(this)));
  }
});
