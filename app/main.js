// comment

var scoreText = document.getElementById('score-text');

var canvas = document.querySelector('canvas');

var tilemap = document.getElementById('tilemap');

var startScreen = document.getElementById('start-screen');

var tileSize = 20;

var currentScore = 0;

// Score if all pellets on board are eaten
var allPellets = 12900;

// Pipe entry and exit
var pipeLeft = -7.5;
var pipeRight = 567.5;

// Bit variables
var pellet = 10;
var space = 99;

var eleven = [0,0,16,16];
var twelve = [16,0,16,16];
var thirteen = [32,0,16,16];
var fourteen = [32,16,16,16];
var fifteen = [32,32,16,16];
var sixteen = [16,32,16,16];
var seventeen = [0,32,16,16];
var eighteen = [0,16,16,16];

var twentyone = [48,32,16,16];
var twentytwo = [64,32,16,16];
var twentythree = [144,32,16,16];
var twentyfour = [144,48,16,16];
var twentyfive = [144,64,16,16];
var twentysix = [64,48,16,16];
var twentyseven = [48,48,16,16];
var twentyeight = [128,48,16,16];

var thirtyone = [80,0,16,16];
var thirtytwo = [96,0,16,16];
var thirtythree = [112,32,16,16];
var thirtyfour = [96,32,16,16];
var thirtyfive = [96,48,16,16];
var thirtysix = [112,48,16,16];
var thirtyseven = [64,0,16,16];
var thirtyeight = [64,16,16,16];
var thirtynine = [48,0,16,16];

var forty = [48,16,16,16];
var fortyone = [80,16,16,16];
var fortytwo = [96,16,16,16];
var fortythree = [112,0,16,16];
var fortyfour = [112,16,16,16];
var fortyfive = [128,0,16,16];
var fortysix = [128,16,16,16];

var fiftyone = [0,48,16,16];
var fiftytwo = [16,48,16,16];
var fiftythree = [32,48,16,16];
var fiftyfour = [32,64,16,16];
var fiftyfive = [32,80,16,16];
var fiftysix = [16,80,16,16];
var fiftyseven = [0,80,16,16];
var fiftyeight = [0,64,16,16];

