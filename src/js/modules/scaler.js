export const scaler = () => {
  const parentDivs = document.querySelectorAll('.page--carton');

  parentDivs.forEach(parentDiv => {
    const print = parentDiv.querySelector('.scaler');
    const originalTransition = print.style.transition;
    let isTransitioning = false;

    const resizeObserver = new ResizeObserver(entries => {
      if (isTransitioning) return;

      for (let entry of entries) {
        const parentDivWidth = entry.contentRect.width;
        const printWidth = print.offsetWidth;
        const scale = parentDivWidth / printWidth;
        print.style.transform = `scale(${scale})`;
      }
    });

    print.addEventListener('transitionstart', () => {
      isTransitioning = true;
      resizeObserver.disconnect();
    });

    print.addEventListener('transitionend', () => {
      isTransitioning = false;
      resizeObserver.observe(parentDiv);
    });

    resizeObserver.observe(parentDiv);
  });
};