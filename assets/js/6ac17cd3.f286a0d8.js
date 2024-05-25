"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[2921],{7882:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>p,default:()=>u,frontMatter:()=>s,metadata:()=>a,toc:()=>i});var r=t(5723),o=t(3327);const s={title:"Other layers"},p=void 0,a={id:"example-other-layers",title:"Other layers",description:"",source:"@site/versioned_docs/version-3.x/example-other-layers.md",sourceDirName:".",slug:"/example-other-layers",permalink:"/docs/v3/example-other-layers",draft:!1,unlisted:!1,tags:[],version:"3.x",frontMatter:{title:"Other layers"},sidebar:"docs",previous:{title:"SVG Overlay",permalink:"/docs/v3/example-svg-overlay"},next:{title:"Tooltips",permalink:"/docs/v3/example-tooltips"}},l={},i=[];function c(e){const n={code:"code",pre:"pre",...(0,o.R)(),...e.components};return(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-tsx",children:"import {\n  Circle,\n  FeatureGroup,\n  LayerGroup,\n  MapContainer,\n  Popup,\n  Rectangle,\n  TileLayer,\n} from 'react-leaflet'\n\nconst center = [51.505, -0.09]\nconst rectangle = [\n  [51.49, -0.08],\n  [51.5, -0.06],\n]\n\nconst fillBlueOptions = { fillColor: 'blue' }\nconst fillRedOptions = { fillColor: 'red' }\nconst greenOptions = { color: 'green', fillColor: 'green' }\nconst purpleOptions = { color: 'purple' }\n\nfunction OtherLayersExample() {\n  return (\n    <MapContainer center={center} zoom={13}>\n      <TileLayer\n        attribution='&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\n        url=\"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png\"\n      />\n      <LayerGroup>\n        <Circle center={center} pathOptions={fillBlueOptions} radius={200} />\n        <Circle\n          center={center}\n          pathOptions={fillRedOptions}\n          radius={100}\n          stroke={false}\n        />\n        <LayerGroup>\n          <Circle\n            center={[51.51, -0.08]}\n            pathOptions={greenOptions}\n            radius={100}\n          />\n        </LayerGroup>\n      </LayerGroup>\n      <FeatureGroup pathOptions={purpleOptions}>\n        <Popup>Popup in FeatureGroup</Popup>\n        <Circle center={[51.51, -0.06]} radius={200} />\n        <Rectangle bounds={rectangle} />\n      </FeatureGroup>\n    </MapContainer>\n  )\n}\n"})})}function u(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}},3327:(e,n,t)=>{t.d(n,{R:()=>p,x:()=>a});var r=t(2155);const o={},s=r.createContext(o);function p(e){const n=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:p(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);