import{S as U,F as J,P as K,V as l,W as Q,T as w,g as G,b as S,B as X,a as Y,o as $,c as ee,i as W,j as te,k as oe,p as ne,d as se,q as ae,r as ie,s as re,t as de,u as L,f as ce,D as he,v as A}from"./three.module-4dd0ab4d.js";import{O as le}from"./OrbitControls-79d41aec.js";import{d as pe,s as ue,l as we,o as me,c as ge}from"./index-2c776554.js";import{_ as fe}from"./_plugin-vue_export-helper-c27b6911.js";const _e="/WebglStudy/assets/starry-6de0c992.png",Se="/WebglStudy/assets/earth-b01a299a.jpg",be="/WebglStudy/assets/star1-e560cfcd.png",Me="/WebglStudy/assets/star2-d0154e22.png",ve="/WebglStudy/assets/cloud-feeb4763.png",R=45,ye=pe({__name:"2.星云",setup(xe){const i=new U;i.fog=new J(0,0,1e4);const m={width:window.innerWidth,height:window.innerHeight,depth:1200},e={...m};let d=0;const c=new K(R,e.width/e.height,.1,1e4);c.position.set(...b());function b(){const t=new l;return d=Math.floor(e.height/2/Math.tan(R/2/180*Math.PI)-e.depth/2),t.setZ(d),t.toArray()}window.addEventListener("resize",()=>{const[t,n]=[m.width,m.height];e.width=window.innerWidth,e.height=window.innerHeight,h.setSize(e.width,e.height),c.aspect=e.width/e.height,c.position.set(...b()),c.updateProjectionMatrix(),g.scale.set(e.width/t,e.height/n,1)});const h=new Q({antialias:!0});h.setSize(e.width,e.height),h.setPixelRatio(window.devicePixelRatio);const M=ue();we(()=>{M.value.appendChild(h.domElement)});const v=new w().load(_e);v.colorSpace=G;const g=new S(new X(e.width,e.height,e.depth),new Y({side:$,map:v}));console.log(g),i.add(g);const y=new w().load(Se);y.colorSpace=G;const f=new S(new ee(50,32,16),new W({map:y,shininess:100}));f.position.set(-200,160,-400),i.add(f),i.add(new te(16777215,1));const u=new oe(415229,1e6,0);u.power=1e6,u.position.set(0,0,70),u.position.set(-140,160,-300),i.add(u);const x=[{color:{h:.6,s:100,l:.75},img:be},{color:{h:.3,s:50,l:.8},img:Me}],C=[];function P(t){const n=new se,s=[];for(let o=0;o<1500;o++){const r=A.randFloatSpread(e.width),Z=Math.random()*(e.height/2),N=A.randFloat(-e.depth/2,d);s.push(r,Z,N)}n.setAttribute("position",new ae(s,3));const a=new ie,p=new w;for(const o of x){const r=new re(n,new de({size:16,depthTest:!0,map:p.load(o.img),transparent:!0,blending:L}));r.material.color.setHSL(o.color.h,o.color.s,o.color.l),r.rotation.set(Math.random()*.2-.15,Math.random()*.2-.15,Math.random()*.2-.15),a.add(r),C.push(r)}return a.position.set(0,0,t),i.add(a),a}const _=-d-e.depth/2,k=P(_),E=P(_*2);function H(){[k,E].forEach((t,n)=>{const s=Date.now()*5e-4;for(const[a,p]of x.entries()){const o=p.color,r=360*(o.h+s)%360/360;C[a].material.color.setHSL(Number.parseFloat(r.toFixed(2)),o.s,o.l)}t.position.z>d+e.depth/2&&(t.position.z=_),t.position.z+=7})}function z(t,n){const s=new S(new ce(t,n),new W({map:new w().load(ve),transparent:!0,depthTest:!1,side:he,blending:L}));return i.add(s),s}const T=[new l(-e.width/10,0,-e.depth/2),new l(-e.width/4,e.height/8,0),new l(-e.width/4,0,d)],j=[new l(e.width/8,e.height/8,-e.depth/2),new l(e.width/8,e.height/8,d)],D=z(300,200),I=B(D,T,.001),q=z(100,100),O=B(q,j,.005);function B(t,n,s){let a=0;const p=new ne(n);return()=>{const o=p.getPoint(a%1);t.position.set(...o.toArray()),a+=s}}const V=new le(c,h.domElement);function F(){f.rotation.y+=.008,H(),I(),O(),V.update(),h.render(i,c),requestAnimationFrame(F)}return F(),(t,n)=>(me(),ge("div",{ref_key:"containerRef",ref:M},null,512))}});const Fe=fe(ye,[["__scopeId","data-v-8543ede8"]]);export{Fe as default};
