const express = require('express')
const albumRouter = express.Router()
const albumModel = require('../model/albumModel.js')
const photoModel = require('../model/photoModel.js')
albumRouter.get('/:albumname', (req, res, next) => {
    const albumName = req.params.albumname
    console.log(albumName)
    
    const photoArray = []
    photoModel.find({})
    // 能够让result对象显示关联表变成对象形式(而不是_id)
    .populate('album')
    .exec((err, result) => {
        if (err) return next(err)
        // 临时解决方案，用到for循环
        for (let i = 0; i < result.length; i++) {
            if (result[i].album.name === albumName) {
                photoArray.push(result[i].name)
            }
        }
       res.render('photo', {photoArray}) 
    })
})

albumRouter.get('/', (req, res, next) => {
    // 查找db，成功后render页面
    albumModel.find({}, (err, resultArray) => {
        if (err) {
            return next(err)
        }
        res.render('index', {albums: resultArray})
    })
});

module.exports = albumRouter