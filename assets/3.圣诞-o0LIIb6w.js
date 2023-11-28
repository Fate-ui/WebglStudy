import"./base-i78343Mr.js";import{E as ue}from"./el-button-1zzj9FtF.js";import{b as A,P as ne,h as B,Q as H,M as T,aK as me,aO as fe,N as ie,aP as le,V as u,aR as I,_ as de,K as se,T as pe,aS as ve,ad as q,E as xe,S as he,W as we,aT as ge,aU as ye,aV as Me,j as be,m as Ce,k as $,r as Re,c as Y,af as Q,a7 as _e,aW as Se,v as We}from"./three.module-EC2ItXet.js";import{O as Pe}from"./OrbitControls-UvYfdcau.js";import{D as ze}from"./DRACOLoader-qxrhcOaj.js";import{G as Te}from"./GLTFLoader-2es8O60f.js";import{R as De}from"./RGBELoader-zvGq-ylf.js";import{R as K}from"./Reflector-hlmWtRNy.js";import{g as E}from"./index-nk37oyWQ.js";import{b as Ue,u as Fe,a as Le}from"./index-AcvGrBFK.js";import{d as Ee}from"./index-W38Qjy34.js";import{d as Oe,s as ke,l as Ae,k as Be,p as Ne,o as J,c as X,h as k,q as Z,w as ee,F as te,r as je,$ as oe,t as Ie,j as ae}from"./index-qUhmW9vi.js";import{_ as Ve}from"./_plugin-vue_export-helper-x3n3nnut.js";import"./index-O2se9W_j.js";import"./use-form-item-HMGt__fy.js";import"./style-xLxcu4R_.js";import"./use-global-config-zoN4cAk7.js";class O extends A{constructor(M,r={}){super(M),this.isRefractor=!0,this.type="Refractor",this.camera=new ne;const c=this,w=r.color!==void 0?new B(r.color):new B(8355711),_=r.textureWidth||512,D=r.textureHeight||512,R=r.clipBias||0,b=r.shader||O.RefractorShader,U=r.multisample!==void 0?r.multisample:4,f=this.camera;f.matrixAutoUpdate=!1,f.userData.refractor=!0;const S=new H,v=new T,g=new me(_,D,{samples:U,type:fe});this.material=new ie({name:b.name!==void 0?b.name:"unspecified",uniforms:le.clone(b.uniforms),vertexShader:b.vertexShader,fragmentShader:b.fragmentShader,transparent:!0}),this.material.uniforms.color.value=w,this.material.uniforms.tDiffuse.value=g.texture,this.material.uniforms.textureMatrix.value=v;const W=function(){const t=new u,i=new u,a=new T,l=new u,s=new u;return function(d){return t.setFromMatrixPosition(c.matrixWorld),i.setFromMatrixPosition(d.matrixWorld),l.subVectors(t,i),a.extractRotation(c.matrixWorld),s.set(0,0,1),s.applyMatrix4(a),l.dot(s)<0}}(),P=function(){const t=new u,i=new u,a=new de,l=new u;return function(){c.matrixWorld.decompose(i,a,l),t.set(0,0,1).applyQuaternion(a).normalize(),t.negate(),S.setFromNormalAndCoplanarPoint(t,i)}}(),z=function(){const t=new H,i=new I,a=new I;return function(s){f.matrixWorld.copy(s.matrixWorld),f.matrixWorldInverse.copy(f.matrixWorld).invert(),f.projectionMatrix.copy(s.projectionMatrix),f.far=s.far,t.copy(S),t.applyMatrix4(f.matrixWorldInverse),i.set(t.normal.x,t.normal.y,t.normal.z,t.constant);const n=f.projectionMatrix;a.x=(Math.sign(i.x)+n.elements[8])/n.elements[0],a.y=(Math.sign(i.y)+n.elements[9])/n.elements[5],a.z=-1,a.w=(1+n.elements[10])/n.elements[14],i.multiplyScalar(2/i.dot(a)),n.elements[2]=i.x,n.elements[6]=i.y,n.elements[10]=i.z+1-R,n.elements[14]=i.w}}();function y(t){v.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),v.multiply(t.projectionMatrix),v.multiply(t.matrixWorldInverse),v.multiply(c.matrixWorld)}function x(t,i,a){c.visible=!1;const l=t.getRenderTarget(),s=t.xr.enabled,n=t.shadowMap.autoUpdate;t.xr.enabled=!1,t.shadowMap.autoUpdate=!1,t.setRenderTarget(g),t.autoClear===!1&&t.clear(),t.render(i,f),t.xr.enabled=s,t.shadowMap.autoUpdate=n,t.setRenderTarget(l);const d=a.viewport;d!==void 0&&t.state.viewport(d),c.visible=!0}this.onBeforeRender=function(t,i,a){a.userData.refractor!==!0&&W(a)&&(P(),y(a),z(a),x(t,i,a))},this.getRenderTarget=function(){return g},this.dispose=function(){g.dispose(),c.material.dispose()}}}O.RefractorShader={name:"RefractorShader",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`

		uniform mat4 textureMatrix;

		varying vec4 vUv;

		void main() {

			vUv = textureMatrix * vec4( position, 1.0 );
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform vec3 color;
		uniform sampler2D tDiffuse;

		varying vec4 vUv;

		float blendOverlay( float base, float blend ) {

			return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );

		}

		vec3 blendOverlay( vec3 base, vec3 blend ) {

			return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );

		}

		void main() {

			vec4 base = texture2DProj( tDiffuse, vUv );
			gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};class N extends A{constructor(M,r={}){super(M),this.isWater=!0,this.type="Water";const c=this,w=r.color!==void 0?new B(r.color):new B(16777215),_=r.textureWidth||512,D=r.textureHeight||512,R=r.clipBias||0,b=r.flowDirection||new se(1,0),U=r.flowSpeed||.03,f=r.reflectivity||.02,S=r.scale||1,v=r.shader||N.WaterShader,g=new pe,W=r.flowMap||void 0,P=r.normalMap0||g.load("textures/water/Water_1_M_Normal.jpg"),z=r.normalMap1||g.load("textures/water/Water_2_M_Normal.jpg"),y=.15,x=y*.5,t=new T,i=new xe;if(K===void 0){console.error("THREE.Water: Required component Reflector not found.");return}if(O===void 0){console.error("THREE.Water: Required component Refractor not found.");return}const a=new K(M,{textureWidth:_,textureHeight:D,clipBias:R}),l=new O(M,{textureWidth:_,textureHeight:D,clipBias:R});a.matrixAutoUpdate=!1,l.matrixAutoUpdate=!1,this.material=new ie({name:v.name,uniforms:le.merge([ve.fog,v.uniforms]),vertexShader:v.vertexShader,fragmentShader:v.fragmentShader,transparent:!0,fog:!0}),W!==void 0?(this.material.defines.USE_FLOWMAP="",this.material.uniforms.tFlowMap={type:"t",value:W}):this.material.uniforms.flowDirection={type:"v2",value:b},P.wrapS=P.wrapT=q,z.wrapS=z.wrapT=q,this.material.uniforms.tReflectionMap.value=a.getRenderTarget().texture,this.material.uniforms.tRefractionMap.value=l.getRenderTarget().texture,this.material.uniforms.tNormalMap0.value=P,this.material.uniforms.tNormalMap1.value=z,this.material.uniforms.color.value=w,this.material.uniforms.reflectivity.value=f,this.material.uniforms.textureMatrix.value=t,this.material.uniforms.config.value.x=0,this.material.uniforms.config.value.y=x,this.material.uniforms.config.value.z=x,this.material.uniforms.config.value.w=S;function s(d){t.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),t.multiply(d.projectionMatrix),t.multiply(d.matrixWorldInverse),t.multiply(c.matrixWorld)}function n(){const d=i.getDelta(),h=c.material.uniforms.config;h.value.x+=U*d,h.value.y=h.value.x+x,h.value.x>=y?(h.value.x=0,h.value.y=x):h.value.y>=y&&(h.value.y=h.value.y-y)}this.onBeforeRender=function(d,h,F){s(F),n(),c.visible=!1,a.matrixWorld.copy(c.matrixWorld),l.matrixWorld.copy(c.matrixWorld),a.onBeforeRender(d,h,F),l.onBeforeRender(d,h,F),c.visible=!0}}}N.WaterShader={name:"WaterShader",uniforms:{color:{type:"c",value:null},reflectivity:{type:"f",value:0},tReflectionMap:{type:"t",value:null},tRefractionMap:{type:"t",value:null},tNormalMap0:{type:"t",value:null},tNormalMap1:{type:"t",value:null},textureMatrix:{type:"m4",value:null},config:{type:"v4",value:new I}},vertexShader:`

		#include <common>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>

		uniform mat4 textureMatrix;

		varying vec4 vCoord;
		varying vec2 vUv;
		varying vec3 vToEye;

		void main() {

			vUv = uv;
			vCoord = textureMatrix * vec4( position, 1.0 );

			vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
			vToEye = cameraPosition - worldPosition.xyz;

			vec4 mvPosition =  viewMatrix * worldPosition; // used in fog_vertex
			gl_Position = projectionMatrix * mvPosition;

			#include <logdepthbuf_vertex>
			#include <fog_vertex>

		}`,fragmentShader:`

		#include <common>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>

		uniform sampler2D tReflectionMap;
		uniform sampler2D tRefractionMap;
		uniform sampler2D tNormalMap0;
		uniform sampler2D tNormalMap1;

		#ifdef USE_FLOWMAP
			uniform sampler2D tFlowMap;
		#else
			uniform vec2 flowDirection;
		#endif

		uniform vec3 color;
		uniform float reflectivity;
		uniform vec4 config;

		varying vec4 vCoord;
		varying vec2 vUv;
		varying vec3 vToEye;

		void main() {

			#include <logdepthbuf_fragment>

			float flowMapOffset0 = config.x;
			float flowMapOffset1 = config.y;
			float halfCycle = config.z;
			float scale = config.w;

			vec3 toEye = normalize( vToEye );

			// determine flow direction
			vec2 flow;
			#ifdef USE_FLOWMAP
				flow = texture2D( tFlowMap, vUv ).rg * 2.0 - 1.0;
			#else
				flow = flowDirection;
			#endif
			flow.x *= - 1.0;

			// sample normal maps (distort uvs with flowdata)
			vec4 normalColor0 = texture2D( tNormalMap0, ( vUv * scale ) + flow * flowMapOffset0 );
			vec4 normalColor1 = texture2D( tNormalMap1, ( vUv * scale ) + flow * flowMapOffset1 );

			// linear interpolate to get the final normal color
			float flowLerp = abs( halfCycle - flowMapOffset0 ) / halfCycle;
			vec4 normalColor = mix( normalColor0, normalColor1, flowLerp );

			// calculate normal vector
			vec3 normal = normalize( vec3( normalColor.r * 2.0 - 1.0, normalColor.b,  normalColor.g * 2.0 - 1.0 ) );

			// calculate the fresnel term to blend reflection and refraction maps
			float theta = max( dot( toEye, normal ), 0.0 );
			float reflectance = reflectivity + ( 1.0 - reflectivity ) * pow( ( 1.0 - theta ), 5.0 );

			// calculate final uv coords
			vec3 coord = vCoord.xyz / vCoord.w;
			vec2 uv = coord.xy + coord.z * normal.xz * 0.05;

			vec4 reflectColor = texture2D( tReflectionMap, vec2( 1.0 - uv.x, uv.y ) );
			vec4 refractColor = texture2D( tRefractionMap, uv );

			// multiply water color with the mix of both textures
			gl_FragColor = vec4( color, 1.0 ) * mix( refractColor, reflectColor, reflectance );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>

		}`};const Ge={class:"absolute right-20px bottom-40px flex flex-col gap-y-30px"},re=3,He=Oe({__name:"3.圣诞",setup(qe){const M={width:window.innerWidth,height:window.innerHeight},r=new he,c=new ne(45,M.width/M.height,.1,1e3);c.position.set(-3.23,2.98,4.06);const w=new we({antialias:!0});w.setSize(M.width,M.height),w.setPixelRatio(window.devicePixelRatio),w.shadowMap.enabled=!0,w.toneMapping=ge,w.toneMappingExposure=.5;const _=ke();Ae(()=>{_.value.appendChild(w.domElement)}),new De().load("textures/sky.hdr",o=>{o.mapping=ye,r.environment=o,r.background=o});const R=new ze;R.setDecoderPath("draco/");const b=new Te;b.setDRACOLoader(R),b.load("model/christmasScene.glb",o=>{const e=o.scene;r.add(e),e.traverse(m=>{m.name==="Plane"&&(m.visible=!1),m instanceof A&&(m.castShadow=!0,m.receiveShadow=!0)}),R.dispose()});const U=new Me(300,32),f=new N(U,{textureWidth:1024,textureHeight:1024,color:15658751,flowDirection:new se(1,1),scale:100});f.rotation.x=-Math.PI/2,f.position.setY(-.5),r.add(f),r.add(new be(16777215,1));const S=new Ce(16777215,1);S.position.set(0,50,0),r.add(S);const v=new $(16777215,50);v.position.set(.1,2.4,0),v.castShadow=!0,r.add(v);const g=new Re;g.position.set(-8,2.5,-1.5);const W=[];for(let o=0;o<3;o++){const e=new Y(.2,32,32),m=new Q({color:16777215,emissive:16777215,emissiveIntensity:10}),p=new A(e,m);p.position.set(re*Math.cos(2*Math.PI*o/3),Math.cos(o*2*Math.PI/3),re*Math.sin(2*Math.PI*o/3));const C=new $(16777215,50);p.add(C),g.add(p),W.push(p)}r.add(g);const P=E.timeline(),z=E.timeline();function y(o,e){P.to(c.position,{x:o.x,y:o.y,z:o.z,duration:1,ease:"power2.inOut"}),z.to(j.target,{x:e.x,y:e.y,z:e.z,duration:1,ease:"power2.inOut"})}const x=[{text:"1",callback:()=>{y(new u(7,0,23),new u(0,0,0))}},{text:"2",callback:()=>{y(new u(-3.23,3,4.06),new u(-8,2,0))}},{text:"3",callback:()=>{y(new u(10,3,0),new u(5,2,0)),h()}},{text:"4",callback:()=>{y(new u(7,0,23),new u(0,0,0))}},{text:"5",callback:()=>{y(new u(-20,1.3,6.6),new u(5,2,0)),F()}}],t=Be(0),i=Ue(o=>{o.deltaY<0?t.value+=1:t.value-=1,t.value<0?t.value=x.length-1:t.value>x.length-1&&(t.value=0),x[t.value].callback()},1e3);Fe("wheel",i);const a=new _e(new Y(.1,32,32),new Q({color:16777215,emissive:16777215,emissiveIntensity:10}),200);r.add(a);const l=[];for(let o=0;o<a.count;o++){const e=Math.random()*100-50,m=We.randFloat(10,50),p=Math.random()*100-50;l.push(new u(e,m,p));const C=new T;C.setPosition(e,m,p),a.setMatrixAt(o,C)}const s=[],n=new Se;n.moveTo(25,25),n.bezierCurveTo(25,25,20,0,0,0),n.bezierCurveTo(-30,0,-30,35,-30,35),n.bezierCurveTo(-30,55,-10,77,25,95),n.bezierCurveTo(60,77,80,55,80,35),n.bezierCurveTo(80,35,80,0,50,0),n.bezierCurveTo(35,0,25,25,25,25);const d=new u(0,2,10);for(let o=0;o<a.count;o++){const e=n.getPoint(o/a.count);s.push(new u(e.x*.1+d.x,e.y*.1+d.y,d.z))}function h(){const o={time:0};E.to(o,{time:1,onUpdate:()=>{for(let e=0;e<a.count;e++){const m=l[e].x-(l[e].x-s[e].x)*o.time,p=l[e].y-(l[e].y-s[e].y)*o.time,C=l[e].z-(l[e].z-s[e].z)*o.time,L=new T;L.setPosition(m,p,C),a.setMatrixAt(e,L)}a.instanceMatrix.needsUpdate=!0}})}function F(){const o={time:0};E.to(o,{time:1,onUpdate:()=>{for(let e=0;e<a.count;e++){const m=s[e].x-(s[e].x-l[e].x)*o.time,p=s[e].y-(s[e].y-l[e].y)*o.time,C=s[e].z-(s[e].z-l[e].z)*o.time,L=new T;L.setPosition(m,p,C),a.setMatrixAt(e,L)}a.instanceMatrix.needsUpdate=!0}})}const j=new Pe(c,w.domElement);j.enableZoom=!1;let V=0;function ce(){V+=.5,j.update(),w.render(r,c),g.rotation.y+=.1,W.forEach((o,e)=>{o.position.setY(Math.cos(e*2*Math.PI/3+V))})}Le(ce);function G(o){const e={time:0};E.to(e,{time:o,onUpdate:()=>{c.zoom+=e.time,c.updateProjectionMatrix()}})}return x[t.value].callback(),Ne(()=>{Ee(r,w)}),(o,e)=>{const m=ue;return J(),X(te,null,[k("div",{ref_key:"containerRef",ref:_},null,512),k("div",Ge,[Z(m,{onClick:e[0]||(e[0]=p=>G(.05))},{default:ee(()=>[ae("+")]),_:1}),Z(m,{class:"!ml-0",onClick:e[1]||(e[1]=p=>G(-.05))},{default:ee(()=>[ae("-")]),_:1})]),k("div",{class:"text flex flex-col fixed pt-100px",text:"50px white",style:oe({transform:`translateY(${t.value*100}vh)`,top:`-${(x.length-1)*100}vh`})},[(J(),X(te,null,je(x,(p,C)=>k("div",{key:p.text,class:"h-screen pl-80px",style:oe({order:x.length-C})},Ie(p.text),5)),64))],4)],64)}}}),ut=Ve(He,[["__scopeId","data-v-b286c3b3"]]);export{ut as default};
