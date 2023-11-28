var p=Object.defineProperty;var v=(i,e,t)=>e in i?p(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var u=(i,e,t)=>(v(i,typeof e!="symbol"?e+"":e,t),t);import{r as x,E as w,aV as y,M as _,i as A,b as F,S,P as C,W as L,h as R,j as P,m as T}from"./three.module-e7d85b12.js";import{O as b}from"./OrbitControls-04cfa186.js";import{a as M}from"./index-b9081dda.js";import{F as k}from"./FBXLoader-4407eb60.js";import{d as z}from"./index-1a26f821.js";import{d as D,s as W,l as E,p as B,o as G,c as j,h as c,F as I}from"./index-ef070050.js";class N{constructor(){u(this,"updateData",()=>{if(!this.isStart)return!1;const e=this.clock.getDelta();this.time.value+=e,this.startTime.value+=e,this.startTime.value>=this.startLength.value&&(this.startTime.value=this.startLength.value)});this.fbxLoader=new k,this.group=new x,this.clock=new w,this.time={value:0},this.startTime={value:0},this.startLength={value:2},this.isStart=!1,this.fbxLoader.load("model/shanghai.FBX",e=>{this.group.add(e),e.traverse(t=>{t.name==="CITY_UNTRIANGULATED"&&(Array.isArray(t.material)?t.material:[t.material]).forEach(a=>{a.transparent=!0,a.color.setStyle("#9370DB")}),t.name==="LANDMASS"&&(Array.isArray(t.material)?t.material:[t.material]).forEach(a=>{a.transparent=!0,a.color.setStyle("#040912")})}),this.init()})}init(){this.isStart=!0,this.clock.start(),this.createRadar()}createRadar(){const e={position:{x:0,y:20,z:0},radius:240,color:"#f005f0",opacity:.5,speed:300,followWidth:220},t=new y(e.radius,1e3),r=new _().makeRotationX(-Math.PI/180*90);t.applyMatrix4(r);const a=new A({color:e.color,opacity:e.opacity,transparent:!0}),n=new F(t,a);n.name="radar";const{x:s,y:l,z:g}=e.position;n.position.set(s,l,g),n.updateMatrix(),this.group.children[0].add(n),a.onBeforeCompile=o=>{Object.assign(o.uniforms,{uSpeed:{value:e.speed},uRadius:{value:e.radius},uTime:this.time,uFollowWidth:{value:e.followWidth}});const f=`


        varying vec3 vPosition;
        void main() {

          vPosition = position;

      `;o.vertexShader=o.vertexShader.replace("void main() {",f);const h=`


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
        
      `;o.fragmentShader=o.fragmentShader.replace("void main() {",h),o.fragmentShader=o.fragmentShader.replace("#include <opaque_fragment>",m)}}}const O=N,U=c("div",{class:"fixed left-20px top-20px px-20px leading-50px z-1 bg-white rounded"},[c("span",null,"学习来源："),c("a",{href:"https://gitee.com/superzay/threejs-animate",target:"_blank",class:"text-blue"},"threejs 3d开发")],-1),K=D({__name:"Index",setup(i){const e={width:window.innerWidth,height:window.innerHeight},t=new S,r=new C(50,e.width/e.height,1,1e4);r.position.set(600,750,-1221);const a=new L({antialias:!0,alpha:!0});a.setSize(e.width,e.height),a.setPixelRatio(window.devicePixelRatio),a.setClearColor(new R("#32373E"),1);const n=W();E(()=>{n.value.appendChild(a.domElement)});const s=new b(r,a.domElement);s.enableDamping=!0,t.add(new P(11382189));const l=new T(16777215,5);l.position.set(100,100,0),t.add(l);const g=new O;return t.add(g.group),M(()=>{g.updateData(),s.update(),a.render(t,r)}),B(()=>{z(t,a)}),(d,o)=>(G(),j(I,null,[c("div",{ref_key:"containerRef",ref:n},null,512),U],64))}});export{K as default};
