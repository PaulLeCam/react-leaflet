// @flow

import hoistNonReactStatics from 'hoist-non-react-statics'
import React, {
  createContext,
  // $FlowFixMe: import
  forwardRef,
  type ComponentType,
  type ElementProps,
} from 'react'

import type { LeafletContext } from './types'

const { Consumer, Provider } = createContext({})

export const LeafletConsumer = Consumer
export const LeafletProvider = Provider

export const withLeaflet = (WrappedComponent: ComponentType<*>) => {
  const WithLeafletComponent = (
    props: ElementProps<typeof WrappedComponent>,
    ref,
  ) => (
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
