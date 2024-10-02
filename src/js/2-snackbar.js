import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  delayInput: document.querySelector('#delay'),
  fulfilledInput: document.querySelector('input[value="fulfilled"]'),
  rejectedInput: document.querySelector('input[value="rejected"]'),
  createBtn: document.querySelector('button[type="submit"]'),
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', event => {
  event.preventDefault();
  createNotification().then(onFulfilled).catch(onRejected);
});

const createNotification = () => {
  const time = refs.delayInput.value;

  const isFulfilled = refs.fulfilledInput.checked;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isFulfilled) {
        resolve();
      } else {
        reject();
      }
    }, time);
  });

  return promise;
};

function onFulfilled(result) {
  iziToast.show({
    message: `✅ Fulfilled promise in ${refs.delayInput.value}ms`,
    position: 'topRight',
    timeout: 5000,
    backgroundColor: '#78e08f',
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

function onRejected(error) {
  iziToast.show({
    message: `❌ Rejected promise in ${refs.delayInput.value}ms`,
    position: 'topRight',
    timeout: 5000,
    backgroundColor: '#ff6b6b',
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
