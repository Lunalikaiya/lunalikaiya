const {Schema, model} = require('mongoose')

const reviewSchema = new Schema({
    text: {type: String, trim: true, required: true},
    date: {type: Date, default: Date.now},
    user : {type: Schema.Types.ObjectId, ref: 'User'}
})

module.exports = model('Review', reviewSchema)