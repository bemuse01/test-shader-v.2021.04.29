new Vue({
    el: '#wrap',
    data(){
        return{
            element: {
                opening: new OPENING.element.build(),
                logo: new LOGO.element.build()
            }
        }
    },
    mounted(){
        this.init()
    },
    methods: {
        // init
        init(){
            this.initThree()
            this.animate()

            window.addEventListener('resize', this.onWindowResize, false)
        },


        // three
        initThree(){
            OBJECT.app = new APP.build()

            this.createObject(OBJECT.app)
        },
        resizeThree(){
            const {app} = OBJECT

            for(let i in OBJECT) OBJECT[i].resize({app})
        },
        renderThree(){
            const {app} = OBJECT
            
            for(let i in OBJECT) OBJECT[i].animate({app})
        },
        createObject(app){
        },


        // element
        resizeElement(){
            for(let i in this.element){
                if(!this.element[i].resize) continue
                this.element[i].resize()
            }
        },
        animateElement(){
            for(let i in this.element){
                if(!this.element[i].animate) continue
                this.element[i].animate(this.element.opening)
            }
        },


        // event
        onWindowResize(){
            this.resizeThree()
            this.resizeElement()
        },


        // render
        render(){
            this.renderThree()
            this.animateElement()
            TWEEN.update()
        },
        animate(){
            this.render()
            requestAnimationFrame(this.animate)
        }
    }
})