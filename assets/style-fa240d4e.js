import{e as m,h as p}from"./base-6a0060ca.js";import{k as y,Y as g,Z as w,_ as v,a as h,$ as A,C}from"./index-88e77320.js";var c;const a=typeof window<"u";a&&((c=window==null?void 0:window.navigator)!=null&&c.userAgent)&&/iP(ad|hone|od)/.test(window.navigator.userAgent);function S(t){return typeof t=="function"?t():h(t)}function T(t){return w()?(v(t),!0):!1}function N(t,r,i={}){const{immediate:n=!0}=i,s=y(!1);let e=null;function o(){e&&(clearTimeout(e),e=null)}function u(){s.value=!1,o()}function f(...d){o(),s.value=!0,e=setTimeout(()=>{s.value=!1,e=null,t(...d)},S(r))}return n&&(s.value=!0,a&&f()),T(u),{isPending:g(s),start:f,stop:u}}var $=Array.isArray;const P=$,l=(t="")=>t.split(" ").filter(r=>!!r.trim()),_=(t,r)=>{if(!t||!r)return!1;if(r.includes(" "))throw new Error("className should not contain space.");return t.classList.contains(r)},k=(t,r)=>{!t||!r.trim()||t.classList.add(...l(r))},x=(t,r)=>{!t||!r.trim()||t.classList.remove(...l(r))},D=(t,r)=>{var i;if(!a||!t||!r)return"";let n=A(r);n==="float"&&(n="cssFloat");try{const s=t.style[n];if(s)return s;const e=(i=document.defaultView)==null?void 0:i.getComputedStyle(t,"");return e?e[n]:""}catch{return t.style[n]}};function F(t,r="px"){if(!t)return"";if(m(t)||p(t))return`${t}${r}`;if(C(t))return t}export{k as a,F as b,P as c,D as g,_ as h,a as i,x as r,N as u};
