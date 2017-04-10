'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _uniqueId2 = require('lodash/uniqueId');

var _uniqueId3 = _interopRequireDefault(_uniqueId2);

var _omit2 = require('lodash/omit');

var _omit3 = _interopRequireDefault(_omit2);

var _forEach2 = require('lodash/forEach');

var _forEach3 = _interopRequireDefault(_forEach2);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _children = require('./propTypes/children');

var _children2 = _interopRequireDefault(_children);

var _map = require('./propTypes/map');

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var LEAFLET_PANES = ['tile', 'shadow', 'overlay', 'map', 'marker', 'tooltip', 'popup'];

var isLeafletPane = function isLeafletPane(name) {
  return LEAFLET_PANES.indexOf(name.replace(/-*pane/gi, '')) !== -1;
};

var paneStyles = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};

var Pane = function (_Component) {
  _inherits(Pane, _Component);

  function Pane() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Pane);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Pane.__proto__ || Object.getPrototypeOf(Pane)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      name: undefined
    }, _this.setStyle = function () {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props,
          style = _ref2.style,
          className = _ref2.className;

      var pane = _this.getPane(_this.state.name);
      if (pane) {
        if (className) {
          pane.classList.add(className);
        }
        if (style) {
          (0, _forEach3.default)(style, function (value, key) {
            pane.style[key] = value;
          });
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Pane, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        pane: this.state.name
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.createPane(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!this.state.name) {
        // Do nothing if this.state.name is undefined due to errors or
        // an invalid props.name value
        return;
      }

      // If the 'name' prop has changed the current pane is unmounted and a new
      // pane is created.
      if (nextProps.name !== this.props.name) {
        this.removePane();
        this.createPane(nextProps);
      } else {
        // Remove the previous css class name from the pane if it has changed.
        // setStyle will take care of adding in the updated className
        if (this.props.className && nextProps.className !== this.props.className) {
          var _pane = this.getPane();
          if (_pane) _pane.classList.remove(this.props.className);
        }

        // Update the pane's DOM node style and class
        this.setStyle(nextProps);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.removePane();
    }
  }, {
    key: 'createPane',
    value: function createPane(props) {
      var map = this.context.map;
      var name = props.name || 'pane-' + (0, _uniqueId3.default)();

      if (map && map.createPane) {
        var isDefault = isLeafletPane(name);
        var existing = isDefault || this.getPane(name);

        if (!existing) {
          map.createPane(name, this.getParentPane());
        } else {
          var message = isDefault ? 'You must use a unique name for a pane that is not a default leaflet pane (' + name + ')' : 'A pane with this name already exists. (' + name + ')';
          process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, message) : void 0;
        }

        this.setState({ name: name }, this.setStyle);
      }
    }
  }, {
    key: 'removePane',
    value: function removePane() {
      // Remove the created pane
      var name = this.state.name;

      if (name) {
        var _pane2 = this.getPane(name);
        if (_pane2 && _pane2.remove) _pane2.remove();

        var map = this.context.map;
        if (map && map._panes) {
          map._panes = (0, _omit3.default)(map._panes, name);
          map._paneRenderers = (0, _omit3.default)(map._paneRenderers, name);
        }

        this.setState({ name: undefined });
      }
    }
  }, {
    key: 'getParentPane',
    value: function getParentPane() {
      return this.getPane(this.props.pane || this.context.pane);
    }
  }, {
    key: 'getPane',
    value: function getPane(name) {
      return name ? this.context.map.getPane(name) : undefined;
    }
  }, {
    key: 'render',
    value: function render() {
      return this.state.name ? _react2.default.createElement(
        'div',
        { style: paneStyles },
        this.props.children
      ) : null;
    }
  }]);

  return Pane;
}(_react.Component);

Pane.propTypes = {
  name: _propTypes2.default.string,
  children: _children2.default,
  map: _map2.default,
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  pane: _propTypes2.default.string
};
Pane.contextTypes = {
  map: _map2.default,
  pane: _propTypes2.default.string
};
Pane.childContextTypes = {
  pane: _propTypes2.default.string
};
exports.default = Pane;