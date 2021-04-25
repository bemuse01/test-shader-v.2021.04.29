BG.element.cover.build = class{
    constructor(){
        this.init()
        this.create()
    }


    // init
    init(){
        this.play = true
        this.next = false
    }


    // creaet
    create(){
        this.style = {transform: 'scaleY(1.0)', transition: 'transform 1.2s cubic-bezier(.16,1,.39,1)'}
    }


    // animate
    animate(next){
        if(!this.play) return

        if(next){
            this.style.transform = 'scaleY(0)'
            this.after()
            this.play = false
        }
    }


    // after
    after(){
        const delay = 1200

        setTimeout(() => this.next = true, delay)
    }


    // get
    get(){
        return this.style
    }
}