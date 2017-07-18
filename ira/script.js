var bulletCount = 0;
var bulletCountComputer = 0;
var tankCount = 0;
var iTank = 0;
var nTank = 10;
var score = 0;
var lifeTankPlayer = 3;
var GameOverSign = 0;
var PlayerWinSign = 0;
var sizeTank = 32;
var sizeBullet = 8;
var speedBullet = 16;
var speedTank = 8;

function removeDirection(obj) {
	obj.classList.remove('directionUp');
	obj.classList.remove('directionRight');
	obj.classList.remove('directionDown');
	obj.classList.remove('directionLeft');
};
function directionUp(element,className,CoorY) {
	removeDirection(element);
	element.classList.add(className);
	CoorY = CoorY - speedTank;
	return CoorY;
};
function directionLeft(element,className,CoorX) {
	removeDirection(element);
	element.classList.add(className);
	CoorX = CoorX + speedTank;
	return CoorX;
};
function directionDown(element,className,CoorY) {
	removeDirection(element);
	element.classList.add(className);
	CoorY = CoorY + speedTank;
	return CoorY;
};
function directionRight(element,className,CoorX) {
	removeDirection(element);
	element.classList.add(className);
	CoorX = CoorX - speedTank;
	return CoorX;
};
function updatePosition(element,CoorX,CoorY) {
	element.style.left = CoorX.toString() + 'px';
	element.style.top = CoorY.toString() + 'px';
};
function conflictCheck (CoorX,CoorY) {	
	var xTankTarget = theTankPlayer1.x;
	var yTankTarget = theTankPlayer1.y;
	var encounter = 0;
	for (kTank = 0; kTank <= nTank; kTank++) {
	var nameTankCheck = String('tankComputer' + kTank);
	var isElemTankCheck = document.getElementById(nameTankCheck);
		if (isElemTankCheck != null && kTank != pTank) {
		var xTankComputerBefore = parseInt(isElemTankCheck.style.left);
		var yTankComputerBefore = parseInt(isElemTankCheck.style.top);
			if (CoorX >= xTankComputerBefore && CoorX <= xTankComputerBefore + sizeTank && CoorY >= yTankComputerBefore && CoorY <= yTankComputerBefore + sizeTank) {	
				encounter = 1;
			} else if (CoorX + sizeTank >= xTankComputerBefore && CoorX + sizeTank <= xTankComputerBefore + sizeTank && CoorY >= yTankComputerBefore && CoorY <= yTankComputerBefore + sizeTank) {	
				encounter = 1;
			} else if (CoorX >= xTankComputerBefore && CoorX <= xTankComputerBefore + sizeTank && CoorY + sizeTank >= yTankComputerBefore && CoorY + sizeTank <= yTankComputerBefore + sizeTank) {	
				encounter = 1;
			} else if (CoorX + sizeTank >= xTankComputerBefore && CoorX + sizeTank <= xTankComputerBefore + sizeTank && CoorY + sizeTank >= yTankComputerBefore && CoorY + sizeTank <= yTankComputerBefore + sizeTank) {	
				encounter = 1;
			} else if (CoorX >= xTankTarget	&& CoorX <= xTankTarget + sizeTank && CoorY >= yTankTarget && CoorY <= yTankTarget + sizeTank) {	
				encounter = 1;
			} else if (CoorX + sizeTank >= xTankTarget && CoorX + sizeTank <= xTankTarget + sizeTank && CoorY >= yTankTarget && CoorY <= yTankTarget + sizeTank) {	
				encounter = 1;
			} else if (CoorX >= xTankTarget && CoorX <= xTankTarget + sizeTank && CoorY + sizeTank >= yTankTarget && CoorY + sizeTank <= yTankTarget + sizeTank) {	
				encounter = 1;
			} else if (CoorX + sizeTank >= xTankTarget && CoorX + sizeTank <= xTankTarget + sizeTank && CoorY + sizeTank >= yTankTarget && CoorY + sizeTank <= yTankTarget + sizeTank) {	
				encounter = 1;
			} else if (CoorX + sizeTank > theMap.width || CoorX < 0 || CoorY < 0 || CoorY + sizeTank > theMap.height) {	
				encounter = 1;
			}
		} else if (nTank - score == 1) {
			if (CoorX >= xTankTarget	&& CoorX <= xTankTarget + sizeTank && CoorY >= yTankTarget && CoorY <= yTankTarget + sizeTank) {	
				encounter = 1;
			} else if (CoorX + sizeTank >= xTankTarget && CoorX + sizeTank <= xTankTarget + sizeTank && CoorY >= yTankTarget && CoorY <= yTankTarget + sizeTank) {	
				encounter = 1;
			} else if (CoorX >= xTankTarget && CoorX <= xTankTarget + sizeTank && CoorY + sizeTank >= yTankTarget && CoorY + sizeTank <= yTankTarget + sizeTank) {	
				encounter = 1;
			} else if (CoorX + sizeTank >= xTankTarget && CoorX + sizeTank <= xTankTarget + sizeTank && CoorY + sizeTank >= yTankTarget && CoorY + sizeTank <= yTankTarget + sizeTank) {	
				encounter = 1;
			} else if (CoorX + sizeTank > theMap.width || CoorX < 0 || CoorY < 0 || CoorY + sizeTank > theMap.height) {	
				encounter = 1;
			}
		}
	};
	return encounter;
};
function killTank(bullet,tank,num,vector,player){
	num = num + Number(1) * Number(vector);
	bullet.remove();	
	if (Number(player) == 0) {
		tank.remove();
	} else if (num == 0 && Number(player) == 1) {
		tank.remove();
	}
	return num;
}

