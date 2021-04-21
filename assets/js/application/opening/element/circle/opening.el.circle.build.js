OPENING.element.circle.build = class{
    constructor(size){
        this.init(size)
        this.create()
    }


    // init
    init(size){
        this.param = new OPENING.element.circle.param()
        this.size = size
        this.index = 0
        this.play = true
    }


    // create
    create(){
        this.arr = []

        const degree = 360 / this.param.count
        // const delay = this.param.time / this.param.count
        
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
                        // animation: `scale ${this.param.time}s ${i * delay}s linear infinite`
                        transform: 'scale(1.0)',
                        transition: 'none'
                    }
                }
            })
        }
    }


    // remove animation
    remove(){
        // don't use foreach or for(index) to modify array in vue
        this.play = false
        this.arr.forEach(e => {
            e.style.none.transform = 'scale(1.0)'
            e.style.none.transition = '0.5s'
        })
    }


    // resize
    resize(size){
        this.size = size

       this.create()
    }


    // animate
    animate(){
        if(!this.play) return

        this.index = (this.index + 0.6) % this.param.count
        const index = parseInt(this.index)


        // don't use foreach or for(index) to modify array in vue
        this.arr.forEach((e, i) => {
            if(i === index) {
                e.style.none.transform = 'scale(3.0)'
                e.style.none.transition = 'none'
            }else{
                e.style.none.transform = 'scale(1.0)'
                e.style.none.transition = '1.0s'
            }
        })
    }


    // get
    get(){
        return this.arr
    }
}