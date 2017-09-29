const express = require('express')
const router = express.Router()

const Schema = require('../db/schema.js')
const UserModel = Schema.UserModel

//INDEX ROUTE
router.get('/', (req, res) => {

    UserModel.find({})
        .then((users) => {
            res.render('users/index', {
                users: users
            })
        })
        .catch((error) => {
            console.log(error)
        })

})

// NEW ROUTE
router.get('/new', (req, res) => {
    res.render('users/new')
})

// CREATE ROUTE
router.post('/', (req, res) => {

    const newUser = req.body

    UserModel.create(newUser)
        .then(() => {
            res.redirect('/users')
        })
        .catch((error) => {
            console.log(error)
        })

})

// EDIT ROUTE
router.get('/:userId/edit', (req, res) => {

    const userId = req.params.userId

    UserModel.findById(userId)
        .then((user) => {
            res.render('users/edit', {
                user: user
            })
        })
        .catch((error) => {
            console.log(error)
        })

})

// UPDATE ROUTE
router.put('/:userId', (req, res) => {
    
    const userId = req.params.userId

    const updatedUser = req.body

    UserModel.findByIdAndUpdate(userId, updatedUser, { new: true })
        .then(() => {
            res.redirect(`/users/${userId}`)
        })
        .catch((error) => {
            console.log(error)
        })

})

// SHOW ROUTE
router.get('/:userId', (req, res) => {

    const userId = req.params.userId

    UserModel.findById(userId)
        .then((user) => {
            res.render('users/show', {
                user: user
            })
        })
        .catch((error) => {
            console.log(error)
        })

})

// DELETE ROUTE
router.get('/:userId/delete', (req, res) => {

    const userId = req.params.userId

    UserModel.findById(userId).remove()
        .then(() => {
            res.redirect('/users')
        })
        .catch((error) => {
            console.log(error)
        })
})


module.exports = router