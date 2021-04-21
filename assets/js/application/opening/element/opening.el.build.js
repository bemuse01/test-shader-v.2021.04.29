OPENING.element.build = class{
    constructor(){
        this.init()
        this.create()
    }


    // init
    init(){
        const element = document.querySelector('.opening')
        this.size = element.getBoundingClientRect().width
        
        this.group = {
            circle: null,
            text: null
        }
    }


    // create
    create(){
        this.createCircle()
        this.createText()
    }
    createCircle(){
        this.group.circle = new OPENING.element.circle.build(this.size)
    }
    createText(){
        this.group.text = new OPENING.element.text.build(this.group.circle)
    }



    // resize
    resize(){
        const element = document.querySelector('.opening')
        this.size = element.getBoundingClientRect().width

        for(let i in this.group) {
            if(!this.group[i].resize) continue
            this.group[i].resize(this.size)
        }
    }


    // animate
    animate(){
        for(let i in this.group) {
            if(!this.group[i].animate) continue
            this.group[i].animate()
        }
    }
}