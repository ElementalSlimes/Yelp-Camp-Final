const mongoose = require('mongoose')
const Campground = require('../models/campground')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/yelp-camp'), {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Database connected")
})

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 200; i++) {
        const price = Math.floor(Math.random() * 20) + 10
        const random1000 = Math.floor(Math.random() * 1000)
        const camp = new Campground({
            author: '65f8d383c00310c61f88c963',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            //image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias dolores incidunt nostrum ipsam, esse deserunt fugiat! Vitae aspernatur quae necessitatibus suscipit quibusdam. Ex blanditiis expedita porro nam excepturi natus ut!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            }

        })
        await camp.save();
    }

}

seedDB().then(() => {
    console.log("has been seeded")
    mongoose.connection.close()
})