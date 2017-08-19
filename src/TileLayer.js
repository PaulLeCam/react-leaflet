// @flow

import { TileLayer as LeafletTileLayer } from 'leaflet'
import PropTypes from 'prop-types'

import GridLayer from './GridLayer'
import children from './propTypes/children'
import type { GridLayerProps } from './types'

type LeafletElement = LeafletTileLayer
type Props = { url: string } & GridLayerProps

export default class TileLayer extends GridLayer<LeafletElement, Props> {
  static propTypes = {
    children: children,
    opacity: PropTypes.number,
    url: PropTypes.string.isRequired,
    zIndex: PropTypes.number,
  }

  createLeafletElement(props: Props): LeafletElement {
    return new LeafletTileLayer(props.url, this.getOptions(props))
  }

  updateLeafletElement(fromProps: Props, toProps: Props) {
    super.updateLeafletElement(fromProps, toProps)
    if (toProps.url !== fromProps.url) {
      this.leafletElement.setUrl(toProps.url)
    }
  }
}
