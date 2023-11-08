import{_ as h,bs as _,aB as M,bt as C,bu as w,bj as S,bv as P,a6 as v,S as T,h as E,P as R,W as N,j as b,m as x,T as F,bw as A,a as I,D as O,b as G,K as L}from"./three.module-2f5a30fe.js";import{O as D}from"./OrbitControls-27c6eec7.js";import{a as U}from"./index-f6386e96.js";import{g as B}from"./index-4db78ffb.js";import{P as k,F as y,R as Q,E as j,U as W}from"./UnrealBloomPass-6c27eb6e.js";import{d as z}from"./index-1a26f821.js";import{d as H,s as V,l as J,p as K,o as q,c as X}from"./index-f07ac78f.js";const Y={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = OptimizedCineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class Z extends k{constructor(){super();const e=Y;this.uniforms=h.clone(e.uniforms),this.material=new _({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new y(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,a,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},M.getTransfer(this._outputColorSpace)===C&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===w?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===S?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===P?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===v&&(this.material.defines.ACES_FILMIC_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(a),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const pe=H({__name:"22.流光",setup(p){const e={width:window.innerWidth,height:window.innerHeight},a=new T;a.background=new E("black");const i=new R(50,e.width/e.height,1,1e4);i.position.set(0,0,220);const t=new N({antialias:!0,alpha:!0});t.setSize(e.width,e.height),t.setPixelRatio(window.devicePixelRatio);const n=V();J(()=>{n.value.appendChild(t.domElement)});const r=new D(i,t.domElement);r.enableDamping=!0,a.add(new b(11382189));const l=new x(16777215,5);l.position.set(100,100,0),a.add(l);const s=new F().load("texture/flowLight.png");s.offset.x=-.62;const u=new A(80,3,16,100),d=new I({color:16777215,map:s,side:O}),f=new G(u,d);a.add(f),B.to(s.offset,{x:.62,duration:5,repeat:-1});const g=new Q(a,i),o=new j(t),m=new W(new L(e.width,e.height),1.5,.1,.85),c=new Z;return o.addPass(g),o.addPass(m),o.addPass(c),U(()=>{r.update(),o.render()}),K(()=>{z(a,t)}),(ee,ae)=>(q(),X("div",{ref_key:"containerRef",ref:n},null,512))}});export{pe as default};
