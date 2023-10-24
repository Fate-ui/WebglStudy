import{S as D,P as b,W as T,T as S,K as _,f as M,$ as U,b as W}from"./three.module-64cab3bc.js";import{u as C,a as I}from"./index-034fbea2.js";import{G as R}from"./dat.gui.module-5ea4ba08.js";import{d as P}from"./index-1a26f821.js";import{d as V,s as j,l as F,p as G,o as L,c as k}from"./index-88e77320.js";const p="/WebglStudy/assets/car-cd57db70.png",m="/WebglStudy/assets/carDepth-6e9db6e1.jpg",E="/WebglStudy/assets/building-52af8ebf.png",z="/WebglStudy/assets/buildingDepth-2c0d70d1.jpg",B="/WebglStudy/assets/person-7fedc1b5.png",$="/WebglStudy/assets/personDepth-3c6ec6cc.jpg",A=V({__name:"2.深度图",setup(H){const e={width:window.innerWidth,height:window.innerHeight},r=new D,i=new b(45,e.width/e.height,1,1e4);i.position.set(0,0,24);const t=new T({antialias:!0});t.setSize(e.width,e.height),t.setPixelRatio(window.devicePixelRatio);const u=j();F(()=>{u.value.appendChild(t.domElement)});const s=new S,h=s.load(p),g=s.load(m),a=new _,v=new M(38.4,21.6),o=new U({uniforms:{uTexture:{value:h},uDepthTexture:{value:g},uMouse:{value:a}},vertexShader:`
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
  `}),f=new W(v,o);r.add(f),C("mousemove",n=>{a.x=n.clientX/e.width*2-1,a.y=-(n.clientY/e.height)*2+1}),I(()=>{t.render(r,i)});const d=new R,c=d.addFolder("图片"),x={图片:"车"},w={车:{img:p,depthImg:m},建筑:{img:E,depthImg:z},人:{img:B,depthImg:$}};return c.add(x,"图片",["车","建筑","人"]).onChange(n=>{o.uniforms.uTexture.value.dispose(),o.uniforms.uDepthTexture.value.dispose();const{img:l,depthImg:y}=w[n];o.uniforms.uTexture.value=s.load(l),o.uniforms.uDepthTexture.value=s.load(y),t.info}),c.open(),G(()=>{d.destroy(),P(r,t)}),(n,l)=>(L(),k("div",{ref_key:"containerRef",ref:u},null,512))}});export{A as default};
