const express = require('express');
const BlogModel = require('../models/Blog');
const addTrackerRecord = require('./tracker.route').addTrackerRecord;
const blogRoute = express.Router();
const checkIfAuthenticated = require('../auth-middleware').checkIfAuthenticated;
const multer = require('multer')

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

blogRoute.route('/').get(async (req, res, next) => {
    try {
        await BlogModel.find((error, data) => {
            if (error) {
                return next(error)
            } else {
                res.json(data)
            }
        })
    } catch { (err) => console.log(err) }
})

blogRoute.route('/').post(upload.single('image'), async (req, res, next) => {

    if (req.file) {
        const image = {
            name: req.file.originalname,
            data: req.file.buffer,
            contentType: req.file.mimetype
        }
        req.body.img = image;
    } else {
        req.body.img = null
    }
    console.log(req.body)
    await BlogModel.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            addTrackerRecord({
                userId: req.body.userId,
                operationType: 'CREATE',
                operationDescription: `Created a new Blog by user with id ${req.body.userId}`,
                entityType: 'Blog'
            })
            res.json(data)
        }
    })
})

blogRoute.route('/:id').get(async (req, res, next) => {
    await BlogModel.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

blogRoute.route('/:id').put(checkIfAuthenticated, async (req, res, next) => {
    // BlogModel.updateOne()
    await BlogModel.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body,
        },
        (error, data) => {
            if (error) {
                return next(error)
            } else {
                addTrackerRecord({
                    userId: req.body.userId,
                    operationType: 'UPDATE',
                    operationDescription: `Updated a Blog with ${req.params.id} by user with id ${req.body.userId}`,
                    entityType: 'Blog'
                })
                res.json(Object.assign({}, data._doc, req.body))
            }
        },
    )
})

blogRoute.route('/:id').delete(checkIfAuthenticated, async (req, res, next) => {
    await BlogModel.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            addTrackerRecord({
                userId: req.body.userId,
                operationType: 'DELETE',
                operationDescription: `Deleted a Blog with ${req.params.id} by user with id ${req.body.userId}`,
                entityType: 'Blog'
            })
            res.status(200).json({
                msg: data,
            })
        }
    })
})
module.exports = blogRoute;