const DB_URI = 'mongodb://localhost:27017/friend-scribe'

const mongoose = require('mongoose')
const Friend = require('../models/Friend')

//mongoose connection -------
mongoose.connect(DB_URI)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', () => {console.log(`Connected to db uri: ${DB_URI}`)})

Friend.deleteMany({})
    .then((p) => {
        console.log(p)
    })
    .catch(err => {
        console.log(err)
    })  

const friends = [
    {
        name: 'Abe Abraham',
        image: 'https://images.unsplash.com/photo-1641872450446-e4a9f038b6b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        description: 'met in college. Likes to eat spaghetti',
        hobbies: ['bowling', 'running', 'painting'],
        rating: 8,
        birthday: '1990-12-25',
        lastMet: '2020-1-12'
    },
    {
        name: 'Bob Burns',
        description: 'amazing runner',
        hobbies: ['running', 'swimming', 'biking'],
        rating: 10,
        lastMet: '2021-4-12'
    },
    {
        name: 'Cass Campio'
    }
]

Friend.insertMany(friends)
    .then((p) => {
        console.log(p)
    })
    .catch(err => {
        console.log(err)
    })