const express = require('express')
const router = express.Router({ mergeParams: true })

const Schema = require('../db/schema.js')
const MountainModel = Schema.MountainModel

// INDEX ROUTE
router.get('/', (req, res) => {

    const mountainId = req.params.mountainId

    MountainModel.findById(mountainId)
        .then((mountain) => {
            res.render('trails/index', {
                mountain: mountain
            })
        })
        .catch((error) => {
            console.log(error)
        })

})

// NEW ROUTE
router.get('/new', (req, res) => {

    const mountainId = req.params.mountainId
    
    res.render('trails/new', {
        mountainId: mountainId
    })

})







module.exports = router