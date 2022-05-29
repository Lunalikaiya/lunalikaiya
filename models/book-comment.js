const {Schema, model} = require('mongoose')

const bookCommentSchema = new Schema({
    text: {type: String, trim: true, required: true},
    date: {type: Date, default: Date.now},
    book: {type: Schema.Types.ObjectId, ref: 'Book'},
    user : {type: Schema.Types.ObjectId, ref: 'User'}
})

module.exports = model('BookComment', bookCommentSchema)