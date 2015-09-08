import React, { PropTypes } from 'react';
import { Map, popup } from 'leaflet';

import latlngType from './types/latlng';
import MapComponent from './MapComponent';

export default class Popup extends MapComponent {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    map: PropTypes.instanceOf(Map),
    popupContainer: PropTypes.node,
    position: latlngType,
  };

  componentWillMount() {
    super.componentWillMount();
    const { children, map, popupContainer, ...props } = this.props;
    this.leafletElement = popup(props, popupContainer);
    this.leafletElement.on('open', () => { //on popoup create new react root
      const {children} = this.props;
      this.contentComponent = React.render(React.DOM.div({children}), this.leafletElement._contentNode);
      this.leafletElement._adjustPan();
    })
    this.leafletElement.on('close', () => { //remove react root
      delete this.contentComponent;
      React.unmountComponentAtNode(this.leafletElement._contentNode);
    })
  }

  componentDidMount() {
    const { popupContainer, map, position } = this.props;
    super.componentDidMount();
    //Attach to container component
    if (popupContainer) {
      popupContainer.bindPopup(this.leafletElement);
    } else { //attach to map
      if (position) this.leafletElement.setLatLng(position);
      this.leafletElement.openOn(map);
    }
  }

  componentDidUpdate(prevProps) {
    const { children, popupContainer, position } = this.props;
    if (!popupContainer) {
      if (position !== prevProps.position) this.leafletElement.setLatLng(position);
    }
    if (this.contentComponent) {
      this.contentComponent = React.render(React.DOM.div({children}), this.leafletElement._contentNode);
    }
  }

  componentWillUnmount() {
    const { map, popupContainer } = this.props;
    super.componentWillUnmount();
    if (this.leafletElement._contentNode) {
      React.unmountComponentAtNode(this.leafletElement._contentNode);
    }
    if (popupContainer) {
      popupContainer.unbindPopup(this.leafletElement);
    } else {
      map.removeLayer(this.leafletElement);
    }
  }
  render() {
    return null;
  }
}
