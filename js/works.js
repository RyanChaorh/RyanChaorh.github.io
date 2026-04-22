(function () {
  const mouseCircle = document.querySelector('.mouseCircle');
  const cBtns = document.querySelectorAll('.cBtn');
  const bg = document.querySelector('.bg');
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

  document.querySelectorAll('img').forEach((img) => {
    if (!img.getAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }

    if (!img.getAttribute('decoding')) {
      img.setAttribute('decoding', 'async');
    }

    if (!img.getAttribute('alt')) {
      const src = img.getAttribute('src') || '';
      const fallback = src.split('/').pop() || 'portfolio image';
      img.setAttribute('alt', fallback.replace(/[-_]/g, ' '));
    }
  });
})();
