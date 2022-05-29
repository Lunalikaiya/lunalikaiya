const {Schema, model} = require('mongoose')

const movieSchema = new Schema({
    title: {type: String},
    image: {type: String, default: "https://res.cloudinary.com/dluwizg51/image/upload/v1651747098/PROJECTS/no_image_pp3wpw.png"},
    body: {type: String},
    description: {type: String},
    date: {type: Date, default: Date.now},
    comments: [{type: Schema.Types.ObjectId, ref: 'MovieComment'}]
})

module.exports = model('Movie', movieSchema)