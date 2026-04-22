(function () {
  const mouseCircle = document.querySelector('.mouseCircle');
  const cBtns = document.querySelectorAll('.cBtn');
  const bg = document.querySelector('.bg');
  const navbar = document.querySelector('.navbar');
  const progress = document.querySelector('#content_progress');
  const fadeItems = document.querySelectorAll('.fade-in');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const supportsHoverPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (bg && !bg.style.background) {
    bg.style.background = 'radial-gradient(circle at 50% 20%, #1f1f1f, #000)';
  }

  if (supportsHoverPointer && !prefersReducedMotion && mouseCircle) {
    const cursorStorageKey = 'rc_cursor_position';
    const fallbackX = window.innerWidth / 2;
    const fallbackY = window.innerHeight / 2;
    let mouseX = fallbackX;
    let mouseY = fallbackY;
    let circleX = fallbackX;
    let circleY = fallbackY;
    let pendingMouseFrame = false;

    try {
      const saved = JSON.parse(sessionStorage.getItem(cursorStorageKey) || 'null');
      if (saved && Number.isFinite(saved.x) && Number.isFinite(saved.y)) {
        mouseX = saved.x;
        mouseY = saved.y;
        circleX = saved.x;
        circleY = saved.y;
      }
    } catch (error) {
      // Ignore malformed storage data.
    }

    mouseCircle.style.left = circleX + 'px';
    mouseCircle.style.top = circleY + 'px';

    const updateCircle = () => {
      const distX = mouseX - circleX;
      const distY = mouseY - circleY;
      circleX += distX * 0.2;
      circleY += distY * 0.2;
      mouseCircle.style.left = circleX + 'px';
      mouseCircle.style.top = circleY + 'px';
      requestAnimationFrame(updateCircle);
    };

    updateCircle();

    document.addEventListener('mousemove', (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      sessionStorage.setItem(cursorStorageKey, JSON.stringify({ x: mouseX, y: mouseY }));

      if (!bg || pendingMouseFrame) {
        return;
      }

      pendingMouseFrame = true;
      requestAnimationFrame(() => {
        const x = (mouseX / window.innerWidth) * 100;
        const y = (mouseY / window.innerHeight) * 100;
        bg.style.background = 'radial-gradient(circle at ' + x + '% ' + y + '%, #222, #000)';
        pendingMouseFrame = false;
      });
    });

    cBtns.forEach((cBtn) => {
      cBtn.addEventListener('mouseenter', () => {
        mouseCircle.style.width = '4rem';
        mouseCircle.style.height = '4rem';
        mouseCircle.classList.add('active');
        mouseCircle.style.mixBlendMode = 'normal';
      });

      cBtn.addEventListener('mouseleave', () => {
        mouseCircle.style.width = '1rem';
        mouseCircle.style.height = '1rem';
        mouseCircle.classList.remove('active');
        mouseCircle.style.mixBlendMode = 'exclusion';
      });
    });
  } else if (mouseCircle) {
    mouseCircle.style.display = 'none';
  }

  const textContainer = document.getElementById('text-container');
  if (textContainer) {
    const h4 = textContainer.querySelector('h4');
    const h1 = textContainer.querySelector('h1');

    if (h1) {
      const h1Words = h1.innerText.split(' ');
      h1.innerHTML = '';

      h1Words.forEach((word, index) => {
        const span = document.createElement('span');
        span.innerText = word + ' ';

        if (index === h1Words.length - 1) {
          span.addEventListener('animationend', () => {
            h1.style.animation = 'none';
          });
        }

        h1.appendChild(span);
      });

      h1.insertAdjacentHTML('beforeend', '<br>');
    }

    if (h4) {
      h4.style.opacity = '0';
      setTimeout(() => {
        h4.style.animation = 'fadeIn 2s forwards';
      }, 1000);

      h4.addEventListener('animationend', function handleFadeIn() {
        h4.style.opacity = '1';
        h4.style.animation = 'none';
        h4.removeEventListener('animationend', handleFadeIn);
      });
    }
  }

  const updateNavVisibility = () => {
    const isMobile = window.innerWidth <= 991;
    const isVisible = isMobile || window.scrollY > 850;

    if (navbar) {
      navbar.classList.toggle('onOff', !isVisible);
      navbar.classList.toggle('bg-light', isVisible);
      navbar.classList.toggle('navbar-light', isVisible);
    }

    if (progress) {
      progress.classList.toggle('onOff', !isVisible || isMobile);
      progress.style.opacity = isVisible && !isMobile ? '0.5' : '0';
    }
  };

  updateNavVisibility();
  window.addEventListener('scroll', updateNavVisibility, { passive: true });

  if (fadeItems.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-visible', entry.isIntersecting);
        });
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -8% 0px'
      }
    );

    fadeItems.forEach((item) => observer.observe(item));
  }
})();
