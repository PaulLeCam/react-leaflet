"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react"));

var mapLayerMixin = _interopRequire(require("./mapLayer"));

module.exports = {
  mixins: [mapLayerMixin],

  propTypes: {
    opacity: React.PropTypes.number,
    zIndex: React.PropTypes.number
  },

  componentDidUpdate: function componentDidUpdate(prevProps) {
    var _props = this.props;
    var opacity = _props.opacity;
    var zIndex = _props.zIndex;

    if (opacity && opacity !== prevProps.opacity) {
      this.getLeafletElement().setOpacity(opacity);
    }
    if (zIndex && zIndex !== prevProps.zIndex) {
      this.getLeafletElement().setZIndex(zIndex);
    }
  },

  render: function render() {
    return null;
  }
};