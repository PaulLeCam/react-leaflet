"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([["3753"],{3969:function(e,n,r){r.r(n),r.d(n,{metadata:()=>t,contentTitle:()=>s,default:()=>u,assets:()=>p,toc:()=>i,frontMatter:()=>l});var t=JSON.parse('{"id":"example-layers-control","title":"Layers control","description":"","source":"@site/versioned_docs/version-4.x/example-layers-control.md","sourceDirName":".","slug":"/example-layers-control","permalink":"/docs/v4/example-layers-control","draft":false,"unlisted":false,"tags":[],"version":"4.x","frontMatter":{"title":"Layers control"},"sidebar":"docs","previous":{"title":"Tooltips","permalink":"/docs/v4/example-tooltips"},"next":{"title":"Panes","permalink":"/docs/v4/example-panes"}}'),o=r("1549"),a=r("2376");let l={title:"Layers control"},s=void 0,p={},i=[];function c(e){let n={code:"code",pre:"pre",...(0,a.a)(),...e.components};return(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-tsx",metastring:"live noInline",live:!0,children:"const center = [51.505, -0.09]\nconst rectangle = [\n  [51.49, -0.08],\n  [51.5, -0.06],\n]\n\nrender(\n  <MapContainer center={center} zoom={13} scrollWheelZoom={false}>\n    <TileLayer\n      attribution='&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\n      url=\"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png\"\n    />\n    <LayersControl position=\"topright\">\n      <LayersControl.Overlay name=\"Marker with popup\">\n        <Marker position={center}>\n          <Popup>\n            A pretty CSS3 popup. <br /> Easily customizable.\n          </Popup>\n        </Marker>\n      </LayersControl.Overlay>\n      <LayersControl.Overlay checked name=\"Layer group with circles\">\n        <LayerGroup>\n          <Circle\n            center={center}\n            pathOptions={{ fillColor: 'blue' }}\n            radius={200}\n          />\n          <Circle\n            center={center}\n            pathOptions={{ fillColor: 'red' }}\n            radius={100}\n            stroke={false}\n          />\n          <LayerGroup>\n            <Circle\n              center={[51.51, -0.08]}\n              pathOptions={{ color: 'green', fillColor: 'green' }}\n              radius={100}\n            />\n          </LayerGroup>\n        </LayerGroup>\n      </LayersControl.Overlay>\n      <LayersControl.Overlay name=\"Feature group\">\n        <FeatureGroup pathOptions={{ color: 'purple' }}>\n          <Popup>Popup in FeatureGroup</Popup>\n          <Circle center={[51.51, -0.06]} radius={200} />\n          <Rectangle bounds={rectangle} />\n        </FeatureGroup>\n      </LayersControl.Overlay>\n    </LayersControl>\n  </MapContainer>,\n)\n"})})}function u(e={}){let{wrapper:n}={...(0,a.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(c,{...e})}):c(e)}},2376:function(e,n,r){r.d(n,{Z:function(){return s},a:function(){return l}});var t=r(4194);let o={},a=t.createContext(o);function l(e){let n=t.useContext(a);return t.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:l(e.components),t.createElement(a.Provider,{value:n},e.children)}}}]);