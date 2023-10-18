import{S as T,P as y,W as _,T as b,K as M,f as U,$ as C,b as I}from"./three.module-4dd0ab4d.js";import{u as R,a as P}from"./index-e976abc4.js";import{G as S}from"./dat.gui.module-5ea4ba08.js";import{d as V}from"./index-1a26f821.js";import{d as j,s as F,l as G,p as L,o as k,c as E}from"./index-5217155f.js";const p="/assets/car-cd57db70.png",m="/assets/carDepth-6e9db6e1.jpg",W="/assets/building-52af8ebf.png",z="/assets/buildingDepth-2c0d70d1.jpg",B="/assets/person-7fedc1b5.png",$="/assets/personDepth-3c6ec6cc.jpg",A=j({__name:"2.深度图",setup(H){const e={width:window.innerWidth,height:window.innerHeight},s=new T,i=new y(45,e.width/e.height,1,1e4);i.position.set(0,0,24);const t=new _({antialias:!0});t.setSize(e.width,e.height),t.setPixelRatio(window.devicePixelRatio);const u=F();G(()=>{u.value.appendChild(t.domElement)});const r=new b,h=r.load(p),v=r.load(m),a=new M,g=new U(38.4,21.6),o=new C({uniforms:{uTexture:{value:h},uDepthTexture:{value:v},uMouse:{value:a}},vertexShader:`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    uniform sampler2D uTexture;
    uniform sampler2D uDepthTexture;
    uniform vec2 uMouse;
    varying vec2 vUv;
    void main() {
      vec4 color = texture2D(uTexture, vUv);
      vec4 depth = texture2D(uDepthTexture, vUv);
      float depthValue = depth.r;
      float x = vUv.x + uMouse.x * 0.01 * depthValue;
      float y = vUv.y + uMouse.y * 0.01 * depthValue;
      vec4 newColor = texture2D(uTexture, vec2(x, y));
      gl_FragColor = newColor;
    }
  `}),f=new I(g,o);s.add(f),R("mousemove",n=>{a.x=n.clientX/e.width*2-1,a.y=-(n.clientY/e.height)*2+1}),P(()=>{t.render(s,i)});const c=new S,d=c.addFolder("图片"),x={图片:"车"},w={车:{img:p,depthImg:m},建筑:{img:W,depthImg:z},人:{img:B,depthImg:$}};return d.add(x,"图片",["车","建筑","人"]).onChange(n=>{o.uniforms.uTexture.value.dispose(),o.uniforms.uDepthTexture.value.dispose();const{img:l,depthImg:D}=w[n];o.uniforms.uTexture.value=r.load(l),o.uniforms.uDepthTexture.value=r.load(D),console.log(t.info),console.log(s)}),d.open(),L(()=>{c.destroy(),V(s,t)}),(n,l)=>(k(),E("div",{ref_key:"containerRef",ref:u},null,512))}});export{A as default};
