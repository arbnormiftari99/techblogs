const express = require('express');
const TrackerModel = require('../models/Tracker');
const trackerRoute = express.Router();

trackerRoute.route('/').get(async (req, res, next) => {
    TrackerModel.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})
trackerRoute.route('/:id').get(async (req, res, next) => {
    TrackerModel.find({operationType:'CREATE'}, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

const addTrackerRecord = (userId,operationType,operationDescription,entityType)=>{
    TrackerModel.create({
        userId:userId,
        operationType: operationType,
        operationDescription: operationDescription,
        entityType:entityType,
        dateAdded: new Date(Date.now()),
        
    })
}

module.exports = {trackerRoute, addTrackerRecord};