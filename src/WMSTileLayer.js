/* @flow */

import { tileLayer } from 'leaflet'
import { isEqual } from 'lodash'
import { PropTypes } from 'react'

import childrenType from './types/children'
import GridLayer from './GridLayer'

export default class WMSTileLayer extends GridLayer {
  static propTypes = {
    children: childrenType,
    opacity: PropTypes.number,
    url: PropTypes.string.isRequired,
    zIndex: PropTypes.number,
  };

  componentWillMount () {
    super.componentWillMount()
    const { url, ...props } = this.props
    this.leafletElement = tileLayer.wms(url, this.getOptions(props))
  }

  componentDidUpdate (prevProps: Object) {
    super.componentDidUpdate(prevProps)
    const { url: prevUrl, ...prevParams } = prevProps
    const { url, ...params } = this.props

    delete prevParams.zIndex
    delete prevParams.opacity
    delete params.zIndex
    delete params.opacity

    if (url !== prevUrl) {
      this.leafletElement.setUrl(url)
    }
    if (!isEqual(params, prevParams)) {
      this.leafletElement.setParams(params)
    }
  }
}
