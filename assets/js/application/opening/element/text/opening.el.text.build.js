OPENING.element.text.build = class{
    constructor(circle){
        this.init(circle)
        this.create()
    }


    // init
    init(circle){
        this.loading = 0
        this.play = true
        this.circle = circle
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
    animate(){
        if(!this.play) return 

        if(this.loading >= 100) {
            this.after()
            return
        }

        this.loading += 0.8
        if(this.loading > 100) this.loading = 100

        let text = `${this.loading.toFixed(0)}%`, len = text.length
        for(let i = 0; i < 4 - len; i++) text = '0' + text

        this.arr[0].text = text
    }


    // after loading
    after(){
        this.play = false
        this.slide()
        this.circle.remove()
    }
    // slide
    slide(){
        const item = this.arr[0]
        item.show = false

        const first = this.arr.shift()
        this.arr[0].show = true

        this.arr.push(first)
    }


    // get
    get(){
        return this.arr
    }
}