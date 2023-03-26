const { createCanvas } = require('canvas')
exports.image = (req, res) => {
    let [width, height, format] = Object.values(req.params)
    width = parseInt(width)
    height = parseInt(height)
    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')
    //设置背景色
    ctx.fillStyle = '#fb8b05'
    ctx.fillRect(0, 0, width, height)
    //设置文字颜色
    let fontSize = width / 10
    let text = `${width}x${height}.${format}`
    ctx.fillStyle = '#f9f4dc'
    ctx.font = `${fontSize}px Consolas`
    let textWidth = ctx.measureText(text).width
    ctx.fillText(text, width / 2 - textWidth / 2, height / 2 + fontSize / 2)
    if (format == 'png') {
        res.setHeader('Content-Type', 'image/png')
        canvas.pngStream().pipe(res)
    } else {
        res.setHeader('Content-Type', 'image/jpeg')
        canvas.pngStream().pipe(res)
    }

}