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

  componentWillMount:function() {
    var $__0=    this.props,children=$__0.children,map=$__0.map,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{children:1,map:1});
    this._leafletElement = Leaflet.popup(props);
  },

  componentDidUpdate:function(prevProps) {
    var $__0=      this.props,children=$__0.children,map=$__0.map,popupContainer=$__0.popupContainer,position=$__0.position,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{children:1,map:1,popupContainer:1,position:1});
    if (children !== prevProps.children) {
      var content = React.renderToStaticMarkup(children);
      if (popupContainer) {
        popupContainer.bindPopup(content, props);
      }
      else {
        var el = this.getLeafletElement();
        el.setContent(content);
        if (position !== prevProps.position) el.setLatLng(position);
      }
    }
  },

  componentWillUnmount:function() {
    this.props.map.removeLayer(this.getLeafletElement());
  },

  render:function() {
    var $__0=      this.props,children=$__0.children,map=$__0.map,popupContainer=$__0.popupContainer,position=$__0.position,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{children:1,map:1,popupContainer:1,position:1});
    if (children) {
      if (React.Children.count(children) > 1) {
        children = React.createElement("span", null, children);
      }
      var content = React.renderToStaticMarkup(children);
      // Attach to container component
      if (popupContainer) {
        popupContainer.bindPopup(content, props);
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
