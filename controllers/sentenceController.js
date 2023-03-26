//Lorem Ipsum
const LoremIpsum = require('lorem-ipsum').LoremIpsum
const config = require('../config.json')
//具体实现
exports.sentence = (req, res) => {
    let num = parseInt(req.params[0])
    num = (num > config.MAX_SENTENCE) ? config.MAX_SENTENCE : num
    let lorem = (new LoremIpsum()).generateSentences(parseInt(num))
    if (req.params[1] == ',') {
        lorem = lorem.split('.')
        lorem = lorem.map((sentence) => {
            return sentence.trim() + '.'
        })
        lorem.pop()
    }
    res.json({
        'data': lorem, 'msg': `您输入的字数为${req.params[0]}，最大限制为${config.MAX_SENTENCE}，超过的量已为您截断。`
    })
}