//pellet = Blank space or Path with pellets
//11-18 outer walls and corners clockwise from top left corner
//21-28 inner walls and corners clockwise from top left corner
//51-58 ghost box and corners clockwise from top left corner
//space = blackspace
var initialMap = [
      [eleven,twelve,twelve,twelve,twelve,twelve,twelve,twelve,twelve,twelve,twelve,twelve,twelve,thirtyone,thirtytwo,twelve,twelve,twelve,twelve,twelve,twelve,twelve,twelve,twelve,twelve,twelve,twelve,thirteen],
      [eighteen,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,twentyeight,twentyfour,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,fourteen],
      [eighteen,pellet,twentyone,twentytwo,twentytwo,twentythree,pellet,twentyone,twentytwo,twentytwo,twentytwo,twentythree,pellet,twentyeight,twentyfour,pellet,twentyone,twentytwo,twentytwo,twentytwo,twentythree,pellet,twentyone,twentytwo,twentytwo,twentythree,pellet,fourteen],
      [eighteen,pellet,twentyeight,space,space,twentyfour,pellet,twentyeight,space,space,space,twentyfour,pellet,twentyeight,twentyfour,pellet,twentyeight,space,space,space,twentyfour,pellet,twentyeight,space,space,twentyfour,pellet,fourteen],
      [eighteen,pellet,twentyseven,twentysix,twentysix,twentyfive,pellet,twentyseven,twentysix,twentysix,twentysix,twentyfive,pellet,twentyseven,twentyfive,pellet,twentyseven,twentysix,twentysix,twentysix,twentyfive,pellet,twentyseven,twentysix,twentysix,twentyfive,pellet,fourteen],
      [eighteen,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,fourteen],
      [eighteen,pellet,twentyone,twentytwo,twentytwo,twentythree,pellet,twentyone,twentythree,pellet,twentyone,twentytwo,twentytwo,twentytwo,twentytwo,twentytwo,twentytwo,twentythree,pellet,twentyone,twentythree,pellet,twentyone,twentytwo,twentytwo,twentythree,pellet,fourteen],
      [eighteen,pellet,twentyseven,twentysix,twentysix,twentyfive,pellet,twentyeight,twentyfour,pellet,twentyseven,twentysix,twentysix,thirtythree,thirtyfour,twentysix,twentysix,twentyfive,pellet,twentyeight,twentyfour,pellet,twentyseven,twentysix,twentysix,twentyfive,pellet,fourteen],
      [eighteen,pellet,pellet,pellet,pellet,pellet,pellet,twentyeight,twentyfour,pellet,pellet,pellet,pellet,twentyeight,twentyfour,pellet,pellet,pellet,pellet,twentyeight,twentyfour,pellet,pellet,pellet,pellet,pellet,pellet,fourteen],
      [seventeen,sixteen,sixteen,sixteen,sixteen,thirtyseven,pellet,twentyeight,thirtyfive,twentytwo,twentytwo,twentythree,space,twentyeight,twentyfour,space,twentyone,twentytwo,twentytwo,thirtysix,twentyfour,pellet,thirtynine,sixteen,sixteen,sixteen,sixteen,fifteen],
      [space,space,space,space,space,eighteen,pellet,twentyeight,thirtyfour,twentysix,twentysix,twentyfive,space,twentyseven,twentyfive,space,twentyseven,twentysix,twentysix,thirtythree,twentyfour,pellet,fourteen,space,space,space,space,space],
      [space,space,space,space,space,eighteen,pellet,twentyeight,twentyfour,space,space,space,space,space,space,space,space,space,space,twentyeight,twentyfour,pellet,fourteen,space,space,space,space,space],
      [space,space,space,space,space,eighteen,pellet,twentyeight,twentyfour,space,fiftyone,fiftytwo,fiftytwo,fiftytwo,fiftytwo,fiftytwo,fiftytwo,fiftythree,space,twentyeight,twentyfour,pellet,fourteen,space,space,space,space,space],
      [twelve,twelve,twelve,twelve,twelve,thirtyeight,pellet,twentyseven,twentyfive,space,fiftyeight,space,space,space,space,space,space,fiftyfour,space,twentyseven,twentyfive,pellet,forty,twelve,twelve,twelve,twelve,twelve,space,space,space,space],
      [pellet,pellet,pellet,pellet,pellet,pellet,pellet,space,space,space,fiftyeight,space,space,space,space,space,space,fiftyfour,space,space,space,pellet,pellet,pellet,pellet,pellet,pellet,pellet,space,space,space,space],
      [sixteen,sixteen,sixteen,sixteen,sixteen,thirtyseven,pellet,twentyone,twentythree,space,fiftyeight,space,space,space,space,space,space,fiftyfour,space,twentyone,twentythree,pellet,thirtynine,sixteen,sixteen,sixteen,sixteen,sixteen,space,space],
      [space,space,space,space,space,eighteen,pellet,twentyeight,twentyfour,space,fiftyseven,fiftysix,fiftysix,fiftysix,fiftysix,fiftysix,fiftysix,55,space,twentyeight,twentyfour,pellet,fourteen,space,space,space,space,space],
      [space,space,space,space,space,eighteen,pellet,twentyeight,twentyfour,space,space,space,space,space,space,space,space,space,space,twentyeight,twentyfour,pellet,fourteen,space,space,space,space,space],
      [space,space,space,space,space,eighteen,pellet,twentyeight,twentyfour,space,twentyone,twentytwo,twentytwo,twentytwo,twentytwo,twentytwo,twentytwo,twentythree,space,twentyeight,twentyfour,pellet,fourteen,space,space,space,space,space],
      [eleven,twelve,twelve,twelve,twelve,thirtyeight,pellet,twentyseven,twentyfive,space,twentyseven,twentysix,twentysix,thirtythree,thirtyfour,twentysix,twentysix,twentyfive,space,twentyseven,twentyfive,pellet,forty,twelve,twelve,twelve,twelve,thirteen],
      [eighteen,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,twentyeight,twentyfour,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,fourteen],
      [eighteen,pellet,twentyone,twentytwo,twentytwo,twentythree,pellet,twentyone,twentytwo,twentytwo,twentytwo,twentythree,pellet,twentyeight,twentyfour,pellet,twentyone,twentytwo,twentytwo,twentytwo,twentythree,pellet,twentyone,twentytwo,twentytwo,twentythree,pellet,fourteen],
      [eighteen,pellet,twentyseven,twentysix,thirtythree,twentyfour,pellet,twentyseven,twentysix,twentysix,twentysix,twentyfive,pellet,twentyseven,twentyfive,pellet,twentyseven,twentysix,twentysix,twentysix,twentyfive,pellet,twentyeight,thirtyfour,twentysix,twentyfive,pellet,fourteen],
      [eighteen,pellet,pellet,pellet,twentyeight,twentyfour,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,twentyeight,twentyfour,pellet,pellet,pellet,fourteen],
      [fortyfour,twentytwo,twentythree,pellet,twentyeight,twentyfour,pellet,twentyone,twentythree,pellet,twentyone,twentytwo,twentytwo,twentytwo,twentytwo,twentytwo,twentytwo,twentythree,pellet,twentyone,twentythree,pellet,twentyeight,twentyfour,pellet,twentyone,twentytwo,fortysix],
      [fortythree,twentysix,twentyfive,pellet,twentyseven,twentyfive,pellet,twentyeight,twentyfour,pellet,twentyseven,twentysix,twentysix,thirtythree,thirtyfour,twentysix,twentysix,twentyfive,pellet,twentyeight,twentyfour,pellet,twentyseven,twentyfive,pellet,twentyseven,twentysix,fortyfive],
      [eighteen,pellet,pellet,pellet,pellet,pellet,pellet,twentyeight,twentyfour,pellet,pellet,pellet,pellet,twentyeight,twentyfour,pellet,pellet,pellet,pellet,twentyeight,twentyfour,pellet,pellet,pellet,pellet,pellet,pellet,fourteen],
      [eighteen,pellet,twentyone,twentytwo,twentytwo,twentytwo,twentytwo,thirtysix,thirtyfive,twentytwo,twentytwo,twentythree,pellet,twentyeight,twentyfour,pellet,twentyone,twentytwo,twentytwo,thirtysix,thirtyfive,twentytwo,twentytwo,twentytwo,twentytwo,twentythree,pellet,fourteen],
      [eighteen,pellet,twentyseven,twentysix,twentysix,twentysix,twentysix,twentysix,twentysix,twentysix,twentysix,twentyfive,pellet,twentyseven,twentyfive,pellet,twentyseven,twentysix,twentysix,twentysix,twentysix,twentysix,twentysix,twentysix,twentysix,twentyfive,pellet,fourteen],
      [eighteen,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,pellet,fourteen],
      [seventeen,sixteen,sixteen,sixteen,sixteen,sixteen,sixteen,sixteen,sixteen,sixteen,sixteen,sixteen,sixteen,sixteen,sixteen,sixteen,sixteen,sixteen,sixteen,sixteen,sixteen,sixteen,sixteen,sixteen,sixteen,sixteen,sixteen,fifteen]
    ];

