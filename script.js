const audio = document.getElementById('audio');
const playPause = document.getElementById('play-pause');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const trackCover = document.getElementById('track-cover');
const progress = document.getElementById('progress-bar');
const time = document.getElementById('time');
const duration = document.getElementById('duration');


const tracks = [
    {
        title: "U Can't Touch This",
        artist: "MC Hammer",
        src: "./audio-files/MC Hammer - U Can't Touch This.mp3",
        cover: "./images/MC-Hammer.png",

    },
    {
        title: "The Look",
        artist: "Roxette",
        src: "./audio-files/Roxette - The Look.mp3",
        cover: "./images/roxete.png",

    },
    {
        title: "The Show Must Go On",
        artist: "Queen",
        src: "./audio-files/The Show Must Go On.mp3",
        cover: "./images/queen.png",

    }
];

let currentTrackIndex = 0;
let isPlaying = false;


function load(trackIndex) {
    const track = tracks[trackIndex];
    audio.src = track.src;
    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;
    trackCover.src = track.cover;
    audio.load();
    document.body.style.backgroundImage = `url(${track.cover})`;
    time.textContent = '00:00';
    duration.textContent = '--:--';
}

audio.addEventListener('loadedmetadata', ()=> {
    duration.textContent = formatTime(audio.duration);
});

function play() {
    audio.play();
    isPlaying = true;
    playPause.textContent = 'Pause';
}

function pause() {
    audio.pause();
    isPlaying = false;
    playPause.textContent = 'Play';
}

function togglePlayPause() {
    if (isPlaying) {
        pause();
    } else {
        play();
    }
}
function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    load(currentTrackIndex);
    play();
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    load(currentTrackIndex);
    play();
}

function updateTime() {
    const currentTime = audio.currentTime;
    const trackDuration = audio.duration;

    progress.value = (currentTime / trackDuration) * 100;
    time.textContent = formatTime(currentTime);
    duration.textContent = formatTime(trackDuration);
}

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

function updateProgress(e) {
    audio.currentTime = (e.target.value / 100) * audio.duration;
}

playPause.addEventListener('click', togglePlayPause);
next.addEventListener('click', nextTrack);
prev.addEventListener('click', prevTrack);
audio.addEventListener('timeupdate', updateTime);
progress.addEventListener('input', updateProgress);

load(currentTrackIndex);
