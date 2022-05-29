const {Schema, model} = require('mongoose')

const movieCommentSchema = new Schema({
    text: {type: String, trim: true, required: true},
    date: {type: Date, default: Date.now},
    movie: {type: Schema.Types.ObjectId, ref: 'Movie'},
    user : {type: Schema.Types.ObjectId, ref: 'User'}
})

module.exports = model('MovieComment', movieCommentSchema)