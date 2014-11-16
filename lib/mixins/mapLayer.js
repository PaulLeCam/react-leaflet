var assign = require("lodash-node/modern/objects/assign");
var React = require("react/addons");

var elementMixin = require("./element");

module.exports = {
  mixins: [elementMixin],

  propTypes: {
    map: React.PropTypes.object.isRequired
  },

  componentDidMount:function() {
    this.props.map.addLayer(this.getLeafletElement());
  },

  componentWillUnmount:function() {
    this.props.map.removeLayer(this.getLeafletElement());
  },

  getClonedChildrenWithMap:function(extra) {
    var $__0=   this.props,children=$__0.children,map=$__0.map;
    var props = assign({map:map}, extra);

    return React.Children.map(children, function(child)  {
      return child ? React.addons.cloneWithProps(child, props) : null;
    });
  }
};