var map = {

  cols: 28,
  rows: 31,
  array: JSON.parse(JSON.stringify(initialMap)),

  getTileId: function(row, col) {
    //return an array [TileID, col, row]
    return (this.array[row][col]);
  },

  getTileAtXY: function(x, y) {
    var col = Math.floor(x / tileSize);
    var row = Math.floor(y / tileSize);
    var tile = this.array[row][col];
    return ([tile, row, col]);
  },

  isSolidTileAtXY: function(x, y) {
    var col = Math.floor(x / tileSize);
    var row = Math.floor(y / tileSize);
    var tile = this.array[row][col];
    var isSolid = tile != pellet && tile != space;
    return isSolid;
  },

  isPelletAtXY: function(x, y) {
    var col = Math.floor(x / tileSize);
    var row = Math.floor(y / tileSize);
    var tile = this.array[row][col];
    var isPellet = tile == pellet;
    return isPellet;
  }
}

canvas.width = map.array[0].length * tileSize;
canvas.height = map.array.length * tileSize;



var c = canvas.getContext('2d');

// left, up, right, down
var directions = [true, false, false, false];
var queueMove = 0;

//Pacman initial
// x, y, dx, dy, radius

var dir = -10;
var pctOpen = 100;

// Pacman initial mouth
var mouthT = -1.0;
var mouthB = 1.0;

document.onreadystatechange = function() {
  if (document.readyState == "interactive") {
    //Initialize buttons
    window.addEventListener('keydown', arrowKeysLogic);
  }
  if (document.readyState == "complete") {
    document.getElementById("slider").classList.remove('bottom');
  }
}

function arrowKeysLogic() {
  var i = 0;
  // left, up, right, down
  if (event.keyCode == 37) {
    i = 0;
  } else if (event.keyCode == 38) {
    i = 1;
  } else if (event.keyCode == 39) {
    i = 2;
  } else if (event.keyCode == 40) {
    i = 3;
  }
  queueMove = i;
}

