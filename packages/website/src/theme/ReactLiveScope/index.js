/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as core from '@react-leaflet/core'
import * as L from 'leaflet'
import React from 'react'
import * as ReactLeaflet from 'react-leaflet'

// Add react-live imports you need here
const ReactLiveScope = {
  L,
  React,
  ...core,
  ...React,
  ...ReactLeaflet,
}

export default ReactLiveScope
