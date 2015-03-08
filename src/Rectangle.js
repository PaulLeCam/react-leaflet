import Leaflet from "leaflet";

import boundsType from "./types/bounds";
import PopupContainer from "./PopupContainer";

export default class Rectangle extends PopupContainer {
  componentWillMount() {
    super.componentWillMount();
    const {bounds, map, ...props} = this.props;
    this.leafletElement = Leaflet.rectangle(bounds, props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.bounds !== prevProps.bounds) {
      this.leafletElement.setBounds(this.props.bounds);
    }
  }
}

Rectangle.propTypes = {
  bounds: boundsType.isRequired
};
