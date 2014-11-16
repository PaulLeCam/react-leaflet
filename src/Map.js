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
    uid() {
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

  getInitialState() {
    return {
      id: this.props.id || Map.uid()
    };
  },

  componentDidMount() {
    this._leafletElement = Leaflet.map(this.state.id, this.props);
    this.bindEvents(this._leafletEvents);
    this.setState({map: this._leafletElement});
  },

  componentDidUpdate(prevProps) {
    var {center, zoom} = this.props;
    if (center && center !== prevProps.center) {
      this.getLeafletElement().setView(center, zoom);
    }
    else if (zoom && zoom !== prevProps.zoom) {
      this.getLeafletElement().setZoom(zoom);
    }
  },

  componentWillUnmount() {
    this.getLeafletElement().remove();
  },

  render() {
    var map = this.getLeafletElement();
    var children = map ? React.Children.map(this.props.children, child => {
      return child ? React.addons.cloneWithProps(child, {map}) : null;
    }) : null;

    return <div id={this.state.id}>{children}</div>;
  }
});

module.exports = Map;
