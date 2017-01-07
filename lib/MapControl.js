'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _controlPosition = require('./types/controlPosition');

var _controlPosition2 = _interopRequireDefault(_controlPosition);

var _map = require('./types/map');

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var MapControl = function (_Component) {
  _inherits(MapControl, _Component);

  function MapControl() {
    _classCallCheck(this, MapControl);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  // eslint-disable-next-line no-unused-vars
  MapControl.prototype.createLeafletElement = function createLeafletElement(props) {
    throw new Error('createLeafletElement() must be implemented');
  };

  MapControl.prototype.updateLeafletElement = function updateLeafletElement(fromProps, toProps) {
    if (toProps.position !== fromProps.position) {
      this.leafletElement.setPosition(toProps.position);
    }
  };

  MapControl.prototype.componentWillMount = function componentWillMount() {
    this.leafletElement = this.createLeafletElement(this.props);
  };

  MapControl.prototype.componentDidMount = function componentDidMount() {
    this.leafletElement.addTo(this.context.map);
  };

  MapControl.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    this.updateLeafletElement(prevProps, this.props);
  };

  MapControl.prototype.componentWillUnmount = function componentWillUnmount() {
    this.leafletElement.remove();
  };

  MapControl.prototype.render = function render() {
    return null;
  };

  return MapControl;
}(_react.Component);

MapControl.propTypes = {
  position: _controlPosition2.default
};
MapControl.contextTypes = {
  map: _map2.default
};
exports.default = MapControl;