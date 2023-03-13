import Notiflix from 'notiflix';

const refs = {
  form : document.querySelector('.form'),
  button : document.querySelector('button'),
}

refs.form.addEventListener('submit', (e) =>{
    e.preventDefault();

  const delay = Number(refs.form.delay.value);
  const step = Number(refs.form.step.value);
  const amount = Number(refs.form.amount.value);

  for(let i = 1; i <= amount; i ++){
    createPromise(i, delay + (i - 1) * step)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
  }
})


function createPromise(position, delay) {
  return new Promise ((resolve, reject) =>{
    setTimeout(() =>{
      const shouldResolve = Math.random() > 0.3;
       if (shouldResolve) {
        resolve ({position, delay});
    } else{
      reject({position, delay})
    }
    }, delay);
    });
    };