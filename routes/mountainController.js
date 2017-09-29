const express = require('express')
const router = express.Router()

const Schema = require('../db/schema.js')
const MountainModel = Schema.MountainModel

//INDEX ROUTE
router.get('/', (req, res) => {

    MountainModel.find({})
        .then((mountains) => {
            res.render('mountains/index', {
                mountains: mountains
            })
        })
        .catch((error) => {
            console.log(error)
        })

})

// NEW ROUTE
router.get('/new', (req, res) => {
    res.render('mountains/new')
})

// CREATE ROUTE
router.post('/', (req, res) => {

    const newMountain = req.body

    MountainModel.create(newMountain)
        .then(() => {
            res.redirect('/mountains')
        })
        .catch((error) => {
            console.log(error)
        })

})

// SHOW ROUTE
router.get('/:mountainId', (req, res) => {

    const mountainId = req.params.mountainId

    MountainModel.findById(mountainId)
        .then((mountain) => {
            res.render('mountains/show', {
                mountain: mountain
            })
        })
        .catch((error) => {
            console.log(error)
        })

})

// DELETE ROUTE
router.get('/:mountainId/delete', (req, res) => {

    const mountainId = req.params.mountainId

    MountainModel.findById(mountainId).remove()
        .then(() => {
            res.redirect('/mountains')
        })
        .catch((error) => {
            console.log(error)
        })

})


module.exports = router