var audio = ["Юрий Лоза - Плот.mp3",
            "Rammstein - DEUTSCHLAND.mp3",
            "Alex C. feat. Yass feat. Yass - Du Hast Den Schönsten Arsch Der Welt.mp3",
            "Кукрыниксы - Не беда.mp3",
            "Наталья Варлей - Вертится быстрей Земля.mp3"];

var songTitle = document.getElementById('songTitle');
var songSlider = document.getElementById('songSlider');
var currentTime = document.getElementById('currentTime');
var duration = document.getElementById('duration');
var volumeSlider = document.getElementById('volumeSlider');
var nextSongTitle = document.getElementById('nextSongTitle');

var song = new Audio();
var currentSong = 0;

window.onload = loadSong;

function loadSong() {
    song.src = "audio/" + audio[currentSong];
    songTitle.textContent = (currentSong + 1) + ". " + audio[currentSong];
    nextSongTitle.innerHTML = "<b>Next Song: </b>" + audio[currentSong + 1 % audio.length];
    song.playbackRate = 1;
    song.volume = volumeSlider.value;
    song.play();
    setTimeout(showDuration, 1000);
}

setInterval(updateSongSlider, 1000);

function updateSongSlider() {
    var c = Math.round(song.currentTime);
    songSlider.value = c;
    currentTime.textContent = convertTime(c);
    if(song.ended){
        next();
    }
}

function convertTime(secs) {
    var min = Math.floor(secs/60);
    var sec = secs % 60;
    min = (min < 10) ? "0" + min : min;
    sec = (sec < 10) ? "0" + sec : sec;
    return (min + ":" + sec);
}

function showDuration() {
    var d = Math.floor(song.duration);
    songSlider.setAttribute("max", d);
    duration.textContent = convertTime(d);
}

function playOrPauseSong() {
    song.playbackRate = 1;
    var img = document.getElementById('myImg');
    if(song.paused){
        song.play();
        img.src = "img/pause.png";
    }else{
        song.pause();
        img.src = "img/play.png";
    }
}

function next() {
    currentSong = currentSong + 1 % audio.length;
    loadSong();
}

function previous() {
    currentSong--;
    currentSong = (currentSong < 0) ? audio.length - 1 : currentSong;
    loadSong();
}

function seekSong() {
    song.currentTime = songSlider.value;
    currentTime.textContent = convertTime(song.currentTime);
}

function adjustVolume() {
    song.volume = volumeSlider.value;
}

function increasePlaybackRate() {
    audio.playbackRate += 0.5;
}

function decreasePlaybackRate() {
    audio.playbackRate -= 0.5;
}