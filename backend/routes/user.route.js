const firebase = require("firebase");
const db = require('../../firebaseInit').firebaseDB;

const express = require('express');
const UserModel = require('../models/User');
const TrackerModel = require('../models/Tracker');
const userRoute = express.Router();

// userRoute.route('/').get(async (req, res, next) => {
//     UserModel.find((error, data) => {
//         if (error) {
//             return next(error)
//         } else {
//             res.json(data)
//         }
//     })
// })

userRoute.route('/register').post(async (req, res, next) => {
    try{
    const firebaseAuth = await firebase.auth();
    const createUser = await firebaseAuth.createUserWithEmailAndPassword(req.body.email, req.body.password);
    const result = await createUser;
    const dataBase = db.collection("users").doc(result.user.uid);
    await dataBase.set({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        role:'USER'
      });
    }
    catch(err){
        console.log(err)
    }
    res.send({ msg: 'it reached', ...req.body })

    // UserModel.create(req.body, (error, data) => {
    //     if (error) {
    //         return next(error)
    //     } else {
    //         TrackerModel.create({
    //             operationType: "CREATE",
    //             dateAdded: new Date(Date.now()),
    //             operationDescription:
    //                 `User with content:${JSON.stringify(req.body)} was added`
    //         })
    //         res.json(data)
    //     }
    // })
})

userRoute.route('/:id').get(async (req, res, next) => {
    UserModel.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

userRoute.route('/:id').put(async (req, res, next) => {
    UserModel.findByIdAndUpdate(
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
                        `User with content:
                        ${JSON.stringify(Object.assign({}, req.params.id, req.body))} was edited`
                })
                res.json(Object.assign({}, data._doc, req.body))
            }
        },
    )
})

userRoute.route('/:id').delete(async (req, res, next) => {
    UserModel.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {

            TrackerModel.create({
                operationType: "DELETE",
                dateAdded: new Date(Date.now()),
                operationDescription:
                    `User with id:
                    ${req.params.id} was deleted`
            })
            res.status(200).json({
                msg: data,
            })
        }
    })
})
module.exports = userRoute;
