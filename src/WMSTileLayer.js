import { PropTypes } from 'react';
import { tileLayer } from 'leaflet';

import BaseTileLayer from './BaseTileLayer';

export default class WMSTileLayer extends BaseTileLayer {
  static propTypes = {
    url: PropTypes.string.isRequired,
  };

  componentWillMount() {
    super.componentWillMount();
    const { map: _map, layerContainer: _lc, url, ...props } = this.props;
    this.leafletElement = tileLayer.wms(url, props);
  }
}
