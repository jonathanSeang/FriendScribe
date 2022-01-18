/*
Goal: store relevent info to hang out with friends
- find all friends
- track last time I msg'd a friend
- see all friends who do a certain hobby
- msg friends also using this website

*/

const DB_URI = 'mongodb://localhost:27017/friend-scribe'
const SERVER_PORT = 3000

//imports -------
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')

//models -------
const Friend = require('./models/friend')

//mongoose connection -------
mongoose.connect(DB_URI)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', () => {console.log(`Connected to db uri: ${DB_URI}`)})

//express setup -------
const app = express()

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

//Request handlers -------

//home page
app.get('/', (req, res) => {
    res.render('home')
})

//display all
app.get('/friends', async(req, res) => {
    const friends = await Friend.find({})
    res.render('friends/index', {friends})
})

//form to create new
app.get('/friends/new', (req, res) => {
    res.render('friends/new')
})

//submit form
app.post('/friends', async(req, res) => {
    const newFriend = new Friend(req.body.friend)
    await newFriend.parseHobbies()
    await newFriend.save()
    res.redirect(`/friends/${newFriend._id}`)
})

//get details of specific
app.get('/friends/:id', async(req, res) => {
    const friend = await Friend.findById(req.params.id)
    res.render('friends/show', {friend})
})

//update
app.get('/friends/:id/edit', async(req, res) => {
    const friend = await Friend.findById(req.params.id)
    res.render('friends/edit', {friend})
})

//submit update
app.put('/friends/:id', async(req, res) => {
    const friend = await Friend.findByIdAndUpdate(req.params.id, {...req.body.friend}, {runValidators: true, upsert: true, setDefaultsOnInsert: true})
    await friend.parseHobbies()
    res.redirect(`/friends/${friend._id}`)
})

//delete
app.delete('/friends/:id', async(req, res) => {
    await Friend.findByIdAndDelete(req.params.id)
    res.redirect('/friends')
})



app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port: ${SERVER_PORT}`)
})