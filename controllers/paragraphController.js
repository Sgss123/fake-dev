//Lorem Ipsum
const LoremIpsum = require('lorem-ipsum').LoremIpsum
const config = require('../config.json')
//具体实现
exports.paragraph = (req, res) => {
    let num = parseInt(req.params[0])
    num = (num > config.MAX_PARAGRAPH) ? config.MAX_PARAGRAPH : num
    let lorem = (new LoremIpsum()).generateParagraphs(parseInt(num))
    if (req.params[1] == ',') {
        lorem = lorem.split('\r\n')
    }
    res.json({
        'data': lorem,'msg':`您输入的字数为${req.params[0]}，最大限制为${config.MAX_PARAGRAPH}，超过的量已为您截断。`
    })
}