var c=Object.defineProperty;var u=(r,e,t)=>e in r?c(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var l=(r,e,t)=>(u(r,typeof e!="symbol"?e+"":e,t),t);import{r as d,E as h,S as f,P as p,W as v,h as w,j as g,m as P}from"./three.module-2f5a30fe.js";import{O as x}from"./OrbitControls-27c6eec7.js";import{a as S}from"./index-6e4d2cdc.js";import{F as T}from"./FBXLoader-1e225398.js";import{d as A}from"./index-1a26f821.js";import{d as C,s as _,l as y,p as L,o as E,c as D}from"./index-76c78296.js";class R{constructor(){l(this,"updateData",()=>{if(!this.isStart)return!1;const e=this.clock.getDelta();this.time.value+=e,this.startTime.value+=e,this.startTime.value>=this.startLength.value&&(this.startTime.value=this.startLength.value)});this.fbxLoader=new T,this.group=new d,this.clock=new h,this.time={value:0},this.startTime={value:0},this.startLength={value:2},this.isStart=!1,this.fbxLoader.load("model/shanghai.FBX",e=>{this.group.add(e),e.traverse(t=>{t.name==="CITY_UNTRIANGULATED"&&(Array.isArray(t.material)?t.material:[t.material]).forEach(i=>{i.transparent=!0,i.color.setStyle("#9370DB")}),t.name==="LANDMASS"&&(Array.isArray(t.material)?t.material:[t.material]).forEach(i=>{i.transparent=!0,i.color.setStyle("#040912")})}),this.init()})}init(){this.isStart=!0,this.grow()}grow(){let e;this.group.traverse(a=>{a.name==="CITY_UNTRIANGULATED"&&(e=a)}),(Array.isArray(e.material)?e.material:[e.material]).forEach(a=>{a.onBeforeCompile=i=>{i.uniforms.uTime=this.time,i.uniforms.uPeriod={value:4};const o=`
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
        `;i.vertexShader=i.vertexShader.replace("void main() {",o),i.vertexShader=i.vertexShader.replace("#include <project_vertex>",s)}})}}const N=R,j=C({__name:"Index",setup(r){const e={width:window.innerWidth,height:window.innerHeight},t=new f,a=new p(50,e.width/e.height,1,1e4);a.position.set(600,750,-1221);const i=new v({antialias:!0,alpha:!0});i.setSize(e.width,e.height),i.setPixelRatio(window.devicePixelRatio),i.setClearColor(new w("#32373E"),1);const o=_();y(()=>{o.value.appendChild(i.domElement)});const s=new x(a,i.domElement);s.enableDamping=!0,t.add(new g(11382189));const n=new P(16777215,5);n.position.set(100,100,0),t.add(n);const m=new N;return t.add(m.group),S(()=>{m.updateData(),s.update(),i.render(t,a)}),L(()=>{A(t,i)}),(B,I)=>(E(),D("div",{ref_key:"containerRef",ref:o},null,512))}});export{j as default};
