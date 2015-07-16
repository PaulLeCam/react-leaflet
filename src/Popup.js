import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { popup } from 'leaflet';

import latlngType from './types/latlng';
import MapComponent from './MapComponent';

export default class Popup extends MapComponent {
  static propTypes = {
    position: latlngType
  };

  componentWillMount() {
    super.componentWillMount();
    const { children, map, ...props } = this.props;
    this.leafletElement = popup(props);
  }

  componentDidUpdate(prevProps) {
    const { children, map, popupContainer, position, ...props } = this.props;
    if (children !== prevProps.children) {
      const content = renderToStaticMarkup(children);
      if (popupContainer) {
        popupContainer.bindPopup(content, props);
      }
      else {
        const el = this.leafletElement;
        el.setContent(content);
        if (position !== prevProps.position) el.setLatLng(position);
      }
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    this.props.map.removeLayer(this.leafletElement);
  }

  render() {
    const { children, map, popupContainer, position, ...props } = this.props;
    if (children) {
      const content = renderToStaticMarkup(children);
      // Attach to container component
      if (popupContainer) {
        popupContainer.bindPopup(content, props);
        return null;
      }
      // Attach to a Map
      const el = this.leafletElement;
      el.setContent(content);
      if (position) el.setLatLng(position);
      el.openOn(map);
    }
    return null;
  }
}
