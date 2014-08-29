var Type, eventsMixins, latlngListType, leaflet, noscript, react;

react = require("react/addons");

leaflet = require("leaflet");

Type = react.PropTypes;

latlngListType = require("./types/latlngList");

eventsMixins = require("./mixins/events");

noscript = react.DOM.noscript;

module.exports = react.createClass({
  displayName: "MultiPolygon",
  mixins: [eventsMixins("multiPolygon")],
  propTypes: {
    polygons: Type.arrayOf(latlngListType).isRequired
  },
  getInitialState: function() {
    return {
      multiPolygon: leaflet.multiPolyline(this.props.polygons, this.props)
    };
  },
  render: function() {
    if (this.props.map) {
      this.state.multiPolygon.addTo(this.props.map);
    }
    return noscript(null, react.Children.map(this.props.children, (function(_this) {
      return function(child) {
        return react.addons.cloneWithProps(child, {
          map: _this.props.map,
          layer: _this.props.layer,
          multiPolygon: _this.state.multiPolygon
        });
      };
    })(this)));
  }
});
