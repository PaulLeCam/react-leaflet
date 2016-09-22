'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _forEach2 = require('lodash/forEach');

var _forEach3 = _interopRequireDefault(_forEach2);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _children = require('./types/children');

var _children2 = _interopRequireDefault(_children);

var _map = require('./types/map');

var _map2 = _interopRequireDefault(_map);

var _pane = require('./types/pane');

var _pane2 = _interopRequireDefault(_pane);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MapPane = function (_Component) {
  _inherits(MapPane, _Component);

  function MapPane() {
    _classCallCheck(this, MapPane);

    var _this = _possibleConstructorReturn(this, (MapPane.__proto__ || Object.getPrototypeOf(MapPane)).call(this));

    _this.state = {
      _isMounted: false
    };
    return _this;
  }

  _createClass(MapPane, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        pane: this.props.name
      };
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var name = this.props.name;

      var map = this.context.map || this.props.map;

      if (name && map && map.createPane) {
        var existing = this.getPane();

        if (!existing) {
          map.createPane(name);
        }
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setStyle(props);
    }
  }, {
    key: 'setStyle',
    value: function setStyle() {
      var _ref = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];

      var style = _ref.style;
      var zIndex = _ref.zIndex;

      var pane = this.getPane();

      if (pane) {
        pane.style.zIndex = zIndex || 'initial';

        if (style) {
          (0, _forEach3.default)(style, function (value, key) {
            pane.style[key] = value;
          });
        }
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({
        _isMounted: true
      });

      this.setStyle();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var pane = this.getPane();
      pane && pane.remove && pane.remove();

      var map = this.context.map || this.props.map;
      var name = this.props.name;


      if (name && map && map._panes) {
        map._panes = omit(map._panes, name);
        map._paneRenderers = omit(map._paneRenderers, name);
      }
    }
  }, {
    key: 'getPane',
    value: function getPane() {
      var name = this.props.name;

      var map = this.context.map || this.props.map;

      if (name && map && map) {
        return map.getPane(name);
      }

      return null;
    }
  }, {
    key: 'getChildren',
    value: function getChildren() {
      var _this2 = this;

      return _react2.default.Children.map(this.props.children, function (child) {
        return child ? _react2.default.cloneElement(child, _this2.props) : null;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _isMounted = this.state._isMounted;

      return _isMounted ? _react2.default.createElement(
        'div',
        { style: {
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          } },
        this.getChildren()
      ) : null;
    }
  }]);

  return MapPane;
}(_react.Component);

MapPane.propTypes = {
  name: _react.PropTypes.string.isRequired,
  children: _children2.default,
  map: _map2.default,
  zIndex: _react.PropTypes.number,
  className: _react.PropTypes.string,
  style: _react.PropTypes.object
};
MapPane.contextTypes = {
  map: _map2.default
};
MapPane.childContextTypes = {
  pane: _pane2.default
};
exports.default = MapPane;