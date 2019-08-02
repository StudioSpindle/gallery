import loadPhotos from '../lib/loadPhotos';
import events from '../lib/events';

function loadMore(container, currentPage) {
  const loadPageNumber = currentPage + 1;
  loadPhotos(container, loadPageNumber);
}

events.subscribe('createdCards', (data) => {
  const { container, currentPage } = data;
  let scrollFired = 0;

  // TODO: improvement would be to throttle this scroll event
  window.addEventListener('scroll', () => {
    if (scrollFired === 0) {
      const rect = container.getBoundingClientRect();
      const vHeight = window.innerHeight || document.documentElement.clientHeight;

      const reachedEnd = Math.round(rect.bottom) === vHeight;
      if (reachedEnd) {
        console.log('reached end');
        loadMore(container, currentPage);
        scrollFired = 1;
      }
    }
  });
});
