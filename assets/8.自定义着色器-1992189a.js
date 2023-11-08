import{S as F,P as D,W as z,K as L,aU as B,b as x,f as E,a as w,D as C,h as G,j as H,m as l}from"./three.module-cb7ba46f.js";import{O as A}from"./OrbitControls-7501b747.js";import{G as I}from"./GLTFLoader-9e3f9944.js";import{D as O}from"./DRACOLoader-e4e7f608.js";import{g as s}from"./index-4db78ffb.js";import{E as U,R as k,U as V}from"./UnrealBloomPass-4a4bea48.js";import{d as j}from"./index-1a26f821.js";import{d as J,s as K,l as q,p as N,o as Q,c as X}from"./index-7aa26047.js";const re=J({__name:"8.自定义着色器",setup(Y){const t={width:window.innerWidth,height:window.innerHeight},i=new F,r=new D(45,t.width/t.height,.1,1e3);r.position.set(0,3,3);const n=new z({antialias:!0,logarithmicDepthBuffer:!0});n.setSize(t.width,t.height),n.setPixelRatio(window.devicePixelRatio);const c=K();q(()=>{c.value.appendChild(n.domElement)});const p=new A(r,n.domElement);p.autoRotate=!0;const d=new U(n),P=new k(i,r);d.addPass(P);const _=new V(new L(t.width,t.height),.6,.5,.5);d.addPass(_),n.setAnimationLoop(()=>{d.render(),p.update()});const a=document.createElement("video");a.src="textures/zp2.mp4",a.muted=!0,a.loop=!0;const f=new B(a),g=new x(new E(6.4,3.6),new w({map:f,side:C,transparent:!0,alphaMap:f}));g.rotation.x=-Math.PI/2,i.add(g);const m=new O;m.setDecoderPath("draco/"),m.preload();const h=new I;h.setDRACOLoader(m),h.load("model/building-min.glb",e=>{const o=e.scene;o.scale.set(.01,.01,.01),i.add(o),o.traverse(u=>{u instanceof x&&(u.material.dispose(),u.material=M())})});function M(){const e=new w({color:"#28B1CC",wireframe:!0,opacity:.5,transparent:!0,side:C});return e.onBeforeCompile=o=>{o.fragmentShader=o.fragmentShader.replace("#include <dithering_fragment>",`
    #include <dithering_fragment>
    //#end#
    `),o.vertexShader,W(o),R(o),b(o),y(o)},e}function W(e){e.uniforms.uTopColor={value:new G("#e9eaef")},e.uniforms.uHeight={value:1200},e.vertexShader=e.vertexShader.replace("#include <common>",`
      #include <common>
      varying vec3 vPosition;
      `),e.vertexShader=e.vertexShader.replace("#include <begin_vertex>",`
      #include <begin_vertex>
      vPosition = position;
  `),e.fragmentShader=e.fragmentShader.replace("#include <common>",`
      #include <common>

      uniform vec3 uTopColor;
      uniform float uHeight;
      varying vec3 vPosition;

        `),e.fragmentShader=e.fragmentShader.replace("//#end#",`

      vec4 distGradColor = gl_FragColor;

      // 设置混合的百分比
      float gradMix = vPosition.y/uHeight;
      // 计算出混合颜色
      vec3 gradMixColor = mix(distGradColor.xyz,uTopColor,gradMix);
      gl_FragColor = vec4(gradMixColor,1);
        //#end#

      `)}function R(e){e.uniforms.uSpreadCenter={value:new L(0,0)},e.uniforms.uSpreadTime={value:-2e3},e.uniforms.uSpreadWidth={value:40},e.fragmentShader=e.fragmentShader.replace("#include <common>",`
      #include <common>

      uniform vec2 uSpreadCenter;
      uniform float uSpreadTime;
      uniform float uSpreadWidth;
      `),e.fragmentShader=e.fragmentShader.replace("//#end#",`
     float spreadRadius = distance(vPosition.xz,uSpreadCenter);
    //  扩散范围的函数
    float spreadIndex = -(spreadRadius-uSpreadTime)*(spreadRadius-uSpreadTime)+uSpreadWidth;

    if(spreadIndex>0.0){
        gl_FragColor = mix(gl_FragColor,vec4(1,1,1,1),spreadIndex/uSpreadWidth);
    }

    //#end#
    `),s.to(e.uniforms.uSpreadTime,{value:800,duration:3,ease:"none",repeat:-1})}function b(e){e.uniforms.uLightLineTime={value:-1500},e.uniforms.uLightLineWidth={value:200},e.fragmentShader=e.fragmentShader.replace("#include <common>",`
        #include <common>


        uniform float uLightLineTime;
        uniform float uLightLineWidth;
        `),e.fragmentShader=e.fragmentShader.replace("//#end#",`
      float LightLineMix = -(vPosition.x+vPosition.z-uLightLineTime)*(vPosition.x+vPosition.z-uLightLineTime)+uLightLineWidth;

      if(LightLineMix>0.0){
          gl_FragColor = mix(gl_FragColor,vec4(0.8,1.0,1.0,1),LightLineMix /uLightLineWidth);

      }

      //#end#
      `),s.to(e.uniforms.uLightLineTime,{value:1500,duration:5,ease:"none",repeat:-1})}function y(e){e.uniforms.uToTopTime={value:0},e.uniforms.uToTopWidth={value:40},e.fragmentShader=e.fragmentShader.replace("#include <common>",`
          #include <common>


          uniform float uToTopTime;
          uniform float uToTopWidth;
          `),e.fragmentShader=e.fragmentShader.replace("//#end#",`
        float ToTopMix = -(vPosition.y-uToTopTime)*(vPosition.y-uToTopTime)+uToTopWidth;

        if(ToTopMix>0.0){
            gl_FragColor = mix(gl_FragColor,vec4(0.8,0.8,1,1),ToTopMix /uToTopWidth);

        }

        //#end#
        `),s.to(e.uniforms.uToTopTime,{value:500,duration:3,ease:"none",repeat:-1})}i.add(new H(16777215,10));const v=new l(16777215,10);v.position.set(10,10,10),i.add(v);const T=new l(16777215,10);T.position.set(-10,10,-10),i.add(T);const S=new l(16777215,10);return S.position.set(0,-10,0),i.add(S),N(()=>{j(i,n)}),(e,o)=>(Q(),X("div",{ref_key:"containerRef",ref:c},null,512))}});export{re as default};
