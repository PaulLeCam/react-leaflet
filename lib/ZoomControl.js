'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _leaflet = require('leaflet');

var _react = require('react');

var _MapControl2 = require('./MapControl');

var _MapControl3 = _interopRequireDefault(_MapControl2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ZoomControl = function (_MapControl) {
  _inherits(ZoomControl, _MapControl);

  function ZoomControl() {
    _classCallCheck(this, ZoomControl);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ZoomControl).apply(this, arguments));
  }

  _createClass(ZoomControl, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.leafletElement = _leaflet.control.zoom(this.props);
    }
  }]);

  return ZoomControl;
}(_MapControl3.default);

ZoomControl.propTypes = {
  zoomInText: _react.PropTypes.string,
  zoomInTitle: _react.PropTypes.string,
  zoomOutText: _react.PropTypes.string,
  zoomOutTitle: _react.PropTypes.string
};
exports.default = ZoomControl;