import assign from "lodash/object/assign";
import React from "react/addons";

import elementMixin from "./element";

export default {
  mixins: [elementMixin],

  propTypes: {
    map: React.PropTypes.object.isRequired
  },

  componentDidMount() {
    this.props.map.addLayer(this.getLeafletElement());
  },

  componentWillUnmount() {
    this.props.map.removeLayer(this.getLeafletElement());
  },

  getClonedChildrenWithMap(extra) {
    let {children, map} = this.props;
    let props = assign({map}, extra);

    return React.Children.map(children, child => {
      return child ? React.addons.cloneWithProps(child, props) : null;
    });
  }
};
