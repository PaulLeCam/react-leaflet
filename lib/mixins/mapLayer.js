"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var assign = _interopRequire(require("lodash/object/assign"));

var React = _interopRequire(require("react/addons"));

var elementMixin = _interopRequire(require("./element"));

module.exports = {
  mixins: [elementMixin],

  propTypes: {
    map: React.PropTypes.object.isRequired
  },

  componentDidMount: function componentDidMount() {
    this.props.map.addLayer(this.getLeafletElement());
  },

  componentWillUnmount: function componentWillUnmount() {
    this.props.map.removeLayer(this.getLeafletElement());
  },

  getClonedChildrenWithMap: function getClonedChildrenWithMap(extra) {
    var _props = this.props;
    var children = _props.children;
    var map = _props.map;

    var props = assign({ map: map }, extra);

    return React.Children.map(children, function (child) {
      return child ? React.addons.cloneWithProps(child, props) : null;
    });
  }
};