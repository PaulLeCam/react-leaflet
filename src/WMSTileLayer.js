/* @flow */

import { tileLayer } from 'leaflet'
import { isEqual } from 'lodash'
import { PropTypes } from 'react'

import GridLayer from './GridLayer'

export default class WMSTileLayer extends GridLayer {
  static propTypes = {
    url: PropTypes.string.isRequired,
  };

  componentWillMount () {
    super.componentWillMount()
    const { url, ...props } = this.props
    this.leafletElement = tileLayer.wms(url, this.getOptions(props))
  }

  componentDidUpdate (prevProps: Object) {
    if (!isEqual(this.props, prevProps)) {
      this.leafletElement.setParams(this.props)
    }
  }
}
