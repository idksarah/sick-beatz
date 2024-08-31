var input = document.querySelector("#file-upload");
var song;
function storeSong() {
    if (input.files && input.files.length > 0) {
        song = input.files[0]; //accesses the first file
    }
}
input.addEventListener('change', function () {
    storeSong();
    if (song) {
        handleAudioFile(song);
    }
});
function handleAudioFile(file) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var arrayBuffer = event.target.result;
        var audioContext = new (window.AudioContext)();
        audioContext.decodeAudioData(arrayBuffer, function (buffer) {
            var duration = buffer.duration;
            console.log('length' + duration);
        });
    };
    reader.readAsArrayBuffer(file);
    var url = URL.createObjectURL(file);
    var audio = new Audio(url);
    audio.onloadedmetadata = function () {
        console.log("title:" + file.name);
    };
}
