BG.object.child.build = class{
    constructor(group, size, renderer){
        this.init(size, renderer)
        this.create(group)
    }


    // init
    init(size, renderer){
        this.param = new BG.object.child.param()
        this.size = size
        this.oldTime = window.performance.now()
        this.renderer = renderer
        this.src = 'assets/src/bg.png'

        this.initTexture()
    }
    initTexture(){
        const width = Math.floor(this.size.el.w / 2)
        const height = Math.floor(this.size.el.h / 2)

        this.gpuCompute = new THREE.GPUComputationRenderer(width, height, this.renderer)
        // this.gpuCompute = new THREE.GPUComputationRenderer(this.size.el.w, this.size.el.h, this.renderer)

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

        this.delayUniforms['currentTime'] = {value: 0.0}
        this.delayUniforms['oMin'] = {value: this.param.opacity.min}
        this.delayUniforms['oMax'] = {value: this.param.opacity.max}

        this.mapUniforms['rand'] = {value: 0.0}
        this.mapUniforms['oldTime'] = {value: 0.0}
        this.mapUniforms['currentTime'] = {value: 0.0}
        this.mapUniforms['play'] = {value: false}

        this.gpuCompute.init()
    }


    // add
    add(group){
        group.add(this.mesh)
    }


    // create
    create(group){
        this.createMesh(group)
    }
    createMesh(group){
        const img = new Image()
        img.src = this.src

        img.onload = () => {
            const canvas = BG.object.child.method.createTextureFromCanvas(img, this.size.el)
            const texture = new THREE.CanvasTexture(canvas)

            const geometry = this.createGeometry()
            const material = this.createMaterial(texture)
            this.mesh = new THREE.Mesh(geometry, material)

            this.add(group)
        }
    }
    createGeometry(){
        return new THREE.PlaneGeometry(this.size.obj.w, this.size.obj.h, this.param.seg, this.param.seg)
    }
    createMaterial(texture){
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

        this.resizeTexture()
    }
    resizeTexture(){
        const img = new Image()
        img.src = this.src

        img.onload = () => {
            const canvas = BG.object.child.method.createTextureFromCanvas(img, this.size.el)
            const texture = new THREE.CanvasTexture(canvas)

            this.mesh.material.uniforms['u_bg'].value = texture

            this.initTexture()
        }
    }


    // animate
    animate(next){
        if(!this.mesh) return

        const currentTime = window.performance.now()

        this.gpuCompute.compute()

        this.delayUniforms['currentTime'].value = currentTime

        this.mapUniforms['rand'].value = Math.floor(Math.random() * this.size.el.w)
        this.mapUniforms['oldTime'].value = currentTime
        this.mapUniforms['currentTime'].value = currentTime
        this.mapUniforms['play'].value = next

        this.mesh.material.uniforms['u_delay'].value = this.gpuCompute.getCurrentRenderTarget(this.delayVariable).texture
    }
}