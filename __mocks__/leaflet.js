/* global jest, module, require */

const L = require.requireActual('leaflet')
const LeafletMock = jest.genMockFromModule('leaflet')

class ControlMock extends LeafletMock.Control {
  constructor(options) {
    super()
    this.options = { ...L.Control.prototype.options, ...options }
  }

  getPosition() {
    return this.options.position
  }

  setPosition(position) {
    this.options.position = position
    return this
  }
}

const controlMock = options => new ControlMock(options)

class LayersControlMock extends ControlMock {
  constructor(baseLayers = [], overlays = [], options) {
    super(options)
    this._layers = []

    baseLayers.forEach((layer, i) => {
      this._addLayer(layer, i)
    })
    overlays.forEach((layer, i) => {
      this._addLayer(layer, i, true)
    })
  }

  _addLayer(layer, name, overlay) {
    this._layers.push({ layer, name, overlay })
  }

  addBaseLayer(layer, name) {
    this._addLayer(layer, name)
    return this
  }

  addOverlay(layer, name) {
    this._addLayer(layer, name, true)
    return this
  }

  removeLayer(obj) {
    this._layers.splice(this._layers.indexOf(obj), 1)
  }
}

ControlMock.Layers = LayersControlMock
controlMock.layers = (baseLayers, overlays, options) => {
  return new LayersControlMock(baseLayers, overlays, options)
}

class MapMock extends LeafletMock.Map {
  constructor(id, options = {}) {
    super()
    Object.assign(this, L.Evented.prototype)

    this.options = { ...L.Map.prototype.options, ...options }
    this._container = id

    if (options.bounds) {
      this.fitBounds(options.bounds, options.boundsOptions)
    }

    if (options.maxBounds) {
      this.setMaxBounds(options.maxBounds)
    }

    if (options.center && options.zoom !== undefined) {
      this.setView(L.latLng(options.center), options.zoom)
    }
  }

  _limitZoom(zoom) {
    const min = this.getMinZoom()
    const max = this.getMaxZoom()
    return Math.max(min, Math.min(max, zoom))
  }

  _resetView(center, zoom) {
    this._initialCenter = center
    this._zoom = zoom
  }

  fitBounds(bounds, options) {
    this._bounds = bounds
    this._boundsOptions = options
  }

  getBounds() {
    return this._bounds
  }

  getCenter() {
    return this._initialCenter
  }

  getMaxZoom() {
    return this.options.maxZoom === undefined ? Infinity : this.options.maxZoom
  }

  getMinZoom() {
    return this.options.minZoom === undefined ? 0 : this.options.minZoom
  }

  getZoom() {
    return this._zoom
  }

  setMaxBounds(bounds) {
    bounds = L.latLngBounds(bounds)
    this.options.maxBounds = bounds
    return this
  }

  setView(center, zoom) {
    zoom = zoom === undefined ? this.getZoom() : zoom
    this._resetView(L.latLng(center), this._limitZoom(zoom))
    return this
  }

  setZoom(zoom) {
    return this.setView(this.getCenter(), zoom)
  }
}

class PopupMock extends LeafletMock.Popup {
  constructor(options, source) {
    super()
    Object.assign(this, L.Evented.prototype)

    this.options = { ...L.Popup.prototype.options, ...options }
    this._source = source
  }

  getContent() {
    return this._content
  }

  setContent(content) {
    this._content = content
  }
}

module.exports = {
  ...LeafletMock,
  Control: ControlMock,
  control: controlMock,
  LatLng: L.LatLng,
  latLng: L.latLng,
  LatLngBounds: L.LatLngBounds,
  latLngBounds: L.latLngBounds,
  Map: MapMock,
  map: (id, options) => new MapMock(id, options),
  Popup: PopupMock,
  popup: (options, source) => new PopupMock(options, source),
}
