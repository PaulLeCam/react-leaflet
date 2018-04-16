/* global describe, expect, it, jest */
/* eslint-disable react/no-did-mount-set-state, react/no-did-update-set-state */

import Leaflet from 'leaflet'
import React, { createRef, Component } from 'react'
import { renderIntoDocument } from 'react-dom/test-utils'

import { Map, Popup, TileLayer } from '../src'

describe('Popup', () => {
  it('adds the popup to the map', () => {
    const popupRef = createRef()
    const position = [0, 0]

    renderIntoDocument(
      <Map center={position} zoom={10}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Popup position={position} ref={popupRef}>
          Test Popup
        </Popup>
      </Map>,
    )

    expect(popupRef.current.leafletElement.options.position).toEqual(position)
  })

  it('adds and removes the popup on the map', () => {
    const openOn = jest.fn()
    const removeLayer = jest.fn()

    Leaflet.Map.prototype.removeLayer = removeLayer
    Leaflet.Popup.prototype.openOn = openOn

    class TestComponent extends Component {
      constructor(props) {
        super(props)
        this.state = {
          show: false,
          test: true,
        }
        this.mapRef = createRef()
      }

      componentDidMount() {
        expect(openOn.mock.calls.length).toBe(0)
        expect(removeLayer.mock.calls.length).toBe(0)
        this.setState({ show: true })
      }

      componentDidUpdate() {
        if (this.state.test) {
          expect(openOn.mock.calls[0][0]).toBe(
            this.mapRef.current.leafletElement,
          )
          this.setState({
            show: false,
            test: false,
          })
        } else {
          expect(removeLayer.mock.calls[0][0]).toBeDefined()
        }
      }

      render() {
        const position = [0, 0]
        const popup = this.state.show ? (
          <Popup position={position}>Test Popup</Popup>
        ) : null

        return (
          <Map center={position} ref={this.mapRef} zoom={10}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {popup}
          </Map>
        )
      }
    }

    renderIntoDocument(<TestComponent />)
  })
})
