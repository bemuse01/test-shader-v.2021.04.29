TEST.child.build = class{
    constructor(group){
        this.init()
        this.create()
        this.add(group)
    }
    
    
    init(){

    }


    add(group){
        group.add(this.mesh)
    }


    create(){
        const geometry = new THREE.PlaneGeometry(100, 100, 1, 1)
        const material = new THREE.MeshBasicMaterial()
        this.mesh = new THREE.Mesh(geometry, material)
    }
}