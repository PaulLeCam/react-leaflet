(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _simple = require('./simple');

var _simple2 = _interopRequireDefault(_simple);

var _events = require('./events');

var _events2 = _interopRequireDefault(_events);

var _bounds = require('./bounds');

var _bounds2 = _interopRequireDefault(_bounds);

var _vectorLayers = require('./vector-layers');

var _vectorLayers2 = _interopRequireDefault(_vectorLayers);

var _otherLayers = require('./other-layers');

var _otherLayers2 = _interopRequireDefault(_otherLayers);

var examples = _react2['default'].createElement(
  'div',
  null,
  _react2['default'].createElement(
    'h1',
    null,
    'React-Leaflet examples'
  ),
  _react2['default'].createElement(
    'h2',
    null,
    'Popup with Marker'
  ),
  _react2['default'].createElement(_simple2['default'], null),
  _react2['default'].createElement(
    'h2',
    null,
    'Events'
  ),
  _react2['default'].createElement(
    'p',
    null,
    'Click the map to show a marker at your detected location'
  ),
  _react2['default'].createElement(_events2['default'], null),
  _react2['default'].createElement(
    'h2',
    null,
    'Map view by bounds'
  ),
  _react2['default'].createElement(
    'p',
    null,
    'Click a rectangle to fit the map to its bounds'
  ),
  _react2['default'].createElement(_bounds2['default'], null),
  _react2['default'].createElement(
    'h2',
    null,
    'Vector layers'
  ),
  _react2['default'].createElement(_vectorLayers2['default'], null),
  _react2['default'].createElement(
    'h2',
    null,
    'Other layers'
  ),
  _react2['default'].createElement(_otherLayers2['default'], null)
);

(0, _reactDom.render)(examples, document.getElementById('app'));

},{"./bounds":2,"./events":3,"./other-layers":4,"./simple":5,"./vector-layers":6,"react":"react","react-dom":"react-dom"}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactLeaflet = require('react-leaflet');

var outer = [[50.505, -29.09], [52.505, 29.09]];
var inner = [[49.505, -2.09], [53.505, 2.09]];

var BoundsExample = (function (_Component) {
  _inherits(BoundsExample, _Component);

  function BoundsExample() {
    _classCallCheck(this, BoundsExample);

    _get(Object.getPrototypeOf(BoundsExample.prototype), 'constructor', this).call(this);
    this.state = {
      bounds: outer
    };
  }

  _createClass(BoundsExample, [{
    key: 'handleClick',
    value: function handleClick() {
      if (this.state.bounds === outer) {
        this.setState({ bounds: inner });
      } else {
        this.setState({ bounds: outer });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      return _react2['default'].createElement(
        _reactLeaflet.Map,
        { bounds: this.state.bounds },
        _react2['default'].createElement(_reactLeaflet.TileLayer, {
          attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        }),
        _react2['default'].createElement(_reactLeaflet.Rectangle, {
          bounds: outer,
          color: this.state.bounds === outer ? 'red' : 'white',
          onClick: function () {
            return _this.setState({ bounds: outer });
          }
        }),
        _react2['default'].createElement(_reactLeaflet.Rectangle, {
          bounds: inner,
          color: this.state.bounds === inner ? 'red' : 'white',
          onClick: function () {
            return _this.setState({ bounds: inner });
          }
        })
      );
    }
  }]);

  return BoundsExample;
})(_react.Component);

exports['default'] = BoundsExample;
module.exports = exports['default'];

},{"react":"react","react-leaflet":"react-leaflet"}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactLeaflet = require('react-leaflet');

