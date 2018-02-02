let countdown;
const timerButtons = document.querySelectorAll('.timer__button');
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');

const displayTimeLeft = seconds => {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = Math.floor(seconds % 60);
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;

  document.title = display;
  timerDisplay.textContent = display;
};
const displayEndTime = timestamp => {
  const end = new Date(timestamp);
  const hours = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back At ${hours > 12 ? hours - 12 : hours}:${minutes < 10 ? '0' : ''}${minutes}`;
};
const startTimer = e => {
  const time = parseInt(e.target.dataset.time);
  timer(time)
}

const timer = seconds => {
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);
  countdown = setInterval(() => {
    const secondsLeft = (then - Date.now()) / 1000;
    if(secondsLeft < 0) {
      clearInterval(countdown);
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

timerButtons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', e => {
  e.preventDefault();
  const form = e.target;
  const minutes = form.minutes.value;
  timer(minutes * 60);
  form.reset();
})

