'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _lodashLangClone = require('lodash/lang/clone');

var _lodashLangClone2 = _interopRequireDefault(_lodashLangClone);

var _lodashCollectionForEach = require('lodash/collection/forEach');

var _lodashCollectionForEach2 = _interopRequireDefault(_lodashCollectionForEach);

var _lodashCollectionReduce = require('lodash/collection/reduce');

var _lodashCollectionReduce2 = _interopRequireDefault(_lodashCollectionReduce);

var _lodashObjectKeys = require('lodash/object/keys');

var _lodashObjectKeys2 = _interopRequireDefault(_lodashObjectKeys);

var _react = require('react');

var EVENTS_RE = /on(?:Leaflet)?(.+)/i;

var MapComponent = (function (_Component) {
  function MapComponent() {
    _classCallCheck(this, MapComponent);

    if (_Component != null) {
      _Component.apply(this, arguments);
    }
  }

  _inherits(MapComponent, _Component);

  _createClass(MapComponent, [{
    key: 'getLeafletElement',
    value: function getLeafletElement() {
      return this.leafletElement;
    }
  }, {
    key: 'extractLeafletEvents',
    value: function extractLeafletEvents(props) {
      return (0, _lodashCollectionReduce2['default'])((0, _lodashObjectKeys2['default'])(props), function (res, ev) {
        if (EVENTS_RE.test(ev)) {
          var key = ev.replace(EVENTS_RE, function (match, p) {
            return p.toLowerCase();
          });
          res[key] = props[ev];
        }
        return res;
      }, {});
    }
  }, {
    key: 'bindLeafletEvents',
    value: function bindLeafletEvents() {
      var next = arguments[0] === undefined ? {} : arguments[0];
      var prev = arguments[1] === undefined ? {} : arguments[1];

      var el = this.leafletElement;
      if (!el) return;

      var diff = (0, _lodashLangClone2['default'])(prev);
      (0, _lodashCollectionForEach2['default'])(prev, function (cb, ev) {
        if (!next[ev] || cb !== next[ev]) {
          delete diff[ev];
          el.off(ev, cb);
        }
      });

      (0, _lodashCollectionForEach2['default'])(next, function (cb, ev) {
        if (!prev[ev] || cb !== prev[ev]) {
          diff[ev] = cb;
          el.on(ev, cb);
        }
      });

      return diff;
    }
  }, {
    key: 'fireLeafletEvent',
    value: function fireLeafletEvent(type, data) {
      var el = this.leafletElement;
      if (el) el.fire(type, data);
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this._leafletEvents = this.extractLeafletEvents(this.props);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.bindLeafletEvents(this._leafletEvents);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var next = this.extractLeafletEvents(nextProps);
      this._leafletEvents = this.bindLeafletEvents(next, this._leafletEvents);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var el = this.leafletElement;
      if (!el) return;

      (0, _lodashCollectionForEach2['default'])(this._leafletEvents, function (cb, ev) {
        el.off(ev, cb);
      });
    }
  }]);

  return MapComponent;
})(_react.Component);

exports['default'] = MapComponent;
module.exports = exports['default'];