BG.object.child.method = {
    createTexture(size){
        const {w, h} = size
        const len = w * h
        const data = new Float32Array(len * 4)

        for(let j = 0; j < w; j++){
            const rand = Math.random() * 1000
            for(let i = 0; i < h; i++){
                const index = (i * w + j) * 4

                data[index] = h + rand - i
                data[index + 1] = 1.0
                data[index + 2] = 0.01
                data[index + 3] = 0
            }
        }

        return new THREE.DataTexture(data, w, h, THREE.RGBAFormat, THREE.FloatType)
    },
    fillTexture(texture){
        const {data, width, height} = texture.image

        for(let j = 0; j < width; j++){
            const rand = Math.random() * 1000
            for(let i = 0; i < height; i++){
                const index = (i * width + j) * 4

                // x === opacity
                data[index] = 0.4

                // y === opacity velocity
                data[index + 1] = 0.01

                data[index + 2] = 0
                data[index + 3] = 0
            }
        }
    },
    fillMapTexture(texture, size){
        const {data, width, height} = texture.image
        
        for(let j = 0; j < width; j++){
            for(let i = 0; i < height; i++){
                const index = (i * width + j) * 4

                // x === play time
                data[index] = 1000 + height - i

                // y === update old time
                data[index + 1] = 0

                // z === play
                data[index + 2] = 0
                data[index + 3] = 0
            }
        }
    }
}