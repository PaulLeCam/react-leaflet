// @flow

import hoistNonReactStatics from 'hoist-non-react-statics'
import React, {
  createContext,
  forwardRef,
  useContext,
  type AbstractComponent,
} from 'react'

import type { LeafletContext } from './types'

const leafletContext = createContext<LeafletContext>({})

export const useLeaflet = (): LeafletContext => useContext(leafletContext)

export const LeafletConsumer = leafletContext.Consumer
export const LeafletProvider = leafletContext.Provider

export const withLeaflet = <Config: { leaflet: LeafletContext }, Instance>(
  WrappedComponent: AbstractComponent<Config, Instance>,
): AbstractComponent<$Diff<Config, { leaflet: LeafletContext }>, Instance> => {
  const WithLeafletComponent = (props, ref) => (
    <LeafletConsumer>
      {(leaflet: LeafletContext) => (
        <WrappedComponent {...props} leaflet={leaflet} ref={ref} />
      )}
    </LeafletConsumer>
  )

  const name = // flowlint-next-line sketchy-null-string:off
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  WithLeafletComponent.displayName = `Leaflet(${name})`

  const LeafletComponent = forwardRef(WithLeafletComponent)
  hoistNonReactStatics(LeafletComponent, WrappedComponent)

  return LeafletComponent
}
