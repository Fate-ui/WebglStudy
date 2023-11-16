import{S as M,P as _,W as b,b as h,f as g,a as R,D as C,N as x,h as l,B}from"./three.module-4d045381.js";import{O as U}from"./OrbitControls-67f14f60.js";import{a as k}from"./index-9ea2bc7a.js";import{d as E}from"./index-1a26f821.js";import{d as G,l as z,s as F,p as H,o as L,c as W}from"./index-4e7c88af.js";const v=30,j=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,D=`
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
`,d=100,q=G({__name:"3.城市扩散波",setup(I){const c={width:window.innerWidth,height:window.innerHeight},n=new M,u=new _(45,c.width/c.height,.1,1e3);u.position.set(0,30,20);const a=new b({antialias:!0});a.setSize(c.width,c.height),a.setPixelRatio(window.devicePixelRatio),z(()=>{var o;(o=p.value)==null||o.appendChild(a.domElement)});const p=F(),y=new U(u,a.domElement),{random:r}=Math;function P(){const o=new B(1,Math.max(r()*15,4),1,10),e=`
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
`,i=new x({vertexShader:e,fragmentShader:t,uniforms:{upColor:{value:new l("teal")},downColor:{value:new l("yellow")},time:{value:0},speed:{value:0},height:{value:0},hitColor:{value:new l("red")},hitProgress:{value:0}}});return new h(o,i)}const w=[];for(let o=0;o<100;o++){const e=P(),t=e.geometry.parameters.height;e.position.set(r()*v-v/2,t/2,r()*v-v/2),e.material.uniforms.upColor.value.setHSL(r(),1,.5),e.material.uniforms.downColor.value.setHSL(r(),1,.5),e.material.uniforms.speed.value=r()*4,e.material.uniforms.height.value=t,w.push(e),n.add(e)}const f=new h(new g(100,100),new R({color:10066329,side:C}));f.rotation.x=-Math.PI/2,n.add(f);const S=new x({vertexShader:j,fragmentShader:D,transparent:!0,side:C,uniforms:{scale:{value:0},color1:{value:new l("pink")},color2:{value:new l("white")}}}),s=new h(new g(d,d),S);return s.rotation.x=-Math.PI/2,n.add(s),k(()=>{a.render(n,u),y.update(),s.material.uniforms.scale.value+=.01,s.material.uniforms.scale.value%=1;const o=s.material.uniforms.scale.value,e=o*d/2,t=(o-.1)*d/2;w.forEach(i=>{i.material.uniforms.time.value+=.01;const m=i.position.distanceTo(f.position);m<e&&m>t?i.material.uniforms.hitProgress.value=(m-t)/(e-t):i.material.uniforms.hitProgress.value=-1})}),H(()=>{E(n,a)}),(o,e)=>(L(),W("div",{ref_key:"containerRef",ref:p},null,512))}});export{q as default};