function setDirection(i, mTop, mBot) {
  directions = [false, false, false, false];
  directions[i] = [true];
  mouthT = mTop;
  mouthB = mBot;
}

function scoreUpdate() {
  var pacLocation = [pac.x, pac.y];
  if (map.isPelletAtXY(pac.x, pac.y)) {
    var tileInfo = map.getTileAtXY(pac.x, pac.y);
    var row = tileInfo[1];
    var col = tileInfo[2];
    map.array[row][col] = space;
    currentScore += 50;
    scoreText.innerHTML = "Score: " + currentScore;
  }
}

function checkGhostCollision() {
  var pacTile = map.getTileAtXY(pac.x, pac.y);
  var blinkyTile = map.getTileAtXY(blinky.x, blinky.y);

  if (pacTile[1] == blinkyTile[1] && pacTile[2] == blinkyTile[2]) {
    console.log("YOU DEAD!");
  }

}

function handlePipe() {
    if (pac.getLocation()[0] == pipeLeft) {
        pac.x = pipeRight;
    }
    else if (pac.getLocation()[0] == pipeRight) {
        pac.x = pipeLeft;
    }
}

function checkForWin() {
  if (currentScore % allPellets == 0) {
    resetGame();
  }
}

function resetGame() {

  map.array = JSON.parse(JSON.stringify(initialMap));
  c.clearRect(0, 0, canvas.width, canvas.height);
  initialRender();

}

//put logic to check for each frame here
//seperates logic from animation.
function gameLogicUpdate() {
  scoreUpdate();
  handlePipe();
  checkForWin();
}

function Ghost(x, y) {
  this.getThisPos = function(pos) {
    return (pos - (pos % tileSize)) / tileSize;
  }

  this.x = x;
  this.y = y;
  this.ghostPos = [this.getThisPos(this.x), this.getThisPos(this.y)];

  this.draw = function() {
    this.makeBody();
    this.makeEyes();
    this.makePupils();
  }

  this.makeBody = function() {
    // context.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y);
    // moveTo(x, y) and lineTo(x, y)
    //c.rect(this.x, this.y, tileSize, tileSize)
    //c.moveTo(20,100)
    c.beginPath();
    c.moveTo(this.x, this.y + tileSize / 2);
    // console.log(this.x + ', ' + this.y);
    //c.bezierCurveTo(20, 20, 200, 20, 200, 100)
    c.bezierCurveTo(this.x, this.y, this.x + tileSize, this.y, this.x + tileSize, this.y + tileSize / 2);
    c.rect(this.x, this.y + tileSize / 2, tileSize, tileSize / 3);
    //Ghostly Spikes
    c.moveTo(this.x, this.y + tileSize * 5 / 6);
    c.lineTo(this.x, this.y + tileSize);
    c.lineTo(this.x + tileSize * 1 / 4, this.y + tileSize * 5 / 6);
    //c.closePath();
    c.moveTo(this.x + tileSize / 4, this.y + tileSize * 5 / 6);
    c.lineTo(this.x + tileSize / 2, this.y + tileSize);
    c.lineTo(this.x + tileSize * 3 / 4, this.y + tileSize * 5 / 6);
    //c.closePath();
    c.moveTo(this.x + tileSize * 3 / 4, this.y + tileSize * 5 / 6);
    c.lineTo(this.x + tileSize, this.y + tileSize);
    c.lineTo(this.x + tileSize, this.y + tileSize * 5 / 6);
    c.closePath();

    c.strokeStyle = 'red';
    c.stroke();
    c.fillStyle = 'red';
    c.fill();
  }

  this.makeEyes = function() {
    //context.arc(x,y,r,sAngle,eAngle,counterclockwise);
    // ctx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise);
    c.beginPath();
    c.ellipse(this.x + tileSize * 5 / 16, this.y + tileSize / 2, tileSize / 6, tileSize / 5, 0, 2 * Math.PI, false)
    /*c.strokeStyle = 'black';
    c.stroke();*/
    c.fillStyle = 'white';
    c.fill();

    c.beginPath();
    c.ellipse(this.x + tileSize * 11 / 16, this.y + tileSize / 2, tileSize / 6, tileSize / 5, 0, 2 * Math.PI, false)
    /*c.strokeStyle = 'black';
    c.stroke();*/
    c.fillStyle = 'white';
    c.fill();
  }

  this.makePupils = function() {
    //Making dem pupils
    c.beginPath();
    c.arc(this.x + tileSize * 6 / 16, this.y + tileSize / 2, tileSize / 12, 0, 2 * Math.PI);
    /*c.strokeStyle = 'white';
    c.stroke();*/
    c.fillStyle = 'black';
    c.fill();

    c.beginPath();
    c.arc(this.x + tileSize * 12 / 16, this.y + tileSize / 2, tileSize / 12, 0, 2 * Math.PI);
    /*c.strokeStyle = 'white';
    c.stroke();*/
    c.fillStyle = 'black';
    c.fill();
  }

  this.update = function() {
    if ((pac.x - tileSize / 2 + 1) - this.x > 0) {
      this.x++;
    } else {
      this.x--;
    }
    if ((pac.y - tileSize / 2 + 1) + -this.y > 0) {
      this.y++;
    } else {
      this.y--;
    }
    this.draw();
    this.ghostPos = [this.getThisPos(this.x), this.getThisPos(this.y)];
  }
}

