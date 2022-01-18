const mongoose = require('mongoose')

const friendSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    image: {
        type: String,
        default: 'https://source.unsplash.com/collection/1659999'
    },

    description: {
        type: String,
        default: 'no description'
    },

    hobbies: {
        type: [String],
        lowercase: true,
        default: ['eat', 'work', 'sleep']
    },

    rating: {
        type: Number,
        default: 5,
        min: 1,
        max: 10
    },

    birthday: {
        type: Date,
        default: null
    },

    lastMet: {
        type: Date,
        default: null
    }

})

friendSchema.virtual('birthdayISO')
    .get(function () {
        return this.birthday.toISOString().split('T')[0]
    })

friendSchema.virtual('lastMetISO')
    .get(function () {
        return this.lastMet.toISOString().split('T')[0]
    })

friendSchema.methods.parseHobbies = function() {
    this.hobbies = this.hobbies[0].split(',')
}

module.exports = mongoose.model('Friend', friendSchema);