/*

ENEMY CONSTRUCTOR

*/
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = this.speedRating();
    this.x = -101;
    this.y = this.yCoordinate();

};

Enemy.prototype.speedRating = function(){
    let randomNumber = Math.floor(Math.random() * 6);
    if (randomNumber === 0){
        randomNumber = 2;
    }

    return randomNumber * 20;
}

Enemy.prototype.yCoordinate = function(){
        const randomNumber = Math.floor(Math.random() * 3);

        if(randomNumber === 0){
            return 53;
        }
        else if(randomNumber === 1){
            return 136;
        }
        else if(randomNumber === 2){
            return 219;
        }

    };

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*

PLAYER CONSTRUCTOR

*/
//Player class for the player object.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 385;
};

// This method gives the code to update if the player has made contact with an enemy.
Player.prototype.update = function() {
    allEnemies.forEach(function(enemy){
        if(enemy.y == player.y && (enemy.x - 70) < player.x && (enemy.x + 90) > player.x){
            player.x = 202;
            player.y = 385;
        }
        else if(player.y === -30){
            window.alert("Congratualtions, You've Won! Play Again!")
            player.x = 202;
            player.y = 385;
        }
    });
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//This method tells the player what to do when the allowed keys are pressed.
Player.prototype.handleInput = function(key){
    if(key === 'left' && this.x !== 0){
        this.x = this.x - 101;
    }
    else if(key === 'right' && this.x !== 404){
        this.x = this.x + 101;
    }
    else if(key === 'up' && this.y !== -30){
        this.y = this.y - 83;
    }
    else if(key === 'down' && this.y !== 385){
        this.y = this.y + 83;
    }
};

/*

INSTANTIATE CHARACTERS

*/
//Instantiates the player character
const player = new Player();

//Instantiates the enemy array and starts the game with one enemy
const allEnemies = [new Enemy()];



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//This function makes a new enemy at random.
//I opted for this formula because the setInterval method was acting funny every once in a while.
function newEnemy(){
    const randomNumber = Math.floor(Math.random() * 300);

    if(randomNumber === 0){
        allEnemies.push(new Enemy());
    }
}
