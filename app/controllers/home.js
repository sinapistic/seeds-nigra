var express = require('express'),
  router = express.Router(),
  articles = require('../models/article');

module.exports = function (app) {
  app.use('/', router);
};

router.use('/', function (req, res, next) {
  console.log('hello');

  res.links = {
    life: false,
    work: false,
    sandbox: false
  };

  res.articles = articles;

  next();
});

router.get('/', function (req, res, next) {
  res.links.life = true;

  res.render('index', {
    title: 'jenc.so',
    page: 'life',
    links: res.links,
    articles: res.articles.life
  });

  console.log('rendered root (life)');
});

router.get('/:route', function (req, res, next) {
  if (res.articles.length === 0) {
    console.log('nothing found');
    res.status(404).render('error', {
      title: 'jenc.so - 404',
      page: 'fourohfour',
      links: res.links,
      message: '404',
      error: {status: "that page doesn't exist yet- want me to make it?"}
    });

    console.log('rendered 404');
  }

  else {
    res.links[req.params.route] = true;

    res.render('index', {
      title: 'jenc.so - ' + req.params.route,
      page: req.params.route,
      links: res.links,
      articles: res.articles[req.params.route]
    });

    console.log('rendered ' + req.params.route);
  }
});