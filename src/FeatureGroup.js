// @flow

import { FeatureGroup as LeafletFeatureGroup, type Layer } from 'leaflet'

import Path from './Path'
import children from './propTypes/children'
import layer from './propTypes/layer'
import layerContainer from './propTypes/layerContainer'
import type { PathProps } from './types'

type LeafletElement = LeafletFeatureGroup
type Props = PathProps
type ChildContext = {
  layerContainer: Layer,
  popupContainer: Layer,
}

export default class FeatureGroup extends Path<LeafletElement, Props> {
  static childContextTypes: Object = {
    children: children,
    layerContainer: layerContainer,
    popupContainer: layer,
  }

  getChildContext(): ChildContext {
    return {
      layerContainer: this.leafletElement,
      popupContainer: this.leafletElement,
    }
  }

  createLeafletElement(props: Props): LeafletElement {
    return new LeafletFeatureGroup(this.getOptions(props))
  }

  componentDidMount() {
    super.componentDidMount()
    this.setStyle(this.props)
  }
}
