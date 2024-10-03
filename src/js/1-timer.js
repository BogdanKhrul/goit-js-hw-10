import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";



const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const datetimePicker = document.getElementById('datetime-picker');


let selectedDate = null;
let timerInterval = null;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
     selectedDate = selectedDates[0];

   if (selectedDate <= new Date()) {
     iziToast.error({
       title: "Error",
       message: "Please choose a date in the future",
     });
     startBtn.disabled = true;
       } else {
      startBtn.disabled = false;
    }

  },
};


flatpickr("#datetime-picker", options);

// деактивація кнопки та інпуиу

function startTimer() {
 startBtn.disabled = true;
datetimePicker.disabled = true;

  
// зворотній виклик

  timerInterval = setInterval(() => {
    const currentTime = new Date();
    const timeAll = selectedDate - currentTime;

    if (timeAll <= 0) {
      clearInterval(timerInterval);
      updateTimer(0);
      iziToast.success({
        title: "Completed",
        message: "The countdown has finished!",
      });
      return;
    }

    updateTimer(timeAll);
  }, 1000);
  };


// Оновлюємо таймер
function updateTimer(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);
  
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
  
}

// Конвертуємо мілісекунді у дні, години, хвилини, секунди (з умов дз)

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');

}

startBtn.addEventListener('click', () => {
  // startCount();
  // startBtn.disabled = true;
  // datetimePicker.disabled = true;
  startTimer();
});



