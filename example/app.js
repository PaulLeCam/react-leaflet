var React = require("react");
var SimpleExample = require("./simple");

var examples = (
  <div>
    <h1>React-Leaflet examples</h1>
    <h2>Simple</h2>
    <SimpleExample />
  </div>
);

React.render(examples, document.getElementById("app"));
