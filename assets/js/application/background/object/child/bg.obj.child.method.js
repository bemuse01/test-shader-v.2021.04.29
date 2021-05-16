BG.object.child.method = {
    fillTexture(texture){
        const {data, width, height} = texture.image


        for(let j = 0; j < width; j++){
            for(let i = 0; i < height; i++){
                const index = (i * width + j) * 4

                // x === opacity
                data[index] = 0.0

                // y === opacity velocity
                data[index + 1] = 0.01

                data[index + 2] = 0
                data[index + 3] = 0
            }
        }
    },
    fillMapTexture(texture, size){
        const {data, width, height} = texture.image
        
        for(let j = 0; j < width; j++){
            for(let i = 0; i < height; i++){
                const index = (i * width + j) * 4

                // x === play time
                data[index] = height * 2 - i * 2

                // y === update old time
                data[index + 1] = 0

                // z === play
                data[index + 2] = 0
                data[index + 3] = 0
            }
        }
    },
    createTextureFromCanvas(img, size){
        const {w, h} = size

        const ctx = document.createElement('canvas').getContext('2d')
        ctx.canvas.width = w
        ctx.canvas.height = h

        const x = 0
        const y = 0
        const offsetX = 0.5
        const offsetY = 0.5

        let iw = img.width
        let ih = img.height
        let r = Math.min(w / iw, h / ih)
        let nw = iw * r
        let nh = ih * r
        let cx, cy, cw, ch, ar = 1

        if (nw < w) ar = w / nw
        if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh
        nw *= ar
        nh *= ar

        cw = iw / (nw / w)
        ch = ih / (nh / h)

        cx = (iw - cw) * offsetX
        cy = (ih - ch) * offsetY

        if (cx < 0) cx = 0
        if (cy < 0) cy = 0
        if (cw > iw) cw = iw
        if (ch > ih) ch = ih

        ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h)

        return ctx.canvas
    }
}