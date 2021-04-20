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
            circle: null
        }
    }


    // create
    create(){
        this.createCircle()
    }
    createCircle(){
        this.group.circle = new OPENING.element.circle.build(this.size)
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
}