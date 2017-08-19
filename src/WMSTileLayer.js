// @flow

import { TileLayer } from 'leaflet'
import { isEqual } from 'lodash'
import PropTypes from 'prop-types'

import GridLayer from './GridLayer'
import children from './propTypes/children'
import type { GridLayerProps } from './types'

type LeafletElement = TileLayer.WMS
type Props = { url: string } & GridLayerProps

export default class WMSTileLayer extends GridLayer<LeafletElement, Props> {
  static propTypes = {
    children: children,
    opacity: PropTypes.number,
    url: PropTypes.string.isRequired,
    zIndex: PropTypes.number,
  }

  createLeafletElement(props: Props): LeafletElement {
    return new TileLayer.WMS(props.url, this.getOptions(props))
  }

  updateLeafletElement(fromProps: Props, toProps: Props) {
    super.updateLeafletElement(fromProps, toProps)

    const { url: prevUrl, opacity: _po, zIndex: _pz, ...prevParams } = fromProps
    const { url, opacity: _o, zIndex: _z, ...params } = toProps

    if (url !== prevUrl) {
      this.leafletElement.setUrl(url)
    }
    if (!isEqual(params, prevParams)) {
      this.leafletElement.setParams(params)
    }
  }
}
