import { Children, PropTypes } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { Map, popup } from 'leaflet';

import latlngType from './types/latlng';
import MapComponent from './MapComponent';

export default class Popup extends MapComponent {
  static propTypes = {
    children: PropTypes.node,
    map: PropTypes.instanceOf(Map),
    popupContainer: PropTypes.object,
    open: PropTypes.bool,
    position: latlngType,
  };

  componentWillMount() {
    super.componentWillMount();
    const { children, map, ...props } = this.props;

    this.leafletElement = popup(props);
    this.leafletElement.on('open', this.renderPopupContent(this, true));
    this.leafletElement.on('close', this.removePopupContent(this, true));
  }

  componentDidMount() {
    const { map, popupContainer, position } = this.props;
    const el = this.leafletElement;

    if (popupContainer) {
      // Attach to container component
      popupContainer.bindPopup(el);
    }
    else {
      // Attach to a Map
      if (position) {
        el.setLatLng(position);
      }
      el.openOn(map);
    }
  }

  componentDidUpdate(prevProps) {
    const { position } = this.props;

    if (this.props.open !== prevProps.open) {
      if (this.props.open && !this.leafletElement._isOpen) {
        this.leafletElement._source.openPopup();
      } else if (!this.props.open && this.leafletElement._isOpen) {
        this.leafletElement._source.closePopup();
      }
    }

    if (position !== prevProps.position) {
      this.leafletElement.setLatLng(position);
    }

    if (this.leafletElement._isOpen) {
      this.renderPopupContent(this.props.open !== prevProps.open);
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    this.removePopupContent();
    this.props.map.removeLayer(this.leafletElement);
  }

  renderPopupContent(adjustPan) {
    if (this.props.children) {
      render(
        Children.only(this.props.children),
        this.leafletElement._contentNode
      );

      this.leafletElement._updateLayout();
      this.leafletElement._updatePosition();
      if (adjustPan) { this.leafletElement._adjustPan(); }
    }
    else {
      this.removePopupContent();
    }
  }

  removePopupContent() {
    if (this.leafletElement._contentNode) {
      unmountComponentAtNode(this.leafletElement._contentNode);
    }
  }

  render() {
    return null;
  }
}
