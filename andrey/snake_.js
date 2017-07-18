var pressKey = addEventListener("keydown", function(e){setMovementDirection(e)});
var Field = {
	elementF: mainFrame,
	width: 480,
	heigth: 480,

};
var food = {
	elementFood: food,
	xFood: null,
	yFood: null,
}
function startFoodGeneration(){
	if(food.xFood == null && food.yFood == null)
	{
		foodGenerator ();
	}
}
function foodGenerator ()
{
	var randomNumber = (Math.random()*1000 / 2.2 + 10).toString();
	var x = parseInt(randomNumber.substring(0, 3), 10);
	randomNumber = (Math.random()*1000 / 2.2 + 10).toString();
	var y = parseInt(randomNumber.substring(0, 3), 10);
	var newFoodDiv = document.createElement("div");
	newFoodDiv.id = "food";
	newFoodDiv.className = "food";
	document.getElementById("mainFrame").appendChild(newFoodDiv);
	food.xFood = document.getElementById("food").style.left = x.toString() + "px";
	food.yFood = document.getElementById("food").style.top = y.toString() + "px";
}

var snake = {
	element: snakeHead,
	speed: 2,
	snakeParts: [snakeHead],
	moveX: 1,
	moveY: 1,
	color: 'red',
	direction: 0,
	diedMessageSwitch: -1,
	GameZone: Field.heigth - document.getElementById("mainFrame").clientLeft - document.getElementById("snakeHead").clientWidth / 2,

	moveLeft: function() {

		if (this.moveX > 0)
		{
			this.moveX -= this.speed;

			this.element.style.left = this.moveX.toString() + 'px';

			// for(var i = 1; i < snake.snakeParts.length; i++)
			// {
			// 	snake.snakeParts[i].style.left = this.moveX.toString() + 'px';
			// }


			checkIfFoodEaten(food.xFood, food.yFood, this.element.style.left, this.element.style.top);

		}
		else
		{
			this.diedMessageSwitch++;
			died(this.diedMessageSwitch);
		}

	},
	moveRight: function() {
		if (this.moveX < this.GameZone)
		{
			this.moveX += this.speed;

			this.element.style.left = this.moveX.toString() + 'px';

			// for(var i = 1; i < snake.snakeParts.length; i++)
			// {
			// 	snake.snakeParts[i].style.left = this.moveX.toString() + 'px';
			// }

			checkIfFoodEaten(food.xFood, food.yFood, this.element.style.left, this.element.style.top);

		}
		else
		{
			this.diedMessageSwitch++;
			died(this.diedMessageSwitch);
		}

	},
	moveUp: function() {
 		if (this.moveY > 0)
 		{
 			this.moveY -= this.speed;

			this.element.style.top = this.moveY.toString() + 'px';

			// for(var i = 1; i < this.snakeParts.length; i++)
			// {
			// 	snake.snakeParts[i].style.top = this.moveY.toString() + 'px';
			// }

			checkIfFoodEaten(food.xFood, food.yFood, this.element.style.left, this.element.style.top);

 		}
 		else
		{
			this.diedMessageSwitch++;
			died(this.diedMessageSwitch);
		}

	},
	moveDown: function() {
 		if (this.moveY < this.GameZone)
 		{
 			this.moveY += this.speed;

			this.element.style.top = this.moveY.toString() + 'px';

			// for(var i = 1; i < this.snakeParts.length; i++)
			// {
			// 	snake.snakeParts[i].style.top = this.moveY.toString() + 'px';
			// }

			checkIfFoodEaten(food.xFood, food.yFood, this.element.style.left, this.element.style.top);

 		}
 		else
		{
			this.diedMessageSwitch++;
			died(this.diedMessageSwitch);
		}

	}

};
// var GameZone = Field.heigth - document.getElementById("mainFrame").clientLeft - snake.element.clientWidth / 2;
var moveRight = null;
var moveLeft = null;
var moveDown = null;
var moveUp = null;
var dT = 20;

function setMovementDirection(pressKey) {
	 clearAllIntervals();

	if(pressKey.keyCode == 37)
	{
		snake.moveLeft();
		moveLeft = setInterval(function()
		{
			snake.moveLeft();
		},
		dT);
	}
	else if(pressKey.keyCode == 39)
	{
		snake.moveRight();
		moveRight = setInterval(function()
		{
			snake.moveRight();
		},
		dT);
	}
	else if(pressKey.keyCode == 38)
	 {
		snake.moveUp();
		moveUp = setInterval(function()
		{
			snake.moveUp();
		},
		dT);
	}
	else if(pressKey.keyCode == 40)
	{
		snake.moveDown();
		moveDown = setInterval(function()
		{
			snake.moveDown();
		},
		dT);
	}
};

function clearAllIntervals () {

	clearInterval(moveDown);
	clearInterval(moveUp);
	clearInterval(moveLeft);
	clearInterval(moveRight);

}
startFoodGeneration();

function died (x)
{
	if (x==1)
	{
		clearAllIntervals();
		alert("You've died!");
	}
}


function checkIfFoodEaten (xFood, yFood, xSnake, ySnake)
{
	var dXY = parseInt(snake.element.clientWidth / 2);
	var dXmax = parseInt(xFood) + dXY;
	var dXmin = parseInt(xFood) - dXY;
	var dYmax = parseInt(yFood) + dXY;
	var dYmin = parseInt(yFood) - dXY;
	var xSnake = parseInt(xSnake);
	var ySnake = parseInt(ySnake);
	if( (dXmax >= xSnake && dXmin <= xSnake) && (dYmax >= ySnake && dYmin <= ySnake) )
	{
		var foodElement = document.getElementById("food");
		foodElement.parentNode.removeChild(foodElement);
		foodGenerator ();
		snakeRising ();
	}

}
function snakeRising ()
{
	var snakeNextPart = document.createElement("div");
	snakeNextPart.className = "snakeBody";
	document.getElementById("mainFrame").appendChild(snakeNextPart);

	snake.snakeParts.push(snakeNextPart);

	snakeNextPart.style.left = snake.moveX.toString() + "px";
	snakeNextPart.style.top = snake.moveY.toString() + "px";

}
