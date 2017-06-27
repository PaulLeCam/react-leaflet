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

var _bounds = require('./propTypes/bounds');

var _bounds2 = _interopRequireDefault(_bounds);

var _MapLayer2 = require('./MapLayer');

var _MapLayer3 = _interopRequireDefault(_MapLayer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VideoOverlay = function (_MapLayer) {
  (0, _inherits3.default)(VideoOverlay, _MapLayer);

  function VideoOverlay() {
    (0, _classCallCheck3.default)(this, VideoOverlay);
    return (0, _possibleConstructorReturn3.default)(this, (VideoOverlay.__proto__ || (0, _getPrototypeOf2.default)(VideoOverlay)).apply(this, arguments));
  }

  (0, _createClass3.default)(VideoOverlay, [{
    key: 'createLeafletElement',
    value: function createLeafletElement(props) {
      var bounds = props.bounds,
          url = props.url,
          options = (0, _objectWithoutProperties3.default)(props, ['bounds', 'url']);

      return (0, _leaflet.videoOverlay)(url, bounds, this.getOptions(options));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      (0, _get3.default)(VideoOverlay.prototype.__proto__ || (0, _getPrototypeOf2.default)(VideoOverlay.prototype), 'componentDidMount', this).call(this);
      if (this.props.play) {
        this.leafletElement.getElement().play();
      }
    }
  }, {
    key: 'updateLeafletElement',
    value: function updateLeafletElement(fromProps, toProps) {
      if (toProps.url !== fromProps.url) {
        this.leafletElement.setUrl(toProps.url);
      }
      if (toProps.bounds !== fromProps.bounds) {
        this.leafletElement.setBounds((0, _leaflet.latLngBounds)(toProps.bounds));
      }
      if (toProps.opacity !== fromProps.opacity) {
        this.leafletElement.setOpacity(toProps.opacity);
      }
      if (toProps.zIndex !== fromProps.zIndex) {
        this.leafletElement.setZIndex(toProps.zIndex);
      }
      if (toProps.play && !fromProps.play) {
        this.leafletElement.getElement().play();
      } else if (!toProps.play && fromProps.play) {
        this.leafletElement.getElement().pause();
      }
    }
  }]);
  return VideoOverlay;
}(_MapLayer3.default);

VideoOverlay.propTypes = {
  attribution: _propTypes2.default.string,
  bounds: _bounds2.default.isRequired,
  opacity: _propTypes2.default.number,
  play: _propTypes2.default.bool,
  url: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string)]).isRequired,
  zIndex: _propTypes2.default.number
};
exports.default = VideoOverlay;