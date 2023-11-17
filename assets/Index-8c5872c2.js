var S=Object.defineProperty;var b=(o,e,t)=>e in o?S(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var v=(o,e,t)=>(b(o,typeof e!="symbol"?e+"":e,t),t);import{r as L,E as R,V as B,bu as D,bv as T,N as k,D as A,h as x,b as P,M as E,S as F,P as z,W as G,j as N,m as W}from"./three.module-e7d85b12.js";import{O as j}from"./OrbitControls-04cfa186.js";import{a as f}from"./index-10787710.js";import{F as V}from"./FBXLoader-4407eb60.js";import{d as I}from"./index-1a26f821.js";import{d as O,s as U,l as X,p as Y,o as H,c as J,h as c,F as $}from"./index-28042951.js";class q{constructor(){v(this,"updateData",()=>{if(!this.isStart)return!1;const e=this.clock.getDelta();this.time.value+=e,this.startTime.value+=e,this.startTime.value>=this.startLength.value&&(this.startTime.value=this.startLength.value)});this.fbxLoader=new V,this.group=new L,this.clock=new R,this.time={value:0},this.startTime={value:0},this.startLength={value:2},this.isStart=!1,this.fbxLoader.load("model/shanghai.FBX",e=>{this.group.add(e),e.traverse(t=>{t.name==="CITY_UNTRIANGULATED"&&(Array.isArray(t.material)?t.material:[t.material]).forEach(a=>{a.transparent=!0,a.color.setStyle("#9370DB")}),t.name==="LANDMASS"&&(Array.isArray(t.material)?t.material:[t.material]).forEach(a=>{a.transparent=!0,a.color.setStyle("#040912")})}),this.init()})}init(){this.isStart=!0,this.clock.start(),this.createWall()}createWall(){const e={position:{x:0,y:20,z:0},height:200,radius:120,maxRadius:450,color:"#efad35",opacity:.4,period:2},t=new B,r=t.clone().setY(t.y+e.height),a=new D(t,r),s=new T(a,20,e.radius,220,!1);s.computeBoundingBox();const u=s.boundingBox.max,n=s.boundingBox.min,l=new k({opacity:e.opacity,transparent:!0,side:A,depthTest:!1,uniforms:{uMax:{value:u},uMin:{value:n},uColor:{value:new x(e.color)}},vertexShader:`
        varying vec4 vPosition;
        void main() {
          vPosition = modelMatrix * vec4(position,1.0);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }

      `,fragmentShader:`
        uniform vec3 uColor; // 光墙半径        
        uniform vec3 uMax; 
        uniform vec3 uMin;
        uniform mat4 modelMatrix; // 世界矩阵
        varying vec4 vPosition; // 接收顶点着色传递进来的位置数据
        
       
        void main() {
          // 转世界坐标
          vec4 uMax_world = modelMatrix * vec4(uMax,1.0);
          vec4 uMin_world = modelMatrix * vec4(uMin,1.0);
          // 根据像素点世界坐标的y轴高度,设置透明度
          float opacity =1.0 - (vPosition.y - uMin_world.y) / (uMax_world.y -uMin_world.y); 

           gl_FragColor = vec4( uColor, opacity);
        }
      `}),i=new P(s,l);i.renderOrder=1e3,i.name="wall";const{x:m,y:w,z:g}=e.position;i.position.set(m,w,g),i.updateMatrix(),this.group.children[0].add(i);const y=i.scale.clone();f(()=>{const M=this.time.value,{period:p,radius:d,maxRadius:_}=e,h=(M%p/p*(_-d)+d)/d,C=new E().makeScale(h,1,h);i.scale.copy(y.clone().applyMatrix4(C)),i.updateMatrix()})}}const K=q,Q=c("div",{class:"fixed left-20px top-20px px-20px leading-50px z-1 bg-white rounded"},[c("span",null,"学习来源："),c("a",{href:"https://gitee.com/superzay/threejs-animate",target:"_blank",class:"text-blue"},"threejs 3d开发")],-1),ce=O({__name:"Index",setup(o){const e={width:window.innerWidth,height:window.innerHeight},t=new F,r=new z(50,e.width/e.height,1,1e4);r.position.set(600,750,-1221);const a=new G({antialias:!0,alpha:!0});a.setSize(e.width,e.height),a.setPixelRatio(window.devicePixelRatio),a.setClearColor(new x("#32373E"),1);const s=U();X(()=>{s.value.appendChild(a.domElement)});const u=new j(r,a.domElement);t.add(new N(11382189));const n=new W(16777215,5);n.position.set(100,100,0),t.add(n);const l=new K;return t.add(l.group),f(()=>{l.updateData(),u.update(),a.render(t,r)}),Y(()=>{I(t,a)}),(i,m)=>(H(),J($,null,[c("div",{ref_key:"containerRef",ref:s},null,512),Q],64))}});export{ce as default};
