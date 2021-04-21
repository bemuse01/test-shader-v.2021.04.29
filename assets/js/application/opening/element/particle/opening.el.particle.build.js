OPENING.element.particle.build = class{
    constructor(size, text){
        this.init(size, text)
        this.create()
    }


    // init
    init(size, text){
        this.param = new OPENING.element.particle.param()
        this.size = size
        this.text = text
        this.play = true
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
                        transform: `translate(${x}px, ${y}px) rotate(${rotate}deg)`
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
        this.arr.forEach((e, i) => {
            const {x, y, deg, rotate, radius} = e.param

            const nx = Math.cos(deg * RADIAN) * radius * 2
            const ny = Math.sin(deg * RADIAN) * radius * 2

            const start = {
                opacity: 0,
                x: x,
                y: y,
                rotate: rotate
            }
            const end = {
                opacity: [0, 0.25, 0.5, 1, 1, 0.5, 0],
                x: nx,
                y: ny,
                rotate: rotate + 360
            }

            const tw = new TWEEN.Tween(start)
            .to(end, 1500)
            // .easing(TWEEN.Easing.Quintic.Out)
            .easing(TWEEN.Easing.Circular.Out)
            .onUpdate(() => this.updateTween(i, start))
            .delay(300)
            .start()
        })
    }
    updateTween(i, {x, y, rotate, opacity}){
        // don't use foreach or for(index) to modify array in vue
        const translate = this.arr[i].style.translate
        const none = this.arr[i].style.none

        translate.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`
        none.opacity = opacity
    }


    // resize
    resize(){
        // don't use foreach or for(index) to modify array in vue
    }


    // animate
    animate(){
        if(!this.play) return

        if(this.text.loading >= 100){
            this.createTween()
            this.play = false
        }
    }


    // get
    get(){
        return this.arr
    }
}