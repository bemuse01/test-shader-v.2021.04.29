LOGO.element.build = class{
    constructor(){
        this.init()
        this.create()
    }


    // init
    init(){
        const element = document.querySelector('.logo')
        this.size = element.getBoundingClientRect().width
        
        this.group = {
            text: null
        }
    }


    // create
    create(){
        this.createText()
    }
    createText(){
        this.group.text = new LOGO.element.text.build()
    }


    // resize
    resize(){
        const element = document.querySelector('.logo')
        this.size = element.getBoundingClientRect().width

        for(let i in this.group){
            if(!this.group[i] || !this.group[i].resize) continue
            this.group[i].resize(this.size)
        }
    }


    // animate
    animate({group}){
        const {next} = group.particle

        for(let i in this.group){
            if(!this.group[i] || !this.group[i].animate) continue
            this.group[i].animate(next)
        }
    }
}