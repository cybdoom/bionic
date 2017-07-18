var targetsOnBoard  = 0,
    maxtargetsCount = 15,
    score           = 0;

var randomCell = function () {
    var i = Math.floor(Math.random() * 4);
    var j = Math.floor(Math.random() * 4);
    var id = i.toString() + ' ' + j.toString();
    return window[id];
};

var onSadKittyClick = function (e) {
    e.currentTarget.parentElement.removeChild(e.currentTarget);
    targetsOnBoard -= 1;
    score += 10;
    updateScoreLabel();
};

var onHappyKittyClick = function (e) {
    e.currentTarget.parentElement.removeChild(e.currentTarget);
    targetsOnBoard -= 1;
    score -= 20;
    updateScoreLabel();
};

var updateScoreLabel = function () {
    var scoreLabel = document.querySelector('.score');
    scoreLabel.textContent = score;

    if (score >= 300) {
        alert("Done! You have catched all cats!");

    }
};

var turnTargetIntoKitty = function (target) {
    var shouldBeHappy = (score >= 100 && Math.random() <= 0.35);

    if (shouldBeHappy) {

        target.classList.add('happy-kitty');
        target.addEventListener('click', onHappyKittyClick);
        target.setAttribute("src", "https://clck.ru/9shxD");


    } else {
        target.classList.add('sad-kitty');
        target.addEventListener('click', onSadKittyClick);
    }

};

var createNewTarget = function () {
    var newTarget = document.createElement("img");
    newTarget.setAttribute("src", "https://clck.ru/BMWYy");
    return newTarget;

};

var fillCell = function (target) {
    var cell;

    for (; ;) {
        cell = randomCell();
        if (cell.children.length <= 0) break;
    }

    cell.appendChild(target);
};

var targetFunction = function () {
  if (targetsOnBoard <= maxtargetsCount || finish) {
    var newTarget = createNewTarget();

    turnTargetIntoKitty(newTarget);
    fillCell(newTarget);

    targetsOnBoard += 1;
    setTimeout(targetFunction, 600);

    if (targetsOnBoard == 16 ) {
      alert("You LOSE!");
      resetGame();
    }
  }
};

var resetGame = function() {
  score = 0;
  updateScoreLabel();
  targetsOnBoard = 0;
  for(var i = 0; i <= 3; i++)
    for(var j = 0; j <= 3; j++) {
      var id = i.toString() + ' ' + j.toString();
      var cell = window[id];
      cell.innerHTML = '';
    }
}

var onStartClick = function() {
    targetFunction();
    start.removeEventListener('click', onStartClick)
};

start.addEventListener('click', onStartClick);






