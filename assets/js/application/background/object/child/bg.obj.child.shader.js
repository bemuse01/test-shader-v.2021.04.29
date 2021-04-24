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
            uniform float rand;
            uniform int rand2;
            uniform float currentTime;

            void main(){
                ivec2 xy = ivec2(gl_FragCoord.xy);

                vec4 d = texelFetch(delay, xy, 0);
                vec4 m = texelFetch(map, xy, 0);

                // if(xy.x == rand2) d.x = 1.0;
                
                if(m.x < currentTime - m.y && m.z == 1.0) d.x = 1.0;

                d.x = clamp(d.x - d.y, 0.4, 1.0);

                gl_FragColor = d;
            }
        `
    },
    map: {
        fragment: `
            uniform float rand;
            uniform int rand2;
            uniform float currentTime;
            uniform float oldTime;
            uniform int width;
            uniform int height;

            void main(){
                ivec2 xy = ivec2(gl_FragCoord.xy);

                vec4 m = texelFetch(map, xy, 0);

                // if(rand2 == xy.x || rand2 == xy.x - 1){
                if(rand2 == xy.x){
                    m.y = oldTime;
                    m.z = 1.0;
                }

                if(m.x < currentTime - m.y && m.z == 1.0) m.z = 0.0;

                gl_FragColor = m;
            }
        `
    }
}



// make to play
// if(rand2 > 0.975) d.z = 1.0;

// float dist = distance(uv.x, rand);
// if(dist < pixel.x * 0.2 && uv.y >= 1.0 - pixel.y) d.w = 1.0;