import React from "react";

import SimpleExample from "./simple";
import EventsExample from "./events";
import VectorLayersExample from "./vector-layers";

let examples = <div>
  <h1>React-Leaflet examples</h1>
  <h2>Simple</h2>
  <SimpleExample />
  <h2>Events</h2>
  <EventsExample />
  <h2>Vector layers</h2>
  <VectorLayersExample />
</div>;

React.render(examples, document.getElementById("app"));
