'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _leaflet = require('leaflet');

var _reactLeaflet = require('react-leaflet');

// Not possible until CartoDB releases an npm package for the Core API.
// import { Tiles } from 'cartodb';

// Until then, consumer applications must include the cartodb.js script elsewhere,
// e.g. in index.html as <script src="http://libs.cartocdn.com/cartodb.js/v3/3.15/cartodb.core.js"></script>
var Tiles = cartodb.Tiles;

var CartoDBTileLayer = (function (_BaseTileLayer) {
	_inherits(CartoDBTileLayer, _BaseTileLayer);

	function CartoDBTileLayer() {
		_classCallCheck(this, CartoDBTileLayer);

		_get(Object.getPrototypeOf(CartoDBTileLayer.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(CartoDBTileLayer, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			_get(Object.getPrototypeOf(CartoDBTileLayer.prototype), 'componentWillMount', this).call(this);
			var _props = this.props;
			var map = _props.map;
			var url = _props.url;

			var props = _objectWithoutProperties(_props, ['map', 'url']);

			this.leafletElement = (0, _leaflet.tileLayer)(url, props);

			this._getCartoDBTilesTemplates((function (error, response) {
				if (error) {
					// TODO: handle error
					// console.error(error);
				} else {
						this.leafletElement.setUrl(response.tiles[0]);
					}
			}).bind(this));
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps) {
			var url = this.props.url;

			if (url && url !== prevProps.url) {
				this.leafletElement.setUrl(url);
			}
		}
	}, {
		key: '_getCartoDBTilesTemplates',
		value: function _getCartoDBTilesTemplates(callback) {
			Tiles.getTiles({
				type: 'cartodb',
				user_name: this.props.userId,
				sublayers: [{
					'sql': this.props.sql,
					'cartocss': this.props.cartocss
				}]
			}, function (tiles, error) {
				if (!tiles || error) {
					callback(error, tiles);
				}
				callback(null, tiles);
			});
		}
	}], [{
		key: 'propTypes',
		value: {
			url: _react.PropTypes.string.isRequired
		},
		enumerable: true
	}]);

	return CartoDBTileLayer;
})(_reactLeaflet.BaseTileLayer);

exports['default'] = CartoDBTileLayer;
module.exports = exports['default'];