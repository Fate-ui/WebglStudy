import{S as g,P as C,W as x,b as h,f as b,a as _,D as M,B as y,N as S,h as f}from"./three.module-QHcyoKWZ.js";import{O as B}from"./OrbitControls-8TWoeIgH.js";import{a as P}from"./index-du8DvFNP.js";import{d as R}from"./index-W38Qjy34.js";import{d as k,l as E,s as F,p as G,o as z,c as H,h as l,F as L}from"./index-bx_dK3Ep.js";const N=l("div",{class:"fixed left-20px top-20px px-20px leading-50px z-1 bg-white rounded"},[l("span",null,"学习来源："),l("a",{href:"https://www.bilibili.com/video/BV1qM411N7QZ/?spm_id_from=333.788&vd_source=c21dc7a2f93289c8e3df1bde97f015b9",target:"_blank",class:"text-blue"}," B站：three自定义shader-举行颜色渐变 ")],-1),s=20,J=k({__name:"1.柱体渐变",setup(V){const n={width:window.innerWidth,height:window.innerHeight},r=new g,c=new C(45,n.width/n.height,.1,1e3);c.position.set(0,30,60);const t=new x({antialias:!0});t.setSize(n.width,n.height),t.setPixelRatio(window.devicePixelRatio),E(()=>{var o;(o=m.value)==null||o.appendChild(t.domElement)});const m=F(),p=new B(c,t.domElement),{random:a}=Math;function v(){const o=new y(1,Math.max(a()*15,4),1,10),e=`
  varying vec3 vColor;
  uniform vec3 upColor;
  uniform vec3 downColor;
  uniform float time;
  uniform float speed;
  uniform float height;
  void main() {
    float percent = (position.y + height / 2.0) / height;
    vColor = mix(downColor, upColor, percent);
    vColor.r *= abs(cos(time));

    vec3 transformed = position;
    transformed.y *= min(sin(time), 1.0);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
  }
`,i=`
  varying vec3 vColor;
  void main() {
    gl_FragColor = vec4(vColor, 1.0);
  }
`,w=new S({vertexShader:e,fragmentShader:i,uniforms:{upColor:{value:new f("teal")},downColor:{value:new f("yellow")},time:{value:0},speed:{value:0},height:{value:0}}});return new h(o,w)}const d=[];for(let o=0;o<100;o++){const e=v(),i=e.geometry.parameters.height;e.position.set(a()*s-s/2,i/2,a()*s-s/2),e.material.uniforms.upColor.value.setHSL(a(),1,.5),e.material.uniforms.downColor.value.setHSL(a(),1,.5),e.material.uniforms.speed.value=a()*4,e.material.uniforms.height.value=i,d.push(e),r.add(e)}const u=new h(new b(100,100),new _({color:10066329,side:M}));return u.rotation.x=-Math.PI/2,r.add(u),P(()=>{t.render(r,c),p.update(),d.forEach(o=>{o.material.uniforms.time.value+=.01})}),G(()=>{R(r,t)}),(o,e)=>(z(),H(L,null,[l("div",{ref_key:"containerRef",ref:m},null,512),N],64))}});export{J as default};
