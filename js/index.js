
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

const textContainer = document.getElementById('text-container');
const h4 = textContainer.querySelector('h4');
const h1 = textContainer.querySelector('h1');
const h1Words = h1.innerText.split(' ');

h1.innerHTML = '';

h1Words.forEach((word, i) => {
  const span = document.createElement('span');
  span.innerText = word + ' ';

  if (i === h1Words.length - 1) {
    span.addEventListener('animationend', () => {
      h1.style.animation = 'none';
    });
  }

  h1.appendChild(span);
});

h1.innerHTML += '<br>';

h4.style.opacity = 0;

setTimeout(() => {
  h4.style.animation = 'fadeIn 2s forwards';
}, 1000);

function fadeIn() {
  h4.removeEventListener('animationend', fadeIn);
  h4.style.opacity = 1;
  h4.style.animation = 'none';
}

h4.addEventListener('animationend', fadeIn);


/-----/


$(window).scroll(function(evt) {
  if ($(window).scrollTop() > 850) {
      $(".navbar,progress").removeClass("onOff");
      $(".navbar").addClass("bg-light");
      $(".navbar").addClass("navbar-light ");
      $("#content_progress").css("opacity", 0.5); // 设置不透明度为0.8
  } else {
      $(".navbar,progress").addClass("onOff");
      $(".navbar").removeClass("bg-light");
      $(".navbar").removeClass("navbar-light ");
      $("#content_progress").css("opacity", 0); // 恢复不透明度为1
  }
});

const elements = document.querySelectorAll('.fade-in');

function fadeInElements() {
  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop+100 < windowHeight) {
      element.style.opacity = 1;
    } else {
      element.style.opacity = 0;
    }
  });
}

window.addEventListener('scroll', fadeInElements);