function Pacman(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.dx = dx;
  this.dy = dy;
  // X, Y
  //Pac-Man's current location
  this.getNextPos = function(pos, spd, rad) {
    return ((pos + spd + rad) - ((pos + spd + rad) % tileSize)) / tileSize;
  }
  this.getThisPos = function(pos) {
    return (pos - (pos % tileSize)) / tileSize;
  }

  this.pacPos = [this.getThisPos(this.x), this.getThisPos(this.y)];
  this.nextPos = [this.getNextPos(this.x, -this.dx, this.radius), this.getThisPos(this.y)];

  //Pac-Man's current location

  this.draw = function() {
    var fltOpen = pctOpen / 100;

    c.beginPath();

    // Pacman Body and mouth
    c.arc(this.x, this.y, this.radius, (mouthT + fltOpen * 0.2) * Math.PI, (mouthB - fltOpen * 0.2) * Math.PI);
    c.lineTo(this.x, this.y);
    c.closePath();

    // Pacman
    c.strokeStyle = 'black';
    c.stroke();
    c.fillStyle = '#fdff00';
    c.fill();
  }

  this.update = function() {
    // Mouth opening stuff
    var pad = 0;
    pctOpen += dir;

    //Wall collision stuff
    var oneMoreMove = true;

    if (directions[0] || directions[2]) {
      if (map.array[this.nextPos[1]][this.nextPos[0]] != pellet && map.array[this.nextPos[1]][this.nextPos[0]] != space) {
        if (directions[0]) {
          directions[0] = false;
        } else if (directions[2]) {
          directions[2] = false;
        }
        this.x = this.pacPos[0] * tileSize + this.radius;
      }

    } else if (directions[1] || directions[3]) {
      if (map.array[this.nextPos[1]][this.nextPos[0]] != pellet && map.array[this.nextPos[1]][this.nextPos[0]] != space) {
        if (directions[1]) {
          console.log(this.pacPos + ', ' + this.nextPos);
          console.log(map.array[this.nextPos[1]][this.nextPos[0]]);
          directions[1] = false;
          console.log(directions);
        } else if (directions[3]) {
          directions[3] = false;
        }
        this.y = this.pacPos[1] * tileSize + this.radius;
      }

    }


    this.move();
    if (pctOpen % 100 == 0) {
      dir = -dir;
    }

    this.draw();

    if (queueMove == 0 && this.checkMove(map.array[this.getThisPos(this.y)][this.getNextPos(this.x, 0 - this.dx, 0 - this.radius)])) {
      setDirection(0, -1.0, 1.0);
    } else if (queueMove == 1 && this.checkMove(map.array[this.getNextPos(this.y, 0 - this.dy, 0 - this.radius)][this.getThisPos(this.x)])) {
      setDirection(1, -0.5, 1.5);
    } else if (queueMove == 2 && this.checkMove(map.array[this.getThisPos(this.y)][this.getNextPos(this.x, this.dx, this.radius)])) {
      setDirection(2, 0, 2.0);
    } else if (queueMove == 3 && this.checkMove(map.array[this.getNextPos(this.y, this.dy, this.radius)][this.getThisPos(this.x)])) {
      setDirection(3, -1.5, 0.5);
    }
  }

  this.checkMove = function(ar) {
    var check = false;
    if (ar == pellet || ar == space) {
      check = true;
    }
    return check;
  }

  this.move = function() {
    this.pacPos[0] = this.getThisPos(this.x);
    this.pacPos[1] = this.getThisPos(this.y);

    // left up right down
    if (directions[0] && (map.array[this.getThisPos(this.y)][this.getNextPos(this.x, -this.dx, -this.radius)] == pellet || map.array[this.getThisPos(this.y)][this.getNextPos(this.x, -this.dx, -this.radius)] == space)) {
      this.nextPos[0] = this.getNextPos(this.x, -this.dx, -this.radius);
      this.nextPos[1] = this.getThisPos(this.y);

      this.x -= this.dx;
      this.y = this.nextPos[1] * tileSize + this.radius;
    } else if (directions[1] && (map.array[this.getNextPos(this.y, -this.dy, -this.radius)][this.getThisPos(this.x)] == pellet || map.array[this.getNextPos(this.y, -this.dy, -this.radius)][this.getThisPos(this.x)] == space)) {
      this.nextPos[1] = this.getNextPos(this.y, -this.dy, -this.radius);
      this.nextPos[0] = this.getThisPos(this.x);
      // console.log('nextPos ' + this.nextPos);


      this.y -= this.dy;
      this.x = this.nextPos[0] * tileSize + this.radius;
      // console.log('y, x, ' + this.y + ', ' + this.x);

    } else if (directions[2] && (map.array[this.getThisPos(this.y)][this.getNextPos(this.x, this.dx, this.radius)] == pellet || map.array[this.getThisPos(this.y)][this.getNextPos(this.x, this.dx, this.radius)] == space)) {
      this.nextPos[0] = this.getNextPos(this.x, this.dx, this.radius);
      this.nextPos[1] = this.getThisPos(this.y);

      this.x += this.dx;
      this.y = this.nextPos[1] * tileSize + this.radius;
    } else if (directions[3] && (map.array[this.getNextPos(this.y, this.dy, this.radius)][this.getThisPos(this.x)] == pellet || map.array[this.getNextPos(this.y, this.dy, this.radius)][this.getThisPos(this.x)] == space)) {
      this.nextPos[1] = this.getNextPos(this.y, this.dy, this.radius);
      this.nextPos[0] = this.getThisPos(this.x);

      this.y += this.dy;
      this.x = this.nextPos[0] * tileSize + this.radius;
    }
  }
  this.getLocation = function() {
    return [this.x, this.y];
  }
}

