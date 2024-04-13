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
      - The player class begins with a constructor, initializing the game object with the game width and height, player dimensions and initial position, and weight. The weight is used to create gravity on the player, preventing them from flying out of the game bounds while jumping. The ```onGround()``` method is used to check if the player is currently on the ground or not, and is used to either allow the player to jump or prevent them from jumping. The ```draw``` method draws the characters. Finally, the ```update()``` method is used to handle inputs and collision detection.
        - Collision Detection:
          - The logic for collision detection is based on the Pythagorean Therom. It first loops through each enemy in the enemies array. For each enemy, it calculates the distance between the center of the player and the center of the enemy. This is done using vector math, subtracting the respective x and y coordinates of the player and the enemy. The x distance, ```dx```, y distance, ```dy```, are then squared and added together to find the distance between the two center points. That distance is then checked against the sum of the radii of the player and the enemy. If the distance is less than the sum of the radii, it means the player and enemy are overlapping, causing ```gameOver``` to be set to true.
    - Background Class:
      - The
    - Enemy Class:
      - The

2. Functions
    - Handle Enemies:
      - The
    - Display Status Text:
      - The
    - Animate:
      - The
    - Reset Game:
      - The:
