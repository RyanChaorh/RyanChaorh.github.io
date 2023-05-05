
var mouseCircle = document.querySelector('.mouseCircle');
var cBtns = document.querySelectorAll('.cBtn');
var mouseX = 0, mouseY = 0;
var circleX = 0, circleY = 0;

function updateCircle() {
  var distX = mouseX - circleX;
  var distY = mouseY - circleY;
  circleX = circleX + (distX * 0.2);
  circleY = circleY + (distY * 0.2);
  mouseCircle.style.left = circleX + 'px';
  mouseCircle.style.top = circleY + 'px';
  requestAnimationFrame(updateCircle);
}

updateCircle();

document.addEventListener('mousemove', function(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

cBtns.forEach(function(cBtn) {
  cBtn.addEventListener('mouseover', function(e) {
    mouseCircle.style.width = '4rem';
    mouseCircle.style.height = '4rem';
    mouseCircle.classList.add('active');
    mouseCircle.style.mixBlendMode = 'normal';
  });

  cBtn.addEventListener('mouseout', function(e) {
    mouseCircle.style.width = '1rem';
    mouseCircle.style.height = '1rem';
    mouseCircle.classList.remove('active');
    mouseCircle.style.mixBlendMode = 'exclusion';
  });
});

/-----/
const bg = document.querySelector('.bg');

window.addEventListener('mousemove', e => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  bg.style.background = `radial-gradient(circle at ${x*100}% ${y*100}%, #222, #000)`;
});

/-----/