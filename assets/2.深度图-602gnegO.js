import{S as D,P as T,W as b,T as S,K as W,f as _,N as M,b as U}from"./three.module-QHcyoKWZ.js";import{u as C,a as I}from"./index-zO-Sle_b.js";import{G as R}from"./dat.gui.module-PWGADmkp.js";import{d as P}from"./index-W38Qjy34.js";import{d as V,s as F,l as G,p as j,o as k,c as B}from"./index-EijTbRPw.js";const p="/WebglStudy/assets/car-R0reENfQ.png",m="/WebglStudy/assets/carDepth-mCId9Ff8.jpg",E="/WebglStudy/assets/building-Vtkqfbmz.png",L="/WebglStudy/assets/buildingDepth-B9dXUq9K.jpg",z="/WebglStudy/assets/person-oYMXfa1h.png",X="/WebglStudy/assets/personDepth-sfWmBvWG.jpg",Q=V({__name:"2.深度图",setup(q){const e={width:window.innerWidth,height:window.innerHeight},r=new D,i=new T(45,e.width/e.height,1,1e4);i.position.set(0,0,24);const t=new b({antialias:!0});t.setSize(e.width,e.height),t.setPixelRatio(window.devicePixelRatio);const u=F();G(()=>{u.value.appendChild(t.domElement)});const s=new S,h=s.load(p),g=s.load(m),a=new W,v=new _(38.4,21.6),o=new M({uniforms:{uTexture:{value:h},uDepthTexture:{value:g},uMouse:{value:a}},vertexShader:`
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
  `}),f=new U(v,o);r.add(f),C("mousemove",n=>{a.x=n.clientX/e.width*2-1,a.y=-(n.clientY/e.height)*2+1}),I(()=>{t.render(r,i)});const d=new R,l=d.addFolder("图片"),x={图片:"车"},w={车:{img:p,depthImg:m},建筑:{img:E,depthImg:L},人:{img:z,depthImg:X}};return l.add(x,"图片",["车","建筑","人"]).onChange(n=>{o.uniforms.uTexture.value.dispose(),o.uniforms.uDepthTexture.value.dispose();const{img:c,depthImg:y}=w[n];o.uniforms.uTexture.value=s.load(c),o.uniforms.uDepthTexture.value=s.load(y),t.info}),l.open(),j(()=>{d.destroy(),P(r,t)}),(n,c)=>(k(),B("div",{ref_key:"containerRef",ref:u},null,512))}});export{Q as default};
