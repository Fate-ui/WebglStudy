import{a8 as te,l as O,a4 as R,k as w,d as ne,V as se,M as g,a as T,P as oe,B as $,C as re}from"./index-781b760a.js";import{_ as ce}from"./use-form-item-8d7e105e.js";import{i as M}from"./style-fc5b023b.js";function ae(e){return e==null}const Se=(...e)=>n=>{e.forEach(s=>{te(s)?s(n):s.value=n})},X={tab:"Tab",enter:"Enter",space:"Space",left:"ArrowLeft",up:"ArrowUp",right:"ArrowRight",down:"ArrowDown",esc:"Escape",delete:"Delete",backspace:"Backspace",numpadEnter:"NumpadEnter",pageUp:"PageUp",pageDown:"PageDown",home:"Home",end:"End"};let v=[];const j=e=>{const n=e;n.key===X.esc&&v.forEach(s=>s(n))},ue=e=>{O(()=>{v.length===0&&document.addEventListener("keydown",j),M&&v.push(e)}),R(()=>{v=v.filter(n=>n!==e),v.length===0&&M&&document.removeEventListener("keydown",j)})},L="focus-trap.focus-after-trapped",C="focus-trap.focus-after-released",ie="focus-trap.focusout-prevented",q={cancelable:!0,bubbles:!1},de={cancelable:!0,bubbles:!1},W="focusAfterTrapped",J="focusAfterReleased",fe=Symbol("elFocusTrap"),k=w(),y=w(0),A=w(0);let F=0;const Z=e=>{const n=[],s=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:o=>{const c=o.tagName==="INPUT"&&o.type==="hidden";return o.disabled||o.hidden||c?NodeFilter.FILTER_SKIP:o.tabIndex>=0||o===document.activeElement?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});for(;s.nextNode();)n.push(s.currentNode);return n},Y=(e,n)=>{for(const s of e)if(!le(s,n))return s},le=(e,n)=>{if(getComputedStyle(e).visibility==="hidden")return!0;for(;e;){if(n&&e===n)return!1;if(getComputedStyle(e).display==="none")return!0;e=e.parentElement}return!1},pe=e=>{const n=Z(e),s=Y(n,e),o=Y(n.reverse(),e);return[s,o]},ve=e=>e instanceof HTMLInputElement&&"select"in e,l=(e,n)=>{if(e&&e.focus){const s=document.activeElement;e.focus({preventScroll:!0}),A.value=window.performance.now(),e!==s&&ve(e)&&n&&e.select()}};function z(e,n){const s=[...e],o=e.indexOf(n);return o!==-1&&s.splice(o,1),s}const Ee=()=>{let e=[];return{push:o=>{const c=e[0];c&&o!==c&&c.pause(),e=z(e,o),e.unshift(o)},remove:o=>{var c,d;e=z(e,o),(d=(c=e[0])==null?void 0:c.resume)==null||d.call(c)}}},me=(e,n=!1)=>{const s=document.activeElement;for(const o of e)if(l(o,n),document.activeElement!==s)return},G=Ee(),Te=()=>y.value>A.value,b=()=>{k.value="pointer",y.value=window.performance.now()},Q=()=>{k.value="keyboard",y.value=window.performance.now()},Fe=()=>(O(()=>{F===0&&(document.addEventListener("mousedown",b),document.addEventListener("touchstart",b),document.addEventListener("keydown",Q)),F++}),R(()=>{F--,F<=0&&(document.removeEventListener("mousedown",b),document.removeEventListener("touchstart",b),document.removeEventListener("keydown",Q))}),{focusReason:k,lastUserFocusTimestamp:y,lastAutomatedFocusTimestamp:A}),_=e=>new CustomEvent(ie,{...de,detail:e}),be=ne({name:"ElFocusTrap",inheritAttrs:!1,props:{loop:Boolean,trapped:Boolean,focusTrapEl:Object,focusStartEl:{type:[Object,String],default:"first"}},emits:[W,J,"focusin","focusout","focusout-prevented","release-requested"],setup(e,{emit:n}){const s=w();let o,c;const{focusReason:d}=Fe();ue(t=>{e.trapped&&!p.paused&&n("release-requested",t)});const p={paused:!1,pause(){this.paused=!0},resume(){this.paused=!1}},E=t=>{if(!e.loop&&!e.trapped||p.paused)return;const{key:r,altKey:a,ctrlKey:u,metaKey:i,currentTarget:H,shiftKey:V}=t,{loop:x}=e,ee=r===X.tab&&!a&&!u&&!i,m=document.activeElement;if(ee&&m){const P=H,[h,S]=pe(P);if(h&&S){if(!V&&m===S){const f=_({focusReason:d.value});n("focusout-prevented",f),f.defaultPrevented||(t.preventDefault(),x&&l(h,!0))}else if(V&&[h,P].includes(m)){const f=_({focusReason:d.value});n("focusout-prevented",f),f.defaultPrevented||(t.preventDefault(),x&&l(S,!0))}}else if(m===P){const f=_({focusReason:d.value});n("focusout-prevented",f),f.defaultPrevented||t.preventDefault()}}};se(fe,{focusTrapRef:s,onKeydown:E}),g(()=>e.focusTrapEl,t=>{t&&(s.value=t)},{immediate:!0}),g([s],([t],[r])=>{t&&(t.addEventListener("keydown",E),t.addEventListener("focusin",I),t.addEventListener("focusout",D)),r&&(r.removeEventListener("keydown",E),r.removeEventListener("focusin",I),r.removeEventListener("focusout",D))});const N=t=>{n(W,t)},U=t=>n(J,t),I=t=>{const r=T(s);if(!r)return;const a=t.target,u=t.relatedTarget,i=a&&r.contains(a);e.trapped||u&&r.contains(u)||(o=u),i&&n("focusin",t),!p.paused&&e.trapped&&(i?c=a:l(c,!0))},D=t=>{const r=T(s);if(!(p.paused||!r))if(e.trapped){const a=t.relatedTarget;!ae(a)&&!r.contains(a)&&setTimeout(()=>{if(!p.paused&&e.trapped){const u=_({focusReason:d.value});n("focusout-prevented",u),u.defaultPrevented||l(c,!0)}},0)}else{const a=t.target;a&&r.contains(a)||n("focusout",t)}};async function K(){await $();const t=T(s);if(t){G.push(p);const r=t.contains(document.activeElement)?o:document.activeElement;if(o=r,!t.contains(r)){const u=new Event(L,q);t.addEventListener(L,N),t.dispatchEvent(u),u.defaultPrevented||$(()=>{let i=e.focusStartEl;re(i)||(l(i),document.activeElement!==i&&(i="first")),i==="first"&&me(Z(t),!0),(document.activeElement===r||i==="container")&&l(t)})}}}function B(){const t=T(s);if(t){t.removeEventListener(L,N);const r=new CustomEvent(C,{...q,detail:{focusReason:d.value}});t.addEventListener(C,U),t.dispatchEvent(r),!r.defaultPrevented&&(d.value=="keyboard"||!Te()||t.contains(document.activeElement))&&l(o??document.body),t.removeEventListener(C,U),G.remove(p)}}return O(()=>{e.trapped&&K(),g(()=>e.trapped,t=>{t?K():B()})}),R(()=>{e.trapped&&B()}),{onKeydown:E}}});function _e(e,n,s,o,c,d){return oe(e.$slots,"default",{handleKeydown:e.onKeydown})}var ge=ce(be,[["render",_e],["__file","/home/runner/work/element-plus/element-plus/packages/components/focus-trap/src/focus-trap.vue"]]);export{ge as E,fe as F,X as a,Se as c,ae as i};
