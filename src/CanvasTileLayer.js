import Leaflet from "leaflet-headless";
import BaseTileLayer from "./BaseTileLayer";

export default class CanvasTileLayer extends BaseTileLayer {
  componentWillMount() {
    super.componentWillMount();
    const {map, ...props} = this.props;
    this.leafletElement = Leaflet.tileLayer.canvas(props);
  }
}
