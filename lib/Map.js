var React = require("react/addons");
var Leaflet = require("leaflet");

var latlngType = require("./types/latlng");
var latlngListType = require("./types/latlngList");

var elementMixin = require("./mixins/element");
var currentId = 0;

var Map = React.createClass({
  displayName: "Map",

  mixins: [elementMixin],

  statics: {
    uid:function() {
      return "map" + ++currentId;
    }
  },

  propTypes: {
    center: latlngType,
    id: React.PropTypes.string,
    maxBounds: latlngListType,
    maxZoom: React.PropTypes.number,
    minZoom: React.PropTypes.number,
    zoom: React.PropTypes.number
  },

  getInitialState:function() {
    return {
      id: this.props.id || Map.uid()
    };
  },

  componentDidMount:function() {
    this._leafletElement = Leaflet.map(this.state.id, this.props);
    this.bindEvents(this._leafletEvents);
    this.setState({map: this._leafletElement});
  },

  componentDidUpdate:function(prevProps) {
    var $__0=   this.props,center=$__0.center,zoom=$__0.zoom;
    if (center && center !== prevProps.center) {
      this.getLeafletElement().setView(center, zoom);
    }
    else if (zoom && zoom !== prevProps.zoom) {
      this.getLeafletElement().setZoom(zoom);
    }
  },

  componentWillUnmount:function() {
    this.getLeafletElement().remove();
  },

  render:function() {
    var map = this.getLeafletElement();
    var children = map ? React.Children.map(this.props.children, function(child)  {
      return child ? React.addons.cloneWithProps(child, {map:map}) : null;
    }) : null;

    return React.createElement("div", {className: this.props.className, id: this.state.id}, children);
  }
});

module.exports = Map;
