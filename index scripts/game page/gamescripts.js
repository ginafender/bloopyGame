window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1440;
    canvas.height = 720;
    let enemies = [];
    let score = 0;
    let gameOver = false;


    class InputHandler {
        constructor(){
            this.keys = new Set();
            window.addEventListener('keydown', e => {
                this.keys.add(e.key);
                e.preventDefault();
                console.log('Key pressed:', e.key, this.keys);
            });
            window.addEventListener('keyup', e => {
                this.keys.delete(e.key);
                console.log('Key released:', e.key, this.keys);
            });
        }
    
        isKeyDown(key) {
            return this.keys.has(key);
        }
    }

    class Player {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 100;
            this.height = 69;
            this.x = 0;
            this.y = this.gameHeight - this.height;
            this.image = document.getElementById('playerImage');
            this.frameX = 0;
            // movement
            this.speed = 0;
            this.vy = 0;
            this.isJumping = false;
            // add gravity
            this.weight = 1;
        }
        draw(context, deltaTime){
            context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, 
                this.x, this.y, this.width, this.height);
            
            // hitboxes
            context.strokeStyle = 'white';
            context.beginPath();
            context.arc(this.x + this.width/2, this.y+this.height/2, this.width/2, 0, Math.PI * 2);
            context.stroke();
        }
        update(input, deltaTime, enemies){
            // controls
            if (input.isKeyDown('ArrowRight')){
                this.speed = 2;
            } else if (input.isKeyDown('ArrowLeft')){
                this.speed = -2;
            } else {
                this.speed = 0;
            }
            // Jumping
            if (input.isKeyDown('ArrowUp') && this.onGround()) {
                this.vy -= 25;
                this.isJumping = true;
                this.frameX = 1; // Set frame to 1 when jumping
                console.log("Jumpies :3")
            } else if (!this.onGround()) {
                this.isJumping = true;
                this.frameX = 1; // Set frame to 1 when not on the ground (while jumping)
            } else {
                this.isJumping = false;
                this.frameX = 0; // Set frame to 0 when not jumping and on the ground
            }
            // horizontal movement
            this.x += this.speed;
            if (this.x < 0) this.x = 0;
            else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width;
            // vertical movement
            this.y += this.vy;
            if (!this.onGround()){
                this.vy += this.weight;
            } else {
                this.vy = 0;
                if (!this.isJumping) {
                }
            }
            console.log('FrameX:', this.frameX);
            // if (this.y > this.gameHeight -this.height) this.y = this.gameHeight - this.height;

            // collision detection
            enemies.forEach(enemy => {
                const dx = (enemy.x + enemy.width/2)- (this.x + this.width/2);
                const dy = (enemy.y + enemy.height/2)- (this.y + this.height/2);
                const distance = Math.sqrt(dx*dx + dy*dy);
                if (distance < enemy.width/2 + this.width/2){
                    gameOver = true;
                }
            });
        }
        onGround(){
            return this.y >= this.gameHeight - this.height;
        }
    }

    class Background {

    }

    class Enemy {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 60;
            this.height = 60;
            this.image = document.getElementById('enemyImage');
            this.x = this.gameWidth;
            this.y = this.gameHeight - this.height;
            this.frameX = 0;
            this.speed = 3;
            // this.speed = Math.random() * 3;
            this.markedForDeletion = false;
        }
        draw(context){
            context.fillStyle = 'red';
            context.fillRect(this.x, this.y, this.width, this.height)

            // hitboxes
            context.strokeStyle = 'white';
            context.beginPath();
            context.arc(this.x + this.width/2, this.y+this.height/2, this.width/2, 0, Math.PI * 2);
            context.stroke();
        }
        update(deltaTime){
            // if (this.frameTimer > this.frameInterval){
            //     if (this.frameX >= this.maxFrame) this.frameX = 0;
            //     else this.frameX ++;
            //     this.frameTimer = 0;
            // } else {
            //     this.frameTimer += deltaTime;
            // }
            this.x -= this.speed;
            if (this.x < 0 - this.width){
                this.markedForDeletion = true;
                score++;
            }
        }
    }

    function handleEnemies(deltaTime){
        if (enemies.length < 3 && enemyTimer > enemyInterval + randomEnemyInterval){
            enemies.push(new Enemy(canvas.width, canvas.height));
            console.log(enemies);
            randomEnemyInterval = Math.random() * 1000 + 500;
            enemyTimer = 0;
        } else {
            enemyTimer += deltaTime;
        }
    
        enemies.forEach(enemy => {
            enemy.draw(ctx);
            enemy.update(deltaTime);
        });
    
        enemies = enemies.filter(enemy => !enemy.markedForDeletion);
    }
    function displayStatusText(context){
        if (gameOver){
            setTimeout(function(){
            var gameOverIMG = document.getElementById('gameOver');
            context.drawImage(gameOverIMG, canvas.width/2 - gameOverIMG.width/2, canvas.height/2 - gameOverIMG.height/2);         
            }, 1000);
        }
        context.fillStyle = 'black';
        context.font = '40px Helvetica';
        context.fillText('Score: ' + score, 20, 50);
        // create text shadow
        context.fillStyle = 'white';
        context.font = '40px Helvetica';
        context.fillText('Score: ' + score, 22, 52);
    }
    
    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    const background = new Background(canvas.width, canvas.height);

    let lastTime = 0;
    let enemyTimer = 0;
    let enemyInterval = 1000;
    let randomEnemyInterval = Math.random() * 1000 + 500;  

    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        // console.log(deltaTime);
        ctx.clearRect(0,0,canvas.width, canvas.height);
        // background.draw(ctx);
        // background.update();
        player.draw(ctx);
        player.update(input, deltaTime, enemies);
        handleEnemies(deltaTime);
        displayStatusText(ctx);
        if (!gameOver) requestAnimationFrame(animate);
    }
    animate(0);

});