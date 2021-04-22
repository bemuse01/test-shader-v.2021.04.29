OPENING.element.text.build = class{
    constructor(){
        this.init()
        this.create()
    }


    // init
    init(){
        this.param = new OPENING.element.text.param()
        this.loading = 0
        this.play = true
        this.container = true
        this.next = false
    }


    // create
    create(){
        this.arr = [
            {
                key: 0,
                text: '0%',
                show: true,
                style: {
                    fontSize: '4.5vmin'
                }
            },
            {
                key: 1,
                text: 'COMPLETE',
                show: false,
                style: {
                    fontSize: '3.5vmin',
                }
            }
        ]
    }


    // animate
    animate({circle}){
        if(!this.play) return 

        if(this.loading >= 100) {
            this.after(circle)
            return
        }

        this.loading += this.param.step
        if(this.loading > 100) this.loading = 100

        let text = `${this.loading.toFixed(0)}%`, len = text.length
        for(let i = 0; i < 4 - len; i++) text = '0' + text

        this.arr[0].text = text
    }


    // after loading
    after(circle){
        this.play = false
        circle.stop()
        this.slide()
        setTimeout(() => this.next = true, this.param.next)
    }
    // slide
    slide(){
        const item = this.arr[0]
        item.show = false

        const first = this.arr.shift()
        this.arr[0].show = true

        this.arr.push(first)
    }


    // destroy
    destroy(){
        this.container = false
    } 


    // get
    get(){
        return this.arr
    }
}