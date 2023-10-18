import"./base-83270480.js";import{E as ue}from"./el-button-9e441e8a.js";import{b as A,P as ie,h as B,a0 as q,M as T,N as fe,Z as me,$ as le,_ as se,V as u,a1 as I,a2 as de,K as ce,T as pe,a3 as ve,a4 as $,E as xe,S as he,W as we,a5 as ge,a6 as ye,a7 as Me,j as be,m as _e,k as Y,r as Ce,c as Q,a8 as Z,a9 as Re,aa as Se,v as We}from"./three.module-4dd0ab4d.js";import{O as Pe}from"./OrbitControls-79d41aec.js";import{D as ze}from"./DRACOLoader-f3a7d95a.js";import{G as Te}from"./GLTFLoader-f2abeb44.js";import{R as De}from"./RGBELoader-4bbee5df.js";import{R as J}from"./Reflector-82019ad9.js";import{g as E}from"./index-4db78ffb.js";import{b as Fe,u as Ue}from"./index-9562d842.js";import{d as Le}from"./index-1a26f821.js";import{d as Ee,s as Oe,l as ke,k as Ae,p as Be,o as K,c as X,h as k,q as ee,w as te,F as oe,r as Ne,H as ae,t as je,j as re}from"./index-2c776554.js";import{_ as Ie}from"./_plugin-vue_export-helper-c27b6911.js";import"./use-form-item-df7d2fcf.js";import"./use-global-config-b2cca82e.js";class O extends A{constructor(M,r={}){super(M),this.isRefractor=!0,this.type="Refractor",this.camera=new ie;const c=this,h=r.color!==void 0?new B(r.color):new B(8355711),R=r.textureWidth||512,D=r.textureHeight||512,_=r.clipBias||0,C=r.shader||O.RefractorShader,F=r.multisample!==void 0?r.multisample:4,m=this.camera;m.matrixAutoUpdate=!1,m.userData.refractor=!0;const S=new q,w=new T,g=new fe(R,D,{samples:F,type:me});this.material=new le({uniforms:se.clone(C.uniforms),vertexShader:C.vertexShader,fragmentShader:C.fragmentShader,transparent:!0}),this.material.uniforms.color.value=h,this.material.uniforms.tDiffuse.value=g.texture,this.material.uniforms.textureMatrix.value=w;const W=function(){const t=new u,i=new u,a=new T,l=new u,s=new u;return function(d){return t.setFromMatrixPosition(c.matrixWorld),i.setFromMatrixPosition(d.matrixWorld),l.subVectors(t,i),a.extractRotation(c.matrixWorld),s.set(0,0,1),s.applyMatrix4(a),l.dot(s)<0}}(),P=function(){const t=new u,i=new u,a=new de,l=new u;return function(){c.matrixWorld.decompose(i,a,l),t.set(0,0,1).applyQuaternion(a).normalize(),t.negate(),S.setFromNormalAndCoplanarPoint(t,i)}}(),z=function(){const t=new q,i=new I,a=new I;return function(s){m.matrixWorld.copy(s.matrixWorld),m.matrixWorldInverse.copy(m.matrixWorld).invert(),m.projectionMatrix.copy(s.projectionMatrix),m.far=s.far,t.copy(S),t.applyMatrix4(m.matrixWorldInverse),i.set(t.normal.x,t.normal.y,t.normal.z,t.constant);const n=m.projectionMatrix;a.x=(Math.sign(i.x)+n.elements[8])/n.elements[0],a.y=(Math.sign(i.y)+n.elements[9])/n.elements[5],a.z=-1,a.w=(1+n.elements[10])/n.elements[14],i.multiplyScalar(2/i.dot(a)),n.elements[2]=i.x,n.elements[6]=i.y,n.elements[10]=i.z+1-_,n.elements[14]=i.w}}();function y(t){w.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),w.multiply(t.projectionMatrix),w.multiply(t.matrixWorldInverse),w.multiply(c.matrixWorld)}function v(t,i,a){c.visible=!1;const l=t.getRenderTarget(),s=t.xr.enabled,n=t.shadowMap.autoUpdate;t.xr.enabled=!1,t.shadowMap.autoUpdate=!1,t.setRenderTarget(g),t.autoClear===!1&&t.clear(),t.render(i,m),t.xr.enabled=s,t.shadowMap.autoUpdate=n,t.setRenderTarget(l);const d=a.viewport;d!==void 0&&t.state.viewport(d),c.visible=!0}this.onBeforeRender=function(t,i,a){a.userData.refractor!==!0&&W(a)&&(P(),y(a),z(a),v(t,i,a))},this.getRenderTarget=function(){return g},this.dispose=function(){g.dispose(),c.material.dispose()}}}O.RefractorShader={uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`

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

		}`};class N extends A{constructor(M,r={}){super(M),this.isWater=!0,this.type="Water";const c=this,h=r.color!==void 0?new B(r.color):new B(16777215),R=r.textureWidth||512,D=r.textureHeight||512,_=r.clipBias||0,C=r.flowDirection||new ce(1,0),F=r.flowSpeed||.03,m=r.reflectivity||.02,S=r.scale||1,w=r.shader||N.WaterShader,g=new pe,W=r.flowMap||void 0,P=r.normalMap0||g.load("textures/water/Water_1_M_Normal.jpg"),z=r.normalMap1||g.load("textures/water/Water_2_M_Normal.jpg"),y=.15,v=y*.5,t=new T,i=new xe;if(J===void 0){console.error("THREE.Water: Required component Reflector not found.");return}if(O===void 0){console.error("THREE.Water: Required component Refractor not found.");return}const a=new J(M,{textureWidth:R,textureHeight:D,clipBias:_}),l=new O(M,{textureWidth:R,textureHeight:D,clipBias:_});a.matrixAutoUpdate=!1,l.matrixAutoUpdate=!1,this.material=new le({uniforms:se.merge([ve.fog,w.uniforms]),vertexShader:w.vertexShader,fragmentShader:w.fragmentShader,transparent:!0,fog:!0}),W!==void 0?(this.material.defines.USE_FLOWMAP="",this.material.uniforms.tFlowMap={type:"t",value:W}):this.material.uniforms.flowDirection={type:"v2",value:C},P.wrapS=P.wrapT=$,z.wrapS=z.wrapT=$,this.material.uniforms.tReflectionMap.value=a.getRenderTarget().texture,this.material.uniforms.tRefractionMap.value=l.getRenderTarget().texture,this.material.uniforms.tNormalMap0.value=P,this.material.uniforms.tNormalMap1.value=z,this.material.uniforms.color.value=h,this.material.uniforms.reflectivity.value=m,this.material.uniforms.textureMatrix.value=t,this.material.uniforms.config.value.x=0,this.material.uniforms.config.value.y=v,this.material.uniforms.config.value.z=v,this.material.uniforms.config.value.w=S;function s(d){t.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),t.multiply(d.projectionMatrix),t.multiply(d.matrixWorldInverse),t.multiply(c.matrixWorld)}function n(){const d=i.getDelta(),x=c.material.uniforms.config;x.value.x+=F*d,x.value.y=x.value.x+v,x.value.x>=y?(x.value.x=0,x.value.y=v):x.value.y>=y&&(x.value.y=x.value.y-y)}this.onBeforeRender=function(d,x,U){s(U),n(),c.visible=!1,a.matrixWorld.copy(c.matrixWorld),l.matrixWorld.copy(c.matrixWorld),a.onBeforeRender(d,x,U),l.onBeforeRender(d,x,U),c.visible=!0}}}N.WaterShader={uniforms:{color:{type:"c",value:null},reflectivity:{type:"f",value:0},tReflectionMap:{type:"t",value:null},tRefractionMap:{type:"t",value:null},tNormalMap0:{type:"t",value:null},tNormalMap1:{type:"t",value:null},textureMatrix:{type:"m4",value:null},config:{type:"v4",value:new I}},vertexShader:`

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

		}`};const He={class:"absolute right-20px bottom-40px flex flex-col gap-y-30px"},ne=3,Ve=Ee({__name:"3.圣诞",setup(Ge){const M={width:window.innerWidth,height:window.innerHeight},r=new he,c=new ie(45,M.width/M.height,.1,1e3);c.position.set(-3.23,2.98,4.06);const h=new we({antialias:!0});h.setSize(M.width,M.height),h.setPixelRatio(window.devicePixelRatio),h.shadowMap.enabled=!0,h.toneMapping=ge,h.toneMappingExposure=.5;const R=Oe();ke(()=>{R.value.appendChild(h.domElement)}),new De().load("textures/sky.hdr",o=>{o.mapping=ye,r.environment=o,r.background=o});const _=new ze;_.setDecoderPath("draco/");const C=new Te;C.setDRACOLoader(_),C.load("model/christmasScene.glb",o=>{const e=o.scene;r.add(e),e.traverse(f=>{f.name==="Plane"&&(f.visible=!1),f instanceof A&&(console.log(f),f.castShadow=!0,f.receiveShadow=!0)}),_.dispose()});const F=new Me(300,32),m=new N(F,{textureWidth:1024,textureHeight:1024,color:15658751,flowDirection:new ce(1,1),scale:100});m.rotation.x=-Math.PI/2,m.position.setY(-.5),r.add(m),r.add(new be(16777215,1));const S=new _e(16777215,1);S.position.set(0,50,0),r.add(S);const w=new Y(16777215,50);w.position.set(.1,2.4,0),w.castShadow=!0,r.add(w);const g=new Ce;g.position.set(-8,2.5,-1.5);const W=[];for(let o=0;o<3;o++){const e=new Q(.2,32,32),f=new Z({color:16777215,emissive:16777215,emissiveIntensity:10}),p=new A(e,f);p.position.set(ne*Math.cos(2*Math.PI*o/3),Math.cos(o*2*Math.PI/3),ne*Math.sin(2*Math.PI*o/3));const b=new Y(16777215,50);p.add(b),g.add(p),W.push(p)}r.add(g);const P=E.timeline(),z=E.timeline();function y(o,e){P.to(c.position,{x:o.x,y:o.y,z:o.z,duration:1,ease:"power2.inOut"}),z.to(j.target,{x:e.x,y:e.y,z:e.z,duration:1,ease:"power2.inOut"})}const v=[{text:"1",callback:()=>{y(new u(7,0,23),new u(0,0,0))}},{text:"2",callback:()=>{y(new u(-3.23,3,4.06),new u(-8,2,0))}},{text:"3",callback:()=>{y(new u(10,3,0),new u(5,2,0)),x()}},{text:"4",callback:()=>{y(new u(7,0,23),new u(0,0,0))}},{text:"5",callback:()=>{y(new u(-20,1.3,6.6),new u(5,2,0)),U()}}],t=Ae(0),i=Fe(o=>{o.deltaY<0?t.value+=1:t.value-=1,t.value<0?t.value=v.length-1:t.value>v.length-1&&(t.value=0),v[t.value].callback()},1e3);Ue("wheel",i);const a=new Re(new Q(.1,32,32),new Z({color:16777215,emissive:16777215,emissiveIntensity:10}),200);r.add(a);const l=[];for(let o=0;o<a.count;o++){const e=Math.random()*100-50,f=We.randFloat(10,50),p=Math.random()*100-50;l.push(new u(e,f,p));const b=new T;b.setPosition(e,f,p),a.setMatrixAt(o,b)}const s=[],n=new Se;n.moveTo(25,25),n.bezierCurveTo(25,25,20,0,0,0),n.bezierCurveTo(-30,0,-30,35,-30,35),n.bezierCurveTo(-30,55,-10,77,25,95),n.bezierCurveTo(60,77,80,55,80,35),n.bezierCurveTo(80,35,80,0,50,0),n.bezierCurveTo(35,0,25,25,25,25);const d=new u(0,2,10);for(let o=0;o<a.count;o++){const e=n.getPoint(o/a.count);s.push(new u(e.x*.1+d.x,e.y*.1+d.y,d.z))}function x(){const o={time:0};E.to(o,{time:1,onUpdate:()=>{for(let e=0;e<a.count;e++){const f=l[e].x-(l[e].x-s[e].x)*o.time,p=l[e].y-(l[e].y-s[e].y)*o.time,b=l[e].z-(l[e].z-s[e].z)*o.time,L=new T;L.setPosition(f,p,b),a.setMatrixAt(e,L)}a.instanceMatrix.needsUpdate=!0}})}function U(){const o={time:0};E.to(o,{time:1,onUpdate:()=>{for(let e=0;e<a.count;e++){const f=s[e].x-(s[e].x-l[e].x)*o.time,p=s[e].y-(s[e].y-l[e].y)*o.time,b=s[e].z-(s[e].z-l[e].z)*o.time,L=new T;L.setPosition(f,p,b),a.setMatrixAt(e,L)}a.instanceMatrix.needsUpdate=!0}})}const j=new Pe(c,h.domElement);j.enableZoom=!1;let H=0;function V(){H+=.5,requestAnimationFrame(V),j.update(),h.render(r,c),g.rotation.y+=.1,W.forEach((o,e)=>{o.position.setY(Math.cos(e*2*Math.PI/3+H))})}V();function G(o){const e={time:0};E.to(e,{time:o,onUpdate:()=>{c.zoom+=e.time,c.updateProjectionMatrix()}})}return v[t.value].callback(),Be(()=>{Le(r,h)}),(o,e)=>{const f=ue;return K(),X(oe,null,[k("div",{ref_key:"containerRef",ref:R},null,512),k("div",He,[ee(f,{onClick:e[0]||(e[0]=p=>G(.05))},{default:te(()=>[re("+")]),_:1}),ee(f,{class:"!ml-0",onClick:e[1]||(e[1]=p=>G(-.05))},{default:te(()=>[re("-")]),_:1})]),k("div",{class:"text flex flex-col fixed pt-100px",text:"50px white",style:ae({transform:`translateY(${t.value*100}vh)`,top:`-${(v.length-1)*100}vh`})},[(K(),X(oe,null,Ne(v,(p,b)=>k("div",{key:p.text,class:"h-screen pl-80px",style:ae({order:v.length-b})},je(p.text),5)),64))],4)],64)}}});const lt=Ie(Ve,[["__scopeId","data-v-3b914257"]]);export{lt as default};
