// bower noisejs
// bower animation-frame
// canvas(id='scrawl')

/* global Noise:true */
/* global AnimationFrame:true */

var so = so || {};

$(function(){
  so.animationFrame = new AnimationFrame();

  so.canvas = document.getElementById('scrawl');
  so.ctx = so.canvas.getContext('2d');

  so.canvas.width = window.innerWidth;
  so.canvas.height = window.innerHeight / 2;

  so.width = window.innerWidth;
  so.height = window.innerHeight / 2;

  so.xanchor = (2 * so.width) / 3;
  so.yanchor = (4 * so.height) / 5;

  so.noise = new Noise(Math.random());
	so.xstart = Math.random() * 10.0;
	so.ystart = Math.random() * 10.0;
	so.xposnoise = Math.random() * 10.0;
	so.yposnoise = Math.random() * 10.0;
	so.squaresize = 22;

  so.x = 0;
  so.y = 10;

  so.draw = function() {
    so.animationFrame.request(so.draw);

    so.ctx.strokeStyle = 'rgba(55, 54, 53, 0.15)';
    so.ctx.fillStyle = 'rgba(235, 230, 225, 0.6)';

    so.xposnoise += 0.02;
    so.yposnoise += 0.01;
    so.midx = so.xanchor + Math.floor(so.noise.simplex2(so.xposnoise, 0) * 60);
    so.midy = so.yanchor + Math.floor(so.noise.simplex2(so.yposnoise, 0) * 80);
    so.xstart += 0.02;
    so.ystart += 0.01;
    var ynoise = so.ystart;

    for (var y = -so.squaresize; y < so.squaresize; y++) {
      ynoise += 0.02;
      var xnoise = so.xstart;

      for (var x = -so.squaresize; x < so.squaresize; x++) {
        xnoise += 0.02;
        var nFactor = Math.abs(so.noise.simplex2(xnoise, ynoise));
        so.drawPoint(x, y, nFactor);
      }
    }
  };

  so.drawPoint = function(ex, why, noiseFactor) {
    var x = so.midx + (ex * noiseFactor * 13);
    var y = so.midy + (why * noiseFactor * 9);
    var edgeSize = noiseFactor * 26;

    so.ctx.beginPath();

    so.ctx.arc(x, y, edgeSize, 0, Math.PI*2,true);
    // x, y, rad, start angle, end angle, anti/clockwise

	  so.ctx.fill();
	  so.ctx.stroke();
  };

  so.resizeCanvas = function() {
    so.canvas.width = window.innerWidth;
    so.canvas.height = window.innerHeight / 2;

    so.width = window.innerWidth;
    so.height = window.innerHeight / 2;

    so.xanchor = (2 * so.width) / 3;
    so.yanchor = (4 * so.height) / 5;

  };

  window.addEventListener('resize', so.resizeCanvas, false);

  so.draw();

});