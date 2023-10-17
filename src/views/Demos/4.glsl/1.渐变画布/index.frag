precision mediump float;
uniform vec2 u_CanvasSize;
void main() {
    gl_FragColor = vec4(gl_FragCoord.x / u_CanvasSize.x, gl_FragCoord.y / u_CanvasSize.y, 0.8, 1.0);
}
