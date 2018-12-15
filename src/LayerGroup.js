// @flow

import { LayerGroup as LeafletLayerGroup } from 'leaflet'

import { withLeaflet } from './context'
import MapLayer from './MapLayer'
import type { MapLayerProps } from './types'

type LeafletElement = LeafletLayerGroup
type Props = MapLayerProps

class LayerGroup extends MapLayer<LeafletElement, Props> {
  createLeafletElement(props: Props): LeafletElement {
    const el = new LeafletLayerGroup(this.getOptions(props))
    this.contextValue = { ...props.leaflet, layerContainer: el }
    return el
  }
}

export default withLeaflet<Props, LayerGroup>(LayerGroup)
