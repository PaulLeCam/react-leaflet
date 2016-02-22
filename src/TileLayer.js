import { PropTypes } from 'react';
import { tileLayer } from 'leaflet';

import BaseTileLayer from './BaseTileLayer';

export default class TileLayer extends BaseTileLayer {
  static propTypes = {
    url: PropTypes.string.isRequired,
  };

  componentWillMount() {
    super.componentWillMount();
    const { map, url, ...props } = this.props;
    this.leafletElement = tileLayer(url, props);
  }

  componentDidUpdate(prevProps) {
    const { url } = this.props;
    if (url && url !== prevProps.url) {
      this.leafletElement.setUrl(url);
    }
  }
}
