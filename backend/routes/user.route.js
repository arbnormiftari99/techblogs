const firebase = require("firebase").default;
const addTrackerRecord = require('./tracker.route').addTrackerRecord;
const admin = require('firebase-admin');
const db = require('../../firebaseInit').firestore;
const express = require('express');
const userRoute = express.Router();
const checkIfAdmin = require('../auth-middleware').checkIfAdmin;
const checkIfAuthenticated = require('../auth-middleware').checkIfAuthenticated;
const { body, validationResult } = require('express-validator');



userRoute.route('/register').post(
    [
        body('email').notEmpty().isEmail(),
        body('password').notEmpty().isLength({ min: 6 }),
        body('firstName').notEmpty(),
        body('lastName').notEmpty(),
        body('username').notEmpty()
    ],
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const firebaseAuth = await firebase.auth();
            const createUser = await firebaseAuth.createUserWithEmailAndPassword(req.body.email, req.body.password);
            const result = await createUser;
            const dataBase = db.collection("users").doc(result.user.uid);
            await dataBase.set({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                email: req.body.email,
                role: 'USER'
            });
            const token = await result.user.getIdToken()
            addTrackerRecord({
                userId: req.body.userId,
                operationType: 'CREATE',
                operationDescription: `A User with ${req.body.id} has been registered`,
                entityType: 'User'
            })
            res.json(
                {
                    token: token,
                    userId: result.user.uid,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    username: req.body.username,
                    email: req.body.email,
                    role: 'USER'
                }
            );
        }
        catch (err) {
            next(err);
            console.log(err);
        }
    })

userRoute.route('/users').get(checkIfAdmin, async (req, res, next) => {
    try {
        const userInfo = db.collection("users");
        const response = await userInfo.get();
        const usersList = response.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
        res.json(usersList);
    } catch { (err) => console.log(err) }
})

userRoute.route('/:id').get(checkIfAuthenticated, async (req, res, next) => {
    try {
        const userInfo = await db.collection("users")
            .doc(req.params.id).get();
        const user = await userInfo.data();
        res.json(user);
    } catch (err) {
        next(err)
    }
})

userRoute.route('/login').post([
    body('email').notEmpty().isEmail(),
    body('password').notEmpty()
],
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const response = await firebase
                .auth().signInWithEmailAndPassword(req.body.email, req.body.password);
            const token = await response.user.getIdToken();
            const userInfo = await admin
                .auth()
                .verifyIdToken(token);
            res.json({ token: token, role: userInfo.admin ? 'ADMIN' : 'USER', userId: userInfo.uid });
            console.log(userInfo);
        } catch (err) {
            next(err);
            console.log(err)
        }
    })

userRoute.route('/promote').post(
    [
        body('userId').notEmpty()
    ],
    checkIfAdmin, async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { userId } = req.body; // userId is the firebase uid for the user
        try {
            await admin.auth().setCustomUserClaims(userId, { admin: true });
            await firebase.firestore()
                .collection('users').doc(userId)
                .update({
                    role: 'ADMIN'
                })

            addTrackerRecord({
                userId: req.body.userId,
                operationType: 'PROMOTE',
                operationDescription: `A User with ${userId} has been promoted to admin`,
                entityType: 'User'
            })

            res.send({ message: 'Success promoting the user' })

        } catch (err) {
            next(err);
            // res.json({ msg: 'Something went wrong' });
        }
    })

module.exports = userRoute;