BG.object.particle.method = {
    createAttribute(p, s){
        const {count, pSize, pOpacity} = p
        const {w, h} = s

        const position = new Float32Array(count * 3)
        const opacity = new Float32Array(count)
        const size = new Float32Array(count)

        for(let i = 0; i < count; i++){
            const index = i * 3;

            const x = Math.random() * w - w / 2
            const y = Math.random() * h - h / 2

            position[index] = x
            position[index + 1] = y
            position[index + 2] = 0

            opacity[i] = Math.random() * pOpacity
            
            size[i] = Math.random() * pSize + pSize
        }

        return {position, opacity, size}
    },
    createVelocity(param){
        const {count, vel} = param

        const velocity = []

        for(let i = 0; i < count; i++){
            velocity[i] = {x: Math.random() * vel - vel / 2, y: Math.random() * vel - vel / 2}
        }

        return velocity
    }
}