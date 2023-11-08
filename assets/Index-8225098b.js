var C=Object.defineProperty;var S=(o,e,t)=>e in o?C(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var h=(o,e,t)=>(S(o,typeof e!="symbol"?e+"":e,t),t);import{r as L,E as R,V as b,bp as D,bq as T,$ as A,D as B,h as v,b as P,M as k,S as E,P as G,W as F,j as W,m as z}from"./three.module-2f5a30fe.js";import{O as I}from"./OrbitControls-27c6eec7.js";import{a as w}from"./index-f6386e96.js";import{F as N}from"./FBXLoader-1e225398.js";import{d as O}from"./index-1a26f821.js";import{d as U,s as V,l as j,p as X,o as Y,c as $}from"./index-f07ac78f.js";class q{constructor(){h(this,"updateData",()=>{if(!this.isStart)return!1;const e=this.clock.getDelta();this.time.value+=e,this.startTime.value+=e,this.startTime.value>=this.startLength.value&&(this.startTime.value=this.startLength.value)});this.fbxLoader=new N,this.group=new L,this.clock=new R,this.time={value:0},this.startTime={value:0},this.startLength={value:2},this.isStart=!1,this.fbxLoader.load("model/shanghai.FBX",e=>{this.group.add(e),e.traverse(t=>{t.name==="CITY_UNTRIANGULATED"&&(Array.isArray(t.material)?t.material:[t.material]).forEach(a=>{a.transparent=!0,a.color.setStyle("#9370DB")}),t.name==="LANDMASS"&&(Array.isArray(t.material)?t.material:[t.material]).forEach(a=>{a.transparent=!0,a.color.setStyle("#040912")})}),this.init()})}init(){this.isStart=!0,this.clock.start(),this.createWall()}createWall(){const e={position:{x:0,y:20,z:0},height:200,radius:120,maxRadius:450,color:"#efad35",opacity:.4,period:2},t=new b,r=t.clone().setY(t.y+e.height),a=new D(t,r),s=new T(a,20,e.radius,220,!1);s.computeBoundingBox();const l=s.boundingBox.max,n=s.boundingBox.min,c=new A({opacity:e.opacity,transparent:!0,side:B,depthTest:!1,uniforms:{uMax:{value:l},uMin:{value:n},uColor:{value:new v(e.color)}},vertexShader:`
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
      `}),i=new P(s,c);i.renderOrder=1e3,i.name="wall";const{x:d,y:f,z:x}=e.position;i.position.set(d,f,x),i.updateMatrix(),this.group.children[0].add(i);const y=i.scale.clone();w(()=>{const g=this.time.value,{period:m,radius:u,maxRadius:M}=e,p=(g%m/m*(M-u)+u)/u,_=new k().makeScale(p,1,p);i.scale.copy(y.clone().applyMatrix4(_)),i.updateMatrix()})}}const H=q,se=U({__name:"Index",setup(o){const e={width:window.innerWidth,height:window.innerHeight},t=new E,r=new G(50,e.width/e.height,1,1e4);r.position.set(600,750,-1221);const a=new F({antialias:!0,alpha:!0});a.setSize(e.width,e.height),a.setPixelRatio(window.devicePixelRatio),a.setClearColor(new v("#32373E"),1);const s=V();j(()=>{s.value.appendChild(a.domElement)});const l=new I(r,a.domElement);t.add(new W(11382189));const n=new z(16777215,5);n.position.set(100,100,0),t.add(n);const c=new H;return t.add(c.group),w(()=>{c.updateData(),l.update(),a.render(t,r)}),X(()=>{O(t,a)}),(i,d)=>(Y(),$("div",{ref_key:"containerRef",ref:s},null,512))}});export{se as default};
