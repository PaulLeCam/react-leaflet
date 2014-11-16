var React = require("react");
var mapLayerMixin = require("./mapLayer");

module.exports = {
  mixins: [mapLayerMixin],

  propTypes: {
    opacity: React.PropTypes.number,
    zIndex: React.PropTypes.number
  },

  componentDidUpdate:function(prevProps) {
    var $__0=   this.props,opacity=$__0.opacity,zIndex=$__0.zIndex;
    if (opacity && opacity !== prevProps.opacity) {
      this.getLeafletElement().setOpacity(opacity);
    }
    if (zIndex && zIndex !== prevProps.zIndex) {
      this.getLeafletElement().setZIndex(zIndex);
    }
  },

  render:function() {
    return null;
  }
};
