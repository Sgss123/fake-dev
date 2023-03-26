//Lorem Ipsum
const LoremIpsum = require('lorem-ipsum').LoremIpsum
//具体实现
exports.word = (req, res) => {
    console.log(req.params)
    let lorem = (new LoremIpsum()).generateWords(parseInt(req.params[0]))
    if (req.params[1] == ',') {
        lorem = lorem.split(' ')
    }
    res.json({
        'data': lorem
    })
}