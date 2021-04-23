BG.object.child.shader = {
    draw: {
        vertex: `
            varying vec2 v_uv;

            void main(){
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

                v_uv = uv;
            }
        `,
        fragment: `
            uniform vec3 u_color;
            uniform sampler2D u_bg;
            varying vec2 v_uv;

            void main(){
                vec4 bg = texture(u_bg, v_uv);

                // gl_FragColor = vec4(bg.rgb, 1.0);
                gl_FragColor = vec4(u_color, 1.0);
            }
        `
    }
}