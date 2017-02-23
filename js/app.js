//Super class for both Enemy class and
//Player class

var Character = function(x, y, speed, imge) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = imge;
};


// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    Character.call(this, x, y, speed, "images/enemy-bug.png");
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += this.speed * dt;
    if (this.x > 505) {
        this.x = 0;
    }

    this.checkCollisions();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//this function checks for the collisions. If the player
//encounters the enemy, then the player looses the game.
Enemy.prototype.checkCollisions = function() {
    if (
        player.y + 131 >= this.y + 90 &&
        player.x + 25 <= this.x + 88 &&
        player.y + 73 <= this.y + 135 &&
        player.x + 76 >=  this.x + 50) {
        player.x = 202.5;
        player.y = 383;
    }
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


var Player = function(x, y, speed) {
    //calls its super class
    Character.call(this, x, y, speed, "images/char-princess-girl.png");
};


Player.prototype.update = function(dt) {
    //checks the boundaries of the player. Restricts the player
    //from moving out of the game area

    if (this.y > 400) {
        this.y = 400;
    }
    if (this.x > 402.5) {
        this.x = 402.5;
    }
    if (this.x < 0.5) {
        this.x = 0.5;
    }

    //case when player wins the game
    if (this.y < 2.5) {
        this.y = 2.5;
        alert("You won!!");
        this.x = 202.5;
        this.y = 383;
    }
};


Player.prototype.render = function() {
    ctx.drawImage(
        Resources.get(this.sprite), this.x, this.y);
};

//handles key events and moves accordingly in the chosen
//direction of the player.
Player.prototype.handleInput = function(keyPressed) {
    if (keyPressed === "up") {
        this.y -= 83;
    } else if (keyPressed === "left") {
        this.x -= 101;

    } else if (keyPressed === "right") {
        this.x += 101;

    } else if (keyPressed === "down") {
        this.y += 83;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player(202.5, 400, 120);
var enemy_bug1 = new Enemy(0, 60, 120);
var enemy_bug2 = new Enemy(300, 60, 120);
var enemy_bug3 = new Enemy(60, 145, 120);
var enemy_bug4 = new Enemy(180, 230, 120);
var allEnemies = [enemy_bug1, enemy_bug2, enemy_bug3, enemy_bug4];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
    var allowedKeys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down"
    };

    player.handleInput(allowedKeys[e.keyCode]);
});