"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[7395],{7411:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>u,frontMatter:()=>s,metadata:()=>i,toc:()=>c});var r=n(5723),o=n(3327);const s={title:"SVG Overlay"},a=void 0,i={id:"example-svg-overlay",title:"SVG Overlay",description:"",source:"@site/versioned_docs/version-4.x/example-svg-overlay.md",sourceDirName:".",slug:"/example-svg-overlay",permalink:"/docs/example-svg-overlay",draft:!1,unlisted:!1,tags:[],version:"4.x",frontMatter:{title:"SVG Overlay"},sidebar:"docs",previous:{title:"Vector layers",permalink:"/docs/example-vector-layers"},next:{title:"Other layers",permalink:"/docs/example-other-layers"}},l={},c=[];function p(e){const t={code:"code",pre:"pre",...(0,o.R)(),...e.components};return(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-tsx",metastring:"live noInline",live:!0,children:'const position = [51.505, -0.09]\nconst bounds = [\n  [51.49, -0.08],\n  [51.5, -0.06],\n]\n\nrender(\n  <MapContainer center={position} zoom={13} scrollWheelZoom={false}>\n    <TileLayer\n      attribution=\'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors\'\n      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"\n    />\n    <SVGOverlay attributes={{ stroke: \'red\' }} bounds={bounds}>\n      <rect x="0" y="0" width="100%" height="100%" fill="blue" />\n      <circle r="5" cx="10" cy="10" fill="red" />\n      <text x="50%" y="50%" stroke="white">\n        text\n      </text>\n    </SVGOverlay>\n  </MapContainer>,\n)\n'})})}function u(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(p,{...e})}):p(e)}},3327:(e,t,n)=>{n.d(t,{R:()=>a,x:()=>i});var r=n(2155);const o={},s=r.createContext(o);function a(e){const t=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:a(e.components),r.createElement(s.Provider,{value:t},e.children)}}}]);