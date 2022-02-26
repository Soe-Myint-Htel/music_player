const current = document.querySelector("#current");
const count = document.querySelector("#count");
const menu = document.querySelector("#menu");
const navList = document.querySelector("#nav-list");
const title = document.querySelector("#title");
const singer = document.querySelector("#singer");
const poster = document.querySelector("#poster");
const prev = document.querySelector("#prev");
const play = document.querySelector("#play");
const next = document.querySelector("#next");
const range = document.querySelector("#range");

let musics = [
    {
        id: 1,
        title: "Nin Mathi Tak A Chit",
        singer: "Wai La",
        img_path: "img/1.jpg",
        music_path: "music/1.mp3"
    },
    {
        id: 2,
        title: "Elody",
        singer: "Adjustor and Floke Rose",
        img_path: "img/2.jpg",
        music_path: "music/2.mp3"
    },
    {
        id: 3,
        title: "Tha Di Ya Yin",
        singer: "Eternal Gosh",
        img_path: "img/3.jpg",
        music_path: "music/3.mp3"
    },
    {
        id: 4,
        title: "Danyar Houng Myar..",
        singer: "Zaw Win Htut",
        img_path: "img/4.jpg",
        music_path: "music/4.mp3"
    },
    {
        id: 5,
        title: "Lamin Tean Chin",
        singer: "Eternal Gosh",
        img_path: "img/5.jpg",
        music_path: "music/5.mp3"
    }
];
let playing = false;
let index = 0;
const track = document.createElement("audio");

// load track 
function loadTrack(i) {
    let index = Number(i);
    title.innerHTML = musics[index].title;
    singer.innerHTML = musics[index].singer;
    poster.src = musics[index].img_path;
    track.src = musics[index].music_path;
    track.load();

    current.innerHTML = index + 1;
    count.innerHTML = musics.length;

    setInterval(currTime, 1000);
}
loadTrack(index);

// check track
function checkMusic() {
    playing === true ? justPause() : justPlay();
}

// justPlay
function justPlay() {
    track.play();
    playing = true;
    play.className = "fas fa-pause"
}

// justPause
function justPause() {
    track.pause();
    playing = false;
    play.className = "fas fa-play"
}
// prev song
function prevSong() {
    if (index <= 0) index = musics.length - 1;
    else index--;
    loadTrack(index);
    playing = false;
    checkMusic();
}

// next song
function nextSong() {
    if (index >= musics.length - 1) index = 0;
    else index++;
    loadTrack(index);
    playing = false;
    checkMusic();
}
// slider 
function currTime() {
    range.value = track.currentTime * (100 / track.duration);
    if (track.ended) nextSong();
}

// set range
function setRange() {
    track.currentTime = range.value * (track.duration / 100);
}
// toggle menu
function toggleMenu() {
    navList.classList.toggle("nav-list-active");
    menu.classList.toggle("fa-times");
}

// fetch music at navlist
musics.map((music, index) => {
    let li = document.createElement("li");
    li.innerHTML = `<div>
                        <h3>${music.title}</h3>
                        <p>${music.singer}</p>
                    </div>
                    <i class="trackSingle ${index} fas fa-play" id="playSingle"></i>`;

    navList.appendChild(li);
})

// load single
function loadSingle(event) {
    if (event.target.classList.contains("trackSingle") && event.target.classList.contains("fa-play")) {
        // get track index from class
        loadTrack(event.target.classList[1]);
        playing = false;
        checkMusic();
        
        Array.from(navList.children).forEach(li =>{
            li.lastChild.classList.remove("fa-pause");
            li.lastChild.classList.add("fa-play");
        })

        event.target.classList.add("fa-pause");
        event.target.classList.remove("fa-play");
    }else if(event.target.classList.contains("trackSingle") && event.target.classList.contains("fa-pause")){
        playing = true;
        checkMusic();
        event.target.classList.add("fa-play");
        event.target.classList.remove("fa-pause");
    }else {
        navList.classList.toggle("nav-list-active");
        menu.classList.toggle("fa-times");
    }
}


// event listener
play.addEventListener("click", checkMusic);
prev.addEventListener("click", prevSong);
next.addEventListener("click", nextSong);
range.addEventListener("change", setRange);
menu.addEventListener("click", toggleMenu);
navList.addEventListener("click", loadSingle)