var theMap = {
	tanks: [],
	bullets: [],
	bulletsComputer: [],
	element: map,
	width: 640,
	height: 480,
	moveBullets: function() {
		for (jBullet = 0; jBullet < theMap.bullets.length; jBullet++) {	
			for (iBullet = 0; iBullet < bulletCount; iBullet++) {		
				var classNameBullet = String('tankBullet' + iBullet);
				var elem = document.getElementById(classNameBullet);
				var x = parseInt(theMap.bullets[jBullet].style.left);
				var y = parseInt(theMap.bullets[jBullet].style.top);				

				if (theMap.bullets[jBullet].classList.contains('directionUp') == true && theMap.bullets[jBullet].classList.contains(classNameBullet) == true && y > -sizeBullet) {
					y = y - speedBullet;
				} else if (theMap.bullets[jBullet].classList.contains('directionRight') == true && theMap.bullets[jBullet].classList.contains(classNameBullet) == true && x > -sizeBullet) {
					x = x - speedBullet;
				} else if (theMap.bullets[jBullet].classList.contains('directionDown') == true && theMap.bullets[jBullet].classList.contains(classNameBullet) == true && y < theMap.height + sizeBullet) {
					y = y + speedBullet;
				} else if (theMap.bullets[jBullet].classList.contains('directionLeft') == true && theMap.bullets[jBullet].classList.contains(classNameBullet) == true && x < theMap.width + sizeBullet) {
					x = x + speedBullet;
				}

			updatePosition(theMap.bullets[jBullet],x,y);

				if (elem != null) {
					var x1 = parseInt(elem.style.left);
					var y1 = parseInt(elem.style.top);
					if (x1 <= -sizeBullet || y1 <= -sizeBullet || y1 >= theMap.height || x1 >= theMap.width) {
						elem.remove();
					} 
				
					for (checkTank = 0; checkTank <= nTank; checkTank++) {
						var nameTankCheck = String('tankComputer' + checkTank);
						var isElemTankCheck = document.getElementById(nameTankCheck);
						if (isElemTankCheck != null) {
							var xTankComputerCheck = parseInt(isElemTankCheck.style.left);
							var yTankComputerCheck = parseInt(isElemTankCheck.style.top);
							if (x1 >= xTankComputerCheck && x1 <= xTankComputerCheck + sizeTank && y1 >= yTankComputerCheck && y1 <= yTankComputerCheck + sizeTank) {	
								score = killTank(elem,isElemTankCheck,score,1,0);
							} else if (x1 + sizeBullet >= xTankComputerCheck && x1 + sizeBullet <= xTankComputerCheck + sizeTank && y1 >= yTankComputerCheck && y1 <= yTankComputerCheck + sizeTank) {	
								score = killTank(elem,isElemTankCheck,score,1,0);
							} else if (x1 >= xTankComputerCheck && x1 <= xTankComputerCheck + sizeTank && y1 + sizeBullet >= yTankComputerCheck && y1 + sizeBullet <= yTankComputerCheck + sizeTank) {	
								score = killTank(elem,isElemTankCheck,score,1,0);
							} else if (x1 + sizeBullet >= xTankComputerCheck && x1 + sizeBullet <= xTankComputerCheck + sizeTank && y1 + sizeBullet >= yTankComputerCheck && y1 + sizeBullet <= yTankComputerCheck + sizeTank) {	
								score = killTank(elem,isElemTankCheck,score,1,0);
							}
						}
					};
				}
			};

			if (score == nTank && PlayerWinSign == 0) {
				var PlayerWin = document.createElement('div');
				PlayerWin.id = 'PlayerWin';
				PlayerWin.classList.add('messenge');
				map.appendChild(PlayerWin);		
				PlayerWinSign = 1;
				document.getElementById('PlayerWin').innerHTML = 'YOU ARE WIN';				
			}
		};
	},
	moveBulletsComputer: function() {
		for (jBulletComputer = 0; jBulletComputer < theMap.bulletsComputer.length; jBulletComputer++) {	
			for (iBulletComputer = 0; iBulletComputer < bulletCountComputer; iBulletComputer++) {				
				var classNameBulletComputer = String('tankBulletComputer' + iBulletComputer);
				var xComputer = parseInt(theMap.bulletsComputer[jBulletComputer].style.left);
				var yComputer = parseInt(theMap.bulletsComputer[jBulletComputer].style.top);
				var elemComputer = document.getElementById(classNameBulletComputer);

				if (theMap.bulletsComputer[jBulletComputer].classList.contains('directionUp') == true && theMap.bulletsComputer[jBulletComputer].classList.contains(classNameBulletComputer) == true && yComputer > -sizeBullet) {
					yComputer = yComputer - speedBullet;
				} else if (theMap.bulletsComputer[jBulletComputer].classList.contains('directionRight') == true && theMap.bulletsComputer[jBulletComputer].classList.contains(classNameBulletComputer) == true && xComputer > -sizeBullet) {
					xComputer = xComputer - speedBullet;
				} else if (theMap.bulletsComputer[jBulletComputer].classList.contains('directionDown') == true && theMap.bulletsComputer[jBulletComputer].classList.contains(classNameBulletComputer) == true && yComputer < theMap.height + sizeBullet) {
					yComputer = yComputer + speedBullet;
				} else if (theMap.bulletsComputer[jBulletComputer].classList.contains('directionLeft') == true && theMap.bulletsComputer[jBulletComputer].classList.contains(classNameBulletComputer) == true && xComputer < theMap.width + sizeBullet) {
					xComputer = xComputer + speedBullet;
				}
			
			updatePosition(theMap.bulletsComputer[jBulletComputer],xComputer,yComputer);

				if (elemComputer != null) {
					var x1Computer = parseInt(elemComputer.style.left);
					var y1Computer = parseInt(elemComputer.style.top);
					if (x1Computer <= -sizeBullet || y1Computer <= -sizeBullet || y1Computer >= theMap.height || x1Computer >= theMap.width) {
						elemComputer.remove();
					} 
					
					if (theTankPlayer1 != null) { 
						var xTankPlayerCheck = theTankPlayer1.x;
						var yTankPlayerCheck = theTankPlayer1.y;
						if (x1Computer >= xTankPlayerCheck && x1Computer <= xTankPlayerCheck + sizeTank && y1Computer >= yTankPlayerCheck && y1Computer <= yTankPlayerCheck + sizeTank) {	
							lifeTankPlayer = killTank(elemComputer,tankPlayer1,lifeTankPlayer,-1,1);
						} else if (x1Computer + sizeBullet >= xTankPlayerCheck && x1Computer + sizeBullet <= xTankPlayerCheck + sizeTank && y1Computer >= yTankPlayerCheck && y1Computer <= yTankPlayerCheck + sizeTank) {	
							lifeTankPlayer = killTank(elemComputer,tankPlayer1,lifeTankPlayer,-1,1);
						} else if (x1Computer >= xTankPlayerCheck && x1Computer <= xTankPlayerCheck + sizeTank && y1Computer + sizeBullet >= yTankPlayerCheck && y1Computer + sizeBullet <= yTankPlayerCheck + sizeTank) {	
							lifeTankPlayer = killTank(elemComputer,tankPlayer1,lifeTankPlayer,-1,1);
						} else if (x1Computer + sizeBullet >= xTankPlayerCheck && x1Computer + sizeBullet <= xTankPlayerCheck + sizeTank && y1Computer + sizeBullet >= yTankPlayerCheck && y1Computer + sizeBullet <= yTankPlayerCheck + sizeTank) {	
							lifeTankPlayer = killTank(elemComputer,tankPlayer1,lifeTankPlayer,-1,1);
						}		
					}					
					if (lifeTankPlayer < 0) {lifeTankPlayer = 0}
				}
			};
		};
	},

	moveTankComputer: function() {		
		for (pTank = 0; pTank <= nTank; pTank++) {
			var nameTank = String('tankComputer' + pTank);
			var isElemTank = document.getElementById(nameTank);
			var encounter = 0;

			if (isElemTank != null) {
				var xTankComputer = parseInt(isElemTank.style.left);
				var yTankComputer = parseInt(isElemTank.style.top);

				var xTankTarget = theTankPlayer1.x;
				var yTankTarget = theTankPlayer1.y;

				if (xTankComputer >= xTankTarget && yTankComputer >= yTankTarget && isElemTank.classList.contains(nameTank) == true && yTankComputer > 0) {
						var yTankComputer = directionUp(isElemTank,String('directionUp'),yTankComputer);
					} else if (xTankComputer <= xTankTarget && yTankComputer >= yTankTarget && isElemTank.classList.contains(nameTank) == true && xTankComputer > 0) {
						var xTankComputer = directionLeft(isElemTank,String('directionLeft'),xTankComputer);
					} else if (xTankComputer <= xTankTarget && yTankComputer <= yTankTarget && isElemTank.classList.contains(nameTank) == true && yTankComputer + sizeTank < theMap.height) {
						var yTankComputer = directionDown(isElemTank,String('directionDown'),yTankComputer);
					} else if (xTankComputer >= xTankTarget && yTankComputer <= yTankTarget && isElemTank.classList.contains(nameTank) == true && xTankComputer + sizeTank < theMap.width) {
						var xTankComputer = directionRight(isElemTank,String('directionRight'),xTankComputer);
					} else if (isElemTank.classList.contains(nameTank) == true && yTankComputer == 0 && xTankComputer == 0) {
						var yTankComputer = directionDown(isElemTank,String('directionDown'),yTankComputer);
					} else if (isElemTank.classList.contains(nameTank) == true && xTankComputer == 0 && yTankComputer + sizeTank == theMap.height) {
						var xTankComputer = directionLeft(isElemTank,String('directionLeft'),xTankComputer);
					} else if (isElemTank.classList.contains(nameTank) == true && xTankComputer + sizeTank == theMap.width && yTankComputer + sizeTank == theMap.height) {
						var yTankComputer = directionUp(isElemTank,String('directionUp'),yTankComputer);
					} else if (isElemTank.classList.contains(nameTank) == true && xTankComputer + sizeTank == theMap.width && yTankComputer == 0) {
						var xTankComputer = directionRight(isElemTank,String('directionRight'),xTankComputer);
					} else if (isElemTank.classList.contains(nameTank) == true && yTankComputer == 0) {
						var xTankComputer = directionRight(isElemTank,String('directionRight'),xTankComputer);
					} else if (isElemTank.classList.contains(nameTank) == true && xTankComputer == 0) {
						var yTankComputer = directionDown(isElemTank,String('directionDown'),yTankComputer);
					} else if (isElemTank.classList.contains(nameTank) == true && yTankComputer + sizeTank == theMap.height) {
						var xTankComputer = directionLeft(isElemTank,String('directionLeft'),xTankComputer);
					} else if (isElemTank.classList.contains(nameTank) == true && xTankComputer + sizeTank == theMap.width) {
						var yTankComputer = directionUp(isElemTank,String('directionUp'),yTankComputer);
					}
				var encounter = conflictCheck(xTankComputer,yTankComputer);
				if (encounter == 0) {
						updatePosition(isElemTank,xTankComputer,yTankComputer);
				}
			}
		};
	},
};

