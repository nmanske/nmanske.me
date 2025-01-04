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

window.addEventListener('resize', function () {
  const video = document.querySelector('.background-video');
  video.style.width = '100%';
  video.style.height = '100%';
});

// Load video and content simultaneously
window.addEventListener('load', () => {
  const video = document.querySelector('.background-video');
  const content = document.querySelector('.content');

  let videoLoaded = false;

  const checkAndDisplayContent = () => {
    if (videoLoaded) {
      video.style.visibility = 'visible';
      video.style.opacity = '1';

      content.style.visibility = 'visible';
      content.style.opacity = '1';

      // Trigger letter scrambling
      const baffleElements = document.querySelectorAll('.name, .position');
      const b = window.baffle(baffleElements, {
        characters: '01',
        speed: 50,
      });
      b.start();
      b.reveal(2000);
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

  // Individual locks for h1 and h2 to prevent simultaneous scrambling
  let isScramblingH1 = false;
  let isScramblingH2 = false;

  const nameElement = document.querySelector('.name');
  const positionElement = document.querySelector('.position');

  // Scramble text function with individual locks for each element
  const scrambleText = (element, lockKey) => {
    if (lockKey === 'h1' && isScramblingH1) return; // Don't scramble h1 if already scrambling
    if (lockKey === 'h2' && isScramblingH2) return; // Don't scramble h2 if already scrambling

    // Lock the element to prevent further scrambling while it's active
    if (lockKey === 'h1') isScramblingH1 = true;
    if (lockKey === 'h2') isScramblingH2 = true;

    const baffleInstance = window.baffle(element, {
      characters: '01',
      speed: 50,
    });
    baffleInstance.start();
    baffleInstance.reveal(2000);

    // Use setTimeout to unlock after the reveal is done
    setTimeout(() => {
      if (lockKey === 'h1') isScramblingH1 = false;
      if (lockKey === 'h2') isScramblingH2 = false;
    }, 1000);  // Match this time to the reveal duration (2000ms)
  };

  // Add event listeners for both h1 and h2
  nameElement.addEventListener('click', () => {
    scrambleText(nameElement, 'h1');  // Scramble h1 when clicked
  });

  positionElement.addEventListener('click', () => {
    scrambleText(positionElement, 'h2');  // Scramble h2 when clicked
  });
});