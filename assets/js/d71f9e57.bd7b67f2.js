"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([["3548"],{408:function(n,e,t){t.r(e),t.d(e,{metadata:()=>o,contentTitle:()=>c,default:()=>u,assets:()=>s,toc:()=>p,frontMatter:()=>i});var o=JSON.parse('{"id":"example-tooltips","title":"Tooltips","description":"","source":"@site/versioned_docs/version-4.x/example-tooltips.md","sourceDirName":".","slug":"/example-tooltips","permalink":"/docs/v4/example-tooltips","draft":false,"unlisted":false,"tags":[],"version":"4.x","frontMatter":{"title":"Tooltips"},"sidebar":"docs","previous":{"title":"Other layers","permalink":"/docs/v4/example-other-layers"},"next":{"title":"Layers control","permalink":"/docs/v4/example-layers-control"}}'),r=t("1549"),l=t("2376");let i={title:"Tooltips"},c=void 0,s={},p=[];function a(n){let e={code:"code",pre:"pre",...(0,l.a)(),...n.components};return(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-tsx",metastring:"live noInline",live:!0,children:"const center = [51.505, -0.09]\n\nconst multiPolygon = [\n  [\n    [51.51, -0.12],\n    [51.51, -0.13],\n    [51.53, -0.13],\n  ],\n  [\n    [51.51, -0.05],\n    [51.51, -0.07],\n    [51.53, -0.07],\n  ],\n]\n\nconst rectangle = [\n  [51.49, -0.08],\n  [51.5, -0.06],\n]\n\nfunction TooltipCircle() {\n  const [clickedCount, setClickedCount] = useState(0)\n  const eventHandlers = useMemo(\n    () => ({\n      click() {\n        setClickedCount((count) => count + 1)\n      },\n    }),\n    [],\n  )\n\n  const clickedText =\n    clickedCount === 0\n      ? 'Click this Circle to change the Tooltip text'\n      : `Circle click: ${clickedCount}`\n\n  return (\n    <Circle\n      center={center}\n      eventHandlers={eventHandlers}\n      pathOptions={{ fillColor: 'blue' }}\n      radius={200}>\n      <Tooltip>{clickedText}</Tooltip>\n    </Circle>\n  )\n}\n\nrender(\n  <MapContainer center={center} zoom={13} scrollWheelZoom={false}>\n    <TileLayer\n      attribution='&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\n      url=\"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png\"\n    />\n    <TooltipCircle />\n    <CircleMarker\n      center={[51.51, -0.12]}\n      pathOptions={{ color: 'red' }}\n      radius={20}>\n      <Tooltip>Tooltip for CircleMarker</Tooltip>\n    </CircleMarker>\n    <Marker position={[51.51, -0.09]}>\n      <Popup>Popup for Marker</Popup>\n      <Tooltip>Tooltip for Marker</Tooltip>\n    </Marker>\n    <Polygon pathOptions={{ color: 'purple' }} positions={multiPolygon}>\n      <Tooltip sticky>sticky Tooltip for Polygon</Tooltip>\n    </Polygon>\n    <Rectangle bounds={rectangle} pathOptions={{ color: 'black' }}>\n      <Tooltip direction=\"bottom\" offset={[0, 20]} opacity={1} permanent>\n        permanent Tooltip for Rectangle\n      </Tooltip>\n    </Rectangle>\n  </MapContainer>,\n)\n"})})}function u(n={}){let{wrapper:e}={...(0,l.a)(),...n.components};return e?(0,r.jsx)(e,{...n,children:(0,r.jsx)(a,{...n})}):a(n)}},2376:function(n,e,t){t.d(e,{Z:function(){return c},a:function(){return i}});var o=t(4194);let r={},l=o.createContext(r);function i(n){let e=o.useContext(l);return o.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function c(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(r):n.components||r:i(n.components),o.createElement(l.Provider,{value:e},n.children)}}}]);