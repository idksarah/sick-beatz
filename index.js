var input = document.querySelector("#file-upload");
var songList = [];
var songCounter = 0;
function song(filename, fileURL, fileLength, artist) {
    if (artist === void 0) { artist = "n/a"; }
    this.fileName = filename;
    this.fileURL = fileURL;
    this.Length = fileLength;
    this.artist = artist || "n/a";
}
function storeSong() {
    if (input.files && input.files.length > 0) { //pretty sure this creates an extra initial file but hoenst to god i dont care rn
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
                songList[songCounter] = new song(file.name, url, length);
            };
        });
    };
    reader.readAsArrayBuffer(file);
}
//
input.addEventListener('change', function () {
    storeSong();
    if (songList[songCounter]) {
        handleAudioFile(songList[songCounter]);
        songCounter++;
    }
});
