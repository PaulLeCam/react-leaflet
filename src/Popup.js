var React = require("react");
var Leaflet = require("leaflet");

var latlngType = require("./types/latlng");
var elementMixin = require("./mixins/element");

module.exports = React.createClass({
  displayName: "Popup",

  mixins: [elementMixin],

  propTypes: {
    map: React.PropTypes.object.isRequired,
    position: latlngType
  },

  componentWillMount() {
    var {children, map, ...props} = this.props;
    this._leafletElement = Leaflet.popup(props);
  },

  componentDidUpdate(prevProps) {
    var {children, map, popupContainer, position} = this.props;
    if (children !== prevProps.children) {
      var content = React.renderToStaticMarkup(children);
      if (popupContainer) {
        popupContainer.bindPopup(content);
      }
      else {
        var el = this.getLeafletElement();
        el.setContent(content);
        if (position !== prevProps.position) el.setLatLng(position);
      }
    }
  },

  componentWillUnmount() {
    this.props.map.removeLayer(this.getLeafletElement());
  },

  render() {
    var {children, map, popupContainer, position} = this.props;
    if (children) {
      if (React.Children.count(children) > 1) {
        children = <span>{children}</span>;
      }
      var content = React.renderToStaticMarkup(children);
      // Attach to container component
      if (popupContainer) {
        popupContainer.bindPopup(content);
        return null;
      }
      // Attach to a Map
      var el = this.getLeafletElement();
      el.setContent(content);
      if (position) el.setLatLng(position);
      el.openOn(map);
    }
    return null;
  }
});
