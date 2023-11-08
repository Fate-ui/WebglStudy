import{h as x,K as d,N as v,Q as U,D as C,X as z,Y as y,Z as g,_ as A,$ as p,M as V,V as b,u as F,S as Q,P as G,W as N,G as I,A as W,b as k,B as D,a as S,a0 as X}from"./three.module-cb7ba46f.js";import{O as L}from"./OrbitControls-7501b747.js";import{P as H,F as Z,C as Y,R as j,E as P,U as K,S as J}from"./UnrealBloomPass-4a4bea48.js";import{a as $}from"./index-6eec6ec5.js";import{d as q}from"./index-1a26f821.js";import{d as ee,s as te,l as re,p as ae,o as ie,c as se}from"./index-762269ff.js";class c extends H{constructor(e,i,a,t){super(),this.renderScene=i,this.renderCamera=a,this.selectedObjects=t!==void 0?t:[],this.visibleEdgeColor=new x(1,1,1),this.hiddenEdgeColor=new x(.1,.04,.02),this.edgeGlow=0,this.usePatternTexture=!1,this.edgeThickness=1,this.edgeStrength=3,this.downSampleRatio=2,this.pulsePeriod=0,this._visibilityCache=new Map,this.resolution=e!==void 0?new d(e.x,e.y):new d(256,256);const l=Math.round(this.resolution.x/this.downSampleRatio),r=Math.round(this.resolution.y/this.downSampleRatio);this.renderTargetMaskBuffer=new v(this.resolution.x,this.resolution.y),this.renderTargetMaskBuffer.texture.name="OutlinePass.mask",this.renderTargetMaskBuffer.texture.generateMipmaps=!1,this.depthMaterial=new U,this.depthMaterial.side=C,this.depthMaterial.depthPacking=z,this.depthMaterial.blending=y,this.prepareMaskMaterial=this.getPrepareMaskMaterial(),this.prepareMaskMaterial.side=C,this.prepareMaskMaterial.fragmentShader=M(this.prepareMaskMaterial.fragmentShader,this.renderCamera),this.renderTargetDepthBuffer=new v(this.resolution.x,this.resolution.y,{type:g}),this.renderTargetDepthBuffer.texture.name="OutlinePass.depth",this.renderTargetDepthBuffer.texture.generateMipmaps=!1,this.renderTargetMaskDownSampleBuffer=new v(l,r,{type:g}),this.renderTargetMaskDownSampleBuffer.texture.name="OutlinePass.depthDownSample",this.renderTargetMaskDownSampleBuffer.texture.generateMipmaps=!1,this.renderTargetBlurBuffer1=new v(l,r,{type:g}),this.renderTargetBlurBuffer1.texture.name="OutlinePass.blur1",this.renderTargetBlurBuffer1.texture.generateMipmaps=!1,this.renderTargetBlurBuffer2=new v(Math.round(l/2),Math.round(r/2),{type:g}),this.renderTargetBlurBuffer2.texture.name="OutlinePass.blur2",this.renderTargetBlurBuffer2.texture.generateMipmaps=!1,this.edgeDetectionMaterial=this.getEdgeDetectionMaterial(),this.renderTargetEdgeBuffer1=new v(l,r,{type:g}),this.renderTargetEdgeBuffer1.texture.name="OutlinePass.edge1",this.renderTargetEdgeBuffer1.texture.generateMipmaps=!1,this.renderTargetEdgeBuffer2=new v(Math.round(l/2),Math.round(r/2),{type:g}),this.renderTargetEdgeBuffer2.texture.name="OutlinePass.edge2",this.renderTargetEdgeBuffer2.texture.generateMipmaps=!1;const o=4,n=4;this.separableBlurMaterial1=this.getSeperableBlurMaterial(o),this.separableBlurMaterial1.uniforms.texSize.value.set(l,r),this.separableBlurMaterial1.uniforms.kernelRadius.value=1,this.separableBlurMaterial2=this.getSeperableBlurMaterial(n),this.separableBlurMaterial2.uniforms.texSize.value.set(Math.round(l/2),Math.round(r/2)),this.separableBlurMaterial2.uniforms.kernelRadius.value=n,this.overlayMaterial=this.getOverlayMaterial();const u=Y;this.copyUniforms=A.clone(u.uniforms),this.materialCopy=new p({uniforms:this.copyUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader,blending:y,depthTest:!1,depthWrite:!1}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new x,this.oldClearAlpha=1,this.fsQuad=new Z(null),this.tempPulseColor1=new x,this.tempPulseColor2=new x,this.textureMatrix=new V;function M(h,m){const B=m.isPerspectiveCamera?"perspective":"orthographic";return h.replace(/DEPTH_TO_VIEW_Z/g,B+"DepthToViewZ")}}dispose(){this.renderTargetMaskBuffer.dispose(),this.renderTargetDepthBuffer.dispose(),this.renderTargetMaskDownSampleBuffer.dispose(),this.renderTargetBlurBuffer1.dispose(),this.renderTargetBlurBuffer2.dispose(),this.renderTargetEdgeBuffer1.dispose(),this.renderTargetEdgeBuffer2.dispose(),this.depthMaterial.dispose(),this.prepareMaskMaterial.dispose(),this.edgeDetectionMaterial.dispose(),this.separableBlurMaterial1.dispose(),this.separableBlurMaterial2.dispose(),this.overlayMaterial.dispose(),this.materialCopy.dispose(),this.fsQuad.dispose()}setSize(e,i){this.renderTargetMaskBuffer.setSize(e,i),this.renderTargetDepthBuffer.setSize(e,i);let a=Math.round(e/this.downSampleRatio),t=Math.round(i/this.downSampleRatio);this.renderTargetMaskDownSampleBuffer.setSize(a,t),this.renderTargetBlurBuffer1.setSize(a,t),this.renderTargetEdgeBuffer1.setSize(a,t),this.separableBlurMaterial1.uniforms.texSize.value.set(a,t),a=Math.round(a/2),t=Math.round(t/2),this.renderTargetBlurBuffer2.setSize(a,t),this.renderTargetEdgeBuffer2.setSize(a,t),this.separableBlurMaterial2.uniforms.texSize.value.set(a,t)}changeVisibilityOfSelectedObjects(e){const i=this._visibilityCache;function a(t){t.isMesh&&(e===!0?t.visible=i.get(t):(i.set(t,t.visible),t.visible=e))}for(let t=0;t<this.selectedObjects.length;t++)this.selectedObjects[t].traverse(a)}changeVisibilityOfNonSelectedObjects(e){const i=this._visibilityCache,a=[];function t(r){r.isMesh&&a.push(r)}for(let r=0;r<this.selectedObjects.length;r++)this.selectedObjects[r].traverse(t);function l(r){if(r.isMesh||r.isSprite){let o=!1;for(let n=0;n<a.length;n++)if(a[n].id===r.id){o=!0;break}if(o===!1){const n=r.visible;(e===!1||i.get(r)===!0)&&(r.visible=e),i.set(r,n)}}else(r.isPoints||r.isLine)&&(e===!0?r.visible=i.get(r):(i.set(r,r.visible),r.visible=e))}this.renderScene.traverse(l)}updateTextureMatrix(){this.textureMatrix.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),this.textureMatrix.multiply(this.renderCamera.projectionMatrix),this.textureMatrix.multiply(this.renderCamera.matrixWorldInverse)}render(e,i,a,t,l){if(this.selectedObjects.length>0){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const r=e.autoClear;e.autoClear=!1,l&&e.state.buffers.stencil.setTest(!1),e.setClearColor(16777215,1),this.changeVisibilityOfSelectedObjects(!1);const o=this.renderScene.background;if(this.renderScene.background=null,this.renderScene.overrideMaterial=this.depthMaterial,e.setRenderTarget(this.renderTargetDepthBuffer),e.clear(),e.render(this.renderScene,this.renderCamera),this.changeVisibilityOfSelectedObjects(!0),this._visibilityCache.clear(),this.updateTextureMatrix(),this.changeVisibilityOfNonSelectedObjects(!1),this.renderScene.overrideMaterial=this.prepareMaskMaterial,this.prepareMaskMaterial.uniforms.cameraNearFar.value.set(this.renderCamera.near,this.renderCamera.far),this.prepareMaskMaterial.uniforms.depthTexture.value=this.renderTargetDepthBuffer.texture,this.prepareMaskMaterial.uniforms.textureMatrix.value=this.textureMatrix,e.setRenderTarget(this.renderTargetMaskBuffer),e.clear(),e.render(this.renderScene,this.renderCamera),this.renderScene.overrideMaterial=null,this.changeVisibilityOfNonSelectedObjects(!0),this._visibilityCache.clear(),this.renderScene.background=o,this.fsQuad.material=this.materialCopy,this.copyUniforms.tDiffuse.value=this.renderTargetMaskBuffer.texture,e.setRenderTarget(this.renderTargetMaskDownSampleBuffer),e.clear(),this.fsQuad.render(e),this.tempPulseColor1.copy(this.visibleEdgeColor),this.tempPulseColor2.copy(this.hiddenEdgeColor),this.pulsePeriod>0){const n=.625+Math.cos(performance.now()*.01/this.pulsePeriod)*.75/2;this.tempPulseColor1.multiplyScalar(n),this.tempPulseColor2.multiplyScalar(n)}this.fsQuad.material=this.edgeDetectionMaterial,this.edgeDetectionMaterial.uniforms.maskTexture.value=this.renderTargetMaskDownSampleBuffer.texture,this.edgeDetectionMaterial.uniforms.texSize.value.set(this.renderTargetMaskDownSampleBuffer.width,this.renderTargetMaskDownSampleBuffer.height),this.edgeDetectionMaterial.uniforms.visibleEdgeColor.value=this.tempPulseColor1,this.edgeDetectionMaterial.uniforms.hiddenEdgeColor.value=this.tempPulseColor2,e.setRenderTarget(this.renderTargetEdgeBuffer1),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.separableBlurMaterial1,this.separableBlurMaterial1.uniforms.colorTexture.value=this.renderTargetEdgeBuffer1.texture,this.separableBlurMaterial1.uniforms.direction.value=c.BlurDirectionX,this.separableBlurMaterial1.uniforms.kernelRadius.value=this.edgeThickness,e.setRenderTarget(this.renderTargetBlurBuffer1),e.clear(),this.fsQuad.render(e),this.separableBlurMaterial1.uniforms.colorTexture.value=this.renderTargetBlurBuffer1.texture,this.separableBlurMaterial1.uniforms.direction.value=c.BlurDirectionY,e.setRenderTarget(this.renderTargetEdgeBuffer1),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.separableBlurMaterial2,this.separableBlurMaterial2.uniforms.colorTexture.value=this.renderTargetEdgeBuffer1.texture,this.separableBlurMaterial2.uniforms.direction.value=c.BlurDirectionX,e.setRenderTarget(this.renderTargetBlurBuffer2),e.clear(),this.fsQuad.render(e),this.separableBlurMaterial2.uniforms.colorTexture.value=this.renderTargetBlurBuffer2.texture,this.separableBlurMaterial2.uniforms.direction.value=c.BlurDirectionY,e.setRenderTarget(this.renderTargetEdgeBuffer2),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.overlayMaterial,this.overlayMaterial.uniforms.maskTexture.value=this.renderTargetMaskBuffer.texture,this.overlayMaterial.uniforms.edgeTexture1.value=this.renderTargetEdgeBuffer1.texture,this.overlayMaterial.uniforms.edgeTexture2.value=this.renderTargetEdgeBuffer2.texture,this.overlayMaterial.uniforms.patternTexture.value=this.patternTexture,this.overlayMaterial.uniforms.edgeStrength.value=this.edgeStrength,this.overlayMaterial.uniforms.edgeGlow.value=this.edgeGlow,this.overlayMaterial.uniforms.usePatternTexture.value=this.usePatternTexture,l&&e.state.buffers.stencil.setTest(!0),e.setRenderTarget(a),this.fsQuad.render(e),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=r}this.renderToScreen&&(this.fsQuad.material=this.materialCopy,this.copyUniforms.tDiffuse.value=a.texture,e.setRenderTarget(null),this.fsQuad.render(e))}getPrepareMaskMaterial(){return new p({uniforms:{depthTexture:{value:null},cameraNearFar:{value:new d(.5,.5)},textureMatrix:{value:null}},vertexShader:`#include <morphtarget_pars_vertex>
				#include <skinning_pars_vertex>

				varying vec4 projTexCoord;
				varying vec4 vPosition;
				uniform mat4 textureMatrix;

				void main() {

					#include <skinbase_vertex>
					#include <begin_vertex>
					#include <morphtarget_vertex>
					#include <skinning_vertex>
					#include <project_vertex>

					vPosition = mvPosition;

					vec4 worldPosition = vec4( transformed, 1.0 );

					#ifdef USE_INSTANCING

						worldPosition = instanceMatrix * worldPosition;

					#endif
					
					worldPosition = modelMatrix * worldPosition;

					projTexCoord = textureMatrix * worldPosition;

				}`,fragmentShader:`#include <packing>
				varying vec4 vPosition;
				varying vec4 projTexCoord;
				uniform sampler2D depthTexture;
				uniform vec2 cameraNearFar;

				void main() {

					float depth = unpackRGBAToDepth(texture2DProj( depthTexture, projTexCoord ));
					float viewZ = - DEPTH_TO_VIEW_Z( depth, cameraNearFar.x, cameraNearFar.y );
					float depthTest = (-vPosition.z > viewZ) ? 1.0 : 0.0;
					gl_FragColor = vec4(0.0, depthTest, 1.0, 1.0);

				}`})}getEdgeDetectionMaterial(){return new p({uniforms:{maskTexture:{value:null},texSize:{value:new d(.5,.5)},visibleEdgeColor:{value:new b(1,1,1)},hiddenEdgeColor:{value:new b(1,1,1)}},vertexShader:`varying vec2 vUv;

				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;

				uniform sampler2D maskTexture;
				uniform vec2 texSize;
				uniform vec3 visibleEdgeColor;
				uniform vec3 hiddenEdgeColor;

				void main() {
					vec2 invSize = 1.0 / texSize;
					vec4 uvOffset = vec4(1.0, 0.0, 0.0, 1.0) * vec4(invSize, invSize);
					vec4 c1 = texture2D( maskTexture, vUv + uvOffset.xy);
					vec4 c2 = texture2D( maskTexture, vUv - uvOffset.xy);
					vec4 c3 = texture2D( maskTexture, vUv + uvOffset.yw);
					vec4 c4 = texture2D( maskTexture, vUv - uvOffset.yw);
					float diff1 = (c1.r - c2.r)*0.5;
					float diff2 = (c3.r - c4.r)*0.5;
					float d = length( vec2(diff1, diff2) );
					float a1 = min(c1.g, c2.g);
					float a2 = min(c3.g, c4.g);
					float visibilityFactor = min(a1, a2);
					vec3 edgeColor = 1.0 - visibilityFactor > 0.001 ? visibleEdgeColor : hiddenEdgeColor;
					gl_FragColor = vec4(edgeColor, 1.0) * vec4(d);
				}`})}getSeperableBlurMaterial(e){return new p({defines:{MAX_RADIUS:e},uniforms:{colorTexture:{value:null},texSize:{value:new d(.5,.5)},direction:{value:new d(.5,.5)},kernelRadius:{value:1}},vertexShader:`varying vec2 vUv;

				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 texSize;
				uniform vec2 direction;
				uniform float kernelRadius;

				float gaussianPdf(in float x, in float sigma) {
					return 0.39894 * exp( -0.5 * x * x/( sigma * sigma))/sigma;
				}

				void main() {
					vec2 invSize = 1.0 / texSize;
					float sigma = kernelRadius/2.0;
					float weightSum = gaussianPdf(0.0, sigma);
					vec4 diffuseSum = texture2D( colorTexture, vUv) * weightSum;
					vec2 delta = direction * invSize * kernelRadius/float(MAX_RADIUS);
					vec2 uvOffset = delta;
					for( int i = 1; i <= MAX_RADIUS; i ++ ) {
						float x = kernelRadius * float(i) / float(MAX_RADIUS);
						float w = gaussianPdf(x, sigma);
						vec4 sample1 = texture2D( colorTexture, vUv + uvOffset);
						vec4 sample2 = texture2D( colorTexture, vUv - uvOffset);
						diffuseSum += ((sample1 + sample2) * w);
						weightSum += (2.0 * w);
						uvOffset += delta;
					}
					gl_FragColor = diffuseSum/weightSum;
				}`})}getOverlayMaterial(){return new p({uniforms:{maskTexture:{value:null},edgeTexture1:{value:null},edgeTexture2:{value:null},patternTexture:{value:null},edgeStrength:{value:1},edgeGlow:{value:1},usePatternTexture:{value:0}},vertexShader:`varying vec2 vUv;

				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;

				uniform sampler2D maskTexture;
				uniform sampler2D edgeTexture1;
				uniform sampler2D edgeTexture2;
				uniform sampler2D patternTexture;
				uniform float edgeStrength;
				uniform float edgeGlow;
				uniform bool usePatternTexture;

				void main() {
					vec4 edgeValue1 = texture2D(edgeTexture1, vUv);
					vec4 edgeValue2 = texture2D(edgeTexture2, vUv);
					vec4 maskColor = texture2D(maskTexture, vUv);
					vec4 patternColor = texture2D(patternTexture, 6.0 * vUv);
					float visibilityFactor = 1.0 - maskColor.g > 0.0 ? 1.0 : 0.5;
					vec4 edgeValue = edgeValue1 + edgeValue2 * edgeGlow;
					vec4 finalColor = edgeStrength * maskColor.r * edgeValue;
					if(usePatternTexture)
						finalColor += + visibilityFactor * (1.0 - maskColor.r) * (1.0 - patternColor.r);
					gl_FragColor = finalColor;
				}`,blending:F,depthTest:!1,depthWrite:!1,transparent:!0})}}c.BlurDirectionX=new d(1,0);c.BlurDirectionY=new d(0,1);const E=1,ce=ee({__name:"1.后处理",setup(le){const e={width:window.innerWidth,height:window.innerHeight},i=new Q,a=new G(45,e.width/e.height,1,1e4);a.position.set(5,5,3);const t=new N({antialias:!0});t.setSize(e.width,e.height),t.setPixelRatio(window.devicePixelRatio),i.add(new I(10,10)),i.add(new W(10));const l=te();re(()=>{l.value.appendChild(t.domElement)});const r=new L(a,t.domElement),o=[],n=new X;n.set(E);for(let s=0;s<5;s++){const f=new k(new D(1,1,1),new S({color:65280}));o.push(f),f.position.set(s*2-4,0,0),f.layers.enable(E),i.add(f)}for(let s=0;s<5;s++){const f=new k(new D(1,1,1),new S({color:65280}));f.position.set(s*2-4,2,0),i.add(f)}const u=new c(new d(e.width,e.height),i,a,o);u.visibleEdgeColor.set(16776960),u.edgeThickness=7,u.edgeStrength=6,u.pulsePeriod=2;const M=new j(i,a),h=new P(t);h.renderToScreen=!1,h.addPass(M);const m=new P(t);m.addPass(M),h.addPass(u);const B=new S({color:"black"}),T={};function _(s){s.isMesh&&n.test(s.layers)===!1&&(T[s.uuid]=s.material,s.material=B)}const O=new K(new d(e.width,e.height),.7,.4,0);h.addPass(O);function R(s){T[s.uuid]&&(s.material=T[s.uuid],delete T[s.uuid])}const w=new J(new p({uniforms:{baseTexture:{value:null},bloomTexture:{value:h.renderTarget2.texture}},vertexShader:`// vertextshader
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }
`,fragmentShader:`
    // fragmentshader
      uniform sampler2D baseTexture;
      uniform sampler2D bloomTexture;
      varying vec2 vUv;
      void main() {
        gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );
      }
`,defines:{}}),"baseTexture");return w.needsSwap=!0,m.addPass(w),$(()=>{r.update(),i.traverse(_),h.render(),i.traverse(R),m.render()}),ae(()=>{q(i,t)}),(s,f)=>(ie(),se("div",{ref_key:"containerRef",ref:l},null,512))}});export{ce as default};
