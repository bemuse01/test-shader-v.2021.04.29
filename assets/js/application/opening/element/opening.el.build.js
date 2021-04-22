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
            text: null,
            particle: null
        }
    }


    // create
    create(){
        this.createCircle()
        this.createText()
        this.createParticle()
    }
    createCircle(){
        this.group.circle = new OPENING.element.circle.build(this.size)
    }
    createText(){
        this.group.text = new OPENING.element.text.build()
    }
    createParticle(){
        this.group.particle = new OPENING.element.particle.build(this.size)
    }


    // resize
    resize(){
        const element = document.querySelector('.opening')
        this.size = element.getBoundingClientRect().width

        for(let i in this.group) {
            if(!this.group[i] || !this.group[i].resize) continue
            this.group[i].resize(this.size)
        }
    }


    // animate
    animate(){
        for(let i in this.group) {
            if(!this.group[i] || !this.group[i].animate) continue
            this.group[i].animate(this.group)
        }
    }
}