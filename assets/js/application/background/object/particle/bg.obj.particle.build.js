BG.object.particle.build = class{
    constructor(group, size){
        this.init(size)
        this.create()
        this.add(group)
    }


    // init
    init(size){
        this.param = new BG.object.particle.param()
        this.size = size
    }


    // add
    add(group){
        group.add(this.mesh)
    }


    // create
    create(){
        this.createMesh()
    }
    createMesh(){
        const geometry = this.createGeometry()
        const material = this.createMaterial()
        this.mesh = new THREE.Points(geometry, material)    
    }
    createGeometry(){
        const geometry = new THREE.BufferGeometry()

        const {position, opacity, size} = BG.object.particle.method.createAttribute(this.param, this.size.obj)

        geometry.setAttribute('position', new THREE.BufferAttribute(position, 3))
        geometry.setAttribute('opacity', new THREE.BufferAttribute(opacity, 1))
        geometry.setAttribute('size', new THREE.BufferAttribute(size, 1))

        geometry.velocity = BG.object.particle.method.createVelocity(this.param)
        geometry.size = size

        return geometry
    }
    createMaterial(){
        const texture = new THREE.TextureLoader().load('assets/src/particle.png') 

        return new THREE.ShaderMaterial({
            vertexShader: BG.object.particle.shader.draw.vertex,
            fragmentShader: BG.object.particle.shader.draw.fragment,
            transparent: true,
            blending: THREE.AdditiveBlending,
            uniforms: {
                u_map: {value: texture}
            }
        })
    }


    // resize
    resize(size){
        this.size = size
    }


    // animate
    animate(){
        const velocty = this.mesh.geometry.velocity
        const size = this.mesh.geometry.size
        const position = this.mesh.geometry.attributes.position
        const array = position.array

        const {w, h} = this.size.obj

        const hw = w / 2
        const hh = h / 2

        for(let i = 0; i < this.param.count; i++){
            const index = i * 3
            const s = size[i]
            const {x, y} = velocty[i]
            
            array[index] += x
            array[index + 1] += y

            if(array[index] > hw + s) array[index] = -(hw + s)
            else if(array[index] < -(hw + s)) array[index] = hw + s
            
            if(array[index + 1] > hh + s) array[index + 1] = -(hh + s)
            else if(array[index + 1] < -(hh + s)) array[index + 1] = hh + s
        }

        position.needsUpdate = true
    }
}