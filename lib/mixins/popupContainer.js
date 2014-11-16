var React = require("react");
var mapLayerMixin = require("./mapLayer");

module.exports = {
  mixins: [mapLayerMixin],

  render:function() {
    var children = this.getClonedChildrenWithMap({
      popupContainer: this.getLeafletElement()
    });
    return React.createElement("noscript", null, children);
  }
};