var theTankPlayer1 = {
	element: tankPlayer1,
	x: 0,
	y: 0,
	// v: 16,
	time: 0,

	move: function(e) {
		var x = this.x;
		var y = this.y;
		var encounterMy = 0;

		if (e.keyCode == 38 && y > 0 && lifeTankPlayer > 0) {
			this.y = directionUp(this.element,String('directionUp'),this.y);
		} else if (e.keyCode == 40 && y + sizeTank < theMap.height && lifeTankPlayer > 0) {
			this.y = directionDown(this.element,String('directionDown'),this.y);
		} else if (e.keyCode == 37 && x > 0 && lifeTankPlayer > 0) {
			this.x = directionRight(this.element,String('directionRight'),this.x);
		} else if (e.keyCode == 39 && x + sizeTank < theMap.width && lifeTankPlayer > 0) {
			this.x = directionLeft(this.element,String('directionLeft'),this.x);
		}

		for (checkTank = 0; checkTank <= nTank; checkTank++) {
			var nameTankCheck = String('tankComputer' + checkTank);
			var isElemTankCheck = document.getElementById(nameTankCheck);
			if (isElemTankCheck != null) {
				var xTankComputerCheck = parseInt(isElemTankCheck.style.left);
				var yTankComputerCheck = parseInt(isElemTankCheck.style.top);
				if (this.x >= xTankComputerCheck && this.x <= xTankComputerCheck + sizeTank && this.y >= yTankComputerCheck && this.y <= yTankComputerCheck + sizeTank) {	
					encounterMy = 1;
				} else if (this.x + sizeTank >= xTankComputerCheck && this.x + sizeTank <= xTankComputerCheck + sizeTank && this.y >= yTankComputerCheck && this.y <= yTankComputerCheck + sizeTank) {	
					encounterMy = 1;
				} else if (this.x >= xTankComputerCheck && this.x <= xTankComputerCheck + sizeTank && this.y + sizeTank >= yTankComputerCheck && this.y + sizeTank <= yTankComputerCheck + sizeTank) {	
					encounterMy = 1;
				} else if (this.x + sizeTank >= xTankComputerCheck && this.x + sizeTank <= xTankComputerCheck + sizeTank && this.y + sizeTank >= yTankComputerCheck && this.y + sizeTank <= yTankComputerCheck + sizeTank) {	
					encounterMy = 1;
				}
			}
		};
		if (encounterMy == 0) {updatePosition(this.element,this.x,this.y);}
	}
};

