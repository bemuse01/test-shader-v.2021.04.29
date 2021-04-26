BG.object.particle.shader = {
    draw: {
        vertex: `
            attribute float opacity;
            attribute float size;

            varying vec2 v_uv;
            varying float v_opacity;

            void main(){
                v_uv = uv;
                v_opacity = opacity;

                gl_PointSize = size;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
        `,
        fragment: `
            uniform sampler2D u_map;

            varying vec2 v_uv;
            varying float v_opacity;

            void main(){
                vec2 uv = vec2(gl_PointCoord.x, 1.0 - gl_PointCoord.y);
                
                vec4 map = texture(u_map, uv);

                map.a *= v_opacity;

                gl_FragColor = map;
            }
        `
    }
}