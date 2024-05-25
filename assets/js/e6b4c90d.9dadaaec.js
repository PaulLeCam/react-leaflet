"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[192],{178:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>o,contentTitle:()=>c,default:()=>h,frontMatter:()=>t,metadata:()=>i,toc:()=>d});var s=r(5723),l=r(3327);const t={title:"Core API"},c=void 0,i={id:"core-api",title:"Core API",description:"Interfaces and types",source:"@site/versioned_docs/version-3.x/core-api.md",sourceDirName:".",slug:"/core-api",permalink:"/docs/v3/core-api",draft:!1,unlisted:!1,tags:[],version:"3.x",frontMatter:{title:"Core API"},sidebar:"docs",previous:{title:"Core architecture",permalink:"/docs/v3/core-architecture"},next:{title:"Logo & Branding",permalink:"/docs/v3/extra-logo-branding"}},o={},d=[{value:"Interfaces and types",id:"interfaces-and-types",level:2},{value:"ControlledLayer",id:"controlledlayer",level:3},{value:"LeafletContextInterface",id:"leafletcontextinterface",level:3},{value:"LeafletElement",id:"leafletelement",level:3},{value:"ElementHook",id:"elementhook",level:3},{value:"DivOverlay",id:"divoverlay",level:3},{value:"SetOpenFunc",id:"setopenfunc",level:3},{value:"DivOverlayLifecycleHook",id:"divoverlaylifecyclehook",level:3},{value:"DivOverlayHook",id:"divoverlayhook",level:3},{value:"EventedProps",id:"eventedprops",level:3},{value:"LayerProps",id:"layerprops",level:3},{value:"PathProps",id:"pathprops",level:3},{value:"CircleMarkerProps",id:"circlemarkerprops",level:3},{value:"MediaOverlayProps",id:"mediaoverlayprops",level:3},{value:"PropsWithChildren",id:"propswithchildren",level:3},{value:"EventedWithChildrenProps",id:"eventedwithchildrenprops",level:3},{value:"PathWithChildrenProps",id:"pathwithchildrenprops",level:3},{value:"Context",id:"context",level:2},{value:"LeafletContext",id:"leafletcontext",level:3},{value:"LeafletProvider",id:"leafletprovider",level:3},{value:"useLeafletContext",id:"useleafletcontext",level:3},{value:"Hook factories",id:"hook-factories",level:2},{value:"createElementHook",id:"createelementhook",level:3},{value:"createControlHook",id:"createcontrolhook",level:3},{value:"createDivOverlayHook",id:"createdivoverlayhook",level:3},{value:"createLayerHook",id:"createlayerhook",level:3},{value:"createPathHook",id:"createpathhook",level:3},{value:"Lifecycle hooks",id:"lifecycle-hooks",level:2},{value:"useEventHandlers",id:"useeventhandlers",level:3},{value:"useLayerLifecycle",id:"uselayerlifecycle",level:3},{value:"usePathOptions",id:"usepathoptions",level:3},{value:"Update functions",id:"update-functions",level:2},{value:"updateCircle",id:"updatecircle",level:3},{value:"updateGridLayer",id:"updategridlayer",level:3},{value:"updateMediaOverlay",id:"updatemediaoverlay",level:3},{value:"DOM interactions",id:"dom-interactions",level:2},{value:"addClassName",id:"addclassname",level:3},{value:"removeClassName",id:"removeclassname",level:3},{value:"updateClassName",id:"updateclassname",level:3},{value:"Component factories",id:"component-factories",level:2},{value:"createContainerComponent",id:"createcontainercomponent",level:3},{value:"createDivOverlayComponent",id:"createdivoverlaycomponent",level:3},{value:"createLeafComponent",id:"createleafcomponent",level:3},{value:"High-level component factories",id:"high-level-component-factories",level:2},{value:"createControlComponent",id:"createcontrolcomponent",level:3},{value:"createLayerComponent",id:"createlayercomponent",level:3},{value:"createOverlayComponent",id:"createoverlaycomponent",level:3},{value:"createPathComponent",id:"createpathcomponent",level:3},{value:"createTileLayerComponent",id:"createtilelayercomponent",level:3}];function a(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",...(0,l.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h2,{id:"interfaces-and-types",children:"Interfaces and types"}),"\n",(0,s.jsx)(n.h3,{id:"controlledlayer",children:"ControlledLayer"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"interface ControlledLayer {\n  addLayer(layer: Layer): void\n  removeLayer(layer: Layer): void\n}\n"})}),"\n",(0,s.jsx)(n.h3,{id:"leafletcontextinterface",children:"LeafletContextInterface"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"interface LeafletContextInterface {\n  map: Map\n  layerContainer?: ControlledLayer | LayerGroup\n  layersControl?: Control.Layers\n  overlayContainer?: Layer\n  pane?: string\n}\n"})}),"\n",(0,s.jsx)(n.h3,{id:"leafletelement",children:"LeafletElement"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"interface LeafletElement<T, C = any> {\n  instance: T\n  context: LeafletContextInterface\n  container?: C | null\n}\n"})}),"\n",(0,s.jsx)(n.h3,{id:"elementhook",children:"ElementHook"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"type ElementHook<E, P> = (\n  props: P,\n  context: LeafletContextInterface,\n) => MutableRefObject<LeafletElement<E>>\n"})}),"\n",(0,s.jsx)(n.h3,{id:"divoverlay",children:"DivOverlay"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"type DivOverlay = Popup | Tooltip\n"})}),"\n",(0,s.jsx)(n.h3,{id:"setopenfunc",children:"SetOpenFunc"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"type SetOpenFunc = (open: boolean) => void\n"})}),"\n",(0,s.jsx)(n.h3,{id:"divoverlaylifecyclehook",children:"DivOverlayLifecycleHook"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"type DivOverlayLifecycleHook<E, P> = (\n  element: LeafletElement<E>,\n  context: LeafletContextInterface,\n  props: P,\n  setOpen: SetOpenFunc,\n) => void\n"})}),"\n",(0,s.jsx)(n.h3,{id:"divoverlayhook",children:"DivOverlayHook"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"type DivOverlayHook<E extends DivOverlay, P> = (\n  useElement: ElementHook<E, P>,\n  useLifecycle: DivOverlayLifecycleHook<E, P>,\n) => (props: P, setOpen: SetOpenFunc) => ReturnType<ElementHook<E, P>>\n"})}),"\n",(0,s.jsx)(n.h3,{id:"eventedprops",children:"EventedProps"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"interface EventedProps {\n  eventHandlers?: LeafletEventHandlerFnMap\n}\n"})}),"\n",(0,s.jsx)(n.h3,{id:"layerprops",children:"LayerProps"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"interface LayerProps extends EventedProps, LayerOptions {}\n"})}),"\n",(0,s.jsx)(n.h3,{id:"pathprops",children:"PathProps"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"interface PathProps extends EventedProps {\n  pathOptions?: PathOptions\n}\n"})}),"\n",(0,s.jsx)(n.h3,{id:"circlemarkerprops",children:"CircleMarkerProps"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"interface CircleMarkerProps extends CircleMarkerOptions, PathProps {\n  center: LatLngExpression\n  children?: ReactNode\n}\n"})}),"\n",(0,s.jsx)(n.h3,{id:"mediaoverlayprops",children:"MediaOverlayProps"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"interface MediaOverlayProps extends ImageOverlayOptions, EventedProps {\n  bounds: LatLngBoundsExpression\n}\n"})}),"\n",(0,s.jsx)(n.h3,{id:"propswithchildren",children:"PropsWithChildren"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"interface PropsWithChildren {\n  children?: ReactNode\n}\n"})}),"\n",(0,s.jsx)(n.h3,{id:"eventedwithchildrenprops",children:"EventedWithChildrenProps"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"interface EventedWithChildrenProps extends EventedProps, PropsWithChildren {}\n"})}),"\n",(0,s.jsx)(n.h3,{id:"pathwithchildrenprops",children:"PathWithChildrenProps"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"interface PathWithChildrenProps extends PathProps, PropsWithChildren {}\n"})}),"\n",(0,s.jsx)(n.h2,{id:"context",children:"Context"}),"\n",(0,s.jsx)(n.h3,{id:"leafletcontext",children:"LeafletContext"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.a,{href:"https://react.dev/reference/react/createContext",children:"React Context"})," used by React Leaflet, implementing the ",(0,s.jsx)(n.a,{href:"#leafletcontextinterface",children:(0,s.jsx)(n.code,{children:"LeafletContextInterface"})})]}),"\n",(0,s.jsx)(n.h3,{id:"leafletprovider",children:"LeafletProvider"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"LeafletContext.Provider"})," component."]}),"\n",(0,s.jsx)(n.h3,{id:"useleafletcontext",children:"useLeafletContext"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.a,{href:"https://react.dev/reference/react/hooks",children:"React Hook"})," returning the ",(0,s.jsx)(n.a,{href:"#leafletcontext",children:(0,s.jsx)(n.code,{children:"LeafletContext"})}),". Calling this hook will throw an error if the context is not provided."]}),"\n",(0,s.jsx)(n.h2,{id:"hook-factories",children:"Hook factories"}),"\n",(0,s.jsxs)(n.p,{children:["The following functions return ",(0,s.jsx)(n.a,{href:"https://react.dev/reference/react/hooks",children:"React hooks"})," for specific purposes."]}),"\n",(0,s.jsx)(n.h3,{id:"createelementhook",children:"createElementHook"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Type parameters"})}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"E"}),": Leaflet's element class type"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"P"}),": the component's props"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"C = any"}),": the element's container, if relevant"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Arguments"})}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"createElement: (props: P, context: LeafletContextInterface) => LeafletElement<E>"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"updateElement?: (instance: E, props: P, prevProps: P) => void"})}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Returns"})," ",(0,s.jsx)(n.a,{href:"#elementhook",children:(0,s.jsx)(n.code,{children:"ElementHook<E, P>"})})]}),"\n",(0,s.jsx)(n.h3,{id:"createcontrolhook",children:"createControlHook"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Type parameters"})}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"E extends Control"}),": Leaflet's element class type"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"P extends ControlOptions"}),": the component's props"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Arguments"})}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"useElement: ElementHook<E, P>"})}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Returns"})," ",(0,s.jsx)(n.a,{href:"#elementhook",children:(0,s.jsx)(n.code,{children:"ElementHook<E, P>"})})]}),"\n",(0,s.jsx)(n.h3,{id:"createdivoverlayhook",children:"createDivOverlayHook"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Type parameters"})}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"E extends DivOverlay"}),": Leaflet's element class type"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"P extends EventedProps"}),": the component's props"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Arguments"})}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"useElement: ElementHook<E, P>"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"useLifecycle: DivOverlayLifecycleHook<E, P>"})}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Returns"})," ",(0,s.jsx)(n.a,{href:"#elementhook",children:(0,s.jsx)(n.code,{children:"ElementHook<E, P>"})})]}),"\n",(0,s.jsx)(n.h3,{id:"createlayerhook",children:"createLayerHook"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Type parameters"})}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"E extends Layer"}),": Leaflet's element class type"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"P extends LayerProps"}),": the component's props"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Arguments"})}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"useElement: ElementHook<E, P>"})}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Returns"})," ",(0,s.jsx)(n.a,{href:"#elementhook",children:(0,s.jsx)(n.code,{children:"ElementHook<E, P>"})})]}),"\n",(0,s.jsx)(n.h3,{id:"createpathhook",children:"createPathHook"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Type parameters"})}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"E extends FeatureGroup | Path"}),": Leaflet's element class type"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"P extends PathProps"}),": the component's props"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Arguments"})}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"useElement: ElementHook<E, P>"})}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Returns"})," ",(0,s.jsx)(n.a,{href:"#elementhook",children:(0,s.jsx)(n.code,{children:"ElementHook<E, P>"})})]}),"\n",(0,s.jsx)(n.h2,{id:"lifecycle-hooks",children:"Lifecycle hooks"}),"\n",(0,s.jsx)(n.p,{children:"These hooks implement specific pieces of logic used by multiple components."}),"\n",(0,s.jsx)(n.h3,{id:"useeventhandlers",children:"useEventHandlers"}),"\n",(0,s.jsxs)(n.p,{children:["This hook adds support for the ",(0,s.jsx)(n.code,{children:"eventHandlers"})," prop, adding and removing event listeners as needed."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Arguments"})}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"element: LeafletElement<Evented>"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"eventHandlers: LeafletEventHandlerFnMap | null | undefined"})}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Returns"})," ",(0,s.jsx)(n.code,{children:"void"})]}),"\n",(0,s.jsx)(n.h3,{id:"uselayerlifecycle",children:"useLayerLifecycle"}),"\n",(0,s.jsx)(n.p,{children:"This hook adds support for adding and removing the layer to/from its parent container or the map."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Arguments"})}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"element: LeafletElement<Layer>"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"context: LeafletContextInterface"})}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Returns"})," ",(0,s.jsx)(n.code,{children:"void"})]}),"\n",(0,s.jsx)(n.h3,{id:"usepathoptions",children:"usePathOptions"}),"\n",(0,s.jsxs)(n.p,{children:["This hook adds support for the ",(0,s.jsx)(n.code,{children:"pathOptions"})," prop, updating the layer as needed."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Arguments"})}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"element: LeafletElement<FeatureGroup | Path>"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"props: PathProps"})}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Returns"})," ",(0,s.jsx)(n.code,{children:"void"})]}),"\n",(0,s.jsx)(n.h2,{id:"update-functions",children:"Update functions"}),"\n",(0,s.jsx)(n.p,{children:"Shared update logic for different components."}),"\n",(0,s.jsx)(n.h3,{id:"updatecircle",children:"updateCircle"}),"\n",(0,s.jsxs)(n.p,{children:["Updates the circle's ",(0,s.jsx)(n.code,{children:"center"})," and ",(0,s.jsx)(n.code,{children:"radius"})," if the props change."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Type parameters"})}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"E extends CircleMarker"}),": Leaflet's element class type"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"P extends CircleMarkerProps"}),": the component's props"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Arguments"})}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"layer: E"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"props: P"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"prevProps: P"})}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Returns"})," ",(0,s.jsx)(n.code,{children:"void"})]}),"\n",(0,s.jsx)(n.h3,{id:"updategridlayer",children:"updateGridLayer"}),"\n",(0,s.jsxs)(n.p,{children:["Updates the layer's ",(0,s.jsx)(n.code,{children:"opacity"})," and ",(0,s.jsx)(n.code,{children:"zIndex"})," if the props change."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Type parameters"})}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"E extends GridLayer"}),": Leaflet's element class type"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"P extends GridLayerOptions"}),": the component's props"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Arguments"})}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"layer: E"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"props: P"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"prevProps: P"})}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Returns"})," ",(0,s.jsx)(n.code,{children:"void"})]}),"\n",(0,s.jsx)(n.h3,{id:"updatemediaoverlay",children:"updateMediaOverlay"}),"\n",(0,s.jsxs)(n.p,{children:["Updates the overlay's ",(0,s.jsx)(n.code,{children:"bounds"}),", ",(0,s.jsx)(n.code,{children:"opacity"})," and ",(0,s.jsx)(n.code,{children:"zIndex"})," if the props change."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Type parameters"})}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"E extends ImageOverlay | SVGOverlay | VideoOverlay"}),": Leaflet's element class type"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"P extends MediaOverlayProps"}),": the component's props"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Arguments"})}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"overlay: E"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"props: P"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"prevProps: P"})}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Returns"})," ",(0,s.jsx)(n.code,{children:"void"})]}),"\n",(0,s.jsx)(n.h2,{id:"dom-interactions",children:"DOM interactions"}),"\n",(0,s.jsxs)(n.p,{children:["Utility functions to change the class of a ",(0,s.jsx)(n.code,{children:"HTMLElement"}),"."]}),"\n",(0,s.jsx)(n.h3,{id:"addclassname",children:"addClassName"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Arguments"})}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"element: HTMLElement"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"className: string"})}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Returns"})," ",(0,s.jsx)(n.code,{children:"void"})]}),"\n",(0,s.jsx)(n.h3,{id:"removeclassname",children:"removeClassName"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Arguments"})}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"element: HTMLElement"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"className: string"})}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Returns"})," ",(0,s.jsx)(n.code,{children:"void"})]}),"\n",(0,s.jsx)(n.h3,{id:"updateclassname",children:"updateClassName"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Arguments"})}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"element?: HTMLElement"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"prevClassName?: string"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"nextClassName?: string"})}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Returns"})," ",(0,s.jsx)(n.code,{children:"void"})]}),"\n",(0,s.jsx)(n.h2,{id:"component-factories",children:"Component factories"}),"\n",(0,s.jsx)(n.p,{children:"These functions create components from the provided element hook."}),"\n",(0,s.jsx)(n.h3,{id:"createcontainercomponent",children:"createContainerComponent"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Type parameters"})}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"E"}),": Leaflet's element class type"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"P extends PropsWithChildren"}),": the component's props"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Arguments"})}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"useElement: ElementHook<E, P>"})}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Returns"})," ",(0,s.jsx)(n.code,{children:"ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<E>>"})]}),"\n",(0,s.jsx)(n.h3,{id:"createdivoverlaycomponent",children:"createDivOverlayComponent"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Type parameters"})}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"E extends DivOverlay"}),": Leaflet's element class type"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"P extends PropsWithChildren"}),": the component's props"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Arguments"})}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"useElement: ReturnType<DivOverlayHook<E, P>>"})}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Returns"})," ",(0,s.jsx)(n.code,{children:"ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<E>>"})]}),"\n",(0,s.jsx)(n.h3,{id:"createleafcomponent",children:"createLeafComponent"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Type parameters"})}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"E"}),": Leaflet's element class type"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"P"}),": the component's props"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Arguments"})}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"useElement: ElementHook<E, P>"})}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Returns"})," ",(0,s.jsx)(n.code,{children:"ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<E>>"})]}),"\n",(0,s.jsx)(n.h2,{id:"high-level-component-factories",children:"High-level component factories"}),"\n",(0,s.jsx)(n.p,{children:"These functions combine hooks and component factories to provide high-level factories for common component types."}),"\n",(0,s.jsx)(n.h3,{id:"createcontrolcomponent",children:"createControlComponent"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Type parameters"})}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"E extends Control"}),": Leaflet's element class type"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"P extends ControlOptions"}),": the component's props"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Arguments"})}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"createInstance: (props: P) => E"})}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Returns"})," ",(0,s.jsx)(n.code,{children:"ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<E>>"})]}),"\n",(0,s.jsx)(n.h3,{id:"createlayercomponent",children:"createLayerComponent"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Type parameters"})}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"E extends Layer"}),": Leaflet's element class type"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"P extends EventedWithChildrenProps"}),": the component's props"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Arguments"})}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"createElement: (props: P, context: LeafletContextInterface) => LeafletElement<E>"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"updateElement?: (instance: E, props: P, prevProps: P) => void"})}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Returns"})," ",(0,s.jsx)(n.code,{children:"ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<E>>"})]}),"\n",(0,s.jsx)(n.h3,{id:"createoverlaycomponent",children:"createOverlayComponent"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Type parameters"})}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"E extends DivOverlay"}),": Leaflet's element class type"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"P extends EventedWithChildrenProps"}),": the component's props"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Arguments"})}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"createElement: (props: P, context: LeafletContextInterface) => LeafletElement<E>"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"useLifecycle: DivOverlayLifecycleHook<E, P>"})}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Returns"})," ",(0,s.jsx)(n.code,{children:"ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<E>>"})]}),"\n",(0,s.jsx)(n.h3,{id:"createpathcomponent",children:"createPathComponent"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Type parameters"})}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"E extends FeatureGroup | Path"}),": Leaflet's element class type"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"P extends PathWithChildrenProps"}),": the component's props"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Arguments"})}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"createElement: (props: P, context: LeafletContextInterface) => LeafletElement<E>"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"updateElement?: (instance: E, props: P, prevProps: P) => void"})}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Returns"})," ",(0,s.jsx)(n.code,{children:"ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<E>>"})]}),"\n",(0,s.jsx)(n.h3,{id:"createtilelayercomponent",children:"createTileLayerComponent"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Type parameters"})}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"E extends Layer"}),": Leaflet's element class type"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"P extends EventedProps"}),": the component's props"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Arguments"})}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"createElement: (props: P, context: LeafletContextInterface) => LeafletElement<E>"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"updateElement?: (instance: E, props: P, prevProps: P) => void"})}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Returns"})," ",(0,s.jsx)(n.code,{children:"ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<E>>"})]})]})}function h(e={}){const{wrapper:n}={...(0,l.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(a,{...e})}):a(e)}},3327:(e,n,r)=>{r.d(n,{R:()=>c,x:()=>i});var s=r(2155);const l={},t=s.createContext(l);function c(e){const n=s.useContext(t);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:c(e.components),s.createElement(t.Provider,{value:n},e.children)}}}]);