createTank = function(e) {	
	var tankComputer = document.createElement('div');
	var encounterCreateTank = 0;

	var xTankPosition = 0;
	var yTankPosition = 0;

	if (theTankPlayer1.x + 4 * sizeTank > theMap.width) {
		xTankPosition = theTankPlayer1.x - 4 * sizeTank;
	} else {xTankPosition = theTankPlayer1.x + 3 * sizeTank;}

	if (theTankPlayer1.y + 4 * sizeTank > theMap.height) {
		yTankPosition = theTankPlayer1.y - 4 * sizeTank;
	} else {yTankPosition = theTankPlayer1.y + 3 * sizeTank;} 

	tankComputer.id = String('tankComputer' + tankCount);		
	tankComputer.className = 'tankComputer';
	tankComputer.classList.add(String('tankComputer' + tankCount));

	var xTank = xTankPosition;
	var yTank = yTankPosition;

	for (checkTankCreate = 0; checkTankCreate <= nTank; checkTankCreate++) {
		var nameTankCheckCreate = String('tankComputer' + checkTankCreate);
		var isElemTankCheckCreate = document.getElementById(nameTankCheckCreate);
		if (isElemTankCheckCreate != null) {
			var xTankComputerCheckCreate = parseInt(isElemTankCheckCreate.style.left);
			var yTankComputerCheckCreate = parseInt(isElemTankCheckCreate.style.top);
			if (xTank >= xTankComputerCheckCreate && xTank <= xTankComputerCheckCreate + sizeTank && yTank >= yTankComputerCheckCreate && yTank <= yTankComputerCheckCreate + sizeTank) {	
				encounterCreateTank = 1;
			} else if (xTank + sizeTank >= xTankComputerCheckCreate && xTank + sizeTank <= xTankComputerCheckCreate + sizeTank && yTank >= yTankComputerCheckCreate && yTank <= yTankComputerCheckCreate + sizeTank) {	
				encounterCreateTank = 1;
			} else if (xTank >= xTankComputerCheckCreate && xTank <= xTankComputerCheckCreate + sizeTank && yTank + sizeTank >= yTankComputerCheckCreate && yTank + sizeTank <= yTankComputerCheckCreate + sizeTank) {	
				encounterCreateTank = 1;
			} else if (xTank + sizeTank >= xTankComputerCheckCreate && xTank + sizeTank <= xTankComputerCheckCreate + sizeTank && yTank + sizeTank >= yTankComputerCheckCreate && yTank + sizeTank <= yTankComputerCheckCreate + sizeTank) {	
				encounterCreateTank = 1;
			}
		}
	};
	if (encounterCreateTank == 0) {
		tankComputer.style.left = xTank.toString() + 'px';
		tankComputer.style.top = yTank.toString() + 'px';			
		theMap.tanks.push(tankComputer);
		map.appendChild(tankComputer);
		tankCount = tankCount + 1;
	} else {
		tankComputer.remove();
		iTank = iTank - 1;
	}	
};

