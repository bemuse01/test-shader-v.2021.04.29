LOGO.element.text.build = class{
    constructor(){
        this.init()
        this.create()
    }


    // init
    init(){
        this.param = new LOGO.element.text.param()
        this.play = true
        this.next = false
    }


    // create
    create(){
        this.arr = []

        this.param.text.forEach((e, i) => {
            this.arr.push({
                key: i,
                text: e,
                style: {
                    opacity: '0',
                    // transform: 'translate(75%, 0)',
                    transition: `opacity 0.3s ${i * 0.05}s`
                }
            })
        })
    }


    // animate
    animate(next){
        if(!this.play) return

        if(next){
            this.arr.forEach(e => {
                e.style.opacity = '1'
                // e.style.transform = 'translate(0, 0)'
            })
            this.after()
            this.play = false
        }
    }


    // after
    after(){
        const delay = this.arr.length * 50 + 300 + 500

        setTimeout(e => this.next = true, delay)
    }


    // get
    get(){
        return this.arr
    }
}