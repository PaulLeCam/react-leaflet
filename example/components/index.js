import React from 'react';
import { render } from 'react-dom';

import SimpleExample from './simple';
import EventsExample from './events';
import BoundsExample from './bounds';
import VectorLayersExample from './vector-layers';
import OtherLayersExample from './other-layers';
import ZoomControlExample from './zoom-control';
import LayersControlExample from './layers-control';
import CustomComponentExample from './custom-component';
import AnimateExample from './animate';
import DraggableExample from './draggable-marker';

const examples = (
  <div>
    <h1>React-Leaflet examples</h1>
    <h2>Popup with Marker</h2>
    <SimpleExample />
    <h2>Draggable Marker</h2>
    <DraggableExample />
    <h2>Events</h2>
    <p>Click the map to show a marker at your detected location</p>
    <EventsExample />
    <h2>Map view by bounds</h2>
    <p>Click a rectangle to fit the map to its bounds</p>
    <BoundsExample />
    <h2>Vector layers</h2>
    <VectorLayersExample />
    <h2>Other layers</h2>
    <OtherLayersExample />
    <h2>Zoom control</h2>
    <ZoomControlExample />
    <h2>Layers control</h2>
    <LayersControlExample />
    <h2>List of markers (custom component)</h2>
    <CustomComponentExample />
    <h2>Animate</h2>
    <p>Click the map to move to the location</p>
    <AnimateExample />
  </div>
);

render(examples, document.getElementById('app'));
