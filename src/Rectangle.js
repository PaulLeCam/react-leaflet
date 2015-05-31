import { rectangle } from 'leaflet';

import boundsType from './types/bounds';
import PopupContainer from './PopupContainer';

export default class Rectangle extends PopupContainer {
  static propTypes = {
    bounds: boundsType.isRequired
  };

  componentWillMount() {
    super.componentWillMount();
    const { bounds, map, ...props } = this.props;
    this.leafletElement = rectangle(bounds, props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.bounds !== prevProps.bounds) {
      this.leafletElement.setBounds(this.props.bounds);
    }
  }
}
