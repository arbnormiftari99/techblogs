const express = require('express');
const BlogModel = require('../models/Blog');
const addTrackerRecord = require('./tracker.route').trackerRoute;
const blogRoute = express.Router();

blogRoute.route('/').get(async (req, res, next) => {
    BlogModel.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

blogRoute.route('/').post(async (req, res, next) => {
    BlogModel.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            TrackerModel.create({
                operationType: "CREATE",
                dateAdded: new Date(Date.now()),
                operationDescription:
                    `Blog with content:${JSON.stringify(req.body)} was added`
            })
            res.json(data)
        }
    })
})

blogRoute.route('/:id').get(async (req, res, next) => {
    BlogModel.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

blogRoute.route('/:id').put(async (req, res, next) => {
    BlogModel.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body,
        },
        (error, data) => {
            if (error) {
                return next(error)
            } else {
                TrackerModel.create({
                    operationType: "EDIT",
                    dateAdded: new Date(Date.now()),
                    operationDescription:
                        `Blog with content:
                        ${JSON.stringify(Object.assign({}, req.params.id, req.body))} was edited`
                })
                res.json(Object.assign({}, data._doc, req.body))
            }
        },
    )
})

blogRoute.route('/:id').delete(async (req, res, next) => {
    BlogModel.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {

            TrackerModel.create({
                operationType: "DELETE",
                dateAdded: new Date(Date.now()),
                operationDescription:
                    `Blog with id:
                    ${req.params.id} was deleted`
            })
            res.status(200).json({
                msg: data,
            })
        }
    })
})
module.exports = blogRoute;
