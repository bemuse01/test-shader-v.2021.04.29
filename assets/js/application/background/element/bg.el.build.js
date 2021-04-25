BG.element.build = class{
    constructor(){
        this.init()
        this.create()
    }


    // init
    init(){
        this.group = {
            cover: null
        }
    } 


    // create
    create(){
        this.createCover()
    }
    createCover(){
        this.group.cover = new BG.element.cover.build()
    }


    // animate
    animate({group}){
        const {next} = group.particle

        this.group.cover.animate(next)
    }
}