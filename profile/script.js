// Initialising the canvas
var canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d');

// Setting the width and height of the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Setting up the letters
var letters = '编程创意热情算法编程创意热情算法ABCDEFGHIJKLMNOPQRSTUVXYZ';
letters = letters.split('');

// Setting up the columns
var fontSize = 20,
    columns = canvas.width / fontSize;

// Setting up the drops
var drops = [];
for (var i = 0; i < columns; i++) {
  drops[i] = 1;
}

// Setting up the draw function
function draw() {
  ctx.font = fontSize*0.8 + 'px Arial';
  ctx.fillStyle = 'rgba(0, 0, 0, .1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < drops.length; i++) {
    var text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillStyle = '#6495ed';
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    drops[i]++;
    if (drops[i] * fontSize > canvas.height && Math.random() > .95) {
      drops[i] = 0;
    }
  }
}

// Loop the animation
setInterval(draw, 60);

document.addEventListener("DOMContentLoaded", () => {
  const rows = [
      { element: document.getElementById('row1'), direction: -1, baseSpeed: 0.5 },
      { element: document.getElementById('row2'), direction: 1, baseSpeed: 0.6 },
      { element: document.getElementById('row3'), direction: -1, baseSpeed: 0.4 }
  ];

  rows.forEach(({ element, direction, baseSpeed }) => {
      let offset = 0;
      let time = 0;
      const images = Array.from(element.children);

      images.forEach(img => {
          const clone = img.cloneNode(true);
          element.appendChild(clone);
      });

      function animate() {
          const cycleSpeed = baseSpeed * (Math.sin(time/1.2) + 1) / 2;
          offset += direction * cycleSpeed;

          element.style.transform = `translateX(${offset}px)`;

          if (direction === -1 && offset <= -element.scrollWidth / 2) {
              offset = 0;
          } else if (direction === 1 && offset >= 0) {
              offset = -element.scrollWidth / 2;
          }

          time += 0.01;
          requestAnimationFrame(animate);
      }

      animate();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const cover = document.querySelector('.cover');
  const contentPage = document.querySelector('.content-page');
  const scrollIndicator = document.querySelector('.scroll-indicator');
  const coverPageBtn = document.querySelector('.cover-page-btn');

  // Function to scroll down to content page
  const scrollToContent = () => {
      cover.style.transform = 'translateY(-100vh)';
    //   contentPage.style.transform = 'translateY(0)';
  };

  // Function to scroll back to cover
  const scrollToCover = () => {
      cover.style.transform = 'translateY(0)';
    //   contentPage.style.transform = 'translateY(100vh)';
  };

  // Click event for the arrow icon
  scrollIndicator.addEventListener('click', scrollToContent);
  coverPageBtn.addEventListener('click', scrollToCover);

  // Scroll events to detect user intent for automatic transitions
  window.addEventListener('wheel', (event) => {
      if (event.deltaY > 0) {
          scrollToContent();
      } 
      // else if (window.scrollY === 0 && event.deltaY < 0) {
      //     scrollToCover();
      // }
  });

  contentPage.addEventListener('scroll', () => {
      if (contentPage.scrollTop == 0) {
          scrollToCover();
      }
  });
});
