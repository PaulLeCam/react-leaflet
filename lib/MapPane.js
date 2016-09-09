'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _children = require('./types/children');

var _children2 = _interopRequireDefault(_children);

var _map = require('./types/map');

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MapPane = function (_Component) {
  _inherits(MapPane, _Component);

  function MapPane() {
    _classCallCheck(this, MapPane);

    return _possibleConstructorReturn(this, (MapPane.__proto__ || Object.getPrototypeOf(MapPane)).apply(this, arguments));
  }

  _createClass(MapPane, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        pane: this.leafletElement
      };
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var name = this.props.name;

      var map = this.context.map || this.props.map;

      if (name && map && map.createPane) {
        this.leafletElement = map.createPane(name);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.leafletElement && this.leafletElement.remove && this.leafletElement.remove();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: { display: 'none' } },
        this.props.children
      );
    }
  }]);

  return MapPane;
}(_react.Component);

MapPane.propTypes = {
  name: _react.PropTypes.string.isRequired,
  children: _children2.default,
  map: _map2.default
};
MapPane.childContextTypes = {
  map: _map2.default
};
exports.default = MapPane;