'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _leaflet = require('leaflet');

var _children = require('./types/children');

var _children2 = _interopRequireDefault(_children);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function nameIsRequired() {
  throw Error('name is required');
}

var MapPane = function (_Component) {
  _inherits(MapPane, _Component);

  function MapPane() {
    _classCallCheck(this, MapPane);

    return _possibleConstructorReturn(this, (MapPane.__proto__ || Object.getPrototypeOf(MapPane)).apply(this, arguments));
  }

  _createClass(MapPane, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props$name = this.props.name;
      var name = _props$name === undefined ? nameIsRequired() : _props$name;

      this.leafletElement = (0, _leaflet.createPane)(name);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.leafletElement.remove();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.Children.map(this.props.children, function (child) {
        return child ? _react2.default.cloneElement(child, _extends({}, _this2.props, { pane: _this2.leafletElement })) : null;
      });
    }
  }]);

  return MapPane;
}(_react.Component);

MapPane.propTypes = {
  name: _react.PropTypes.string.isRequired,
  children: _children2.default
};
exports.default = MapPane;