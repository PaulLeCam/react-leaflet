import React from 'react'
import ReactDOM from 'react-dom'

declare let module: any

const MOUNT_NODE = document.getElementById('app')

function render() {
  const App = require('./components/app').default
  ReactDOM.render(<App />, MOUNT_NODE)
}

render()

if (module.hot) {
  module.hot.accept(['./components/app'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE)
    render()
  })
}
