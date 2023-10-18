import{i}from"./index-1a26f821.js";import{d as r,s,m as c,l as _,o as l,c as d}from"./index-2c776554.js";var h=`void main() {
    gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
    gl_PointSize = 500.0;
}`,g=`precision mediump float;
uniform vec2 u_CanvasSize;
void main() {
    gl_FragColor = vec4(gl_FragCoord.x / u_CanvasSize.x, gl_FragCoord.y / u_CanvasSize.y, 0.8, 1.0);
}`;const m=["width","height"],C=r({__name:"1.渐变画布",setup(u){const n=s();let a;const e=c({width:500,height:500});return _(()=>{a=n.value.getContext("webgl");const o=i(a,h,g),t=a.getUniformLocation(o,"u_CanvasSize");a.uniform2f(t,e.width,e.height),a.clearColor(.5,0,1,1),a.clear(a.COLOR_BUFFER_BIT),a.drawArrays(a.POINTS,0,1)}),(o,t)=>(l(),d("canvas",{ref_key:"canvasRef",ref:n,width:e.width,height:e.height,class:"m-auto"},null,8,m))}});export{C as default};
