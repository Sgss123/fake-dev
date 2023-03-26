//Lorem Ipsum
const LoremIpsum = require('lorem-ipsum').LoremIpsum
const config = require('../config.json')
//具体实现
exports.word = (req, res) => {
    let num = parseInt(req.params[0])
    num = (num > config.MAX_WORD) ? config.MAX_WORD : num
    let lorem = (new LoremIpsum()).generateWords(parseInt(num))
    if (req.params[1] == ',') {
        lorem = lorem.split(' ')
    }
    res.json({
        'data': lorem, 'msg': `您输入的字数为${req.params[0]}，最大限制为${config.MAX_WORD}，超过的量已为您截断。`
    })
}