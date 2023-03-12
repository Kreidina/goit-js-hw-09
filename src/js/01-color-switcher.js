function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

const refs = {
    start : document.querySelector('button[data-start]'),
    stop : document.querySelector('button[data-stop]'),
    bodyStyle : document.querySelector('body'),
}

refs.start.addEventListener('click', ()=> colorSwitch.onStart());
refs.stop.addEventListener('click', ()=> colorSwitch.onStop());


const colorSwitch = {
    intervalId : null,
    isActive : false,
 onStart() {
    if(this.isActive){
        return;
    }
    this.isActive = true;
    this.intervalId = setInterval(() =>{
        refs.bodyStyle.style.backgroundColor = getRandomHexColor();
    }, 1000)
},
 onStop() {
    clearInterval(this.intervalId);
    this.isActive = false;


}
}

