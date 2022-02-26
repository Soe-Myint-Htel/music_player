const current = document.querySelector("#current");
const count = document.querySelector("#count");
const menu = document.querySelector("#menu");
const navList = document.querySelector("#nav-list");
const title = document.querySelector("#title");
const singer = document.querySelector("#singer");
const poster= document.querySelector("#poster");
const prev = document.querySelector("#prev");
const play = document.querySelector("#play");
const next = document.querySelector("#next");
const range = document.querySelector("#range");

let musics = [
    {
        id : 1,
        title : "Nin Mathi Tak A Chit",
        singer : "Wai La",
        img_path : "img/1.jpg",
        music_path : "music/1.mp3"
    },
    {
        id : 2,
        title : "Elody",
        singer : "Adjustor and Floke Rose",
        img_path : "img/2.jpg",
        music_path : "music/2.mp3"
    },
    {
        id : 3,
        title : "Tha Di Ya Yin",
        singer : "Eternal Gosh",
        img_path : "img/3.jpg",
        music_path : "music/3.mp3"
    },
    {
        id : 4,
        title : "Danyar Houng Myar..",
        singer : "Zaw Win Htut",
        img_path : "img/4.jpg",
        music_path : "music/4.mp3"
    },
    {
        id : 5,
        title : "Lamin Tean Chin",
        singer : "Eternal Gosh",
        img_path : "img/5.jpg",
        music_path : "music/5.mp3"
    }
];
let playing = false;
let index = 0;
const track = document.createElement("audio");

// load track 
function loadTrack(index){
    title.innerHTML = musics[index].title;
    singer.innerHTML = musics[index].singer;
    poster.src = musics[index].img_path;
    track.src = musics[index].music_path;
    track.load();

    current.innerHTML = index + 1;
    count.innerHTML = musics.length;
}
loadTrack(index);

// check track
function checkMusic(){
    playing === true? justPause() : justPlay();
}

// justPlay
function justPlay(){
    track.play();
    playing = true;
    play.className = "fas fa-pause"
}

// justPause
function justPause(){
    track.pause();
    playing = false;
    play.className = "fas fa-play"
}

// event listener
play.addEventListener("click", checkMusic);