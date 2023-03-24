import Notiflix from 'notiflix';

const formE1 = document.querySelector('.form');
const formData = {};

formE1.addEventListener('input', formInputs);
formE1.addEventListener('submit', submitPromise);

function formInputs(evt) {
  formData[evt.target.name] = Number(evt.target.value);
}

function submitPromise(evt) {
  evt.preventDefault();

  let {
    elements: { delay, step, amount },
  } = evt.currentTarget;
  if (delay.value < 0 || step.value < 0 || amount.value <= 0) {
    Notiflix.Notify.warning('JS stop blowing my mind');
    return;
  }

  delay = formData.delay;

  for (let position = 1; position <= formData.amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delay += formData.step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// const refs = {
//   form: document.querySelector('form'),
//   inputDelay: document.querySelector('input[name="delay"]'),
//   inputStep: document.querySelector('input[name="step"]'),
//   inputAmount: document.querySelector('input[name="amount"]'),
// };

// refs.form.addEventListener('submit', submitPromise);

// function createPromise(position, delay) {
//   return new Promise((resolve, reject) => {
//     const shouldResolve = Math.random() > 0.3;

//     setTimeout(() => {
//       if (shouldResolve) {
//         resolve({ position, delay });
//       } else {
//         reject({ position, delay });
//       }
//     }, delay);
//   });
// }

// function submitPromise(evt) {
//   evt.preventDefault();
//   let prevDelay;
//   for (let i = 0; i <= refs.inputAmount.value; i += 1) {
//     prevDelay += Number(refs.inputStep.value);
//     createPromise(i, prevDelay)
//       .then(({ position, delay }) => {
//         Notiflix.Notify.success(
//           `✅ Fulfilled promise ${position} in ${delay}ms`
//         );
//       })
//       .catch(({ position, delay }) => {
//         Notiflix.Notify.failure(
//           `❌ Rejected promise ${position} in ${delay}ms`
//         );
//       });
//   }
// }
