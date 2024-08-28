console.log("hello world!");

const input = document.querySelector("#file-upload");

function storeSong() {
    let song = input.value;
    alert(song);
}

input.addEventListener('click', () => {
    if(input.value != undefined){
        storeSong();
    }
})