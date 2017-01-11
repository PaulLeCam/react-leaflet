// @flow

import { featureGroup } from 'leaflet'
import { PropTypes } from 'react'

import childrenType from './types/children'
import layerContainerType from './types/layerContainer'
import Path from './Path'

type FGChild = {
  layerContainer: Object,
  popupContainer: Object,
}

export default class FeatureGroup extends Path {
  static childContextTypes = {
    children: childrenType,
    layerContainer: layerContainerType,
    popupContainer: PropTypes.object,
  }

  getChildContext (): FGChild {
    return {
      layerContainer: this.leafletElement,
      popupContainer: this.leafletElement,
    }
  }

  createLeafletElement (props: Object) {
    return featureGroup(this.getOptions(props))
  }

  componentDidMount () {
    super.componentDidMount()
    this.setStyle(this.props)
  }
}
