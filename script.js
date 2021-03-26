
/* ELEMENTS */
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const fullScreen = player.querySelector(".full-screen");


/* FUNCTIONS */

function togglePlay(){
 if(video.paused){
     video.play()
 } else {
     video.pause();
 }
};

/* const method = video.paused? "play": "pause";
video[method](); */

function updateBtn(){
    const icon = this.paused? "►" : "❚ ❚";
    toggle.textContent = icon;
}

function skip(){
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRange(){
    video[this.name] = this.value;
}

function playTime(){
    const percent = (video.currentTime/ video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(event){
    const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
};

 function expand(event){
    player.classList.remove("player");
    player.classList.add("player:fullscreen"); 
    player.classList.add("player__video");
}; 

function shrink(event){
    player.classList.remove("player:fullscreen");
    player.classList.remove("player__video");
    player.classList.add("player");
}

/*EVENT LISTENERS */

video.addEventListener("click", togglePlay);
toggle.addEventListener("click", togglePlay);
video.addEventListener("play", updateBtn);
video.addEventListener("pause", updateBtn);
skipButtons.forEach(button => button.addEventListener("click", skip));
ranges.forEach(slider=> slider.addEventListener("change", handleRange));
ranges.forEach(slider=> slider.addEventListener("mousemove", handleRange));
video.addEventListener("timeupdate", playTime);

fullScreen.addEventListener("click", expand);
fullScreen.addEventListener("dblclick", shrink);

let mousedown = false; 
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (event) => mousedown && scrub(event));
progress.addEventListener("mousedown", () => mousedown = true);
progress.addEventListener("mouseup", () => mousedown = false);
