'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _uniqueId2 = require('lodash/uniqueId');

var _uniqueId3 = _interopRequireDefault(_uniqueId2);

var _omit2 = require('lodash/omit');

var _omit3 = _interopRequireDefault(_omit2);

var _forEach2 = require('lodash/forEach');

var _forEach3 = _interopRequireDefault(_forEach2);

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
  (0, _inherits3.default)(Pane, _Component);

  function Pane() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Pane);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Pane.__proto__ || (0, _getPrototypeOf2.default)(Pane)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
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
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Pane, [{
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