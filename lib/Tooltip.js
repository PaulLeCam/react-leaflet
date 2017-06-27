'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

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

var Tooltip = function (_MapComponent) {
  (0, _inherits3.default)(Tooltip, _MapComponent);

  function Tooltip() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Tooltip);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Tooltip.__proto__ || (0, _getPrototypeOf2.default)(Tooltip)).call.apply(_ref, [this].concat(args))), _this), _this.onTooltipOpen = function (_ref2) {
      var tooltip = _ref2.tooltip;

      if (tooltip === _this.leafletElement) {
        _this.renderTooltipContent();
        if (_this.props.onOpen) {
          _this.props.onOpen();
        }
      }
    }, _this.onTooltipClose = function (_ref3) {
      var tooltip = _ref3.tooltip;

      if (tooltip === _this.leafletElement) {
        _this.removeTooltipContent();
        if (_this.props.onClose) {
          _this.props.onClose();
        }
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
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Tooltip, [{
    key: 'createLeafletElement',
    value: function createLeafletElement(props) {
      var _children = props.children,
          options = (0, _objectWithoutProperties3.default)(props, ['children']);

      return (0, _leaflet.tooltip)(this.getOptions(options), this.context.popupContainer);
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      (0, _get3.default)(Tooltip.prototype.__proto__ || (0, _getPrototypeOf2.default)(Tooltip.prototype), 'componentWillMount', this).call(this);
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
      (0, _get3.default)(Tooltip.prototype.__proto__ || (0, _getPrototypeOf2.default)(Tooltip.prototype), 'componentWillUnmount', this).call(this);
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
  children: _propTypes2.default.node,
  onClose: _propTypes2.default.func,
  onOpen: _propTypes2.default.func
};
Tooltip.contextTypes = {
  map: _map2.default,
  popupContainer: _propTypes2.default.object,
  pane: _propTypes2.default.string
};
exports.default = Tooltip;