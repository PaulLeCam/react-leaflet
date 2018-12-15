// @flow

import hoistNonReactStatics from 'hoist-non-react-statics'
import React, { createContext, forwardRef, type AbstractComponent } from 'react'

import type { LeafletContext } from './types'

const { Consumer, Provider } = createContext<LeafletContext>({})

export const LeafletConsumer = Consumer
export const LeafletProvider = Provider

export const withLeaflet = <Config: { leaflet: LeafletContext }, Instance>(
  WrappedComponent: AbstractComponent<Config, Instance>,
): AbstractComponent<$Diff<Config, { leaflet: LeafletContext }>, Instance> => {
  const WithLeafletComponent = (props, ref) => (
    <Consumer>
      {(leaflet: LeafletContext) => (
        <WrappedComponent {...props} leaflet={leaflet} ref={ref} />
      )}
    </Consumer>
  )

  const name = // flowlint-next-line sketchy-null-string:off
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  WithLeafletComponent.displayName = `Leaflet(${name})`

  const LeafletComponent = forwardRef(WithLeafletComponent)
  hoistNonReactStatics(LeafletComponent, WrappedComponent)

  return LeafletComponent
}
