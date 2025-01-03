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

  video.oncanplaythrough = () => {
    // Make content visible after the video is ready
    content.style.visibility = 'visible';
  };
});