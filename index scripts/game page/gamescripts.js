var block = document.getElementById("block");
const playGameButton = document.querySelector(".playGame");


document.addEventListener("DOMContentLoaded", function(){
    var standingContainer = document.getElementById("bloopyStanding");
    var jumpingContainer = document.getElementById("bloopyJumping");
    var standingImg = standingContainer.querySelector("img");
    var jumpingImg = jumpingContainer.querySelector("img");

    // character jumping
    document.addEventListener("keydown", jumpFunction);
    function jumpFunction(event) {
        console.log("Key pressed: ", event.keyCode);

        if (event.keyCode === 32) {
            console.log("Event triggered");

            if (!standingContainer.classList.contains("jump")) {
                standingContainer.classList.add("jump");
                console.log("Class added :3");
                // Change character's image
                jumpingContainer.style.display = "block";
                standingContainer.style.display = "none";
                standingContainer.style.transition = "top 0.5s ease-in-out";

                setTimeout(function () {
                    standingContainer.classList.remove("jump");
                    console.log("Class removed :(");

                    jumpingContainer.style.display = "none";
                    standingContainer.style.display = "block";
                    standingContainer.style.transition = "none";
                }, 350);
            }
        }
    }
});

