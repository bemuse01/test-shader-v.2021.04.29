OPENING.element.circle.build = class{
    constructor(size){
        this.init(size)
        this.create()
    }


    // init
    init(size){
        this.param = new OPENING.element.circle.param()
        this.size = size
    }


    // create
    create(){
        this.arr = []

        const degree = 360 / this.param.count
        const half = this.param.count / 2
        const delay = this.param.time / this.param.count
        
        for(let i = 0; i < this.param.count; i++){
            const deg = degree * i
            const radius = this.size / 2
            const x = Math.cos(deg * RADIAN) * radius 
            const y = Math.sin(deg * RADIAN) * radius 

            this.arr.push({
                key: i,
                param: {
                    deg: deg
                },
                style: {
                    translate: {
                        transform: `translate(${x}px, ${y}px)`
                    },
                    none: {
                        animation: `scale ${this.param.time}s ${i * delay}s linear infinite`
                    }
                    // animation: `fadein 2.0s ${i % half * 0.1}s linear infinite`
                    // animation: `scale 1.0s ${i * 0.05}s linear infinite`
                }
            })
        }
    }


    // resize
    resize(size){
        this.size = size

       this.create()
    }


    // get
    get(){
        return this.arr
    }
}