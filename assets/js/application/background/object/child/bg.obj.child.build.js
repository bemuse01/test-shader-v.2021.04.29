BG.object.child.build = class{
    constructor(group, size, renderer){
        this.init(size, renderer)
        this.create()
        this.add(group)
    }


    // init
    init(size, renderer){
        this.param = new BG.object.child.param()
        this.size = size
        this.oldTime = window.performance.now()
        this.renderer = renderer

        this.initTexture()
    }
    initTexture(){
        this.gpuCompute = new THREE.GPUComputationRenderer(this.size.el.w, this.size.el.h, this.renderer)

        const delay = this.gpuCompute.createTexture()
        const map = this.gpuCompute.createTexture()

        BG.object.child.method.fillTexture(delay, this.size.obj)
        BG.object.child.method.fillMapTexture(map, this.size.obj)

        this.delayVariable = this.gpuCompute.addVariable('delay', BG.object.child.shader.delay.fragment, delay)
        this.mapVariable = this.gpuCompute.addVariable('map', BG.object.child.shader.map.fragment, map)

        this.gpuCompute.setVariableDependencies(this.delayVariable, [this.delayVariable, this.mapVariable])
        this.gpuCompute.setVariableDependencies(this.mapVariable, [this.mapVariable])

        this.delayUniforms = this.delayVariable.material.uniforms
        this.mapUniforms = this.mapVariable.material.uniforms

        this.delayUniforms['rand'] = {value: 0.0}
        this.delayUniforms['rand2'] = {value: 0.0}
        this.delayUniforms['currentTime'] = {value: 0.0}

        this.mapUniforms['rand'] = {value: 0.0}
        this.mapUniforms['rand2'] = {value: 0.0}
        this.mapUniforms['oldTime'] = {value: 0.0}
        this.mapUniforms['currentTime'] = {value: 0.0}
        this.mapUniforms['width'] = {value: this.size.el.w}
        this.mapUniforms['height'] = {value: this.size.el.h}

        this.gpuCompute.init()
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
        this.mesh = new THREE.Mesh(geometry, material)
    }
    createGeometry(){
        return new THREE.PlaneGeometry(this.size.obj.w, this.size.obj.h, this.param.seg, this.param.seg)
    }
    createMaterial(){
        const texture = new THREE.TextureLoader().load('assets/src/bg.png')
        const delay = BG.object.child.method.createTexture(this.size.el)

        return new THREE.ShaderMaterial({
            vertexShader: BG.object.child.shader.draw.vertex,
            fragmentShader: BG.object.child.shader.draw.fragment,
            transparent: true,
            uniforms: {
                u_color: {value: new THREE.Color(this.param.color)},
                u_bg: {value: texture},
                u_delay: {value: null},
                time: {value: 0}
            }
        })
    }


    // resize
    resize(size){
        this.size = size

        this.mesh.geometry.dispose()
        this.mesh.geometry = this.createGeometry()
    }


    // animate
    animate(){
        const currentTime = window.performance.now()
        
        // this.mesh.material.uniforms['time'].value = 

        this.gpuCompute.compute()

        this.delayUniforms['rand'].value = Math.random()
        this.delayUniforms['rand2'].value = Math.floor(Math.random() * this.size.el.w)
        this.delayUniforms['currentTime'].value = currentTime

        this.mapUniforms['rand'].value = Math.random()
        this.mapUniforms['rand2'].value = Math.floor(Math.random() * this.size.el.w)
        this.mapUniforms['oldTime'].value = currentTime
        this.mapUniforms['currentTime'].value = currentTime

        this.mesh.material.uniforms['u_delay'].value = this.gpuCompute.getCurrentRenderTarget(this.delayVariable).texture
    }
}