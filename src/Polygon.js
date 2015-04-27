import Leaflet from "leaflet-headless";

import latlngListType from "./types/latlngList";
import PopupContainer from "./PopupContainer";

export default class Polygon extends PopupContainer {
  componentWillMount() {
    super.componentWillMount();
    const {map, positions, ...props} = this.props;
    this.leafletElement = Leaflet.polygon(positions, props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.positions !== prevProps.positions) {
      this.leafletElement.setLatLngs(this.props.positions);
    }
  }
}

Polygon.propTypes = {
  positions: latlngListType.isRequired
};
