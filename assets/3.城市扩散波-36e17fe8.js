import{S,P as M,W as B,b as p,f as C,a as R,D as x,N as _,h as l,B as k}from"./three.module-e7d85b12.js";import{O as F}from"./OrbitControls-04cfa186.js";import{a as U}from"./index-b9081dda.js";import{d as z}from"./index-1a26f821.js";import{d as E,l as G,s as V,p as j,o as H,c as L,h as u,F as W}from"./index-ef070050.js";const D=u("div",{class:"fixed left-20px top-20px px-20px leading-50px z-1 bg-white rounded"},[u("span",null,"学习来源："),u("a",{href:"https://www.bilibili.com/video/BV1is4y127J5/?spm_id_from=333.788&vd_source=c21dc7a2f93289c8e3df1bde97f015b9",target:"_blank",class:"text-blue"}," B站：three.js智慧城市扫光shader-扫光 ")],-1),d=30,I=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,J=`
  varying vec2 vUv;
  uniform float scale;
  uniform vec3 color1;
  uniform vec3 color2;
  void main() {
    float distance = distance(vUv, vec2(0.5, 0.5));
    float opacity = smoothstep(0.4 * scale, 0.5 * scale, distance);
    opacity *= step(distance, 0.5 * scale);
    vec3 color = color1 + (color2 - color1) * scale;

    gl_FragColor = vec4(color, opacity);
  }
`,v=100,Q=E({__name:"3.城市扩散波",setup(N){const c={width:window.innerWidth,height:window.innerHeight},n=new S,f=new M(45,c.width/c.height,.1,1e3);f.position.set(0,30,20);const a=new B({antialias:!0});a.setSize(c.width,c.height),a.setPixelRatio(window.devicePixelRatio),G(()=>{var o;(o=w.value)==null||o.appendChild(a.domElement)});const w=V(),y=new F(f,a.domElement),{random:r}=Math;function b(){const o=new k(1,Math.max(r()*15,4),1,10),e=`
  varying vec3 vColor;
  uniform vec3 upColor;
  uniform vec3 downColor;
  uniform vec3 hitColor;
  uniform float time;
  uniform float speed;
  uniform float height;
  uniform float hitProgress;
  void main() {
    float percent = (position.y + height / 2.0) / height;
    vColor = mix(downColor, upColor, percent);
    vColor.r *= abs(cos(time));

    if (hitProgress != -1.0) {
      vColor = mix(vColor, hitColor, hitProgress);
    }

    vec3 transformed = position;
    transformed.y *= min(sin(time), 1.0);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
  }
`,t=`
  varying vec3 vColor;
  void main() {
    gl_FragColor = vec4(vColor, 1.0);
  }
`,i=new _({vertexShader:e,fragmentShader:t,uniforms:{upColor:{value:new l("teal")},downColor:{value:new l("yellow")},time:{value:0},speed:{value:0},height:{value:0},hitColor:{value:new l("red")},hitProgress:{value:0}}});return new p(o,i)}const g=[];for(let o=0;o<100;o++){const e=b(),t=e.geometry.parameters.height;e.position.set(r()*d-d/2,t/2,r()*d-d/2),e.material.uniforms.upColor.value.setHSL(r(),1,.5),e.material.uniforms.downColor.value.setHSL(r(),1,.5),e.material.uniforms.speed.value=r()*4,e.material.uniforms.height.value=t,g.push(e),n.add(e)}const h=new p(new C(100,100),new R({color:10066329,side:x}));h.rotation.x=-Math.PI/2,n.add(h);const P=new _({vertexShader:I,fragmentShader:J,transparent:!0,side:x,uniforms:{scale:{value:0},color1:{value:new l("pink")},color2:{value:new l("white")}}}),s=new p(new C(v,v),P);return s.rotation.x=-Math.PI/2,n.add(s),U(()=>{a.render(n,f),y.update(),s.material.uniforms.scale.value+=.01,s.material.uniforms.scale.value%=1;const o=s.material.uniforms.scale.value,e=o*v/2,t=(o-.1)*v/2;g.forEach(i=>{i.material.uniforms.time.value+=.01;const m=i.position.distanceTo(h.position);m<e&&m>t?i.material.uniforms.hitProgress.value=(m-t)/(e-t):i.material.uniforms.hitProgress.value=-1})}),j(()=>{z(n,a)}),(o,e)=>(H(),L(W,null,[u("div",{ref_key:"containerRef",ref:w},null,512),D],64))}});export{Q as default};
