var assign = require("lodash-node/modern/objects/assign");
var React = require("react/addons");

var elementMixin = require("./element");

module.exports = {
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
    var {children, map} = this.props;
    var props = assign({map}, extra);

    return React.Children.map(children, child => {
      return child ? React.addons.cloneWithProps(child, props) : null;
    });
  }
};
