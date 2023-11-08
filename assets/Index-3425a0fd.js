var h=Object.defineProperty;var p=(i,e,t)=>e in i?h(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var c=(i,e,t)=>(p(i,typeof e!="symbol"?e+"":e,t),t);import{r as v,E as w,a8 as x,M as y,i as S,b as A,S as C,P as _,W as F,h as L,j as R,m as P}from"./three.module-cb7ba46f.js";import{O as T}from"./OrbitControls-7501b747.js";import{a as M}from"./index-d7fe2d6f.js";import{F as D}from"./FBXLoader-655ad3f8.js";import{d as W}from"./index-1a26f821.js";import{d as b,s as k,l as E,p as z,o as G,c as B}from"./index-7aa26047.js";class j{constructor(){c(this,"updateData",()=>{if(!this.isStart)return!1;const e=this.clock.getDelta();this.time.value+=e,this.startTime.value+=e,this.startTime.value>=this.startLength.value&&(this.startTime.value=this.startLength.value)});this.fbxLoader=new D,this.group=new v,this.clock=new w,this.time={value:0},this.startTime={value:0},this.startLength={value:2},this.isStart=!1,this.fbxLoader.load("model/shanghai.FBX",e=>{this.group.add(e),e.traverse(t=>{t.name==="CITY_UNTRIANGULATED"&&(Array.isArray(t.material)?t.material:[t.material]).forEach(a=>{a.transparent=!0,a.color.setStyle("#9370DB")}),t.name==="LANDMASS"&&(Array.isArray(t.material)?t.material:[t.material]).forEach(a=>{a.transparent=!0,a.color.setStyle("#040912")})}),this.init()})}init(){this.isStart=!0,this.clock.start(),this.createRadar()}createRadar(){const e={position:{x:0,y:20,z:0},radius:240,color:"#f005f0",opacity:.5,speed:300,followWidth:220},t=new x(e.radius,1e3),r=new y().makeRotationX(-Math.PI/180*90);t.applyMatrix4(r);const a=new S({color:e.color,opacity:e.opacity,transparent:!0}),n=new A(t,a);n.name="radar";const{x:s,y:l,z:g}=e.position;n.position.set(s,l,g),n.updateMatrix(),this.group.children[0].add(n),a.onBeforeCompile=o=>{Object.assign(o.uniforms,{uSpeed:{value:e.speed},uRadius:{value:e.radius},uTime:this.time,uFollowWidth:{value:e.followWidth}});const f=`


        varying vec3 vPosition;
        void main() {

          vPosition = position;

      `;o.vertexShader=o.vertexShader.replace("void main() {",f);const d=`


        uniform float uRadius;     
        uniform float uTime;            
        uniform float uSpeed; 
        uniform float uFollowWidth; 
        varying vec3 vPosition;
       

        float calcAngle(vec3 oFrag){

          float fragAngle;

          const vec3 ox = vec3(1,0,0);

          float dianji = oFrag.x * ox.x + oFrag.z*ox.z;

          float oFrag_length = length(oFrag); // length是内置函数
          float ox_length = length(ox); // length是内置函数

          float yuxian = dianji / (oFrag_length * ox_length);


          fragAngle = acos(yuxian);
          fragAngle = degrees(fragAngle);


          if(oFrag.z > 0.0) {
            fragAngle = -fragAngle + 360.0;
          }


          float scanAngle = uTime * uSpeed - floor(uTime * uSpeed / 360.0) * 360.0;

          float angle = scanAngle - fragAngle;

          if(angle < 0.0){
            angle = angle + 360.0;
          }


          return angle;
        }

        void main() {
    
      `,m=`
        #include <opaque_fragment>
        

        // length内置函数，取向量的长度
        if(length(vPosition) == 0.0 || length(vPosition) > uRadius-2.0){
          gl_FragColor = vec4( outgoingLight, diffuseColor.a );

        } else {

          float angle = calcAngle(vPosition);
          if(angle < uFollowWidth){
            // 尾焰区域
            float opacity =  1.0 - angle / uFollowWidth; 
            gl_FragColor = vec4( outgoingLight, diffuseColor.a * opacity );  

          } else {
            // 其他位置的像素均为透明
            gl_FragColor = vec4( outgoingLight, 0.0 ); 

          }

        }
        
      `;o.fragmentShader=o.fragmentShader.replace("void main() {",d),o.fragmentShader=o.fragmentShader.replace("#include <opaque_fragment>",m),o.fragmentShader}}}const I=j,Y=b({__name:"Index",setup(i){const e={width:window.innerWidth,height:window.innerHeight},t=new C,r=new _(50,e.width/e.height,1,1e4);r.position.set(600,750,-1221);const a=new F({antialias:!0,alpha:!0});a.setSize(e.width,e.height),a.setPixelRatio(window.devicePixelRatio),a.setClearColor(new L("#32373E"),1);const n=k();E(()=>{n.value.appendChild(a.domElement)});const s=new T(r,a.domElement);s.enableDamping=!0,t.add(new R(11382189));const l=new P(16777215,5);l.position.set(100,100,0),t.add(l);const g=new I;return t.add(g.group),M(()=>{g.updateData(),s.update(),a.render(t,r)}),z(()=>{W(t,a)}),(u,o)=>(G(),B("div",{ref_key:"containerRef",ref:n},null,512))}});export{Y as default};
