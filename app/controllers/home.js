var express = require('express'),
  router = express.Router();
  // articles = req;

module.exports = function (app) {
  app.use('/', router);
};

router.use('/', function (req, res, next) {
  res.links = {
    life: false,
    work: false,
    sandbox: false
  };

  res.articles = {
    life: [{
      title: "Your bones don't break,",
      text: "mine do. That's clear. Your cells react to bacteria and viruses differently than mine. You don't get sick, I do. That's also clear. But for some reason, you and I react the exact same way to water. We swallow it too fast, we choke. We get some in our lungs, we drown. However unreal it may seem, we are connected, you and I. We're on the same curve, just on opposite ends."
    }],
    work: [{
      title: "Normally,",
      text: "both your asses would be dead as fucking fried chicken, but you happen to pull this shit while I'm in a transitional period so I don't wanna kill you, I wanna help you. But I can't give you this case, it don't belong to me. Besides, I've already been through too much shit this morning over this case to hand it over to your dumb ass."
    }],
    sandbox: [{
      title: "Quentin Tarantino wanted Jules",
      text: "to have a big afro. He sent this PA out to buy a wig. She went to South Central and bought this jeri-curl wig. And Quentin was going off, saying, 'It's got to be an afro because he had this whole blaxploitation thing'. I told him, 'That's the South Central look.' You look at Ice Cube and NWA. Guys had all this shit dripping down their necks. I had already grown the sideburns out and the mustache. It was perfect. Total Gangster."
    }, {
      title: "I understood, through rehab,",
      text: "things about creating characters. I understood that creating whole people means knowing where we come from, how we can make a mistake and how we overcome things to make ourselves stronger."
    }]
  };

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