const mongoose = require('mongoose')

//mongoose helps give our data restrictions before feeding to MongoDB
//We use a Schema constructor defined by mongoose to set our data parameters
const Schema = mongoose.Schema

//Trail Schema - goes above Mountain Schema because it will be referenced there
const TrailSchema = new Schema({
    difficulty: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
})

//Mountain Schema to create mountains and define data keys
const MountainSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    town: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipCode: {
        type: Number,
        required: true
    },
    parking: {
        type: String,
        required: true
    },
    accessPoint: {
        type: String,
        required: true
    },
    hike: {
        type: String,
        required: true
    },
    img: String,
    trails: [TrailSchema]
})

//user schema to create users and define data keys
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    favoriteMountain: String,
    img: {
        type: String,
        required: true,
        unique: true
    },
    ability: {
        type: Number,
        required: true
    },
    hometown: {
        type: String,
        required: true
    }
})

// Creating models for each Schema --
const UserModel = mongoose.model('User', UserSchema)
const MountainModel = mongoose.model('Mountain', MountainSchema)
const TrailModel = mongoose.model('Trail', TrailSchema)


//export these beautiful models so they can be required elsewhere
module.exports = {
    UserModel: UserModel,
    MountainModel: MountainModel,
    TrailModel: TrailModel
}