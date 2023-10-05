let music = [
    {
        name: "Don't Hurt Yourself",
        artist: "Beyonce",
        img: "lemonade",
        src: "beyonce"
    },
    {
        name: "Don't Start Now",
        artist: "Dua Lipa",
        img: "dontstartnow",
        src: "dua_lipa"
    },
    {
        name: "The Show Must Go On",
        artist: "Queen",
        img: "queen",
        src: "The Show Must Go On"
    }
]
const wrapper = document.querySelector(".wrapper"),
    musicImg = wrapper.querySelector(".img-area img"),
    musicName = wrapper.querySelector(".song-details .name"),
    musicArtist = wrapper.querySelector(".song-details .artist"),
    mainAudio = wrapper.querySelector("#main-audio"),
    playPauseBtn = wrapper.querySelector(".play-pause"),
    prevBtn = wrapper.querySelector("#prev"),
    nextBtn = wrapper.querySelector("#next"),
    progressBar = wrapper.querySelector(".progress-bar"),
    progressArea = wrapper.querySelector(".progress-area");


let musicIndex = 1;
window.addEventListener("load", ()=> {
    loadMusic(musicIndex);
})

function loadMusic(indexNumb){
    musicName.innerText = music[indexNumb-1].name;
    musicArtist.innerText = music[indexNumb-1].artist;
    musicImg.src = `img/${music[indexNumb-1].img}.png`;
    mainAudio.src = `music/${music[indexNumb-1].src}.mp3`;

    document.body.style.backgroundImage = `url(img/${music[indexNumb-1].img}.png)`;
}

function playMusic(){
    wrapper.classList.add("paused");
    playPauseBtn.querySelector(".play-stop").innerText = "II"
    mainAudio.play();

}

function pauseMusic(){
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector(".play-stop").innerText = "▷"
    mainAudio.pause();
}

function nextMusic(){
    musicIndex++;
    musicIndex > music.length ? musicIndex = 1 : musicIndex === musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

function prevMusic(){
    musicIndex--;
    musicIndex < 1 ? musicIndex = music.length : musicIndex === musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

playPauseBtn.addEventListener("click", ()=> {
    const isMusicPaused = wrapper.classList.contains("paused");
    isMusicPaused ? pauseMusic() : playMusic();
});

nextBtn.addEventListener("click", ()=>{
    nextMusic();
});

prevBtn.addEventListener("click", ()=>{
    prevMusic();
});

mainAudio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progress = (currentTime/duration) * 100;
    progressBar.style.width = `${progress}%`;


    let musicTimeStart = wrapper.querySelector(".current"),
    musicTimeEnd = wrapper.querySelector(".uncurrent");

    mainAudio.addEventListener("loadeddata", () => {
        let audioEnd = mainAudio.duration;
        let totalMin = Math.floor(audioEnd / 60);
        let totalSec = Math.floor(audioEnd % 60);
        if (totalSec < 10) {
            totalSec = `0${totalSec}`
        }
        musicTimeEnd.innerText = `${totalMin}:${totalSec}`;
    });

    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if(currentSec < 10){
        currentSec = `0${currentSec}`;
    }

    musicTimeStart.innerText = `${currentMin}:${currentSec}`;
});

progressArea.addEventListener("click", (e)=>{
    let progressAll = progressArea.clientWidth;
    let clickedOffSetX =  e.offsetX;
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedOffSetX/progressAll)*songDuration;
    playMusic()

});












