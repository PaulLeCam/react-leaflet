import Leaflet from "leaflet";

import latlngType from "./types/latlng";
import PopupContainer from "./PopupContainer";

export default class Marker extends PopupContainer {
  componentWillMount() {
    super.componentWillMount();
    const {map, position, ...props} = this.props;
    this.leafletElement = Leaflet.marker(position, props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.position !== prevProps.position) {
      this.leafletElement.setLatLng(this.props.position);
    }

    if (this.props.icon !== prevProps.icon) {
      this.getLeafletElement().setIcon(this.props.icon);
    }
  }
}

Marker.propTypes = {
  position: latlngType.isRequired
};
