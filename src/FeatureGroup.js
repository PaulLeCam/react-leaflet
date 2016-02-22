import { featureGroup } from 'leaflet';

import Path from './Path';

export default class FeatureGroup extends Path {
  componentWillMount() {
    this.leafletElement = featureGroup();
  }

  componentDidMount() {
    super.componentDidMount();
    this.setStyle(this.props);
  }

  componentDidUpdate(prevProps) {
    this.setStyleIfChanged(prevProps, this.props);
  }

  render() {
    return this.renderChildrenWithProps({
      layerGroup: this.leafletElement,
      popupContainer: this.leafletElement,
    });
  }
}