var EventsExample = (function (_Component) {
  _inherits(EventsExample, _Component);

  function EventsExample() {
    _classCallCheck(this, EventsExample);

    _get(Object.getPrototypeOf(EventsExample.prototype), 'constructor', this).call(this);
    this.state = {
      hasLocation: false,
      latlng: {
        lat: 51.505,
        lng: -0.09
      }
    };
  }

  _createClass(EventsExample, [{
    key: 'handleClick',
    value: function handleClick() {
      this.refs.map.leafletElement.locate();
    }
  }, {
    key: 'handleLocationFound',
    value: function handleLocationFound(e) {
      this.setState({
        hasLocation: true,
        latlng: e.latlng
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var marker = this.state.hasLocation ? _react2['default'].createElement(
        _reactLeaflet.Marker,
        { position: this.state.latlng },
        _react2['default'].createElement(
          _reactLeaflet.Popup,
          null,
          _react2['default'].createElement(
            'span',
            null,
            'You are here'
          )
        )
      ) : null;

      return _react2['default'].createElement(
        _reactLeaflet.Map,
        {
          center: this.state.latlng,
          length: 4,
          onClick: this.handleClick.bind(this),
          onLocationfound: this.handleLocationFound.bind(this),
          ref: 'map',
          zoom: 13 },
        _react2['default'].createElement(_reactLeaflet.TileLayer, {
          attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        }),
        marker
      );
    }
  }]);

  return EventsExample;
})(_react.Component);

exports['default'] = EventsExample;
module.exports = exports['default'];

},{"react":"react","react-leaflet":"react-leaflet"}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactLeaflet = require('react-leaflet');

var OtherLayersExample = (function (_Component) {
  _inherits(OtherLayersExample, _Component);

  function OtherLayersExample() {
    _classCallCheck(this, OtherLayersExample);

    _get(Object.getPrototypeOf(OtherLayersExample.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(OtherLayersExample, [{
    key: 'render',
    value: function render() {
      var center = [51.505, -0.09];

      var rectangle = [[51.49, -0.08], [51.5, -0.06]];

      return _react2['default'].createElement(
        _reactLeaflet.Map,
        { center: center, zoom: 13 },
        _react2['default'].createElement(_reactLeaflet.TileLayer, {
          attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        }),
        _react2['default'].createElement(
          _reactLeaflet.LayerGroup,
          null,
          _react2['default'].createElement(_reactLeaflet.Circle, { center: center, fillColor: 'blue', radius: 200 }),
          _react2['default'].createElement(_reactLeaflet.Circle, { center: center, fillColor: 'red', radius: 100, stroke: false }),
          _react2['default'].createElement(
            _reactLeaflet.LayerGroup,
            null,
            _react2['default'].createElement(_reactLeaflet.Circle, { center: [51.51, -0.08], color: 'green', fillColor: 'green', radius: 100 })
          )
        ),
        _react2['default'].createElement(
          _reactLeaflet.FeatureGroup,
          { color: 'purple' },
          _react2['default'].createElement(
            _reactLeaflet.Popup,
            null,
            _react2['default'].createElement(
              'span',
              null,
              'Popup in FeatureGroup'
            )
          ),
          _react2['default'].createElement(_reactLeaflet.Circle, { center: [51.51, -0.06], radius: 200 }),
          _react2['default'].createElement(_reactLeaflet.Rectangle, { bounds: rectangle })
        )
      );
    }
  }]);

  return OtherLayersExample;
})(_react.Component);

exports['default'] = OtherLayersExample;
module.exports = exports['default'];

},{"react":"react","react-leaflet":"react-leaflet"}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactLeaflet = require('react-leaflet');

var SimpleExample = (function (_Component) {
  _inherits(SimpleExample, _Component);

  function SimpleExample() {
    _classCallCheck(this, SimpleExample);

    _get(Object.getPrototypeOf(SimpleExample.prototype), 'constructor', this).call(this);
    this.state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 13
    };
  }

  _createClass(SimpleExample, [{
    key: 'render',
    value: function render() {
      var position = [this.state.lat, this.state.lng];
      return _react2['default'].createElement(
        _reactLeaflet.Map,
        { center: position, zoom: this.state.zoom },
        _react2['default'].createElement(_reactLeaflet.TileLayer, {
          attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        }),
        _react2['default'].createElement(
          _reactLeaflet.Marker,
          { position: position },
          _react2['default'].createElement(
            _reactLeaflet.Popup,
            null,
            _react2['default'].createElement(
              'span',
              null,
              'A pretty CSS3 popup. ',
              _react2['default'].createElement('br', null),
              ' Easily customizable.'
            )
          )
        )
      );
    }
  }]);

  return SimpleExample;
})(_react.Component);

exports['default'] = SimpleExample;
module.exports = exports['default'];

},{"react":"react","react-leaflet":"react-leaflet"}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactLeaflet = require('react-leaflet');

var VectorLayersExample = (function (_Component) {
  _inherits(VectorLayersExample, _Component);

  function VectorLayersExample() {
    _classCallCheck(this, VectorLayersExample);

    _get(Object.getPrototypeOf(VectorLayersExample.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(VectorLayersExample, [{
    key: 'render',
    value: function render() {
      var center = [51.505, -0.09];

      var polyline = [[51.505, -0.09], [51.51, -0.1], [51.51, -0.12]];

      var multiPolyline = [[[51.5, -0.1], [51.5, -0.12], [51.52, -0.12]], [[51.5, -0.05], [51.5, -0.06], [51.52, -0.06]]];

      var polygon = [[51.515, -0.09], [51.52, -0.1], [51.52, -0.12]];

      var multiPolygon = [[[51.51, -0.12], [51.51, -0.13], [51.53, -0.13]], [[51.51, -0.05], [51.51, -0.07], [51.53, -0.07]]];

      var rectangle = [[51.49, -0.08], [51.5, -0.06]];

      return _react2['default'].createElement(
        _reactLeaflet.Map,
        { center: center, zoom: 13 },
        _react2['default'].createElement(_reactLeaflet.TileLayer, {
          attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        }),
        _react2['default'].createElement(_reactLeaflet.Circle, { center: center, fillColor: 'blue', radius: 200 }),
        _react2['default'].createElement(
          _reactLeaflet.CircleMarker,
          { center: [51.51, -0.12], color: 'red', radius: 20 },
          _react2['default'].createElement(
            _reactLeaflet.Popup,
            null,
            _react2['default'].createElement(
              'span',
              null,
              'Popup in CircleMarker'
            )
          )
        ),
        _react2['default'].createElement(_reactLeaflet.Polyline, { color: 'lime', positions: polyline }),
        _react2['default'].createElement(_reactLeaflet.MultiPolyline, { color: 'lime', polylines: multiPolyline }),
        _react2['default'].createElement(_reactLeaflet.Polygon, { color: 'purple', positions: polygon }),
        _react2['default'].createElement(_reactLeaflet.MultiPolygon, { color: 'purple', polygons: multiPolygon }),
        _react2['default'].createElement(_reactLeaflet.Rectangle, { bounds: rectangle, color: 'black' })
      );
    }
  }]);

  return VectorLayersExample;
})(_react.Component);

exports['default'] = VectorLayersExample;
module.exports = exports['default'];

},{"react":"react","react-leaflet":"react-leaflet"}]},{},[1]);
