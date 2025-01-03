// Age writer
var age = new moment().diff(moment('19940111', 'YYYYMMDD'), 'years');
var ageElements = document.getElementsByClassName("age");
for (let element of ageElements)
  element.innerHTML = age;

// Copyright year writer
var copyrightYear = new moment().year();
var copyrightYearElements = document.getElementsByClassName("copyrightYear");
console.log(copyrightYearElements[0]);
for (let element of copyrightYearElements)
  element.innerHTML = copyrightYear;

// Letter scrambling
let baffleElements = document.querySelectorAll('.name, .position');
let b = window.baffle(baffleElements, {
  characters: '01',
});
b.reveal(2000);

// Load video and content simultaneously
window.addEventListener('load', () => {
  const video = document.querySelector('.background-video');
  const content = document.querySelector('.content');

  let videoLoaded = false;

  const checkAndDisplayContent = () => {
    if (videoLoaded) {
      content.style.visibility = 'visible';
    }
  };

  video.addEventListener('loadeddata', () => {
    videoLoaded = true;
    checkAndDisplayContent();
  });

  // Fallback in case `loadeddata` doesn't fire
  setTimeout(() => {
    if (!videoLoaded) {
      content.style.visibility = 'visible';
    }
  }, 3000); // Timeout to show content after 3 seconds if video hasn't loaded

  video.load();
});