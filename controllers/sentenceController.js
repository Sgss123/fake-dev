//Lorem Ipsum
const LoremIpsum = require('lorem-ipsum').LoremIpsum
//具体实现
exports.sentence = (req, res) => {
    console.log(req.params)
    let lorem = (new LoremIpsum()).generateSentences(parseInt(req.params[0]))
    if (req.params[1] == ',') {
        lorem = lorem.split('.')
        lorem = lorem.map((sentence) => {
            return sentence.trim() + '.'
        })
    }
    res.json({
        'data': lorem
    })
}