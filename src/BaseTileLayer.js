import { PropTypes } from 'react';

import MapLayer from './MapLayer';

export default class BaseTileLayer extends MapLayer {
  static propTypes = {
    opacity: PropTypes.number,
    zIndex: PropTypes.number,
  };

  componentDidUpdate(prevProps) {
    const { opacity, zIndex } = this.props;
    if (typeof opacity === "number" && opacity !== prevProps.opacity) {
      this.leafletElement.setOpacity(opacity);
    }
    if (typeof zIndex === "number" && zIndex !== prevProps.zIndex) {
      this.leafletElement.setZIndex(zIndex);
    }
  }

  render() {
    return null;
  }
}
