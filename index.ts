//ermmmm. should ahve the cd player on the playingpage and the upload/cd burning page need to be combined (after the first song shrink the cd player and add a song list)

const body = document.querySelector<HTMLBodyElement>("body");
const input = document.querySelector<HTMLInputElement>("#file-upload");
const doneButton = document.querySelector<HTMLButtonElement>(".done");

const uploadPage = document.querySelector<HTMLDivElement>(".uploadPage");
const playerPage = document.querySelector<HTMLDivElement>(".playerPage");

const uploadedSongDisplay = document.querySelector<HTMLDivElement>(".uploadedSongDisplay");
const songContainerName = document.querySelector<HTMLParagraphElement>(".songContainerName");
const songContainerArtist = document.querySelector<HTMLParagraphElement>(".songContainerArtist");
const songContainerLength = document.querySelector<HTMLParagraphElement>(".songContainerLength");

let songList = [];
let songCounter = 0;

function song (filename:String, fileURL:String, fileLength:number, artist = "n/a") {
    this.fileName = filename;
    this.fileURL = fileURL;
    this.length = fileLength;
    this.artist = artist || "n/a";
}

function storeSong() {
    if(input.files && input.files.length > 0) { //pretty sure this creates an extra initial file but hoenst to god i dont care rn
        songList[songCounter] = input.files[0];
    }
}

function handleAudioFile(file){
    const reader = new FileReader();
    reader.onload = function(event) {
        const arrayBuffer = event.target.result as ArrayBuffer;
        const audioContext = new (window.AudioContext)();
        audioContext.decodeAudioData(arrayBuffer, function(buffer) {
            let length = buffer.duration;
        
            const url = URL.createObjectURL(file);
            const audio = new Audio(url);
        
            audio.onloadedmetadata = function() {
                songList[songCounter] = new song(file.name, url, length);
            };
        });
    };
    reader.readAsArrayBuffer(file);
}

function updateSongDisplays(song) {
    console.log(song);
    songContainerName.textContent = song.fileName;
    songContainerArtist.textContent = song.artist;
    songContainerLength.textContent = song.length;
}
//
input.addEventListener('change', () => {
    storeSong();
    if(songList[songCounter]){
        handleAudioFile(songList[songCounter]);
        uploadedSongDisplay.classList.remove("hidden");
        updateSongDisplays(songList[songCounter]); //probably an issue with that stupid extra begining file??? idk lol
        songCounter++;
    }
})

doneButton.addEventListener('click', () => {
    if(songList.length >= 2) { //should be 1 but we have a bug and i'm running with it
        uploadPage.remove();
        playerPage.classList.remove("hidden");
    } else {
        alert('pls upload a song first!'); //turn into an html element
    }
});