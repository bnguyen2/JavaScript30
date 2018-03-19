const video = document.querySelector('.player');
const player = video.querySelector('.viewer');
const toggle = video.querySelector('.toggle');
const progress = video.querySelector('.progress');
const progressBar = video.querySelector('.progress__filled');
const skipButtons = video.querySelectorAll('[data-skip]');
const ranges = video.querySelectorAll('.player__slider');

function handleClick() {
  if (player.paused) {
    player.play();
  } else {
    player.pause();
  }
}

function toggleButton() {
  let icon = player.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function handleSkip() {
  player.currentTime += parseFloat(this.dataset.skip);
}

function handleRange() {
  player[this.name] = this.value;
}

function handleProgress() {
  const percent = player.currentTime / player.duration * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = e.offsetX / progress.offsetWidth * player.duration;
  player.currentTime = scrubTime;
}

player.addEventListener('click', handleClick);
player.addEventListener('play', toggleButton);
player.addEventListener('pause', toggleButton);
player.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', handleClick);
skipButtons.forEach(button => button.addEventListener('click', handleSkip));
ranges.forEach(range => range.addEventListener('change', handleRange));
ranges.forEach(range => range.addEventListener('mousemove', handleRange));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', e => mousedown && scrub(e));
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));
