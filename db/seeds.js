require('dotenv').config()

//set up my database
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection

//log an error if not hooked up to MongoDB
db.on('error', (err) => {
    console.log(err)
})

//log 'database has been connected' so we know it's working
db.once('open', () => {
    console.log('Connected to Mongo Database!')
})

//require the Schema.js file so I have access to models
const Schema = require('./schema.js')

const UserModel = Schema.UserModel
const MountainModel = Schema.MountainModel
const TrailModel = Schema.TrailModel

//delete all of the Users and Mountains from database
UserModel.remove({}, (err) => {
    console.log(err)
})
MountainModel.remove({}, (err) => {
    console.log(err)
})

//create users, mountains, and trails to seed our database--
const samShaefer = new UserModel({ name: 'Sam Shaefer', favoriteMountain: 'Vail', img: 'https://i.imgur.com/N26jDACt.jpg', ability: 3, hometown: 'Hingham, MA' })
const mattWest = new UserModel({ name: 'Matt West', favoriteMountain: 'Jackson Hole', img: 'https://i.imgur.com/sburJHct.jpg', ability: 3, hometown: 'San Diego, CA' })
const adeleKeating = new UserModel({ name: 'Adele Keating', favoriteMountain: 'Park City', img: 'https://i.imgur.com/xxXGOEQt.jpg', ability: 3, hometown: 'Pheonix, AZ' })

const mountTallac = new MountainModel({ name: 'Mount Tallac', town: 'South Lake Tahoe', state: 'California', avalancheDanger: 'Moderate' })
const meadowMountain = new MountainModel({ name: 'Meadow Mountain', town: 'Minturn', state: 'Colorado', avalancheDanger: 'Low' })
const lovelandPass = new MountainModel({ name: 'Loveland Pass', town: 'Loveland', state: 'Colorado' , avalancheDanger: 'Considerable' })

const easyTrail = new TrailModel({ difficulty: 'Begginer', description: 'Mellow pitch with open space' })
const moderateTrail = new TrailModel({ difficulty: 'Intermediate', description: 'Areas of crowded Aspens, some steeps' })
const hardTrail = new TrailModel({ difficulty: 'Expert', description: 'Steep terrain with variable conditions and cliff faces'})

//assign trails to mountains
const mountains = [mountTallac, meadowMountain, lovelandPass]
const trails = [easyTrail, moderateTrail, hardTrail]
const users = [samShaefer, mattWest, adeleKeating]

mountains.forEach((mountain) => {

    mountain.trails = trails

    mountain.save()
        .then((mountain) => {
            console.log(`${mountain.name} saved, wooohooo!`)
        })
        .catch((error) => {
            console.log(error)
        })
})

users.forEach((user) => {
    user.save()
        .then((user) => {
            console.log(`${user.name} saved, cool!`)
        })
        .catch((error) => {
            console.log(error)
        })
})

//disconnect from the db
db.close()