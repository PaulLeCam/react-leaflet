'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _leaflet = require('leaflet');

var _react = require('react');

var _layerContainer = require('./types/layerContainer');

var _layerContainer2 = _interopRequireDefault(_layerContainer);

var _Path2 = require('./Path');

var _Path3 = _interopRequireDefault(_Path2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FeatureGroup = function (_Path) {
  _inherits(FeatureGroup, _Path);

  function FeatureGroup() {
    _classCallCheck(this, FeatureGroup);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(FeatureGroup).apply(this, arguments));
  }

  _createClass(FeatureGroup, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        layerContainer: this.leafletElement,
        popupContainer: this.leafletElement
      };
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.leafletElement = (0, _leaflet.featureGroup)();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      _get(Object.getPrototypeOf(FeatureGroup.prototype), 'componentDidMount', this).call(this);
      this.setStyle(this.props);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      this.setStyleIfChanged(prevProps, this.props);
    }
  }]);

  return FeatureGroup;
}(_Path3.default);

FeatureGroup.childContextTypes = {
  layerContainer: _layerContainer2.default,
  popupContainer: _react.PropTypes.object
};
exports.default = FeatureGroup;