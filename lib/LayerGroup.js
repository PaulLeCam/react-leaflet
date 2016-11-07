'use strict';

exports.__esModule = true;

var _leaflet = require('leaflet');

var _layerContainer = require('./types/layerContainer');

var _layerContainer2 = _interopRequireDefault(_layerContainer);

var _MapLayer2 = require('./MapLayer');

var _MapLayer3 = _interopRequireDefault(_MapLayer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var LayerGroup = function (_MapLayer) {
  _inherits(LayerGroup, _MapLayer);

  function LayerGroup() {
    _classCallCheck(this, LayerGroup);

    return _possibleConstructorReturn(this, _MapLayer.apply(this, arguments));
  }

  LayerGroup.prototype.getChildContext = function getChildContext() {
    return {
      layerContainer: this.leafletElement
    };
  };

  LayerGroup.prototype.componentWillMount = function componentWillMount() {
    _MapLayer.prototype.componentWillMount.call(this);
    this.leafletElement = (0, _leaflet.layerGroup)(this.getOptions());
  };

  return LayerGroup;
}(_MapLayer3.default);

LayerGroup.childContextTypes = {
  layerContainer: _layerContainer2.default
};
exports.default = LayerGroup;