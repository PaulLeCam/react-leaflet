'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _controlPosition = require('./types/controlPosition');

var _controlPosition2 = _interopRequireDefault(_controlPosition);

var _map = require('./types/map');

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MapControl = function (_Component) {
  _inherits(MapControl, _Component);

  function MapControl() {
    _classCallCheck(this, MapControl);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(MapControl).apply(this, arguments));
  }

  _createClass(MapControl, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.leafletElement.addTo(this.context.map);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.props.position !== prevProps.position) {
        this.leafletElement.setPosition(this.props.position);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.leafletElement.removeFrom(this.context.map);
    }
  }, {
    key: 'getLeafletElement',
    value: function getLeafletElement() {
      process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, 'The "getLeafletElement()" method is deprecated and will be removed in the next version, simply use the "leafletElement" property instead.') : void 0;
      return this.leafletElement;
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return MapControl;
}(_react.Component);

MapControl.propTypes = {
  position: _controlPosition2.default
};
MapControl.contextTypes = {
  map: _map2.default
};
exports.default = MapControl;