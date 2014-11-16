var React = require("react");
var mapLayerMixin = require("./mapLayer");

module.exports = {
  mixins: [mapLayerMixin],

  propTypes: {
    opacity: React.PropTypes.number,
    zIndex: React.PropTypes.number
  },

  componentDidUpdate(prevProps) {
    var {opacity, zIndex} = this.props;
    if (opacity && opacity !== prevProps.opacity) {
      this.getLeafletElement().setOpacity(opacity);
    }
    if (zIndex && zIndex !== prevProps.zIndex) {
      this.getLeafletElement().setZIndex(zIndex);
    }
  },

  render() {
    return null;
  }
};
