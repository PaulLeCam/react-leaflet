/* @flow */

import { rectangle } from 'leaflet'

import boundsType from './types/bounds'
import Path from './Path'

export default class Rectangle extends Path {
  static propTypes = {
    bounds: boundsType.isRequired,
  };

  componentWillMount () {
    super.componentWillMount()
    const { bounds, ...props } = this.props
    this.leafletElement = rectangle(bounds, props)
  }

  componentDidUpdate (prevProps: Object) {
    if (this.props.bounds !== prevProps.bounds) {
      this.leafletElement.setBounds(this.props.bounds)
    }
    this.setStyleIfChanged(prevProps, this.props)
  }
}
