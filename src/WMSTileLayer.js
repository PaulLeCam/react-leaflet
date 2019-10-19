// @flow

import { TileLayer } from 'leaflet'
import isEqual from 'fast-deep-equal'

import { withLeaflet } from './context'
import GridLayer from './GridLayer'
import { EVENTS_RE } from './MapEvented'
import type { GridLayerProps } from './types'

type LeafletElement = TileLayer.WMS
type Props = { url: string } & GridLayerProps

class WMSTileLayer extends GridLayer<LeafletElement, Props> {
  createLeafletElement(props: Props): LeafletElement {
    const { url, ...params } = props
    const { leaflet: _l, ...options } = this.getOptions(params)
    return new TileLayer.WMS(url, options)
  }

  updateLeafletElement(fromProps: Props, toProps: Props) {
    super.updateLeafletElement(fromProps, toProps)

    const { url: prevUrl, opacity: _po, zIndex: _pz, ...prevProps } = fromProps
    const { leaflet: _pl, ...prevParams } = this.getOptions(prevProps)
    const { url, opacity: _o, zIndex: _z, ...props } = toProps
    const { leaflet: _l, ...params } = this.getOptions(props)

    if (url !== prevUrl) {
      this.leafletElement.setUrl(url)
    }
    if (!isEqual(params, prevParams)) {
      this.leafletElement.setParams(params)
    }
  }

  getOptions(params: Object): Object {
    const superOptions = super.getOptions(params)
    return Object.keys(superOptions).reduce((options, key) => {
      if (!EVENTS_RE.test(key)) {
        options[key] = superOptions[key]
      }
      return options
    }, {})
  }
}

export default withLeaflet<Props, WMSTileLayer>(WMSTileLayer)
