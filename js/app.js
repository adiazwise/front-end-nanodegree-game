/**
* Create enemySetting Object with all Enemy Setting variables
*/
var enemySetting = {
   startPositionY: 300,
   startPositionX: 200
};
/**
* allEnemies array to create all enemies objects.
*/
var allEnemies = [];
var player;
/**
*  Create playerSetting Object with all Enemy Setting variables
*/
var playerSetting = {
   startPositionY: 390,
   startPositionX: 200,
   health:5,
   score:0
};

/**
*Constants variables for levels
*/
var Levels = {
    EASY :1.6,
    MEDIUM :1.9,
    HARD :2,
    EXTREME: 3
};


/**
* Set Selected player character for the game
* @param {image} [image] from the onclick event .
*/
function setPlayer(image){
     var path = image.src;
     var index = path.lastIndexOf('/') + 1;
     var allImages = $('.group-players').querySelectorAll('img');
        for (var i = allImages.length - 1; i >= 0; i--) {
          allImages[i].className = "";

        };
     image.className = "btn btn-success";
     player.sprite = 'images/' + path.substr(index);

 }

/**
* Start all entities player and enemies required for the game with the start position
*/
var Game = function() {

    playerSetting.health = 5;
    playerSetting.score = 0;
    player = new Player(playerSetting.startPositionX,playerSetting.startPositionY);

    for (var i = 0; i < 3; i++) {
        enemySetting.startPositionY-= 85;
        var currentEnemy = new Enemy(enemySetting.startPositionX, enemySetting.startPositionY);
        allEnemies.push(currentEnemy);
    }
};

/**
* Enemy object with his properties.
* @param {number} [x] x position in the canvas.
* @param {number} [x] y position in the canvas.
*/
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.size = {
        with: 70,
        height: 78
    };

};


/**
* Generate random x position for the enemies object.
* @param {int} [min] minor position in the canvas.
* @param {int} [max] mayor position in the canvas.
*/
var getRandomPosition = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

/**
*Update the enemy's position, required method for game
*@param [dt], a time delta between ticks
*/
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //Set the currentLevel according to the current score
    var currentLevel = Levels.EASY;
    if (playerSetting.score >= 1000){
        currentLevel = Levels.MEDIUM;
    }else if (playerSetting.score >= 2000){
        currentLevel = Levels.HARD;
    }else if (playerSetting.score >= 2800){
        currentLevel = Levels.EXTREME;
    }
    if (this.x < 505) {
        this.x += (getRandomPosition(350, -50) * dt) * currentLevel;
    } else {
        this.x = -100;
    }
};

/**
*Draw the enemy on the screen, required method for game
*/
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
* Check collision between player and enemy object.
* @param {object} [player] player object.
* @param {object} [enemy] enemy object.
*/
Enemy.prototype.checkCollision = function(player,enemy) {

        if (enemy.x < player.x + player.size.with &&
           enemy.x + enemy.size.with > player.x &&
           enemy.y < player.y + player.size.height &&
            enemy.size.height + enemy.y > player.y) {
            playerSetting.health--;
            return true;
        } else {
            return false;
        }
};

/**
* Player object with his properties.
* @param {number} [x] x position in the canvas.
* @param {number} [x] y position in the canvas.
* @function [healthDisplay] display the remaining health on the screen.
* @function [scoreDisplay] display the  current score on the screen.
* @function [gameOver] finish the game when the player is gameover.
*/
var Player = function(x, y) {


    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.size = {
        with: 70,
        height: 78
    };
    this.healthDisplay = function (){

        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.font = "bold 24px Press+Start+2P";
        ctx.fillText("LIFE REMAINING:"+ playerSetting.health, 30, 100);

    };
    this.scoreDisplay = function(){
          ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.font = "bold 24px Arial";
        ctx.fillText("SCORE:"+ playerSetting.score, 300, 100);
    };
    this.gameOver = function(){
        if(playerSetting.health <=0){
                ctx.fillStyle = "#1A9900";
                ctx.font = "bold 50px Arial";
                ctx.strokeStyle = "#000";
                 ctx.fillText("GAME OVER", 100, 200);
                ctx.strokeText("GAME OVER", 100, 200);
        }

    };
};

/**
* Update the character player image and all required values in the player.
*/
Player.prototype.update = function() {

    if (this.y <= 5) {
       playerSetting.score +=100;
        player.reset();
    }
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
* Render the character player image.
*/
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
* Reset the character player position.
*/
Player.prototype.reset = function() {

       this.x = playerSetting.startPositionX;
        this.y = playerSetting.startPositionY;
};

/**
* Performs the movement according to specified key.
* @param {key} [key] receive the key from the keyboard event
*/
Player.prototype.handleInput = function(key) {

    if (playerSetting.health > 0){
        switch (key) {
        case 'left':
            if (this.x >= 99)
                this.x -= 101;
            break;
        case 'up':
            if (this.y >= 50)
                this.y -= 85;
            break;
        case 'right':
            if (this.x <= 301)
                this.x += 101;
            break;
        case 'down':
            if (this.y <= 305)
                this.y += 85;
            break;
        }
    }
};

/**
* Set the initial settings from onclick StartGame Button.
*/
document.getElementById("btnStartGame").onclick = function(){

    this.innerText = "RESTART GAME";
    document.getElementById("start-game").style.display = 'block';
    document.getElementById("select-player").style.display = 'none';
      document.getElementById("start-screen").style.display = 'none';

    playerSetting.health = 5;
    playerSetting.score = 0;
    player.render();
 };

//Instantiate the objects.
var game = new Game();



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});