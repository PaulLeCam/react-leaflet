var React = require("react");
var mapLayerMixin = require("./mapLayer");

module.exports = {
  mixins: [mapLayerMixin],

  render() {
    var children = this.getClonedChildrenWithMap({
      popupContainer: this.getLeafletElement()
    });
    return <noscript>{children}</noscript>;
  }
};
