// Enemies our player must avoid



var startPosition_y = 300;
var startPosition_x = 200;
var allEnemies = [];
var player ;

var Game = function ()
{


    player = new Player(200, 390);



/*    for (var i = 0; i < 3;i++ )
    {
        startPosition_y -=85 ;
        startPosition_x += 50;
       var enemy1 = new Enemy(200,startPosition_y);
    allEnemies.push(enemy1);
    }
*/



}

var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';


    this.x = x;
    this.y = y;


    this.size = {
        with : 70,
        height: 78
    }

}
var startPosition = 200;
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

var getRandomPosition = function(min , max){
    return Math.floor(Math.random() * (max - min)) + min;

};
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

         if(this.x<505){
           this.x+= (getRandomPosition(350,-50)*dt) *2;
        }
        else{
            this.x=-100;
        }


}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

//var collided  = player.checkCollision();



    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

}

var Player =  function(x,y){
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;


    this.size = {
        with : 70,
        height: 78
    }

}

Player.prototype.update = function(){



    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

}

Player.prototype.render = function(){
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Player.prototype.reset = function(){


    this.x =200 ;
    this.y = 390;

}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


var checkCollision = function(player)
{


         for (var i = allEnemies.length - 1; i >= 0; i++) {


            if(allEnemies[i].x < player.x + player.size.with &&
            allEnemies[i].x + allEnemies[i].size.with > this.x &&
            allEnemies[i].y < player.y + this.size.height &&
            allEnemies[i].y + allEnemies[i].size.height > this.y){


             return true;

            }else {

            return false;

            }
        }
}
Player.prototype.handleInput = function(key){


if (this.y <= 50)
{
    this.reset();
    this.render();
}



       switch(key){
        case 'left':
        if(this.x >= 99)
        this.x -= 101;
        break;
        case 'up':
        if(this.y >=50)
        this.y -= 85;
        break;
        case 'right':
        if (this.x <= 301)
        this.x += 101;
        break;
        case 'down':
        if (this.y <=305)
        this.y += 85;
        break;
        }


}

document.getElementById("btnStart").addEventListener("click",function(){
        var mygame = new Game();
},false);





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

