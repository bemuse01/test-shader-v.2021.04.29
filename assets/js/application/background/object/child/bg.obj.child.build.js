BG.object.child.build = class{
    constructor(group, size){
        this.init(size)
        this.create()
        this.add(group)
    }


    // init
    init(size){
        this.param = new BG.object.child.param()
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
        this.mesh = new THREE.Mesh(geometry, material)
    }
    createGeometry(){
        return new THREE.PlaneGeometry(this.size.obj.w, this.size.obj.h, this.param.seg, this.param.seg)
    }
    createMaterial(){
        const texture = new THREE.TextureLoader().load('assets/src/bg.png')

        return new THREE.ShaderMaterial({
            vertexShader: BG.object.child.shader.draw.vertex,
            fragmentShader: BG.object.child.shader.draw.fragment,
            transparent: true,
            uniforms: {
                u_color: {value: new THREE.Color(this.param.color)},
                u_bg: {value: texture}
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

    }
}