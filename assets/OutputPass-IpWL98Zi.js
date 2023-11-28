import{aP as t,by as o,ao as n,bz as s,bA as r,bo as p,bB as l,aT as g}from"./three.module-EC2ItXet.js";import{P as u,F as f}from"./UnrealBloomPass-sCuF_BDi.js";const h={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class M extends u{constructor(){super();const i=h;this.uniforms=t.clone(i.uniforms),this.material=new o({name:i.name,uniforms:this.uniforms,vertexShader:i.vertexShader,fragmentShader:i.fragmentShader}),this.fsQuad=new f(this.material),this._outputColorSpace=null,this._toneMapping=null}render(i,e,a){this.uniforms.tDiffuse.value=a.texture,this.uniforms.toneMappingExposure.value=i.toneMappingExposure,(this._outputColorSpace!==i.outputColorSpace||this._toneMapping!==i.toneMapping)&&(this._outputColorSpace=i.outputColorSpace,this._toneMapping=i.toneMapping,this.material.defines={},n.getTransfer(this._outputColorSpace)===s&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===r?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===p?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===l?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===g&&(this.material.defines.ACES_FILMIC_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(i.setRenderTarget(null),this.fsQuad.render(i)):(i.setRenderTarget(e),this.clear&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),this.fsQuad.render(i))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}export{M as O};
