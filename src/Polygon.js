import Leaflet from 'leaflet';
import isEqual from 'lodash/lang/isEqual';
import find from 'lodash/collection/find';

import latlngListType from './types/latlngList';
import PopupContainer from './PopupContainer';


export default class Polygon extends PopupContainer {
  componentWillMount() {
    super.componentWillMount();
    const { map, positions, ...props } = this.props;
    this.leafletElement = Leaflet.polygon(positions, props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.positions !== prevProps.positions) {
      if(!isEqual(this.props.positions, prevProps.positions)){
        this.leafletElement.setLatLngs(this.props.positions);
      }
    }
    const styleProperties = ['stroke','color','weight','opacity','fill','fillColor',
                              'fillOpacity','dashArray','lineCap','className']
    if(find(styleProperties, (prop)=> this.props[prop] !== prevProps[prop], this) ) {
      this.leafletElement.setStyle(this.props)
    }
  }
}

Polygon.propTypes = {
  positions: latlngListType.isRequired
};
