var React = require("react");
var Leaflet = require("leaflet");

var boundsType = require("./types/bounds");
var popupContainerMixin = require("./mixins/popupContainer");

module.exports = React.createClass({
  displayName: "Rectangle",

  mixins: [popupContainerMixin],

  propTypes: {
    bounds: boundsType.isRequired
  },

  componentWillMount() {
    var {bounds, map, ...props} = this.props;
    this._leafletElement = Leaflet.rectangle(bounds, props);
  },

  componentDidUpdate(prevProps) {
    if (this.props.bounds !== prevProps.bounds) {
      this.getLeafletElement().setBounds(this.props.bounds);
    }
  }
});
