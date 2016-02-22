import { PropTypes } from 'react';
import { imageOverlay, Map } from 'leaflet';

import boundsType from './types/bounds';
import MapLayer from './MapLayer';

export default class ImageOverlay extends MapLayer {
  static propTypes = {
    attribution: PropTypes.string,
    bounds: boundsType.isRequired,
    map: PropTypes.instanceOf(Map),
    opacity: PropTypes.number,
    url: PropTypes.string.isRequired,
  };

  componentWillMount() {
    super.componentWillMount();
    const { bounds, map, url, ...props } = this.props;
    this.leafletElement = imageOverlay(url, bounds, props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.url !== prevProps.url) {
      this.leafletElement.setUrl(this.props.url);
    }
    if (this.props.opacity !== prevProps.opacity) {
      this.leafletElement.setOpacity(this.props.opacity);
    }
  }

  render() {
    return null;
  }
}
