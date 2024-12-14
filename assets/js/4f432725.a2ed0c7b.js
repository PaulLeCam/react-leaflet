"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([["3382"],{3456:function(e,n,t){t.r(n),t.d(n,{metadata:()=>r,contentTitle:()=>c,default:()=>h,assets:()=>i,toc:()=>d,frontMatter:()=>o});var r=JSON.parse('{"id":"api-map","title":"Map creation and interactions","description":"MapContainer","source":"@site/versioned_docs/version-3.x/api-map.md","sourceDirName":".","slug":"/api-map","permalink":"/docs/v3/api-map","draft":false,"unlisted":false,"tags":[],"version":"3.x","frontMatter":{"title":"Map creation and interactions"},"sidebar":"docs","previous":{"title":"Map placeholder","permalink":"/docs/v3/example-map-placeholder"},"next":{"title":"Child components","permalink":"/docs/v3/api-components"}}'),s=t("1549"),a=t("2376");let o={title:"Map creation and interactions"},c=void 0,i={},d=[{value:"MapContainer",id:"mapcontainer",level:2},{value:"Hooks",id:"hooks",level:2},{value:"useMap",id:"usemap",level:3},{value:"useMapEvents",id:"usemapevents",level:3},{value:"useMapEvent",id:"usemapevent",level:3},{value:"MapConsumer",id:"mapconsumer",level:2}];function l(e){let n={a:"a",br:"br",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,a.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h2,{id:"mapcontainer",children:"MapContainer"}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"MapContainer"})," component is responsible for creating the\n",(0,s.jsx)(n.a,{href:"https://leafletjs.com/reference.html#map",children:"Leaflet Map"})," instance and providing\nit to its ",(0,s.jsx)(n.a,{href:"/docs/v3/api-components",children:"child components"}),", using a\n",(0,s.jsx)(n.a,{href:"https://react.dev/reference/react/createContext",children:"React Context"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["When creating a ",(0,s.jsx)(n.code,{children:"MapContainer"})," element, its props are used as options to\n",(0,s.jsx)(n.a,{href:"https://leafletjs.com/reference.html#map-l-map",children:"create the Map instance"}),"."]}),"\n",(0,s.jsx)(n.p,{children:"The following additional props are supported:"}),"\n",(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.th,{children:"Prop"}),(0,s.jsx)(n.th,{children:"Type"})]})}),(0,s.jsxs)(n.tbody,{children:[(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"bounds"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"LatLngBoundsExpression"})})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"boundsOptions"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"FitBoundsOptions"})})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"children"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"ReactNode"})})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"className"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"string"})})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"id"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"string"})})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"placeholder"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"ReactNode"})})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"style"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"CSSProperties"})})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"whenCreated"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"(map: Leaflet.Map) => void"})})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"whenReady"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"() => void"})})]})]})]}),"\n",(0,s.jsxs)(n.p,{children:["Except for its ",(0,s.jsx)(n.code,{children:"children"}),", ",(0,s.jsx)(n.code,{children:"MapContainer"})," props are ",(0,s.jsx)(n.strong,{children:"immutable"}),": changing them\nafter they have been set a first time will have no effect on the Map instance or\nits container.",(0,s.jsx)(n.br,{}),"\n","The Leaflet ",(0,s.jsx)(n.code,{children:"Map"})," instance created by the ",(0,s.jsx)(n.code,{children:"MapContainer"})," element can be accessed\nby ",(0,s.jsx)(n.a,{href:"/docs/v3/api-components",children:"child components"})," using one of\n",(0,s.jsx)(n.a,{href:"#hooks",children:"the provided hooks"})," or the ",(0,s.jsxs)(n.a,{href:"#mapconsumer",children:[(0,s.jsx)(n.code,{children:"MapConsumer"})," component"]}),"."]}),"\n",(0,s.jsx)(n.h2,{id:"hooks",children:"Hooks"}),"\n",(0,s.jsx)(n.h3,{id:"usemap",children:"useMap"}),"\n",(0,s.jsxs)(n.p,{children:["Hook providing the Leaflet ",(0,s.jsx)(n.code,{children:"Map"})," instance in any descendant of a\n",(0,s.jsx)(n.a,{href:"#mapcontainer",children:(0,s.jsx)(n.code,{children:"MapContainer"})}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:'function MyComponent() {\n  const map = useMap();\n  console.log("map center:", map.getCenter());\n  return null;\n}\n\nfunction MyMapComponent() {\n  return (\n    <MapContainer center={[50.5, 30.5]} zoom={13}>\n      <MyComponent />\n    </MapContainer>\n  );\n}\n'})}),"\n",(0,s.jsx)(n.h3,{id:"usemapevents",children:"useMapEvents"}),"\n",(0,s.jsxs)(n.p,{children:["Hook attaching the provided ",(0,s.jsx)(n.code,{children:"LeafletEventHandlerFnMap"})," event handlers to the map\ninstance and returning the instance in any descendant of a\n",(0,s.jsx)(n.a,{href:"#mapcontainer",children:(0,s.jsx)(n.code,{children:"MapContainer"})}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:'function MyComponent() {\n  const map = useMapEvents({\n    click: () => {\n      map.locate();\n    },\n    locationfound: (location) => {\n      console.log("location found:", location);\n    },\n  });\n  return null;\n}\n\nfunction MyMapComponent() {\n  return (\n    <MapContainer center={[50.5, 30.5]} zoom={13}>\n      <MyComponent />\n    </MapContainer>\n  );\n}\n'})}),"\n",(0,s.jsx)(n.h3,{id:"usemapevent",children:"useMapEvent"}),"\n",(0,s.jsxs)(n.p,{children:["Hook attaching a single event handler to the map instance and returning the\ninstance in any descendant of a ",(0,s.jsx)(n.a,{href:"#mapcontainer",children:(0,s.jsx)(n.code,{children:"MapContainer"})}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:'function MyComponent() {\n  const map = useMapEvent("click", () => {\n    map.setView([50.5, 30.5], map.getZoom());\n  });\n  return null;\n}\n\nfunction MyMapComponent() {\n  return (\n    <MapContainer center={[50.5, 30.5]} zoom={13}>\n      <MyComponent />\n    </MapContainer>\n  );\n}\n'})}),"\n",(0,s.jsx)(n.h2,{id:"mapconsumer",children:"MapConsumer"}),"\n",(0,s.jsxs)(n.p,{children:["Component using the ",(0,s.jsx)(n.a,{href:"https://react.dev/reference/react/Children#calling-a-render-prop-to-customize-rendering",children:"render prop"}),"\ntechnique to provide the Leaflet ",(0,s.jsx)(n.code,{children:"Map"})," instance in any descendant of a\n",(0,s.jsx)(n.a,{href:"#mapcontainer",children:(0,s.jsx)(n.code,{children:"MapContainer"})}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:'function MyMapComponent() {\n  return (\n    <MapContainer center={[50.5, 30.5]} zoom={13}>\n      <MapConsumer>\n        {(map) => {\n          console.log("map center:", map.getCenter());\n          return null;\n        }}\n      </MapConsumer>\n    </MapContainer>\n  );\n}\n'})})]})}function h(e={}){let{wrapper:n}={...(0,a.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},2376:function(e,n,t){t.d(n,{Z:function(){return c},a:function(){return o}});var r=t(4194);let s={},a=r.createContext(s);function o(e){let n=r.useContext(a);return r.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),r.createElement(a.Provider,{value:n},e.children)}}}]);