# Bloopy Game

## Project Description

This is a personal project that started as a school assingment. The assignment was to create a very basic personal website, but I really wanted to challenge myself and incorporate a browser game. This is my first game, and since I am wanting to get into game development, I am excited about how much I have learned throughout this process. 

# File Structure
The files for the home page consist of:
- index.html
- styles.css

The files for the game page include:
- game.html
- gamescripts.js
- gamestyles.css
- Images in the images folder
  
## Game Logic
The logic for bloopy was built using vanilla Javascript and HTML. 

1. Classes
    - Input Handler:
      - The InputHandler class manages keyboard input within the browser window. Upon instantiation, it sets up event listeners for keydown and keyup events. As keys are pressed, they are added to a Set, and as they are released, they are removed from the Set. This class provides a method, 'isKeyDown', which allows checking if a specific key is currently pressed.
    - Player Class:
      - The player class begins with a constructor, initializing the game object with the game width and height, player dimensions and initial position, and weight. The weight is used to create gravity on the player, preventing them from flying out of the game bounds while jumping. The ```onGround()``` method is used to check if the player is currently on the ground or not, and is used to either allow the player to jump or prevent them from jumping. The ```draw()``` method draws the player. *The draw method also includes commented out logic for drawing the hitboxes around the player while testing the collision detection.* Finally, the ```update()``` method is used to handle inputs and collision detection, and the ```resetPosition()``` method is used to return the player back to the starting position when restarting the game.
        - Collision Detection:
          - The logic for collision detection is based on the Pythagorean Therom. It first loops through each enemy in the enemies array. For each enemy, it calculates the distance between the center of the player and the center of the enemy. This is done using vector math, subtracting the respective x and y coordinates of the player and the enemy. The x distance, ```dx```, y distance, ```dy```, are then squared and added together to find the distance between the two center points. That distance is then checked against the sum of the radii of the player and the enemy. If the distance is less than the sum of the radii, it means the player and enemy are overlapping, causing ```gameOver``` to be set to true.
    - Background Class:
      - This class is currently empty. Future updates will include logic for a scrolling background.
    - Enemy Class:
      - The constructor initializes an instance of the Enemy class with the game width, game height, dimensions, image, initial position, frame, speed, and deletion status. It sets the initial x-coordinate to be just outside the right edge of the game window and the y-coordinate to a random position within the game height. The ```draw()``` method draws the enemy. *The draw method also includes commented out logic for drawing the hitboxes around the enemy while testing the collision detection.* The ```update()``` method updates the enemy's position based on the elapsed time. It moves the enemy horizontally towards the left edge of the screen at a speed determined by ```this.speed```, which uses the ```Math.random()``` method to create randomness in the enemies movement. Additionally, it applies a downward gravitational force, ```this.weight```, to simulate falling. The speed and weight work in tandem to make the enemy fall diagonally across the screen, and to ensure that the enemy stays within the bounds of the game height. If the enemy moves off the left edge of the screen, it marks itself for deletion and increments the score. 

2. Functions
    - Handle Enemies:
      - The function first checks if the number of enemies currently spawned is less than three and if enough time has elapsed since the last enemy spawn. It sets the enemy spawn to a random interval, lowering the predictability of enemy spawns. Finally, enemies that have moved off the screen are removed from the array. This not only allows space for new enemies to spawn but also prevents excessive data accumulation on the client's end.
    - Display Status Text:
      - When the ```gameOver``` flag is set to true, the "Game Over" image is displayed on the canvas after a delay of 1000ms. The player's final score remains on the screen.
    - Animate:
      - This script establishes a game loop to manage the rendering and updating of game elements on a canvas. It initializes variables to control timing and enemy spawning intervals. The animate function, called repeatedly through requestAnimationFrame, computes the time difference between frames (deltaTime), clears the canvas, updates and draws the player, manages enemy spawning and behavior, and displays game status information. The loop iterates until the game concludes, ensuring smooth gameplay by synchronizing rendering with the browser's refresh rate.
    - Reset Game:
      - This script sets up functionality for resetting the game state and displaying a "play again" button. It attaches a click event listener to an HTML element with the id ```playAgain```, triggering the resetGame function when clicked. The ```resetGame()``` function clears the canvas, resets game variables (such as enemies array and score), and hides the 'playAgain' button. Additionally, there's a ```displayPlayAgainButton()``` function to make the 'playAgain' button visible when called. Together, these functions enable the player to restart the game with a single click after it ends.
