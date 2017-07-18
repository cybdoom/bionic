var score = 0;

var copy = function(object) {
  var result = {};

  Object.keys(object).forEach(function(key) {
    result[key] = object[key];
  });

  return result;
};

var theWorld = {
  dT:         25,
  element:    world,
  height:     650,
  width:      900,
  spaceWidth: 100,
  obstacles:  [],
  obstacleDelta: 200,
  time: 0,
  obstacleSpawnInterval: 750,

  spawnNewObstracle: function() {
    var newObstracle = copy(obstacle);
    newObstracle.d1 = theWorld.obstacleDelta * Math.random();
    newObstracle.d2 = theWorld.obstacleDelta * Math.random();
    var topElement = document.createElement('div'),
        bottomElement = document.createElement('div');

    topElement.classList.add('obstacle');
    topElement.classList.add('top');
    topElement.style.height = (newObstracle.height - newObstracle.d1).toString() + 'px';

    bottomElement.classList.add('obstacle');
    bottomElement.classList.add('bottom');
    bottomElement.style.height = (newObstracle.height - newObstracle.d2).toString() + 'px';

    newObstracle.topElement = topElement;
    newObstracle.bottomElement = bottomElement;

    theWorld.element.appendChild(topElement);
    theWorld.element.appendChild(bottomElement);
    theWorld.obstacles.push(newObstracle);
  },

  removeOldObstracle: function() {
    leftObstracle = theWorld.obstacles[0];
    if (leftObstracle && leftObstracle.x + leftObstracle.width <= 0) {
      leftObstracle.topElement.remove();
      leftObstracle.bottomElement.remove();
      theWorld.obstacles.shift();
    }
  },

  checkInterjection: function() {
    return theWorld.birdInterjectsObstracle(theBird, theWorld.obstacles[0]);
  },

  birdInterjectsObstracle: function(bird, obstacle) {
    if (!obstacle)
      return false;
    if (obstacle.x + 20 > theBird.x + theBird.radius * 2)
      return false;
    else {
      var y1 = obstacle.height - obstacle.d1,
          y2 = theWorld.height - (obstacle.height - obstacle.d2);

      return bird.y < y1 - 10 || bird.y + bird.radius * 2 > y2 + 10;
    }
  }
};

var obstacle = {
  width: 75,
  x: theWorld.width,
  height: 275,

  moveLeft: function() {
    this.x = this.x - theBird.xSpeed;
    this.updatePosition();
  },

  updatePosition: function() {
    this.topElement.style.left = this.x.toString() + 'px';
    this.bottomElement.style.left = this.x.toString() + 'px';
  }
};

var theBird = {
  radius:  35,
  element: bird,
  y:       theWorld.height / 2,
  x:       30,
  xSpeed:  10,
  ySpeed:  10,

  move: function(e) {
    if (e.keyCode == 119 && theBird.y - theBird.ySpeed > 0) {
      theBird.y -= theBird.ySpeed;
    } else if (e.keyCode == 115 && theBird.y + theBird.ySpeed + theBird.radius * 2 < theWorld.height) {
      theBird.y += theBird.ySpeed;
    }

    theBird.updatePosition();
  },

  updatePosition: function() {
    theBird.element.style.top = theBird.y.toString() + 'px';
  }
};
var fly = function() {
  theWorld.obstacles.forEach(function(obstacle) {
    obstacle.moveLeft.bind(obstacle)();
  });

  if (theWorld.time > theWorld.obstacleSpawnInterval) {
    theWorld.spawnNewObstracle();
    theWorld.time = 0;
  }
  else
    theWorld.time += theWorld.dT;
  theWorld.removeOldObstracle();

  if (theWorld.checkInterjection()) {
    alert('Your score ' + score + ' points. TRY AGAIN FRIEND!!!');
    restartGame();
  } else {
    score++;
    updateScoreLabel();
  }
};
// -----
   var backGroundChangers = document.getElementById('world');
   var i = 0;
   if(i<score && score>250 ){
     backGroundChangers.style.background = "url('sky.jpg')"
   }

// -------

var restartGame = function() {
  theWorld.obstacles.forEach(function(obstacle) {
    obstacle.topElement.remove();
    obstacle.bottomElement.remove();
  });

  theWorld.obstacles = [];
  score = 0;
  updateScoreLabel();
};

var updateScoreLabel = function() {
  scoreLabel.innerText = score.toString();
};

theBird.updatePosition();
theWorld.element.focus();
addEventListener('keypress',function (e) {
  theBird.move(e);
});

setInterval(fly, theWorld.dT);
