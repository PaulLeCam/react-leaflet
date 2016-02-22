import isEqual from 'lodash/isEqual';
import pick from 'lodash/pick';

import MapLayer from './MapLayer';

const OPTIONS = [
  'stroke',
  'color',
  'weight',
  'opacity',
  'fill',
  'fillColor',
  'fillOpacity',
  'fillRule',
  'dashArray',
  'lineCap',
  'lineJoin',
  'clickable',
  'pointerEvents',
  'className',
];

export default class Path extends MapLayer {
  getPathOptions(props) {
    return pick(props, OPTIONS);
  }

  setStyle(options = {}) {
    this.leafletElement.setStyle(options);
  }

  setStyleIfChanged(fromProps, toProps) {
    const nextStyle = this.getPathOptions(toProps);
    if (!isEqual(nextStyle, this.getPathOptions(fromProps))) {
      this.setStyle(nextStyle);
    }
  }

  render() {
    return this.renderChildrenWithProps({
      popupContainer: this.leafletElement,
    });
  }
}
