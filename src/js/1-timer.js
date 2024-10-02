import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  picker: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;
let timerId = null;
let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate - currentDate > 0) {
      refs.startBtn.disabled = false;
    } else {
      refs.startBtn.disabled = true;
      iziToast.show({
        title: 'Error : ',
        message: 'Please choose a date in the future',
        position: 'topRight',
        timeout: 5000,
        backgroundColor: '#ff6b6b',
        titleColor: '#ffffff',
        messageColor: '#ffffff',
        close: true,
        closeOnEscape: true,
        progressBarColor: '#ffffff',
        progressBar: true,
        layout: 2,
        maxWidth: 400,
        animateInside: true,
        transitionIn: 'fadeInRight',
        transitionOut: 'fadeOutRight',
      });
    }
  },
};

function onTimerStart() {
  if (!selectedDate) return;

  timerId = setInterval(() => {
    const startTime = new Date();
    const countdown = selectedDate - startTime;
    refs.startBtn.disabled = true;
    refs.picker.disabled = true;

    if (countdown < 0) {
      clearInterval(timerId);
      return;
    }
    updateClockFace(convertMs(countdown));
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

function userSelectedDate() {
  return flatpicker.selectedDates[0];
}

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const flatpicker = flatpickr('#datetime-picker', options);

refs.startBtn.addEventListener('click', onTimerStart);
