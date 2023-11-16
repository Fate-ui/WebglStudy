import{S as m,P as p,W as w,K as l,N as g,D as b,b as x,f as u}from"./three.module-4d045381.js";import{a as O,u as M}from"./index-5e038ddf.js";import{d as y}from"./index-1a26f821.js";import{d as S,l as T,s as R,p as _,o as C,c as H,h as a,F as P}from"./index-b6882ffc.js";const z=a("div",{class:"fixed left-20px top-20px px-20px leading-50px z-1 bg-white rounded"},[a("span",null,"学习来源："),a("a",{href:"https://www.shadertoy.com/view/4s2SRt",target:"_blank",class:"text-blue"},"shadertoy：Oblivion radar ")],-1),d=45,k=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,I=`
  varying vec2 vUv;
  uniform vec3      iResolution;           // viewport resolution (in pixels)
  uniform float     iTime;                 // shader playback time (in seconds)
  //Sci-fi radar based on the work of gmunk for Oblivion
  //http://work.gmunk.com/OBLIVION-GFX

  #define SMOOTH(r,R) (1.0-smoothstep(R-1.0,R+1.0, r))
  #define RANGE(a,b,x) ( step(a,x)*(1.0-step(b,x)) )
  #define RS(a,b,x) ( smoothstep(a-1.0,a+1.0,x)*(1.0-smoothstep(b-1.0,b+1.0,x)) )
  #define M_PI 3.1415926535897932384626433832795

  #define blue1 vec3(0.74,0.95,1.00)
  #define blue2 vec3(0.87,0.98,1.00)
  #define blue3 vec3(0.35,0.76,0.83)
  #define blue4 vec3(0.953,0.969,0.89)
  #define red   vec3(1.00,0.38,0.227)

  #define MOV(a,b,c,d,t) (vec2(a*cos(t)+b*cos(0.1*(t)), c*sin(t)+d*cos(0.1*(t))))

  float movingLine(vec2 uv, vec2 center, float radius)
  {
      //angle of the line
      float theta0 = 90.0 * iTime;
      vec2 d = uv - center;
      float r = sqrt( dot( d, d ) );
      if(r<radius)
      {
          //compute the distance to the line theta=theta0
          vec2 p = radius*vec2(cos(theta0*M_PI/180.0),
                              -sin(theta0*M_PI/180.0));
          float l = length( d - p*clamp( dot(d,p)/dot(p,p), 0.0, 1.0) );
        d = normalize(d);
          //compute gradient based on angle difference to theta0
        float theta = mod(180.0*atan(d.y,d.x)/M_PI+theta0,360.0);
          float gradient = clamp(1.0-theta/90.0,0.0,1.0);
          return SMOOTH(l,1.0)+0.5*gradient;
      }
      else return 0.0;
  }

  float circle(vec2 uv, vec2 center, float radius, float width)
  {
      float r = length(uv - center);
      return SMOOTH(r-width/2.0,radius)-SMOOTH(r+width/2.0,radius);
  }

  float circle2(vec2 uv, vec2 center, float radius, float width, float opening)
  {
      vec2 d = uv - center;
      float r = sqrt( dot( d, d ) );
      d = normalize(d);
      if( abs(d.y) > opening )
        return SMOOTH(r-width/2.0,radius)-SMOOTH(r+width/2.0,radius);
      else
          return 0.0;
  }
  float circle3(vec2 uv, vec2 center, float radius, float width)
  {
      vec2 d = uv - center;
      float r = sqrt( dot( d, d ) );
      d = normalize(d);
      float theta = 180.0*(atan(d.y,d.x)/M_PI);
      return smoothstep(2.0, 2.1, abs(mod(theta+2.0,45.0)-2.0)) *
          mix( 0.5, 1.0, step(45.0, abs(mod(theta, 180.0)-90.0)) ) *
          (SMOOTH(r-width/2.0,radius)-SMOOTH(r+width/2.0,radius));
  }

  float triangles(vec2 uv, vec2 center, float radius)
  {
      vec2 d = uv - center;
      return RS(-8.0, 0.0, d.x-radius) * (1.0-smoothstep( 7.0+d.x-radius,9.0+d.x-radius, abs(d.y)))
           + RS( 0.0, 8.0, d.x+radius) * (1.0-smoothstep( 7.0-d.x-radius,9.0-d.x-radius, abs(d.y)))
           + RS(-8.0, 0.0, d.y-radius) * (1.0-smoothstep( 7.0+d.y-radius,9.0+d.y-radius, abs(d.x)))
           + RS( 0.0, 8.0, d.y+radius) * (1.0-smoothstep( 7.0-d.y-radius,9.0-d.y-radius, abs(d.x)));
  }

  float _cross(vec2 uv, vec2 center, float radius)
  {
      vec2 d = uv - center;
      int x = int(d.x);
      int y = int(d.y);
      float r = sqrt( dot( d, d ) );
      if( (r<radius) && ( (x==y) || (x==-y) ) )
          return 1.0;
      else return 0.0;
  }
  float dots(vec2 uv, vec2 center, float radius)
  {
      vec2 d = uv - center;
      float r = sqrt( dot( d, d ) );
      if( r <= 2.5 )
          return 1.0;
      if( ( r<= radius) && ( (abs(d.y+0.5)<=1.0) && ( mod(d.x+1.0, 50.0) < 2.0 ) ) )
          return 1.0;
      else if ( (abs(d.y+0.5)<=1.0) && ( r >= 50.0 ) && ( r < 115.0 ) )
          return 0.5;
      else
        return 0.0;
  }
  float bip1(vec2 uv, vec2 center)
  {
      return SMOOTH(length(uv - center),3.0);
  }
  float bip2(vec2 uv, vec2 center)
  {
    float r = length(uv - center);
    float R = 8.0+mod(87.0*iTime, 80.0);
    return (0.5-0.5*cos(30.0*iTime)) * SMOOTH(r,5.0)
        + SMOOTH(6.0,r)-SMOOTH(8.0,r)
        + smoothstep(max(8.0,R-20.0),R,r)-SMOOTH(R,r);
  }
  void main()
  {
    vec3 finalColor;
    vec2 uv = gl_FragCoord.xy;
    //center of the image
    vec2 c = iResolution.xy/2.0;
    finalColor = vec3( 0.3*_cross(uv, c, 240.0) );
    finalColor += ( circle(uv, c, 100.0, 1.0)
                  + circle(uv, c, 165.0, 1.0) ) * blue1;
    finalColor += (circle(uv, c, 240.0, 2.0) );//+ dots(uv,c,240.0)) * blue4;
    finalColor += circle3(uv, c, 313.0, 4.0) * blue1;
    finalColor += triangles(uv, c, 315.0 + 30.0*sin(iTime)) * blue2;
    finalColor += movingLine(uv, c, 240.0) * blue3;
    finalColor += circle(uv, c, 10.0, 1.0) * blue3;
    finalColor += 0.7 * circle2(uv, c, 262.0, 1.0, 0.5+0.2*cos(iTime)) * blue3;
    if( length(uv-c) < 240.0 )
    {
        //animate some bips with random movements
    	vec2 p = 130.0*MOV(1.3,1.0,1.0,1.4,3.0+0.1*iTime);
   		finalColor += bip1(uv, c+p) * vec3(1,1,1);
        p = 130.0*MOV(0.9,-1.1,1.7,0.8,-2.0+sin(0.1*iTime)+0.15*iTime);
        finalColor += bip1(uv, c+p) * vec3(1,1,1);
        p = 50.0*MOV(1.54,1.7,1.37,1.8,sin(0.1*iTime+7.0)+0.2*iTime);
        finalColor += bip2(uv,c+p) * red;
    }

    gl_FragColor = vec4( finalColor, 1.0 );
  }
`,G=S({__name:"5.shadertoy2",setup(V){const e={width:window.innerWidth,height:window.innerHeight},o=new m,i=new p(d,e.width/e.height,.1,1e4),v=e.height/2/Math.tan(d*Math.PI/360);i.position.set(0,0,v);const t=new w({antialias:!0});t.setSize(e.width,e.height),t.setPixelRatio(window.devicePixelRatio),T(()=>{var r;(r=s.value)==null||r.appendChild(t.domElement)});const s=R(),{width:h,height:f}=t.getDrawingBufferSize(new l),c=new g({vertexShader:k,fragmentShader:I,transparent:!0,side:b,uniforms:{iResolution:{value:new l(h,f)},iTime:{value:0}}}),n=new x(new u(e.width,e.height),c);return o.add(n),O(()=>{t.render(o,i),c.uniforms.iTime.value+=.01}),_(()=>{y(o,t)}),M("resize",()=>{e.width=window.innerWidth,e.height=window.innerHeight,i.aspect=e.width/e.height;const r=e.height/2/Math.tan(d*Math.PI/360);i.position.set(0,0,r),i.updateProjectionMatrix(),n.geometry.dispose(),n.geometry=new u(e.width,e.height),t.setSize(e.width,e.height)}),(r,F)=>(C(),H(P,null,[a("div",{ref_key:"containerRef",ref:s},null,512),z],64))}});export{G as default};
