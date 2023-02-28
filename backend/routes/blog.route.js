const express = require('express');
const BlogModel = require('../models/Blog');

const blogRoute = express.Router();

blogRoute.route('/').get((req, res, next) => {
    BlogModel.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

blogRoute.route('/').post((req, res, next) => {
    BlogModel.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

blogRoute.route('/:id').get((req, res, next) => {
    BlogModel.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

blogRoute.route('/:id').put((req, res, next) => {
    BlogModel.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body,
        },
        (error, data) => {
            if (error) {
                return next(error)
            } else {
                res.json(Object.assign({}, data._doc, req.body))
            }
        },
    )
})

blogRoute.route('/:id').delete((req, res, next) => {
    BlogModel.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json({
                msg: data,
            })
        }
    })
})
module.exports = blogRoute;
