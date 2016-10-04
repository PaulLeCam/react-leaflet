/* @flow */
import React, { PropTypes, Component } from 'react'
import { forEach, omit, uniqueId, indexOf } from 'lodash'

import childrenType from './types/children'
import mapType from './types/map'

const BLACKLIST = ['tile', 'shadow', 'overlay', 'map', 'marker', 'tooltip', 'popup']

export default class Pane extends Component {
  static propTypes = {
    name: PropTypes.string,
    children: childrenType,
    map: mapType,
    className: PropTypes.string,
    style: PropTypes.object,
    pane: PropTypes.string,
  };

  static contextTypes = {
    map: mapType,
    // Reference to a possible parent pane
    pane: PropTypes.string,
  };

  static childContextTypes = {
    pane: PropTypes.string,
  };

  constructor () {
    super()

    this.state = {
      name: null,
    }

    this.setStyle = this.setStyle.bind(this)
  }

  getChildContext () {
    return {
      pane: this.state.name,
    }
  }

  componentDidMount () {
    this.createPane()
  }

  componentWillReceiveProps (nextProps) {
    if (!this.state.name) {
      // Do nothing if this.state.name is undefined due to errors or
      // an invalid props.name value
      return
    }

    // If the 'name' prop has changed the current pane is unmounted and a new
    // pane is created.
    if (nextProps.name !== this.props.name) {
      this.removePane()
      this.createPane(nextProps)
    } else {
      // Remove the previous css class name from the pane if it has changed.
      // setStyle will take care of adding in the updated className
      if (this.props.className && nextProps.className !== this.props.className) {
        const pane = this.getPane()
        pane && pane.classList.remove(this.props.className)
      }

      // Update the pane's DOM node style and class
      this.setStyle(nextProps)
    }
  }

  componentWillUnmount () {
    this.removePane()
  }

  /**
   * isDefaultPane - Returns true if this.props.name matches the name
   * of a default leaflet pane.
   *
   * @param   {object}  props  Component props, defaults to this.props
   * @returns {boolean}        True if the pane is a default leaflet pane
   */
  isDefaultPane (name = this.props.name) {
    if (name) {
      const _name = (name + '').replace(/-*pane/gi, '')

      if (indexOf(BLACKLIST, _name) >= 0) {
        return true
      }
    }

    return false
  }

  /**
   * createPane - Creates a new pane for the map if it does not exist yet.
   * Existing panes are allowed only if they are a default leaflet pane like
   * 'popupPane' or 'tilePane'
   *
   * @param   {object} props  Component props, defaults to this.props
   */
  createPane (props = this.props) {
    const map = this.context.map || props.map
    const name = props.name || `pane-${uniqueId()}`

    if (map && map.createPane) {
      const isDefault = this.isDefaultPane(name)
      const existing = isDefault || this.getPane(name)

      if (!existing) {
        map.createPane(name, this.getParentPane())
        this.paneName = name
      } else {
        if (isDefault) {
          throw new Error(`You must use a unique name for a pane that is not a default leaflet pane (${name})`)
        } else {
          throw new Error(`A pane with this name already exists. (${name})`)
        }
      }

      this.setState({
        name,
      }, this.setStyle)
    }
  }

  /**
   * removePane - Removes the pane from the DOM and it's references in
   * map._pane and map._paneRenderers if the pane is not a default
   * leaflet pane.
   */
  removePane () {
    // Remove the created pane
    if (this.paneName) {
      const pane = this.getPane(this.paneName)
      pane && pane.remove &&
      pane.remove()

      const map = this.context.map || this.props.map

      if (map && map._panes) {
        map._panes = omit(map._panes, this.paneName)
        map._paneRenderers = omit(map._paneRenderers, this.paneName)
      }

      this.paneName = null
    }
  }

  /**
   * setStyle - Updates the style attr of the pane's DOM node
   *
   * @param   {object} style  Style object
   */
  setStyle ({ style, className } = this.props) {
    const pane = this.getPane()

    if (pane) {
      if (style) {
        forEach(style, (value, key) => {
          pane.style[key] = value
        })
      }

      if (className) {
        pane.classList.add(className)
      }
    }
  }

  /**
   * getParentPane - Returns the DOM node of a parent pane if existing
   *
   * @param   {string} name     The name of the parent pane
   * @returns {HTMLDivElement}  The DOM node that is the parent pane
   */
  getParentPane () {
    const pane = this.props.pane || this.context.pane
    return this.getPane(pane)
  }

  /**
   * getPane - Returns the DOM node returned by map.getPane
   *
   * @param   {string} name     The name of the pane
   * @returns {HTMLDivElement}  The DOM node that is the pane
   */
  getPane (name = this.state.name) {
    const map = this.context.map || this.props.map

    if (name && map) {
      return map.getPane(name)
    }

    return null
  }

  /**
   * getChildren - Returns this.props.children
   *
   * @returns {node}  Component children
   */
  getChildren () {
    return this.props.children
  }

  render (): any {
    return this.state.name ? (
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}>
        {this.getChildren()}
      </div>
    ) : null
  }
}
