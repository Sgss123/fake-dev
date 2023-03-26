const express = require('express')
const app = express()
const port = 3000

//引入单词
const word_controller = require('./controllers/wordController')

//引入句子
const sentence_controller = require('./controllers/sentenceController')


app.get('/', (req, res) => {
    res.send("fake-dev!")
})
//单词
app.get(/\/(\d+)(?:w|word|words|dc)(,*)$/, word_controller.word)

//句子
app.get(/\/(\d+)(?:s|sentence|sentences|jz)(,*)$/, sentence_controller.sentence)

app.listen(port, () => {
    console.log(`fake-dev is listening at http://127.0.0.1:${port}`)
})