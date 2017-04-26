const albumRouter = require('./albumRouter.js')
const adminRouter = require('./adminRouter.js')

function router(app) {

    app.use('/album', albumRouter)

    app.use('/admin', adminRouter)

    // 404 处理
    app.use('/', (req, res) => {
        res.send('<h1>404</h1>')
    })

    app.use('./', (err, req, res, next) => {
        // console.log('')
        console.log("进入错误")
        res.json({code: 0})
        res.end('错误')

    })
}

module.exports = router;