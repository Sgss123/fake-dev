const express = require('express')
const app = express()
const { HOST, PORT } = require('./config.json')

//引入单词
const word_controller = require('./controllers/wordController')

//引入句子
const sentence_controller = require('./controllers/sentenceController')

//引入段落
const paragraph_controller = require('./controllers/paragraphController')

//引入图片
// const image_controller = require('./controllers/imageController')

//单词
app.get(/\/(\d+)(?:w|word|words|dc)(,*)$/, word_controller.word)

//句子
app.get(/\/(\d+)(?:s|sentence|sentences|jz)(,*)$/, sentence_controller.sentence)

//段落
app.get(/\/(\d+)(?:p|paragraph|paragraphs|dl)(,*)$/, paragraph_controller.paragraph)

//图片
// app.get(/\/(\d+)x(\d+)\.(jpg|jpeg|png)$/, image_controller.image)

app.listen(PORT, HOST, () => {
    console.log(`fake-dev is listening at http://${HOST}:${PORT}`)
})