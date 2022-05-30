const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    email: {type: String, unique: true},
    username: {type: String, unique: true},
    password: {type: String},
    favMovie: [{type: Schema.Types.ObjectId, ref: 'Movie'}],
    favMusic: [{type: Schema.Types.ObjectId, ref: 'Music'}],
    favLiter: [{type: Schema.Types.ObjectId, ref: 'Book'}],
    roles: {type: []}
})

module.exports = model('User', userSchema)
