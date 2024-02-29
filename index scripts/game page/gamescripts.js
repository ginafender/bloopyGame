window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1440;
    canvas.height = 720;
    let enemies = [];
    let score = 0;
    let gameOver = false;


    class InputHandler {
        // create arrays to store multiple key presses at once
    //     constructor(){
    //         this.keys=[];
    //         window.addEventListener('keydown', e => {
    //             if ((   e.key ==='ArrowDown' ||
    //                     e.key === 'ArrowUp' ||
    //                     e.key === 'ArrowLeft' ||
    //                     e.key === 'ArrowRight')
    //                     && this.keys.indexOf(e.key) === -1){
    //                 this.keys.push(e.key);
    //                 e.preventDefault();    
    //             }
    //             console.log('Key pressed: ', e.key, this.keys);
    //         });
    //         window.addEventListener('keyup', e => {
    //             if (    e.key ==='ArrowDown' ||
    //                     e.key === 'ArrowUp' ||
    //                     e.key === 'ArrowLeft' ||
    //                     e.key === 'ArrowRight'){
    //                 this.keys.splice(this.keys.indexOf(e.key), 1);    
    //             }
    //             console.log('Key released', e.key, this.keys);
    //         });
    //     }
    // }

    // class InputHandler {
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
            this.width = 150;
            this.height = 150;
            this.x = 0;
            this.y = this.gameHeight - this.height;
            this.image = document.getElementById('playerImage');
            this.speed = 0;
            this.vy = 0;
            // gravity
            this.weight = 1;

        }
        draw(context){
            context.fillStyle = 'white';
            context.fillRect(this.x, this.y, this.width, this.height)
        }
        update(input){
            // controls
            // if (input.keys.indexOf('ArrowRight') > -1){
            //     this.speed = 5;
            // } else if (input.keys.indexOf('ArrowLeft') > -1){
            //     this.speed = -5;
            // } else if (input.keys.indexOf('ArrowUp') > -1 && this.onGround()){
            //     this.vy -= 30;
            // } else {
            //     this.speed = 0;
            // }
            // controls
            if (input.isKeyDown('ArrowRight')){
                this.speed = 5;
            } else if (input.isKeyDown('ArrowLeft')){
                this.speed = -5;
            } else {
                this.speed = 0;
            }
        
            // Jumping
            if (input.isKeyDown('ArrowUp') && this.onGround()) {
                this.vy -= 30; // Adjust the jump velocity as needed
            }

            // horizontal movement
            this.x += this.speed;


            // vertical movement
            this.y += this.vy;
            if (!this.onGround()){
                this.vy += this.weight;
            } else {
                this.vy = 0;
            }

            // boundaries
            if (this.x < 0) this.x = 0;
            else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width;
            if (this.y > this.gameHeight -this.height) this.y = this.gameHeight - this.height;
        }
        onGround(){
            return this.y >= this.gameHeight - this.height;
        }
    }

    class Background {

    }

    class Enemy {

    }

    function handleEnemies(){
    
    }

    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    const background = new Background(canvas.width, canvas.height);

    function displayStatusText(){

    }

    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // background.draw(ctx);
        // background.update();

        player.draw(ctx);
        player.update(input);

        if(!gameOver) requestAnimationFrame(animate);
    }

    animate(0);

});