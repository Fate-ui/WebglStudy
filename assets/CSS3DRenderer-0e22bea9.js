import{V as W,M as _,_ as $,O as A}from"./three.module-4d045381.js";const O=new W,H=new $,M=new W;class I extends A{constructor(p=document.createElement("div")){super(),this.isCSS3DObject=!0,this.element=p,this.element.style.position="absolute",this.element.style.pointerEvents="auto",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.addEventListener("removed",function(){this.traverse(function(r){r.element instanceof Element&&r.element.parentNode!==null&&r.element.parentNode.removeChild(r.element)})})}copy(p,r){return super.copy(p,r),this.element=p.element.cloneNode(!0),this}}const l=new _,N=new _;class V{constructor(p={}){const r=this;let u,x,S,y;const v={camera:{style:""},objects:new WeakMap},h=p.element!==void 0?p.element:document.createElement("div");h.style.overflow="hidden",this.domElement=h;const o=document.createElement("div");o.style.transformOrigin="0 0",o.style.pointerEvents="none",h.appendChild(o);const a=document.createElement("div");a.style.transformStyle="preserve-3d",o.appendChild(a),this.getSize=function(){return{width:u,height:x}},this.render=function(n,e){const s=e.projectionMatrix.elements[5]*y;e.view&&e.view.enabled?(o.style.transform=`translate( ${-e.view.offsetX*(u/e.view.width)}px, ${-e.view.offsetY*(x/e.view.height)}px )`,o.style.transform+=`scale( ${e.view.fullWidth/e.view.width}, ${e.view.fullHeight/e.view.height} )`):o.style.transform="",n.matrixWorldAutoUpdate===!0&&n.updateMatrixWorld(),e.parent===null&&e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld();let c,d;e.isOrthographicCamera&&(c=-(e.right+e.left)/2,d=(e.top+e.bottom)/2);const i=e.view&&e.view.enabled?e.view.height/e.view.fullHeight:1,f=e.isOrthographicCamera?`scale( ${i} )scale(`+s+")translate("+t(c)+"px,"+t(d)+"px)"+g(e.matrixWorldInverse):`scale( ${i} )translateZ(`+s+"px)"+g(e.matrixWorldInverse),m=(e.isPerspectiveCamera?"perspective("+s+"px) ":"")+f+"translate("+S+"px,"+y+"px)";v.camera.style!==m&&(a.style.transform=m,v.camera.style=m),E(n,n,e)},this.setSize=function(n,e){u=n,x=e,S=u/2,y=x/2,h.style.width=n+"px",h.style.height=e+"px",o.style.width=n+"px",o.style.height=e+"px",a.style.width=n+"px",a.style.height=e+"px"};function t(n){return Math.abs(n)<1e-10?0:n}function g(n){const e=n.elements;return"matrix3d("+t(e[0])+","+t(-e[1])+","+t(e[2])+","+t(e[3])+","+t(e[4])+","+t(-e[5])+","+t(e[6])+","+t(e[7])+","+t(e[8])+","+t(-e[9])+","+t(e[10])+","+t(e[11])+","+t(e[12])+","+t(-e[13])+","+t(e[14])+","+t(e[15])+")"}function C(n){const e=n.elements;return"translate(-50%,-50%)"+("matrix3d("+t(e[0])+","+t(e[1])+","+t(e[2])+","+t(e[3])+","+t(-e[4])+","+t(-e[5])+","+t(-e[6])+","+t(-e[7])+","+t(e[8])+","+t(e[9])+","+t(e[10])+","+t(e[11])+","+t(e[12])+","+t(e[13])+","+t(e[14])+","+t(e[15])+")")}function E(n,e,s,c){if(n.isCSS3DObject){const d=n.visible===!0&&n.layers.test(s.layers)===!0;if(n.element.style.display=d===!0?"":"none",d===!0){n.onBeforeRender(r,e,s);let i;n.isCSS3DSprite?(l.copy(s.matrixWorldInverse),l.transpose(),n.rotation2D!==0&&l.multiply(N.makeRotationZ(n.rotation2D)),n.matrixWorld.decompose(O,H,M),l.setPosition(O),l.scale(M),l.elements[3]=0,l.elements[7]=0,l.elements[11]=0,l.elements[15]=1,i=C(l)):i=C(n.matrixWorld);const f=n.element,w=v.objects.get(n);if(w===void 0||w.style!==i){f.style.transform=i;const m={style:i};v.objects.set(n,m)}f.parentNode!==a&&a.appendChild(f),n.onAfterRender(r,e,s)}}for(let d=0,i=n.children.length;d<i;d++)E(n.children[d],e,s)}}}export{V as C,I as a};
