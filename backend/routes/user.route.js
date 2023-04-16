const firebase = require("firebase").default;
const addTrackerRecord = require('./tracker.route').addTrackerRecord;
const admin = require('firebase-admin');
const db = require('../../firebaseInit').firestore;
const express = require('express');
const userRoute = express.Router();
const checkIfAdmin = require('../auth-middleware').checkIfAdmin;
const checkIfAuthenticated = require('../auth-middleware').checkIfAuthenticated;


userRoute.route('/register').post(async (req, res, next) => {
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
        res.json(err);
        console.log(err);
    }
})

userRoute.route('/users').get(async (req, res, next) => {
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
    const userInfo = db.collection("users")
        .doc(req.params.id);
    const user = await (await userInfo.get()).data();
    res.json(user);
})

userRoute.route('/login').post(async (req, res, next) => {
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
        res.json(err);
    }
})

userRoute.route('/promote').post(checkIfAdmin, async (req, res, next) => {
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
        res.json({ msg: 'Something went wrong' });
    }
})

module.exports = userRoute;