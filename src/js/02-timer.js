import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    button : document.querySelector('button'),
    days : document.querySelector('.value[data-days'),
    hours : document.querySelector('.value[data-hours'),
    minutes : document.querySelector('.value[data-minutes'),
    seconds : document.querySelector('.value[data-seconds'),

}

const date = new Date();
 let selectedDateValue;
 
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = selectedDates[0]; 
      selectedDateValue = selectedDate;
        if(selectedDate < date){
        return Notiflix.Notify.failure("Please choose a date in the future")        
        }

        return refs.button.removeAttribute('disabled');

    },
  };

flatpickr("#datetime-picker", options);

refs.button.addEventListener('click', onClick);


const timer = {
  intervalTimer: null,
  start(){
    this.intervalTimer = setInterval(() => {
      const curent = Date.now();
      const deltaTime = selectedDateValue - curent;
        if(deltaTime <=0){
          this.stop();
          return;
        }

      const time = convertMs(deltaTime);
       timerReadings(time);
      
    }, 1000);
  },
  stop (){
    clearInterval(this.intervalTimer);
    this.intervalTimer = null
  },
}

function onClick() {
  timer.start();
}

function timerReadings({days, hours, minutes, seconds}) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;

}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }


