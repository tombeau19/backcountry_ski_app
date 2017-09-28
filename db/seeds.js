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
MountainModel.removeListener({}, (err) => {
    console.log(err)
})

//create users, mountains, and trails --
const samShaefer = new UserModel({ name: 'Sam Shaefer' }, { favoriteMountain: 'Vail' }, { img: 'https://imgur.com/N26jDAC' }, { ability: 3 }, { hometown: 'Hingham, MA' })
const mattWest = new UserModel({ name: 'Matt West' }, { favoriteMountain: 'Jackson Hole' }, { img: 'https://imgur.com/sburJHc' }, { ability: 3 }, { hometown: 'San Diego, CA' })
const adeleKeating = new UserModel({ name: 'Adele Keating' }, { favoriteMountain: 'Park City' }, { img: 'https://imgur.com/xxXGOEQ' }, { ability: 3 }, { hometown: 'Pheonix, AZ' })

