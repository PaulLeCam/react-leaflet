// @flow

import { TileLayer as LeafletTileLayer } from 'leaflet'

import { withLeaflet } from './context'
import GridLayer from './GridLayer'
import type { GridLayerProps } from './types'

type LeafletElement = LeafletTileLayer
type Props = { url: string } & GridLayerProps

class TileLayer extends GridLayer<LeafletElement, Props> {
  createLeafletElement(props: Props): LeafletElement {
    return new LeafletTileLayer(props.url, this.getOptions(props))
  }

  updateLeafletElement(fromProps: Props, toProps: Props) {
    super.updateLeafletElement(fromProps, toProps)
    if (toProps.url !== fromProps.url) {
      this.leafletElement.setUrl(toProps.url)
	}

	if(toProps.attribution !== fromProps.attribution) {
		const map = toProps.leaflet.map;

		map.attributionControl.removeAttribution(fromProps.attribution);
		map.attributionControl.addAttribution(toProps.attribution);
	}
  }
}

export default withLeaflet(TileLayer)
