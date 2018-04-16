// @flow

import { FeatureGroup as LeafletFeatureGroup } from 'leaflet'

import { withLeaflet } from './context'
import Path from './Path'
import type { PathProps } from './types'

type LeafletElement = LeafletFeatureGroup
type Props = PathProps

class FeatureGroup extends Path<LeafletElement, Props> {
  createLeafletElement(props: Props): LeafletElement {
    const el = new LeafletFeatureGroup(this.getOptions(props))
    this.contextValue = {
      ...props.leaflet,
      layerContainer: el,
      popupContainer: el,
    }
    return el
  }

  componentDidMount() {
    super.componentDidMount()
    this.setStyle(this.props)
  }
}

export default withLeaflet(FeatureGroup)
