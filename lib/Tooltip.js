'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _leaflet = require('leaflet');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _reactDom = require('react-dom');

var _map = require('./propTypes/map');

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
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Tooltip);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).call.apply(_ref, [this].concat(args))), _this), _this.onTooltipOpen = function (_ref2) {
      var tooltip = _ref2.tooltip;

      if (tooltip === _this.leafletElement) {
        _this.renderTooltipContent();
      }
    }, _this.onTooltipClose = function (_ref3) {
      var tooltip = _ref3.tooltip;

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

  _createClass(Tooltip, [{
    key: 'createLeafletElement',
    value: function createLeafletElement(props) {
      var _children = props.children,
          options = _objectWithoutProperties(props, ['children']);

      return (0, _leaflet.tooltip)(this.getOptions(options), this.context.popupContainer);
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      _get(Tooltip.prototype.__proto__ || Object.getPrototypeOf(Tooltip.prototype), 'componentWillMount', this).call(this);
      this.leafletElement = this.createLeafletElement(this.props);

      this.context.popupContainer.on({
        tooltipopen: this.onTooltipOpen,
        tooltipclose: this.onTooltipClose
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.context.popupContainer.bindTooltip(this.leafletElement);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.leafletElement.isOpen()) {
        this.renderTooltipContent();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.context.popupContainer.off({
        tooltipopen: this.onTooltipOpen,
        tooltipclose: this.onTooltipClose
      });
      this.context.map.removeLayer(this.leafletElement);
      _get(Tooltip.prototype.__proto__ || Object.getPrototypeOf(Tooltip.prototype), 'componentWillUnmount', this).call(this);
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return Tooltip;
}(_MapComponent3.default);

Tooltip.propTypes = {
  children: _propTypes2.default.node
};
Tooltip.contextTypes = {
  map: _map2.default,
  popupContainer: _propTypes2.default.object,
  pane: _propTypes2.default.string
};
exports.default = Tooltip;