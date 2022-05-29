const Router = require('express').Router
const router = new Router()
const passport = require('passport')
const controller = require('./controller')

router.post('/reg',
    controller.registration,
    passport.authenticate('local', {
        successRedirect: "/profile",
        failureRedirect: "/register"
    }));

router.post('/login',
    passport.authenticate('local', {
        successRedirect: "/profile",
        failureRedirect: "/login"
    }));

router.get('/profile', controller.profile)

router.get('/registration', (req, res) => {
    res.render('registration')
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/music', controller.music)

router.get('/music/:id', controller.mus)

router.post('/music/:id/comment', controller.musicComment)

router.get('/music/:id/favourite', controller.musicFav)


router.get('/movie', controller.movies)

router.get('/movie/:id', controller.movie)

router.post('/movie/:id/comment', controller.movieComment)

router.get('/movie/:id/favourite', controller.movieFav)



router.get('/literature', controller.liter)

router.get('/literature/:id', controller.lit)

router.post('/literature/:id/comment', controller.literComment)

router.get('/literature/:id/favourite', controller.literFav)

router.get('/reviews', controller.reviews)

router.post('/reviews', controller.postReview)

router.get('/', (req, res) => {
    res.render('index')
})



module.exports = router