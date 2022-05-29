const userService = require('./service')
const userModel = require('./models/user-model')
const musicModel = require('./models/music-model')
const bookModel = require('./models/book-model')
const movieModel = require('./models/movie-model')
const movieComment = require('./models/movie-comment')
const bookComment = require('./models/book-comment')
const musicComment = require('./models/music-comment')
const review = require('./models/review-model')
const passwordComplexity = require("joi-password-complexity")

class Controller {
    async registration(req, res, next) {
        try {
            const complexityOptions = {
                min: 7, max: 32, lowercase: 1,
                uppercase: 1, numeric: 1, symbol: 1, requirementCount: 1
            };

            const result = passwordComplexity(complexityOptions).validate(req.body.password)
            if (result.error != null) {
                return res.redirect('back')
            }
            const {email, username, password} = req.body
            await userService.registration(email, username, password)
            return next()
        } catch (e) {
            next(e)
        }
    }

    async profile(req, res, next) {
        try {
            if (req.user == null)
                return res.redirect('/registration')
            const user = await userModel.findOne({_id: req.user._id}).populate('favMusic').populate('favMovie').populate('favLiter')
            res.render('profile', {user: user})
        } catch (e) {
            next(e)
        }
    }

    async music(req, res, next) {
        try {
            const music = await musicModel.find()
            res.render('music', {music: music})
        } catch (e) {
            next(e)
        }
    }

    async mus(req, res, next) {
        try {
            const music = await musicModel.findById(req.params.id).populate({
                path: 'comments', model: 'MusicComment',
                populate: {path: 'user', model: 'User'}
            })

            res.render('music_page', {music: music})
        } catch (e) {
            next(e)
        }
    }

    async musicComment(req, res, next) {
        try {
            if (req.user == null) return res.redirect('back')

            req.body.music = req.params.id
            req.body.user = req.user._id

            const comment = await musicComment.create(req.body)
            await musicModel.findOneAndUpdate(
                {_id: req.body.music},
                {$push: {comments: comment}})
            res.redirect('back')
        } catch (e) {
            next(e)
        }
    }

    async musicFav(req, res, next) {
        try {
            if (req.user == null) return res.redirect('back')

            const user = await userModel.findOne({_id: req.user.id}).populate('favMusic')
            const music = await musicModel.findOne({_id: req.params.id})

            user.favMusic.forEach(function (fav) {
                if (music.equals(fav)) return res.redirect('back')
            })

            await userModel.findOneAndUpdate(
                {_id: req.user._id},
                {$push: {favMusic: music}})

            res.redirect('back')
        } catch (e) {
            next(e)
        }
    }

    async movies(req, res, next) {
        try {
            const movie = await movieModel.find()
            res.render('movie', {movie: movie})
        } catch (e) {
            next(e)
        }
    }

    async movie(req, res, next) {
        try {
            const movie = await movieModel.findById(req.params.id).populate({
                path: 'comments', model: 'MovieComment',
                populate: {path: 'user', model: 'User'}
            })

            res.render('movie_page', {movie: movie})
        } catch (e) {
            next(e)
        }
    }

    async movieComment(req, res, next) {
        try {
            if (req.user == null) return res.redirect('back')

            req.body.movie = req.params.id
            req.body.user = req.user._id

            const comment = await movieComment.create(req.body)
            await movieModel.findOneAndUpdate(
                {_id: req.body.movie},
                {$push: {comments: comment}})
            res.redirect('back')
        } catch (e) {
            next(e)
        }
    }

    async movieFav(req, res, next) {
        try {
            if (req.user == null) return res.redirect('back')

            const user = await userModel.findOne({_id: req.user.id}).populate('favMovie')
            const movie = await movieModel.findOne({_id: req.params.id})

            user.favMovie.forEach(function (fav) {
                if (movie.equals(fav)) return res.redirect('back')
            })

            await userModel.findOneAndUpdate(
                {_id: req.user._id},
                {$push: {favMovie: movie}})

            res.redirect('back')
        } catch (e) {
            next(e)
        }
    }

    async liter(req, res, next) {
        try {
            const liter = await bookModel.find()
            res.render('literature', {lit: liter})
        } catch (e) {
            next(e)
        }
    }

    async lit(req, res, next) {
        try {
            const liter = await bookModel.findById(req.params.id).populate({
                path: 'comments', model: 'BookComment',
                populate: {path: 'user', model: 'User'}
            })

            res.render('book_page', {book: liter})
        } catch (e) {
            next(e)
        }
    }

    async literComment(req, res, next) {
        try {
            if (req.user == null) return res.redirect('back')

            req.body.liter = req.params.id
            req.body.user = req.user._id

            const comment = await bookComment.create(req.body)
            await bookModel.findOneAndUpdate(
                {_id: req.body.liter},
                {$push: {comments: comment}})
            res.redirect('back')
        } catch (e) {
            next(e)
        }
    }

    async literFav(req, res, next) {
        try {
            if (req.user == null) return res.redirect('back')

            const user = await userModel.findOne({_id: req.user.id}).populate('favLiter')
            const liter = await bookModel.findOne({_id: req.params.id})

            user.favLiter.forEach(function (fav) {
                if (liter.equals(fav)) return res.redirect('back')
            })

            await userModel.findOneAndUpdate(
                {_id: req.user._id},
                {$push: {favLiter: liter}})

            res.redirect('back')
        } catch (e) {
            next(e)
        }
    }

    async reviews(req, res, next) {
        try {
            const reviews = await review.find().populate('user')
            res.render('reviews', {rev: reviews})
        }
        catch (e) {
            next(e)
        }
    }

    async postReview(req, res, next) {
        try {
            if (req.user == null) return res.redirect('back')

            req.body.user = req.user._id
            await review.create(req.body)
            res.reload()
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new Controller()