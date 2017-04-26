const express = require('express')
const app = express()
const router = require('./router')
const hbs = require('hbs')
const path = require('path')
const bodyParser = require('body-parser')

app.set('view engine', 'hbs')

hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))

// 挂载静态资源
app.use('/', express.static('./www'))
app.use('/photos', express.static('./album'))
router(app)

app.listen(3000)