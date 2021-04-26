PIECE.element.outer.build = class{
    constructor(size){
        this.init(size)
        this.create()
    }


    // init
    init(size){
        this.param = new PIECE.element.outer.param()
        this.size = size
        this.play = true
    }


    // create
    create(){
        this.arr = []

        const radius = this.size / 2
        const degree = 360 / this.param.count

        for(let i = 0; i < this.param.count; i++){
            const deg = degree * i
            const x = Math.cos(deg * RADIAN) * radius 
            const y = Math.sin(deg * RADIAN) * radius
            
            this.arr.push({
                key: i,
                style: {
                    translate: {
                        transform: `translate(${x}px, ${y}px) rotate(${90 + deg}deg)`
                    },
                    none: {
                        opacity: '1',
                        transition: `opacity 0.3s ${i * 0.01}s`
                    }
                }
            })
        }
    }


    // resize
    resize(size){
        this.size = size

        this.create()
    }


    // animate
    animate(next){
        if(!this.play) return

        if(next){
            // this.show()
            this.play = false
        }
    }


    // show
    show(){
        this.arr.forEach(e => e.style.none.opacity = '1')
    }


    // get
    get(){
        return this.arr
    }
}