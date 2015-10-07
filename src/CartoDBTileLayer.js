import { PropTypes } from 'react';
import { tileLayer } from 'leaflet';

import { BaseTileLayer } from 'react-leaflet';

// Not possible until CartoDB releases an npm package for the Core API.
// import { Tiles } from 'cartodb';

// Until then, consumer applications must include the cartodb.js script elsewhere,
// e.g. in index.html as <script src="http://libs.cartocdn.com/cartodb.js/v3/3.15/cartodb.core.js"></script>
const Tiles = cartodb.Tiles;

export default class CartoDBTileLayer extends BaseTileLayer {
	static propTypes = {
		url: PropTypes.string.isRequired,
	};

	componentWillMount() {
		super.componentWillMount();
		const { map, url, ...props } = this.props;
		this.leafletElement = tileLayer(url, props);

		this._getCartoDBTilesTemplates(function (error, response) {
			if (error) {
				// TODO: handle error
				// console.error(error);
			} else {
				this.leafletElement.setUrl(response.tiles[0]);
			}
		}.bind(this));
	}

	componentDidUpdate(prevProps) {
		const { url } = this.props;
		if (url && url !== prevProps.url) {
			this.leafletElement.setUrl(url);
		}
	}

	_getCartoDBTilesTemplates(callback) {
		Tiles.getTiles(
			{
				type: 'cartodb',
				user_name: this.props.userId,
				sublayers: [{
					'sql': this.props.sql,
					'cartocss': this.props.cartocss,
				}],
			},

			function (tiles, error) {
				if (!tiles || error) {
					callback(error, tiles);
				}
				callback(null, tiles);
			}
		);
	}

}
