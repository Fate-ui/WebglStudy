import{k as _,m as B,V as T,W as N,d as E,X as g,w as P,v as z,q as O,Y as R,Z as j,_ as h,y as A,z as I,P as q,$ as Y}from"./index-78d0a16f.js";import{r as x,b as Z,g as b,c as L}from"./style-64155c3b.js";import{a as D}from"./use-global-config-7fca6d2b.js";function F(t){let e;const l=_(!1),o=B({...t,originalPosition:"",originalOverflow:"",visible:!1});function a(n){o.text=n}function s(){const n=o.parent,r=d.ns;if(!n.vLoadingAddClassList){let c=n.getAttribute("loading-number");c=Number.parseInt(c)-1,c?n.setAttribute("loading-number",c.toString()):(x(n,r.bm("parent","relative")),n.removeAttribute("loading-number")),x(n,r.bm("parent","hidden"))}i(),m.unmount()}function i(){var n,r;(r=(n=d.$el)==null?void 0:n.parentNode)==null||r.removeChild(d.$el)}function v(){var n;t.beforeClose&&!t.beforeClose()||(l.value=!0,clearTimeout(e),e=window.setTimeout(f,400),o.visible=!1,(n=t.closed)==null||n.call(t))}function f(){if(!l.value)return;const n=o.parent;l.value=!1,n.vLoadingAddClassList=void 0,s()}const u=E({name:"ElLoading",setup(n,{expose:r}){const{ns:c,zIndex:$}=D("loading");return r({ns:c,zIndex:$}),()=>{const C=o.spinner||o.svg,S=g("svg",{class:"circular",viewBox:o.svgViewBox?o.svgViewBox:"0 0 50 50",...C?{innerHTML:C}:{}},[g("circle",{class:"path",cx:"25",cy:"25",r:"20",fill:"none"})]),V=o.text?g("p",{class:c.b("text")},[o.text]):void 0;return g(j,{name:c.b("fade"),onAfterLeave:f},{default:P(()=>[z(O("div",{style:{backgroundColor:o.background||""},class:[c.b("mask"),o.customClass,o.fullscreen?"is-fullscreen":""]},[g("div",{class:c.b("spinner")},[S,V])]),[[R,o.visible]])])})}}}),m=T(u),d=m.mount(document.createElement("div"));return{...N(o),setText:a,removeElLoadingChild:i,close:v,handleAfterLeave:f,vm:d,get $el(){return d.$el}}}let p;const G=function(t={}){if(!Z)return;const e=H(t);if(e.fullscreen&&p)return p;const l=F({...e,closed:()=>{var a;(a=e.closed)==null||a.call(e),e.fullscreen&&(p=void 0)}});K(e,e.parent,l),k(e,e.parent,l),e.parent.vLoadingAddClassList=()=>k(e,e.parent,l);let o=e.parent.getAttribute("loading-number");return o?o=`${Number.parseInt(o)+1}`:o="1",e.parent.setAttribute("loading-number",o),e.parent.appendChild(l.$el),h(()=>l.visible.value=e.visible),e.fullscreen&&(p=l),l},H=t=>{var e,l,o,a;let s;return A(t.target)?s=(e=document.querySelector(t.target))!=null?e:document.body:s=t.target||document.body,{parent:s===document.body||t.body?document.body:s,background:t.background||"",svg:t.svg||"",svgViewBox:t.svgViewBox||"",spinner:t.spinner||!1,text:t.text||"",fullscreen:s===document.body&&((l=t.fullscreen)!=null?l:!0),lock:(o=t.lock)!=null?o:!1,customClass:t.customClass||"",visible:(a=t.visible)!=null?a:!0,target:s}},K=async(t,e,l)=>{const{nextZIndex:o}=l.vm.zIndex||l.vm._.exposed.zIndex,a={};if(t.fullscreen)l.originalPosition.value=b(document.body,"position"),l.originalOverflow.value=b(document.body,"overflow"),a.zIndex=o();else if(t.parent===document.body){l.originalPosition.value=b(document.body,"position"),await h();for(const s of["top","left"]){const i=s==="top"?"scrollTop":"scrollLeft";a[s]=`${t.target.getBoundingClientRect()[s]+document.body[i]+document.documentElement[i]-Number.parseInt(b(document.body,`margin-${s}`),10)}px`}for(const s of["height","width"])a[s]=`${t.target.getBoundingClientRect()[s]}px`}else l.originalPosition.value=b(e,"position");for(const[s,i]of Object.entries(a))l.$el.style[s]=i},k=(t,e,l)=>{const o=l.vm.ns||l.vm._.exposed.ns;["absolute","fixed","sticky"].includes(l.originalPosition.value)?x(e,o.bm("parent","relative")):L(e,o.bm("parent","relative")),t.fullscreen&&t.lock?L(e,o.bm("parent","hidden")):x(e,o.bm("parent","hidden"))},y=Symbol("ElLoading"),w=(t,e)=>{var l,o,a,s;const i=e.instance,v=n=>I(e.value)?e.value[n]:void 0,f=n=>{const r=A(n)&&(i==null?void 0:i[n])||n;return r&&_(r)},u=n=>f(v(n)||t.getAttribute(`element-loading-${Y(n)}`)),m=(l=v("fullscreen"))!=null?l:e.modifiers.fullscreen,d={text:u("text"),svg:u("svg"),svgViewBox:u("svgViewBox"),spinner:u("spinner"),background:u("background"),customClass:u("customClass"),fullscreen:m,target:(o=v("target"))!=null?o:m?void 0:t,body:(a=v("body"))!=null?a:e.modifiers.body,lock:(s=v("lock"))!=null?s:e.modifiers.lock};t[y]={options:d,instance:G(d)}},M=(t,e)=>{for(const l of Object.keys(e))q(e[l])&&(e[l].value=t[l])},Q={mounted(t,e){e.value&&w(t,e)},updated(t,e){const l=t[y];e.oldValue!==e.value&&(e.value&&!e.oldValue?w(t,e):e.value&&e.oldValue?I(e.value)&&M(e.value,l.options):l==null||l.instance.close())},unmounted(t){var e;(e=t[y])==null||e.instance.close()}};export{Q as v};