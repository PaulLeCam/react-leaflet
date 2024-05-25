"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[4891],{5186:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>i,contentTitle:()=>s,default:()=>p,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var t=r(5723),a=r(3327);const o={title:"Draggable Marker"},s=void 0,l={id:"example-draggable-marker",title:"Draggable Marker",description:"",source:"@site/versioned_docs/version-4.x/example-draggable-marker.md",sourceDirName:".",slug:"/example-draggable-marker",permalink:"/docs/example-draggable-marker",draft:!1,unlisted:!1,tags:[],version:"4.x",frontMatter:{title:"Draggable Marker"},sidebar:"docs",previous:{title:"Panes",permalink:"/docs/example-panes"},next:{title:"View bounds",permalink:"/docs/example-view-bounds"}},i={},c=[];function g(e){const n={code:"code",pre:"pre",...(0,a.R)(),...e.components};return(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-tsx",metastring:"live noInline",live:!0,children:"const center = {\n  lat: 51.505,\n  lng: -0.09,\n}\n\nfunction DraggableMarker() {\n  const [draggable, setDraggable] = useState(false)\n  const [position, setPosition] = useState(center)\n  const markerRef = useRef(null)\n  const eventHandlers = useMemo(\n    () => ({\n      dragend() {\n        const marker = markerRef.current\n        if (marker != null) {\n          setPosition(marker.getLatLng())\n        }\n      },\n    }),\n    [],\n  )\n  const toggleDraggable = useCallback(() => {\n    setDraggable((d) => !d)\n  }, [])\n\n  return (\n    <Marker\n      draggable={draggable}\n      eventHandlers={eventHandlers}\n      position={position}\n      ref={markerRef}>\n      <Popup minWidth={90}>\n        <span onClick={toggleDraggable}>\n          {draggable\n            ? 'Marker is draggable'\n            : 'Click here to make marker draggable'}\n        </span>\n      </Popup>\n    </Marker>\n  )\n}\n\nrender(\n  <MapContainer center={center} zoom={13} scrollWheelZoom={false}>\n    <TileLayer\n      attribution='&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\n      url=\"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png\"\n    />\n    <DraggableMarker />\n  </MapContainer>,\n)\n"})})}function p(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(g,{...e})}):g(e)}},3327:(e,n,r)=>{r.d(n,{R:()=>s,x:()=>l});var t=r(2155);const a={},o=t.createContext(a);function s(e){const n=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:s(e.components),t.createElement(o.Provider,{value:n},e.children)}}}]);