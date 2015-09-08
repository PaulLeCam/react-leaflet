import isEqual from 'lodash/lang/isEqual';
import pick from 'lodash/object/pick';

import PopupContainer from './PopupContainer';

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

export default class Path extends PopupContainer {
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
