import loadPhotos from '../lib/loadPhotos';
import events from '../lib/events';

function loadMore(container, currentPage) {
  const loadPageNumber = currentPage + 1;
  loadPhotos(container, loadPageNumber);
}

function endlessScroll(data) {
  const { container, currentPage } = data;
  const orientationHorizontal = window.matchMedia('(min-width: 600px)'); // matches query in SCSS to stack photo's vertically
  const orientationVertical = !orientationHorizontal;
  let scrollFired = 0;

  // TODO: Performance improvement would be to throttle this scroll event
  window.addEventListener('scroll', () => {
    if (scrollFired === 0) {
      const rect = container.getBoundingClientRect();
      let reachedEnd;

      if (orientationVertical) {
        const vHeight = rect.height;
        reachedEnd = Math.round(rect.bottom) === vHeight;
      } else {
        const vWidth = rect.width;
        const xy = rect.right - rect.left;
        reachedEnd = xy - vWidth === 0;
      }

      if (reachedEnd) {
        loadMore(container, currentPage);
        scrollFired = 1;
      }
    }
  });
}

events.subscribe('createdCards', (data) => {
  endlessScroll(data);
});
