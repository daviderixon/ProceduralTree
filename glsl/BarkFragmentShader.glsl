uniform float delta;
varying float noise;
varying vec3 N;
void main() {
    vec3 rgb = (0.5+noise)*vec3(0.625, 0.32, 0.175);
    gl_FragColor = vec4(rgb, 1.0);
}
