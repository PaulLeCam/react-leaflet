import { isEqual, pick } from 'lodash';
import { PropTypes } from 'react';

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
  static childContextTypes = {
    popupContainer: PropTypes.object,
  };

  getChildContext() {
    return {
      popupContainer: this.leafletElement,
    };
  }

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
}
