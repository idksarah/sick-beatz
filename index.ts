const input = document.querySelector<HTMLInputElement>("#file-upload");
let songList = [];
let songCounter = 0;

function song (filename:String, fileURL:String, fileLength:number, artist = "n/a") {
    this.fileName = filename;
    this.fileURL = fileURL;
    this.Length = fileLength;
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
//
input.addEventListener('change', () => {
    storeSong();
    if(songList[songCounter]){
        handleAudioFile(songList[songCounter]);
        songCounter++;
    }
})
