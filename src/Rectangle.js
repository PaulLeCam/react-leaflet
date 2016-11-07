/* @flow */

import { rectangle } from 'leaflet'
import { PropTypes } from 'react'

import boundsType from './types/bounds'
import childrenType from './types/children'
import Path from './Path'

export default class Rectangle extends Path {
  static propTypes = {
    children: childrenType,
    bounds: boundsType.isRequired,
    popupContainer: PropTypes.object,
  };

  componentWillMount () {
    super.componentWillMount()
    const { bounds, ...props } = this.props
    this.leafletElement = rectangle(bounds, this.getOptions(props))
  }

  componentDidUpdate (prevProps: Object) {
    if (this.props.bounds !== prevProps.bounds) {
      this.leafletElement.setBounds(this.props.bounds)
    }
    this.setStyleIfChanged(prevProps, this.props)
  }
}
