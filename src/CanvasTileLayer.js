var React = require("react");
var Leaflet = require("leaflet");

var tileLayerMixin = require("./mixins/tileLayer");

module.exports = React.createClass({
  displayName: "CanvasTileLayer",

  mixins: [tileLayerMixin],

  componentWillMount() {
    var {map, ...props} = this.props;
    this._leafletElement =  Leaflet.tileLayer.canvas(props);
  }
});
