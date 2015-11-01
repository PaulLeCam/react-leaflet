import { Component, PropTypes } from 'react';

import controlPositionType from './types/controlPosition';

export default class MapControl extends Component {
  static propTypes = {
    map: PropTypes.object,
    position: controlPositionType,
  };

  componentDidMount() {
    this.leafletElement.addTo(this.props.map);
  }

  componentDidUpdate(prevProps) {
    if (this.props.position !== prevProps.position) {
      this.leafletElement.setPosition(this.props.position);
    }
  }

  componentWillUnmount() {
    this.leafletElement.removeFrom(this.props.map);
  }

  getLeafletElement() {
    return this.leafletElement;
  }

  render() {
    return null;
  }
}
