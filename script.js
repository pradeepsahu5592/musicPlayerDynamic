var play =document.getElementById("play");
var pause =document.getElementById("next");
var imgContainer = document.getElementById("imgContainer");
var imgpic = document.getElementById("imgpic");
const music = document.querySelector("audio");
var title = document.getElementById("title");
var artist = document.getElementById("artist");
var prev = document.getElementById("prev");
var next = document.getElementById("next");
const durationTime=document.getElementById("durationTime");
const curTime=document.getElementById("curTime");
const progressDiv=document.getElementById("progressDiv");
const songs = [
    {
    pic:"radheshyam",
    title:"Aashiqui Aa Gayi",
    artist : "Prabhas, Pooja Hegde",
    music : "Aashiqui Aa Gayi"
    },
    {
    pic:"Antim",
    title:"Hone Laga",
    artist : "Salman Ayush",
    music : "Hone Laga"

    },
    {
    pic:"khoyapaya",
    title:"Khoya Paaya",
    artist : "Kartik Aaryan",
    music : "Khoya Paaya"

    }
]



let isPlaying =false;

const playMusic=()=>{
    // imgContainer.classList.add("animate");
    imgContainer.classList.add("animate");
    play.classList.replace("fa-play","fa-pause")
    music.play();

    isPlaying =true;
}
const pauseMusic=()=>{
    
    // imgContainer.classList.add("animate");
    imgContainer.classList.toggle("animate");
    music.pause();
    imgContainer.classList.remove("animate");
    play.classList.replace("fa-pause","fa-play")
    
    isPlaying =false;
}

play.addEventListener("click",()=>{
    // if(isPlaying){
    //     pauseMusic();
    // }else{
    //     playMusic();
    // }

    isPlaying ? pauseMusic() : playMusic();
})

const loadSongs=(songs)=>{
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    music.src = `musics/${songs.music}.mp3`;
    imgpic.src="images/"+songs.pic+".jpg";
}

songIndex = 0;

const nextSong=()=>{
    
    songIndex = (songIndex + 1) % songs.length;
    loadSongs(songs[songIndex]);
    playMusic();
};
const prevSong=()=>{
    
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSongs(songs[songIndex]);
    playMusic();
};

// progress js workerData
music.addEventListener("timeupdate",(event)=>{

    const {currentTime,duration} = event.srcElement;    

    let progressTime = (currentTime*100)/duration;
    progress.style.width =`${progressTime}%`;    
    // console.log(Math.round(progressTime));
    console.log(event);

    // duration
    let sec =Math.round(duration%60);
    let min = Math.trunc(duration/60);
    if(duration){
        if(sec<10){
            sec  =`0${sec}`;
       }
       if(min<10){
           min  =`0${min}`;
      }
        durationTime.textContent =`${min}:${sec}`;
    }

    // current duration
    let currSec = Math.round(currentTime%60);
    let currMin = Math.trunc(currentTime/60);

    if(currSec<10){
         currSec  =`0${currSec}`;
    }
    if(currMin<10){
        currMin  =`0${currMin}`;
   }
        curTime.innerHTML =`${currMin}:${currSec}`;

    
    

})

progressDiv.addEventListener("click",(event)=>{
    const {duration} = music;    
    let moveProgress = (event.offsetX/event.srcElement.clientWidth)*duration;
    music.currentTime = moveProgress;

    console.log(moveProgress);
})
music.addEventListener("ended",nextSong);

next.addEventListener("click",nextSong);
prev.addEventListener("click",prevSong);
