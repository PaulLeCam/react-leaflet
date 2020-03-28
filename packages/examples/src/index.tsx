import React from 'react'
import ReactDOM from 'react-dom'

declare let module: any

const MOUNT_NODE = document.getElementById('app')

function render() {
  const Examples = require('./components/Examples').default
  ReactDOM.render(<Examples />, MOUNT_NODE)
}

render()

if (module.hot) {
  module.hot.accept(['./components/Examples'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE)
    render()
  })
}
