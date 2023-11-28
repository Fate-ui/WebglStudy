import"./base-i78343Mr.js";import{E as U}from"./el-button-1zzj9FtF.js";import{S as V,P as k,W as F,aE as q,aF as B,aG as D,aH as E,aI as M,K as w,N as P,T as G,ad as x,aJ as W,f as A,b as L}from"./three.module-EC2ItXet.js";import{u as H,a as N,n as X}from"./index-AcvGrBFK.js";import{d as j}from"./index-W38Qjy34.js";import{d as J,l as K,s as O,k as I,p as $,o as f,c as g,h as o,i as Q,w as Y,F as Z,j as ee}from"./index-qUhmW9vi.js";import"./index-O2se9W_j.js";import"./use-form-item-HMGt__fy.js";import"./style-xLxcu4R_.js";import"./use-global-config-zoN4cAk7.js";const te={key:1,class:"fixed left-20px top-20px p-20px leading-25px z-1 bg-white rounded flex"},ae=o("span",null,"学习来源：",-1),oe=o("div",{class:"flex flex-col"},[o("a",{href:"https://www.bilibili.com/video/BV1WM411V7DC/?spm_id_from=333.788&vd_source=c21dc7a2f93289c8e3df1bde97f015b9",target:"_blank",class:"text-blue"}," B站：shadertoy音频channel使用 - three.js将音频数据传入shader "),o("a",{href:"https://shadertoy.com/view/4dXGR4",target:"_blank",class:"text-blue"},"shadertoy：Main Sequence Star ")],-1),ie=[ae,oe],se=45,ne=`
			varying vec2 vUv;

			void main() {

				vUv = uv;

				gl_Position = vec4( position, 1.0 );

			}
`,re=`
  varying vec2 vUv;
  uniform vec3      iResolution;           // viewport resolution (in pixels)
  uniform float     iTime;                 // shader playback time (in seconds)
  uniform sampler2D iChannel0;          // input channel. XX = 2D/Cube
  uniform sampler2D iChannel1;          // input channel. XX = 2D/Cube

// based on https://www.shadertoy.com/view/lsf3RH by
// trisomie21 (THANKS!)
// My apologies for the ugly code.

float snoise(vec3 uv, float res)	// by trisomie21
{
	const vec3 s = vec3(1e0, 1e2, 1e4);

	uv *= res;

	vec3 uv0 = floor(mod(uv, res))*s;
	vec3 uv1 = floor(mod(uv+vec3(1.), res))*s;

	vec3 f = fract(uv); f = f*f*(3.0-2.0*f);

	vec4 v = vec4(uv0.x+uv0.y+uv0.z, uv1.x+uv0.y+uv0.z,
		      	  uv0.x+uv1.y+uv0.z, uv1.x+uv1.y+uv0.z);

	vec4 r = fract(sin(v*1e-3)*1e5);
	float r0 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);

	r = fract(sin((v + uv1.z - uv0.z)*1e-3)*1e5);
	float r1 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);

	return mix(r0, r1, f.z)*2.-1.;
}

float freqs[4];

void main()
{
	freqs[0] = texture( iChannel1, vec2( 0.01, 0.25 ) ).x;
	freqs[1] = texture( iChannel1, vec2( 0.07, 0.25 ) ).x;
	freqs[2] = texture( iChannel1, vec2( 0.15, 0.25 ) ).x;
	freqs[3] = texture( iChannel1, vec2( 0.30, 0.25 ) ).x;

	float brightness	= freqs[1] * 0.25 + freqs[2] * 0.25;
	float radius		= 0.24 + brightness * 0.2;
	float invRadius 	= 1.0/radius;

	vec3 orange			= vec3( 0.8, 0.65, 0.3 );
	vec3 orangeRed		= vec3( 0.8, 0.35, 0.1 );
	float time		= iTime * 0.1;
	float aspect	= iResolution.x/iResolution.y;
	vec2 uv			= gl_FragCoord.xy / iResolution.xy;
	vec2 p 			= -0.5 + uv;
	p.x *= aspect;

	float fade		= pow( length( 2.0 * p ), 0.5 );
	float fVal1		= 1.0 - fade;
	float fVal2		= 1.0 - fade;

	float angle		= atan( p.x, p.y )/6.2832;
	float dist		= length(p);
	vec3 coord		= vec3( angle, dist, time * 0.1 );

	float newTime1	= abs( snoise( coord + vec3( 0.0, -time * ( 0.35 + brightness * 0.001 ), time * 0.015 ), 15.0 ) );
	float newTime2	= abs( snoise( coord + vec3( 0.0, -time * ( 0.15 + brightness * 0.001 ), time * 0.015 ), 45.0 ) );
	for( int i=1; i<=7; i++ ){
		float power = pow( 2.0, float(i + 1) );
		fVal1 += ( 0.5 / power ) * snoise( coord + vec3( 0.0, -time, time * 0.2 ), ( power * ( 10.0 ) * ( newTime1 + 1.0 ) ) );
		fVal2 += ( 0.5 / power ) * snoise( coord + vec3( 0.0, -time, time * 0.2 ), ( power * ( 25.0 ) * ( newTime2 + 1.0 ) ) );
	}

	float corona		= pow( fVal1 * max( 1.1 - fade, 0.0 ), 2.0 ) * 50.0;
	corona				+= pow( fVal2 * max( 1.1 - fade, 0.0 ), 2.0 ) * 50.0;
	corona				*= 1.2 - newTime1;
	vec3 sphereNormal 	= vec3( 0.0, 0.0, 1.0 );
	vec3 dir 			= vec3( 0.0 );
	vec3 center			= vec3( 0.5, 0.5, 1.0 );
	vec3 starSphere		= vec3( 0.0 );

	vec2 sp = -1.0 + 2.0 * uv;
	sp.x *= aspect;
	sp *= ( 2.0 - brightness );
  	float r = dot(sp,sp);
	float f = (1.0-sqrt(abs(1.0-r)))/(r) + brightness * 0.5;
	if( dist < radius ){
		corona			*= pow( dist * invRadius, 24.0 );
  		vec2 newUv;
 		newUv.x = sp.x*f;
  		newUv.y = sp.y*f;
		newUv += vec2( time, 0.0 );

		vec3 texSample 	= texture( iChannel0, newUv ).rgb;
		float uOff		= ( texSample.g * brightness * 4.5 + time );
		vec2 starUV		= newUv + vec2( uOff, 0.0 );
		starSphere		= texture( iChannel0, starUV ).rgb;
	}

	float starGlow	= min( max( 1.0 - dist * ( 1.0 - brightness ), 0.0 ), 1.0 );
	//gl_FragColor.rgb	= vec3( r );
	gl_FragColor.rgb	= vec3( f * ( 0.75 + brightness * 0.3 ) * orange ) + starSphere + corona * orange + starGlow * orangeRed;
	gl_FragColor.a		= 1.0;
}
`,ye=J({__name:"6.shadertoy3",setup(le){const e={width:window.innerWidth,height:window.innerHeight},r=new V,i=new k(se,e.width/e.height,.1,1e4);i.position.set(0,0,100);const t=new F({antialias:!0});t.setSize(e.width,e.height),t.setPixelRatio(window.devicePixelRatio),K(()=>{var a;(a=v.value)==null||a.appendChild(t.domElement)});const v=O();function y(){const a=new q,s=new B(a),l="虔心悲切遥呼上师祈请文.mp3",n=new Audio(l);n.volume=10*.01,n.play(),s.setMediaElementSource(n);const p=128,m=new D(s,p),_=t.capabilities.isWebGL2?E:M,{width:C,height:R}=t.getDrawingBufferSize(new w),c=new P({uniforms:{iResolution:{value:new w(C,R)},iTime:{value:0},iChannel0:{value:new G().load("texture/iChannel.jpg",h=>{h.wrapS=x,h.wrapT=x})},iChannel1:{value:new W(m.data,p/2,1,_)}},vertexShader:ne,fragmentShader:re}),S=new A(10,10),z=new L(S,c);r.add(z);const{pause:T}=N(()=>{t.render(r,i),m.getFrequencyData(),c.uniforms.iTime.value+=.01,c.uniforms.iChannel1.value.needsUpdate=!0});return()=>{T(),n.pause(),s.stop()}}let d=X;const u=I(!0);function b(){d=y(),u.value=!1}return $(()=>{d(),j(r,t),t.info}),H("resize",()=>{e.width=window.innerWidth,e.height=window.innerHeight,i.aspect=e.width/e.height,i.updateProjectionMatrix(),t.setSize(e.width,e.height)}),(a,s)=>{const l=U;return f(),g(Z,null,[o("div",{ref_key:"containerRef",ref:v},null,512),u.value?(f(),Q(l,{key:0,class:"fixed left-1/2 top-1/2 -translate-1/2 !w-300px",type:"primary",size:"large",onClick:b},{default:Y(()=>[ee("播放")]),_:1})):(f(),g("div",te,ie))],64)}}});export{ye as default};
