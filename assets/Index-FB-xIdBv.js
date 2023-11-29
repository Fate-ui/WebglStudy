var d=Object.defineProperty;var u=(r,e,t)=>e in r?d(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var c=(r,e,t)=>(u(r,typeof e!="symbol"?e+"":e,t),t);import{r as h,E as p,S as f,P as v,W as g,h as w,j as x,m as P}from"./three.module-QHcyoKWZ.js";import{O as _}from"./OrbitControls-8TWoeIgH.js";import{a as S}from"./index-du8DvFNP.js";import{F as T}from"./FBXLoader-LKKb6RG4.js";import{d as y}from"./index-W38Qjy34.js";import{d as A,s as C,l as L,p as E,o as b,c as D,h as n,F as N}from"./index-bx_dK3Ep.js";class R{constructor(){c(this,"updateData",()=>{if(!this.isStart)return!1;const e=this.clock.getDelta();this.time.value+=e,this.startTime.value+=e,this.startTime.value>=this.startLength.value&&(this.startTime.value=this.startLength.value)});this.fbxLoader=new T,this.group=new h,this.clock=new p,this.time={value:0},this.startTime={value:0},this.startLength={value:2},this.isStart=!1,this.fbxLoader.load("model/shanghai.FBX",e=>{this.group.add(e),e.traverse(t=>{t.name==="CITY_UNTRIANGULATED"&&(Array.isArray(t.material)?t.material:[t.material]).forEach(a=>{a.transparent=!0,a.color.setStyle("#9370DB")}),t.name==="LANDMASS"&&(Array.isArray(t.material)?t.material:[t.material]).forEach(a=>{a.transparent=!0,a.color.setStyle("#040912")})}),this.init()})}init(){this.isStart=!0,this.grow()}grow(){let e;this.group.traverse(i=>{i.name==="CITY_UNTRIANGULATED"&&(e=i)}),(Array.isArray(e.material)?e.material:[e.material]).forEach(i=>{i.onBeforeCompile=a=>{a.uniforms.uTime=this.time,a.uniforms.uPeriod={value:4};const o=`
          uniform float uTime;
          uniform float uPeriod;
          
          void main() {
        `,s=`


          vec4 mvPosition = vec4( transformed, 1.0 );
          #ifdef USE_INSTANCING
            mvPosition = instanceMatrix * mvPosition;
          #endif
       
          float rate = mod(uTime , uPeriod) / uPeriod * 2.0;
          if(rate >1.0){
          rate = 1.0;
          }
          mvPosition.z = mvPosition.z * rate;
          

          mvPosition = modelViewMatrix * mvPosition;
          gl_Position = projectionMatrix * mvPosition;
        `;a.vertexShader=a.vertexShader.replace("void main() {",o),a.vertexShader=a.vertexShader.replace("#include <project_vertex>",s)}})}}const B=R,k=n("div",{class:"fixed left-20px top-20px px-20px leading-50px z-1 bg-white rounded"},[n("span",null,"学习来源："),n("a",{href:"https://gitee.com/superzay/threejs-animate",target:"_blank",class:"text-blue"},"threejs 3d开发")],-1),V=A({__name:"Index",setup(r){const e={width:window.innerWidth,height:window.innerHeight},t=new f,i=new v(50,e.width/e.height,1,1e4);i.position.set(600,750,-1221);const a=new g({antialias:!0,alpha:!0});a.setSize(e.width,e.height),a.setPixelRatio(window.devicePixelRatio),a.setClearColor(new w("#32373E"),1);const o=C();L(()=>{o.value.appendChild(a.domElement)});const s=new _(i,a.domElement);s.enableDamping=!0,t.add(new x(11382189));const l=new P(16777215,5);l.position.set(100,100,0),t.add(l);const m=new B;return t.add(m.group),S(()=>{m.updateData(),s.update(),a.render(t,i)}),E(()=>{y(t,a)}),(I,z)=>(b(),D(N,null,[n("div",{ref_key:"containerRef",ref:o},null,512),k],64))}});export{V as default};
