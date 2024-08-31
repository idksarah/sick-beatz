//ermmmm. should ahve the cd player on the playingpage and the upload/cd burning page need to be combined (after the first song shrink the cd player and add a song list)
var body = document.querySelector("body");
var input = document.querySelector("#file-upload");
var doneButton = document.querySelector(".done");
var uploadPage = document.querySelector(".uploadPage");
var playerPage = document.querySelector(".playerPage");
var uploadedSongDisplay = document.querySelector(".uploadedSongDisplay");
var songContainerName = document.querySelector(".songContainerName");
var songContainerArtist = document.querySelector(".songContainerArtist");
var songContainerLength = document.querySelector(".songContainerLength");
var songList = [];
var songListData = [];
var songCounter = 0;
function song(filename, fileURL, fileLength, artist) {
    if (artist === void 0) { artist = "n/a"; }
    this.fileName = filename;
    this.fileURL = fileURL;
    this.length = fileLength;
    this.artist = artist || "n/a";
}
function storeSong() {
    if (input.files && input.files.length > 0) {
        songList[songCounter] = input.files[0];
    }
}
function handleAudioFile(file) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var arrayBuffer = event.target.result;
        var audioContext = new (window.AudioContext)();
        audioContext.decodeAudioData(arrayBuffer, function (buffer) {
            var length = buffer.duration;
            var url = URL.createObjectURL(file);
            var audio = new Audio(url);
            audio.onloadedmetadata = function () {
                songListData[songCounter] = new song(file.name, url, length);
            };
        });
    };
    reader.readAsArrayBuffer(file);
}
function updateSongDisplays(song) {
    console.log(song); //not passing the song correctly? but the song itself is correct
    songContainerName.textContent = song.fileName;
    songContainerArtist.textContent = song.artist;
    songContainerLength.textContent = song.length;
}
//
input.addEventListener('change', function () {
    storeSong();
    if (songList[songCounter]) {
        handleAudioFile(songList[songCounter]);
        uploadedSongDisplay.classList.remove("hidden");
        console.log(songCounter);
        songCounter++;
        console.log(songListData); //songListData logs correctly but any info about it doesn't?
        console.log(songListData.length);
        console.log(songListData[0]);
        console.log(songList);
        console.log(songListData[songCounter]);
        updateSongDisplays(songListData[songCounter]);
    }
});
doneButton.addEventListener('click', function () {
    if (songList.length >= 2) { //should be 1 but we have a bug and i'm running with it
        uploadPage.remove();
        playerPage.classList.remove("hidden");
    }
    else {
        alert('pls upload a song first!'); //turn into an html element
    }
});
