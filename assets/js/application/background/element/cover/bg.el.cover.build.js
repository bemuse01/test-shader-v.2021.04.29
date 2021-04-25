BG.element.cover.build = class{
    constructor(){
        this.init()
        this.create()
    }


    // init
    init(){
        this.play = true
    }


    // creaet
    create(){
        this.style = {opacity: '1'}
    }


    // animate
    animate(next){
        if(!this.play) return

        if(next){
            this.style.opacity = '0'
            this.play = false
        }
    }


    // get
    get(){
        return this.style
    }
}