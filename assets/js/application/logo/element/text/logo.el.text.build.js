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
                    transition: `0.3s ${i * 0.06}s`
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
            this.play = false
        }
    }


    // get
    get(){
        return this.arr
    }
}