function animate() {
    requestAnimationFrame(animate);
    //Fixed this by changing the parameters to be pacman specific
    //No longer needs to redraw the whole map.

    // Trying to make the 9 squares around Pacman (but still in the grid) dissapear instead of the ones not part of the grid.
    c.clearRect((pac.pacPos[0] - 1) * tileSize, (pac.pacPos[1] - 1) * tileSize, 3 * tileSize, 3 * tileSize);
    c.clearRect((blinky.ghostPos[0] - 1) * tileSize, (blinky.ghostPos[1] - 1) * tileSize, 3 * tileSize, 3 * tileSize);
    for(var n = -1; n < 2; n++) {
        for(var m = -1; m < 2; m++) {
            drawBit(map.array[pac.pacPos[1] + n][pac.pacPos[0] + m], pac.pacPos[1] + n, pac.pacPos[0] + m);
            drawBit(map.array[blinky.ghostPos[1] + n][blinky.ghostPos[0] + m], blinky.ghostPos[1] + n, blinky.ghostPos[0] + m);
        }
    }

  blinky.update();
  pac.update();
  gameLogicUpdate();
  checkGhostCollision();
}

function drawBit(bit,i,j) {
    if(i >= 0 && j >= 0) {
        if (map.array[i][j] === pellet) {
            c.rect(j*tileSize+(tileSize/2.6), i*tileSize+(tileSize/2.6), tileSize/4, tileSize/4);
            c.fillStyle = 'yellow';
            c.fill();
            c.stroke();
        }
        else if (map.array[i][j] != space) {
            c.drawImage(tilemap, bit[0], bit[1], bit[2], bit[3], j*tileSize, i*tileSize, tileSize, tileSize);
        }
    }
}

function initialRender() {
    for (var i = 0; i < map.array.length; i++) {
        for (var j = 0; j < map.array[i].length; j++) {
            drawBit(map.array[i][j],i,j);
        }
    }
    pac = new Pacman(13.5 * tileSize, 23.5 * tileSize, tileSize / 8, tileSize / 8, tileSize/2);
    blinky = new Ghost(12 * tileSize, 14 * tileSize);
}

function startGame() {
  initialRender();
  animate();
  startScreen.style.display = "none";
}
