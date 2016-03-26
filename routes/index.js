var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Album Saver' });
});

router.get('/albums', function(req, res, next) {
  knex('albums').then(function (records){
    res.render('albums', {albums: records});
    if(document.getElementById("expl").checked='true'){
      document.getElementById("expl2").textContent="Not Nice";
    } else {
      document.getElementById("expl2").textContent="Nice";
    }
  });
});

var getGenres = function() {
  return [
    {value: 'pop', title: 'Pop'},
    {value: 'rock', title: 'Rock'},
    {value: 'rnB', title: 'R\'n\'B'},
    {value: 'jazz', title: 'Jazz'},
    {value: 'rap', title: 'Rap'},
    {value: 'new age', title: "New Age"},
    {value: 'electronic', title: 'Electronic'},
    {value: 'country', title: 'Country'},
    {value: 'reggae', title: 'Reggae'}
  ]
}

router.get('/albums/creator', function(req, res, next) {
  res.render('creator', {genres: getGenres()});
});

router.get('/albums/:id', function(req, res, next) {
  knex('albums').where('id', req.params.id).then(function (records){
    res.render('info', {album: records[0]});
  });
});

router.get('/edit/:id', function(req, res, next) {
  knex('albums').where('id', req.params.id).then(function (records){
    res.render('edit', {genres: getGenres(), album: records[0]});
  });
});

router.post('/albums/edit/:id', function(req, res, next) {
  knex('albums').where('id', req.params.id).update(req.body).then(function(){
    res.redirect('/albums')
  })
});

router.post('/albums/:id/delete', function(req, res, next) {
  knex('albums').where('id', req.params.id).del().then(function(){
    res.redirect('/albums')
  })
});

router.post('/albums', function(req, res, next) {
  knex('albums').insert(req.body).then(function(){
    res.redirect('/albums')
  })
});



module.exports = router;
