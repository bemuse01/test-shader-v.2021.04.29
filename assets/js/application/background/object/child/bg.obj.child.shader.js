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
            uniform sampler2D u_delay;
            varying vec2 v_uv;

            void main(){
                vec4 bg = texture(u_bg, v_uv);
                vec4 delay = texture(u_delay, v_uv);
                
                gl_FragColor = vec4(bg.rgb, delay.x);
            }
        `
    },
    delay: {
        fragment: `
            uniform float currentTime;
            uniform float oMin;
            uniform float oMax;

            void main(){
                ivec2 xy = ivec2(gl_FragCoord.xy);

                vec4 d = texelFetch(delay, xy, 0);
                vec4 m = texelFetch(map, xy, 0);
                
                if(m.x < currentTime - m.y && m.z == 1.0) d.x = oMax;

                d.x = clamp(d.x - d.y, oMin, oMax);

                gl_FragColor = d;
            }
        `
    },
    map: {
        fragment: `
            uniform int rand;
            uniform float oldTime;
            uniform float currentTime;
            uniform bool play;

            void main(){
                ivec2 xy = ivec2(gl_FragCoord.xy);

                vec4 m = texelFetch(map, xy, 0);

                if(rand == xy.x && play == true){
                    m.y = oldTime;
                    m.z = 1.0;
                }

                if(m.x < currentTime - m.y && m.z == 1.0) m.z = 0.0;

                gl_FragColor = m;
            }
        `
    }
}