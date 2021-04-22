OPENING.element.particle.build = class{
    constructor(size){
        this.init(size)
        this.create()
        this.createTween()
    }


    // init
    init(size){
        this.param = new OPENING.element.particle.param()
        this.size = size
        this.container = true
        this.play = true
        this.tw = []
        this.next = false
        this.staticSize = size
    }


    // create
    create(){
        this.arr = []

        for(let i = 0; i < this.param.count; i++){
            const deg = Math.random() * 360
            const radius = Math.random() * this.size / 2
            const x = Math.cos(deg * RADIAN) * radius
            const y = Math.sin(deg * RADIAN) * radius
            const rotate = Math.random() * 360
            const scale = Math.random() * 0.5 + 0.5
            const img = Math.random() > 0.5 ? 'particle_0.png' : 'particle_1.png' 

            this.arr.push({
                key: i,
                param: {
                    deg: deg,
                    rotate: rotate,
                    radius: radius,
                    x: x,
                    y: y
                },
                style: {
                    translate: {
                        transform: `translate(${x}px, ${y}px)`
                    },
                    rotate: {
                        transform: `rotate(${rotate}deg)`
                    },
                    none: {
                        transform: `scale(${scale})`,
                        background: `url('assets/src/${img}') no-repeat center center / cover`,
                        opacity: '0'
                    }
                }
            })
        }
    }


    // create tween
    createTween(){
        const easing = BezierEasing(...this.param.easing)

        this.arr.forEach((e, i) => {
            const {x, y, deg, rotate, radius} = e.param
            const rand = Math.random() * 1 + 1.5
            const nx = Math.cos(deg * RADIAN) * radius * rand
            const ny = Math.sin(deg * RADIAN) * radius * rand

            const start = {
                opacity: 0,
                x: x,
                y: y,
                rot: rotate
            }
            const end = {
                opacity: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.8, 0.6, 0.4, 0.2, 0],
                x: nx,
                y: ny,
                rot: rotate + 360
            }

            this.tw[i] = new TWEEN.Tween(start)
            .to(end, 2500)
            .easing(easing)
            .onUpdate(() => this.updateTween(i, start))
            .onComplete(() => this.completeTween(i))
        })
    }
    updateTween(i, {x, y, rot, opacity}){
        // don't use foreach or for(index) to modify array in vue
        const translate = this.arr[i].style.translate
        const rotate = this.arr[i].style.rotate
        const none = this.arr[i].style.none

        translate.transform = `translate(${x}px, ${y}px)`
        rotate.transform = `rotate(${rot}deg)`
        none.opacity = opacity
    }
    completeTween(i){
        if(i === 0) this.after()
    }
    startTween(){
        this.tw.forEach(e => {
            e.start()
        })
    }


    // resize
    resize(size){
        // don't use foreach or for(index) to modify array in vue
        this.size = size
    }


    // animate
    animate({text, circle}){
        if(!this.play) return

        if(text.next){
            text.destroy()
            circle.destroy()
            this.startTween()
            this.play = false
        }
    }


    // after
    after(){
        TWEEN.removeAll()
        this.tw = []
        this.container = false
    }


    // get
    get(){
        return this.arr
    }
}