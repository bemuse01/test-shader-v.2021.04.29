PIECE.element.build = class{
    constructor(){
        this.init()
        this.create()
    }


    // init
    init(){
        const element = document.querySelector('.piece')
        this.size = element.getBoundingClientRect().width

        this.group = {
            outer: null
        }
    }


    // create
    create(){
        this.createOuter()
    }
    createOuter(){
        this.group.outer = new PIECE.element.outer.build(this.size)
    }


    // resize
    resize(){
        const element = document.querySelector('.piece')
        this.size = element.getBoundingClientRect().width

        for(let i in this.group) {
            if(!this.group[i] || !this.group[i].resize) continue
            this.group[i].resize(next)
        }
    }


    // animate
    animate({logo}){
        const {next} = logo.group.text

        for(let i in this.group) {
            if(!this.group[i] || !this.group[i].animate) continue
            this.group[i].animate(next)
        }
    }
}