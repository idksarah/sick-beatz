const input = document.querySelector<HTMLInputElement>("#file-upload");
let song;

function storeSong() {
    if(input.files && input.files.length > 0) {
        song = input.files[0]; //accesses the first file
    }
}

input.addEventListener('change', () => {
    storeSong();
    if(song){
        handleAudioFile(song);
    }
})

function handleAudioFile(file){
    const reader = new FileReader();
    reader.onload = function(event) {
        const arrayBuffer = event.target.result as ArrayBuffer;
        const audioContext = new (window.AudioContext)();
        audioContext.decodeAudioData(arrayBuffer, function(buffer) {
            const duration = buffer.duration;
            console.log('length' + duration);
        });
    };

    reader.readAsArrayBuffer(file);

    const url = URL.createObjectURL(file);
    const audio = new Audio(url);

    audio.onloadedmetadata = function() {
        console.log("title:" + file.name);
    };
}