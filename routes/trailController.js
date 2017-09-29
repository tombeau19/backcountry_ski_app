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

// CREATE ROUTE
router.post('/', (req, res) => {

    const mountainId = req.params.mountainId
    const newTrail = req.body

    MountainModel.findById(mountainId)
        .then((mountain) => {
            mountain.trails.push(newTrail)
            return mountain.save()
        })
        .then(() => {
            res.redirect(`/mountains/${mountainId}/trails`)
        })
        .catch((error) => {
            console.log(error)
        })
        
})

// EDIT route
router.get('/:trailId/edit', (req, res) => {

    // we need to get the company ID because the trail lives there
    const mountainId = req.params.mountainId

    // we need the trail ID because that is what we will edit
    const trailId = req.params.trailId

    // next we need to find the mountain by ID
    MountainModel.findById(mountainId)
        .then((mountain) => {
            //now we have the mountain
            //but we need to find the trail to edit
            const trail = mountain.trails.id(trailId)

            //now we need to see a pre-populated form
            res.render('trails/edit', {
                trail: trail,
                mountainId: mountainId
            })
        })
        .catch((error) => {
            console.log(error)
        })

})

// UPDATE ROUTE
router.put('/:trailId', (req, res) => {

    const mountainId = req.params.mountainId
    const trailId = req.params.trailId
    const updatedTrail = req.body

    MountainModel.findById(mountainId)
        .then((mountain) => {

            const trail = mountain.trails.id(trailId)

            trail.description = updatedTrail.description
            trail.difficulty = updatedTrail.difficulty

            return mountain.save()
        })
        .then(() => {
            res.redirect(`/mountains/${mountainId}/trails/${trailId}`)
        })
        .catch((error) => {
            console.log(error)
        })

})

// SHOW ROUTE
router.get('/:trailId', (req, res) => {
    const mountainId = req.params.mountainId
    const trailId = req.params.trailId
    const mountainName = req.params.mountain

    MountainModel.findById(mountainId)
        .then((mountain) => {
            const trail = mountain.trails.id(trailId)
            const mountainName = mountain.name

            res.render('trails/show', {
                trail: trail,
                mountainId: mountainId,
                mountainName: mountainName
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

// DELTE ROUTE

router.get('/:trailId/delete', (req, res) => {

    const mountainId = req.params.mountainId
    const trailId = req.params.trailId

    MountainModel.findById(mountainId)
        .then((mountain) => {
            const trail = mountain.trails.id(trailId).remove()
            return mountain.save()
        })
        .then(() => {
            res.redirect(`/mountains/${mountainId}/trails`)
        })

})


module.exports = router