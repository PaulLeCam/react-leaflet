/** @jsx React.DOM */
var React = require('react'),
  Leaflet = require('leaflet');

/*
You need to use this mixin as follow:

var DynamicPopup = React.createClass({

  mixins: [PopupMixin],

  propTypes: {... },

  createPopup: function () {
    return {
      options: this.props,
      popup: <YourDynamiContent {...this.props} />
    };
   }
 });

 where options are all L.Popup known options.
 */


var PopupMixin = {

  componentWillMount: function () {
    this.doCreatePopup();
  },

   componentDidUpdate: function () {
     this.doCreatePopup();
   },

  componentWillUnmount: function () {
    this.props.map.removeLayer(this._leafletElement);
  },

  render: function () {
    var
      popup = this._leafletElement,
      popupContainer = this.props.popupContainer;
    if (popupContainer) {
      popupContainer.bindPopup(popup);
    }
    return null;
  },

  doCreatePopup: function () {
    // must be implemented by popup component
    var popup = this.createPopup();

    this.addReactPopupToMap(popup);
  },

  /**
   * @param {ReactElement} reactElement
   */
  addReactPopupToMap: function (reactElement) {
    var popup = this.createLeafletPopup(reactElement);
    this._leafletElement = popup;
  },

  /**
   * @param {ReactElement} reactElement
   */
  createLeafletPopup: function (reactElement) {
    var PopupClass = Leaflet.Popup.extend({
      options: reactElement.options,
      _reactPopup:reactElement.popup,
      onAdd: function (map) {
        // make sure our basic container exists
        if (!this._container) {
          this._initLayout();
        }
        // Inject our React component
        React.render(this._reactPopup, this._contentNode);
        // now call "super" method
        L.Popup.prototype.onAdd.call(this, map);
      }
    });
    return new PopupClass();
  }

};

module.exports = PopupMixin;
