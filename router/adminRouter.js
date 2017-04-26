const adminRouter = require('express').Router();
const albumModel = require('../model/albumModel.js')
const photoModel = require('../model/photoModel.js')
const util = require('util')
const formidable = require('formidable')
const path = require('path')

adminRouter.get('/', (req, res, next) => {
    albumModel.find({}, function (err, resultArray) {
        if (err) {
            return next(err)
        }
        res.render('admin', {albums: resultArray});
    })
})

// post 上传文件夹
adminRouter.post('/createfolder', (req, res, next)=> {
    console.log('createfolder',req.body.name)
    // 存储到 database
    const albumEntity = new albumModel({
        name: req.body.name
    })

    albumEntity.save((err, result) => {
        if (err) {
            return next(err)
        }
        res.json({code: 1})
        console.log('____save dir successful____')
    })
})

// post 上传photo
adminRouter.post('/uploadphoto/:albumname', (req, res, next) => {
    console.log('__upload_photo__')
    const form = new formidable.IncomingForm();
    // 保留扩展名
    form.keepExtensions = true; 
    //指定上传路径
    form.uploadDir = path.join(__dirname, '../', 'album');

    // 执行解析(只有组件type为file才会被上传),其它请求参数可以通过files获得
    form.parse(req, (err, fields, files) => {
        // pass error 
        if (err) return next(err)
        // files是一个对象，key为表单file控件的name值
        const photoname = path.basename(files.photo.path);
        // 获取非file的上传参数
        console.log(fields.test,'__test__')
        console.log(photoname)


        // 查找album对应mongoId
        albumModel.findOne({name: req.params.albumname}, (err, result) => {
            if (err) return next(err)
            
            // 存储到 database
            const photoEntity = new photoModel({
                name: photoname,
                album: result._id
            })

            photoEntity.save((err, result) => {
                if (err) {
                    return next(err)
                }
                res.json({code: 1})
                console.log('____save photo successful____')
            })
            

        })

         
        
    });
    
})

module.exports = adminRouter