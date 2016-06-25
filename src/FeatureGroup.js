/* @flow */

import { featureGroup } from 'leaflet'
import { PropTypes } from 'react'

import layerContainerType from './types/layerContainer'
import Path from './Path'

export default class FeatureGroup extends Path {
  static childContextTypes = {
    layerContainer: layerContainerType,
    popupContainer: PropTypes.object,
  };

  getChildContext () {
    return {
      layerContainer: this.leafletElement,
      popupContainer: this.leafletElement,
    }
  }

  componentWillMount () {
    this.leafletElement = featureGroup()
  }

  componentDidMount () {
    super.componentDidMount()
    this.setStyle(this.props)
  }

  componentDidUpdate (prevProps: Object) {
    this.setStyleIfChanged(prevProps, this.props)
  }
}
