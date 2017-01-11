'use strict';

exports.__esModule = true;

var _leaflet = require('leaflet');

var _react = require('react');

var _reactDom = require('react-dom');

var _map = require('./types/map');

var _map2 = _interopRequireDefault(_map);

var _MapComponent2 = require('./MapComponent');

var _MapComponent3 = _interopRequireDefault(_MapComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Tooltip = function (_MapComponent) {
  _inherits(Tooltip, _MapComponent);

  function Tooltip() {
    var _temp, _this, _ret;

    _classCallCheck(this, Tooltip);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _MapComponent.call.apply(_MapComponent, [this].concat(args))), _this), _this.onTooltipOpen = function (_ref) {
      var tooltip = _ref.tooltip;

      if (tooltip === _this.leafletElement) {
        _this.renderTooltipContent();
      }
    }, _this.onTooltipClose = function (_ref2) {
      var tooltip = _ref2.tooltip;

      if (tooltip === _this.leafletElement) {
        _this.removeTooltipContent();
      }
    }, _this.renderTooltipContent = function () {
      if (_this.props.children) {
        (0, _reactDom.render)(_react.Children.only(_this.props.children), _this.leafletElement._contentNode);
        _this.leafletElement.update();
      } else {
        _this.removeTooltipContent();
      }
    }, _this.removeTooltipContent = function () {
      if (_this.leafletElement._contentNode) {
        (0, _reactDom.unmountComponentAtNode)(_this.leafletElement._contentNode);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Tooltip.prototype.createLeafletElement = function createLeafletElement(props) {
    var _children = props.children,
        options = _objectWithoutProperties(props, ['children']);

    return (0, _leaflet.tooltip)(this.getOptions(options), this.context.popupContainer);
  };

  Tooltip.prototype.componentWillMount = function componentWillMount() {
    _MapComponent.prototype.componentWillMount.call(this);
    this.leafletElement = this.createLeafletElement(this.props);

    this.context.popupContainer.on({
      tooltipopen: this.onTooltipOpen,
      tooltipclose: this.onTooltipClose
    });
  };

  Tooltip.prototype.componentDidMount = function componentDidMount() {
    this.context.popupContainer.bindTooltip(this.leafletElement);
  };

  Tooltip.prototype.componentDidUpdate = function componentDidUpdate() {
    if (this.leafletElement.isOpen()) {
      this.renderTooltipContent();
    }
  };

  Tooltip.prototype.componentWillUnmount = function componentWillUnmount() {
    this.context.popupContainer.off({
      tooltipopen: this.onTooltipOpen,
      tooltipclose: this.onTooltipClose
    });
    this.context.map.removeLayer(this.leafletElement);
    _MapComponent.prototype.componentWillUnmount.call(this);
  };

  Tooltip.prototype.render = function render() {
    return null;
  };

  return Tooltip;
}(_MapComponent3.default);

Tooltip.propTypes = {
  children: _react.PropTypes.node
};
Tooltip.contextTypes = {
  map: _map2.default,
  popupContainer: _react.PropTypes.object,
  pane: _react.PropTypes.string
};
exports.default = Tooltip;