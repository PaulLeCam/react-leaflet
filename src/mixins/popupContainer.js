import React from "react";
import mapLayerMixin from "./mapLayer";

export default {
  mixins: [mapLayerMixin],

  render() {
    let children = this.getClonedChildrenWithMap({
      popupContainer: this.getLeafletElement()
    });
    return <noscript>{children}</noscript>;
  }
};
