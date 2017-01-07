'use strict';

exports.__esModule = true;

var _leaflet = require('leaflet');

var _react = require('react');

var _children = require('./types/children');

var _children2 = _interopRequireDefault(_children);

var _layerContainer = require('./types/layerContainer');

var _layerContainer2 = _interopRequireDefault(_layerContainer);

var _Path2 = require('./Path');

var _Path3 = _interopRequireDefault(_Path2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var FeatureGroup = function (_Path) {
  _inherits(FeatureGroup, _Path);

  function FeatureGroup() {
    _classCallCheck(this, FeatureGroup);

    return _possibleConstructorReturn(this, _Path.apply(this, arguments));
  }

  FeatureGroup.prototype.getChildContext = function getChildContext() {
    return {
      layerContainer: this.leafletElement,
      popupContainer: this.leafletElement
    };
  };

  FeatureGroup.prototype.createLeafletElement = function createLeafletElement(props) {
    return (0, _leaflet.featureGroup)(this.getOptions(props));
  };

  FeatureGroup.prototype.componentDidMount = function componentDidMount() {
    _Path.prototype.componentDidMount.call(this);
    this.setStyle(this.props);
  };

  return FeatureGroup;
}(_Path3.default);

FeatureGroup.childContextTypes = {
  children: _children2.default,
  layerContainer: _layerContainer2.default,
  popupContainer: _react.PropTypes.object
};
exports.default = FeatureGroup;