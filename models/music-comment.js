const {Schema, model} = require('mongoose')

const musicCommentSchema = new Schema({
    text: {type: String, trim: true, required: true},
    date: {type: Date, default: Date.now},
    music: {type: Schema.Types.ObjectId, ref: 'Music'},
    user : {type: Schema.Types.ObjectId, ref: 'User'}
})

module.exports = model('MusicComment', musicCommentSchema)