createBullet = function(e) {
	if (e.keyCode == 32 && lifeTankPlayer > 0) {
		var tankBullet = document.createElement('div');		
		var xPosition = 0;
		var yPosition = 0;

		if (theTankPlayer1.element.classList.contains('directionUp') == true) {
			xPosition = 12;
			yPosition = -8;
			var vector = 'directionUp';
		} else if (theTankPlayer1.element.classList.contains('directionRight') == true) {
			xPosition = -8;
			yPosition = 12;
			var vector = 'directionRight';
		} else if (theTankPlayer1.element.classList.contains('directionDown') == true) {
			xPosition = 12;
			yPosition = 32;
			var vector = 'directionDown';
		} else if (theTankPlayer1.element.classList.contains('directionLeft') == true) {
			xPosition = 32;
			yPosition = 12;
			var vector = 'directionLeft';
		} 
		
		var xBullet = theTankPlayer1.x + xPosition;
		var yBullet = theTankPlayer1.y + yPosition;
		tankBullet.className = 'tankBullet';
		tankBullet.classList.add(String('tankBullet' + bulletCount));
		tankBullet.id = (String('tankBullet' + bulletCount));
		tankBullet.classList.add(vector);
		tankBullet.style.left = xBullet.toString() + 'px';
		tankBullet.style.top = yBullet.toString() + 'px';
		theMap.bullets.push(tankBullet);
		map.appendChild(tankBullet);

		bulletCount = bulletCount + 1;
	}
};

