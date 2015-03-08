"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var React = _interopRequire(require("react"));

var Leaflet = _interopRequire(require("leaflet"));

var latlngListType = _interopRequire(require("./types/latlngList"));

var PopupContainer = _interopRequire(require("./PopupContainer"));

var MultiPolyline = (function (_PopupContainer) {
  function MultiPolyline() {
    _classCallCheck(this, MultiPolyline);

    if (_PopupContainer != null) {
      _PopupContainer.apply(this, arguments);
    }
  }

  _inherits(MultiPolyline, _PopupContainer);

  _createClass(MultiPolyline, {
    componentWillMount: {
      value: function componentWillMount() {
        _get(Object.getPrototypeOf(MultiPolyline.prototype), "componentWillMount", this).call(this);
        var _props = this.props;
        var map = _props.map;
        var polylines = _props.polylines;

        var props = _objectWithoutProperties(_props, ["map", "polylines"]);

        this.leafletElement = Leaflet.multiPolyline(polylines, props);
      }
    },
    componentDidUpdate: {
      value: function componentDidUpdate(prevProps) {
        if (this.props.polylines !== prevProps.polylines) {
          this.leafletElement.setLatLngs(this.props.polylines);
        }
      }
    }
  });

  return MultiPolyline;
})(PopupContainer);

module.exports = MultiPolyline;

MultiPolyline.propTypes = {
  polylines: React.PropTypes.arrayOf(latlngListType).isRequired
};