import { PropTypes, Component } from 'react';
import { featureGroup } from 'leaflet';
import Draw from "leaflet-draw";

import MapControl from './MapControl';

export default class EditControl extends MapControl {
  static propTypes = {
    onCreate: PropTypes.func,
    onEdit: PropTypes.func
  };

  componentWillMount() {
    this.leafletElement = new L.Control.Draw(Object.assign({}, {
        edit: {
            featureGroup: this.props.layerGroup
        }
    }, this.props));

    this.props.map.on('draw:created', (e) => {
        this.props.layerGroup.addLayer(e.layer);
        this.props.onCreate.call(null, e);
    });

    this.props.map.on('draw:edited', this.props.onEdit);
  }
}
