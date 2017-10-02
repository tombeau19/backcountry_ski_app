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

//create users,
const samShaefer = new UserModel({
    name: 'Sam Shaefer',
    favoriteMountain: 'Vail',
    img: 'https://i.imgur.com/N26jDACt.jpg',
    ability: 3, 
    hometown: 'Hingham, MA'
})
const mattWest = new UserModel({
    name: 'Matt West',
    favoriteMountain: 'Jackson Hole',
    img: 'https://i.imgur.com/sburJHct.jpg',
    ability: 3,
    hometown: 'San Diego, CA'
})
const adeleKeating = new UserModel({
    name: 'Adele Keating',
    favoriteMountain: 'Park City',
    img: 'https://i.imgur.com/xxXGOEQt.jpg',
    ability: 3,
    hometown: 'Pheonix, AZ'
})
const georgiaBeauregard = new UserModel({
    name: 'Georgia Beauregard',
    favoriteMountain: 'Zermatt',
    img: 'https://i.imgur.com/TEBoWyFt.jpg',
    ability: 3,
    hometown: 'Roswell, GA'
})

const mountTallac = new MountainModel({
    name: 'Mount Tallac',
    town: 'South Lake Tahoe',
    state: 'California',
    zipCode: 96150,
    parking: 'Available at the Trailhead',
    accessPoint: 'The trailhead is located approximately 3-1/2 miles north of South Lake Tahoe on Highway 89. Look for the Mt. Tallac Trailhead sign directly across from the entrance to Baldwin Beach. Turn left down the dirt road and continue to the trailhead parking.',
    hike: 'There likely will be a skin track or boot pack trail right from your car.  If not, head in a southwesterly direction through the trees and (hopefully) snow-covered shrubs.  Ascend up and angle gradually to your left, aiming for the obvious gap where Tallac Creek flows out of the NE bowl. From here, climb easily around the west side of the summit (there will likely be wind exposed rocks here) and on up to the top.',
    img: 'http://www.skitahoebackcountry.com/wp-content/uploads/DSCN6415.jpg',
})
const meadowMountain = new MountainModel({
    name: 'Meadow Mountain',
    town: 'Minturn',
    state: 'Colorado',
    zipCode: 81645,
    parking: 'Available at the Trailhead - off of US-24',
    accessPoint: 'The Trailhead is right at the parking lot. This is a heavily trafficked area so it will be obviously where to ascend. Follow the boot pack or skin trails',
    hike: 'Very mellow hike, there will be varying paths because of the popularity. There are very few steeps so it is possible to pack your skis or easily ascend with skins. Perfect begginner touring mountain',
    img: 'https://i1.wp.com/velaapparel.com/wp-content/uploads/2017/01/minturn-backcountry-meadow-mountain-1.jpg?fit=2048%2C1152&ssl=1'
})
const lovelandPass = new MountainModel({
    name: 'Loveland Pass',
    town: 'Loveland',
    state: 'Colorado',
    zipCode: 80435,
    parking: 'You can drive to the top of Loveland pass and ski from your car',
    accessPoint: 'Park and Go!',
    hike: 'The problem with skiing down from you car is that you will need a ride back up. You can coordinate with a friend, or do as the locals do and hitch hike back up',
    img: 'https://www.uncovercolorado.com/wp-content/uploads/2015/02/2015-01-Loveland-Pass-Backcountry-Skiing03-1280x853.jpg'
})

const easyTrail = new TrailModel({ difficulty: 'Begginer', description: 'Mellow pitch with open space' })
const moderateTrail = new TrailModel({ difficulty: 'Intermediate', description: 'Areas of crowded Aspens, some steeps' })
const hardTrail = new TrailModel({ difficulty: 'Expert', description: 'Steep terrain with variable conditions and cliff faces'})

//assign trails to mountains
const mountains = [mountTallac, meadowMountain, lovelandPass]
const trails = [easyTrail, moderateTrail, hardTrail]
const users = [samShaefer, mattWest, adeleKeating, georgiaBeauregard]

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