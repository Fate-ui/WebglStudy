import{S as f,P as R,W as g,a7 as x,j as v,m as L,aT as P,b,f as w,a as M,D as _}from"./three.module-a9580ee8.js";import{O as C}from"./OrbitControls-44e46930.js";import{R as D}from"./RGBELoader-cb17ba95.js";import{D as E}from"./DRACOLoader-58eba818.js";import{G as k}from"./GLTFLoader-f79a8b9f.js";import{R as B}from"./Reflector-54c26062.js";import{a as G}from"./index-0c0d7ccc.js";import{d as S}from"./index-1a26f821.js";import{d as T,s as y,l as O,p as W,o as z,c as A}from"./index-638dfcb3.js";const N=T({__name:"5.机器人",setup(F){const o={width:window.innerWidth,height:window.innerHeight},e=new f,i=new R(45,o.width/o.height,1,1e3);i.position.set(0,1.5,6);const t=new g({antialias:!0});t.setSize(o.width,o.height),t.setPixelRatio(window.devicePixelRatio);const s=y();O(()=>{s.value.appendChild(t.domElement)});const u=new C(i,t.domElement);G(()=>{t.render(e,i),u.update()}),new D().load("textures/sky12.hdr",n=>{n.mapping=x,e.background=n,e.environment=n});const d=new E;d.setDecoderPath("draco/");const c=new k;c.setDRACOLoader(d),c.load("model/robot.glb",n=>{const h=n.scene;e.add(h)}),e.add(new v(16777215,1));const l=new L(16777215,1);l.position.set(0,10,0),e.add(l);const a=document.createElement("video");a.src="textures/zp2.mp4",a.muted=!0,a.loop=!0,a.play();const m=new P(a),p=new b(new w(16,9),new M({map:m,side:_,transparent:!0,alphaMap:m}));p.rotation.x=-Math.PI/2,e.add(p);const r=new B(new w(100,10),{clipBias:.003,textureWidth:o.width*window.devicePixelRatio,textureHeight:o.height*window.devicePixelRatio,color:3351074});return r.position.setY(-.1),r.rotation.x=-Math.PI/2,e.add(r),W(()=>{S(e,t)}),(n,h)=>(z(),A("div",{ref_key:"containerRef",ref:s},null,512))}});export{N as default};
