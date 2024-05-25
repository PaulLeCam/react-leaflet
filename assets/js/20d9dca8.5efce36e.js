"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[2548],{4335:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>s,default:()=>u,frontMatter:()=>a,metadata:()=>l,toc:()=>i});var r=t(5723),o=t(3327);const a={title:"Panes"},s=void 0,l={id:"example-panes",title:"Panes",description:"",source:"@site/versioned_docs/version-4.x/example-panes.md",sourceDirName:".",slug:"/example-panes",permalink:"/docs/example-panes",draft:!1,unlisted:!1,tags:[],version:"4.x",frontMatter:{title:"Panes"},sidebar:"docs",previous:{title:"Layers control",permalink:"/docs/example-layers-control"},next:{title:"Draggable Marker",permalink:"/docs/example-draggable-marker"}},c={},i=[];function p(e){const n={code:"code",pre:"pre",...(0,o.R)(),...e.components};return(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-tsx",metastring:"live noInline",live:!0,children:'const outer = [\n  [50.505, -29.09],\n  [52.505, 29.09],\n]\nconst inner = [\n  [49.505, -2.09],\n  [53.505, 2.09],\n]\n\nfunction BlinkingPane() {\n  const [render, setRender] = useState(true)\n  const timerRef = useRef()\n  useEffect(() => {\n    timerRef.current = setInterval(() => {\n      setRender((r) => !r)\n    }, 5000)\n    return () => {\n      clearInterval(timerRef.current)\n    }\n  }, [])\n\n  return render ? (\n    <Pane name="cyan-rectangle" style={{ zIndex: 500 }}>\n      <Rectangle bounds={outer} pathOptions={{ color: \'cyan\' }} />\n    </Pane>\n  ) : null\n}\n\nrender(\n  <MapContainer bounds={outer} scrollWheelZoom={false}>\n    <TileLayer\n      attribution=\'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors\'\n      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"\n    />\n    <BlinkingPane />\n    <Pane name="yellow-rectangle" style={{ zIndex: 499 }}>\n      <Rectangle bounds={inner} pathOptions={{ color: \'yellow\' }} />\n      <Pane name="purple-rectangle">\n        <Rectangle bounds={outer} pathOptions={{ color: \'purple\' }} />\n      </Pane>\n    </Pane>\n  </MapContainer>,\n)\n'})})}function u(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(p,{...e})}):p(e)}},3327:(e,n,t)=>{t.d(n,{R:()=>s,x:()=>l});var r=t(2155);const o={},a=r.createContext(o);function s(e){const n=r.useContext(a);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),r.createElement(a.Provider,{value:n},e.children)}}}]);