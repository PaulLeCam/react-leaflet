import React from "react";

import MapLayer from "./MapLayer";

export default class PopupContainer extends MapLayer {
  render() {
    const children = this.getClonedChildrenWithMap({
      popupContainer: this.leafletElement
    });
    return <noscript>{children}</noscript>;
  }
}
