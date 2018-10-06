// @flow

import hoistNonReactStatics from 'hoist-non-react-statics'
import React, {
  createContext,
  // $FlowFixMe: import
  forwardRef,
  type ComponentType,
} from 'react'

import type { LeafletContext } from './types'

const { Consumer, Provider } = createContext({})

export const LeafletConsumer = Consumer
export const LeafletProvider = Provider

export const withLeaflet = <Props: Object>(
  WrappedComponent: ComponentType<Props>,
): ComponentType<$Diff<Props, { leaflet: LeafletContext }>> => {
  const WithLeafletComponent = (props, ref) => (
    <Consumer>
      {(leaflet: LeafletContext) => (
        <WrappedComponent {...props} leaflet={leaflet} ref={ref} />
      )}
    </Consumer>
  )

  // flowlint-next-line sketchy-null-string:off
  const name = WrappedComponent.displayName || WrappedComponent.name
  WithLeafletComponent.displayName = `Leaflet(${name})`

  const LeafletComponent = forwardRef(WithLeafletComponent)
  hoistNonReactStatics(LeafletComponent, WrappedComponent)

  return LeafletComponent
}