createBulletComputer = function() {
	if (lifeTankPlayer > 0) {
		for (bulTank = 0; bulTank <= nTank; bulTank++) {
			var nameBulTank = String('tankComputer' + bulTank);
			var isElemTankBulletComputer = document.getElementById(nameBulTank);

			if (isElemTankBulletComputer != null) {
				var xTankComputer = parseInt(isElemTankBulletComputer.style.left);
				var yTankComputer = parseInt(isElemTankBulletComputer.style.top);

				var tankBulletComputer = document.createElement('div');		
				var xPositionComputer = 0;
				var yPositionComputer = 0;

				if (isElemTankBulletComputer.classList.contains('directionUp') == true) {
					xPositionComputer = 12;
					yPositionComputer = -8;
					var vectorComputer = 'directionUp';
				} else if (isElemTankBulletComputer.classList.contains('directionRight') == true) {
					xPositionComputer = -8;
					yPositionComputer = 12;
					var vectorComputer = 'directionRight';
				} else if (isElemTankBulletComputer.classList.contains('directionDown') == true) {
					xPositionComputer = 12;
					yPositionComputer = 32;
					var vectorComputer = 'directionDown';
				} else if (isElemTankBulletComputer.classList.contains('directionLeft') == true) {
					xPositionComputer = 32;
					yPositionComputer = 12;
					var vectorComputer = 'directionLeft';
				}

			var xBulletComputer = xTankComputer + xPositionComputer;
			var yBulletComputer = yTankComputer + yPositionComputer;
			tankBulletComputer.className = 'tankBulletComputer';
			tankBulletComputer.classList.add(String('tankBulletComputer' + bulletCountComputer));
			tankBulletComputer.id = (String('tankBulletComputer' + bulletCountComputer));
			tankBulletComputer.classList.add(vectorComputer);
			tankBulletComputer.style.left = xBulletComputer.toString() + 'px';
			tankBulletComputer.style.top = yBulletComputer.toString() + 'px';
			theMap.bulletsComputer.push(tankBulletComputer);
			map.appendChild(tankBulletComputer);

			bulletCountComputer = bulletCountComputer + 1;
			}
		};
	} else if (GameOverSign == 0) {
		var GameOver = document.createElement('div');
		GameOver.id = 'GameOver';
		GameOver.classList.add('messenge');
		map.appendChild(GameOver);	
		GameOverSign = 1;
		document.getElementById('GameOver').innerHTML = 'GAME OVER';
	}
};

var dTmoveBullets = 200;
setInterval(function () {theMap.moveBullets();}, dTmoveBullets);

var dTcreateBulletComputer = 2000;
setInterval(function () {createBulletComputer();}, dTcreateBulletComputer);

var dTmoveBulletsComputer = 200;
setInterval(function () {theMap.moveBulletsComputer();}, dTmoveBulletsComputer);

var dTmoveTankComputer = 200;
setInterval(function () {theMap.moveTankComputer();}, dTmoveTankComputer);

var tankGeneration = function() {
	iTank += 1;
	if (iTank <= nTank) {
    	createTank();
  }
};

var pressArrow = addEventListener('keydown', function(e){theTankPlayer1.move(e);});
var pressSpace = addEventListener('keydown', function(e) {createBullet(e)});

setInterval(function () {tankGeneration();}, 4000);
setInterval(function(){document.getElementById('scorePlayer1').innerHTML = 'Счёт: ' + score + ' / ' + nTank;}, 20);
setInterval(function(){document.getElementById('lifePlayer1').innerHTML = 'Осталось жизней: ' + lifeTankPlayer;}, 20);