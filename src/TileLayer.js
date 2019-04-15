// @flow
import { TileLayer as LeafletTileLayer } from 'leaflet';

import { withLeaflet } from './context';
import GridLayer from './GridLayer';

import type { GridLayerProps } from './types';

type LeafletElement = LeafletTileLayer;
type coords = { z: string, x: string, y: string };
type Props = {
	url: string,
	create?: (coords: coords, done: Promise<any>) => LeafletElement,
} & GridLayerProps;

class TileLayer extends GridLayer<LeafletElement, Props> {
	createLeafletElement(props: Props): LeafletElement {
		const leafletTile: LeafletElement = new LeafletTileLayer(
			props.url,
			this.getOptions(props),
		);
		if (props.create) {
			leafletTile.createTile = props.create;
		}
		return leafletTile;
	}

	updateLeafletElement(fromProps: Props, toProps: Props) {
		super.updateLeafletElement(fromProps, toProps);
		if (toProps.url !== fromProps.url) {
			this.leafletElement.setUrl(toProps.url);
		}
	}
}

export default withLeaflet<Props, TileLayer>(TileLayer);
