import loadPhotos from '../lib/loadPhotos';
import events from '../lib/events';

function loadMore(container, currentPage) {
  const loadPageNumber = currentPage + 1;
  loadPhotos(container, loadPageNumber);
}

function endlessScroll(data) {
  const { container, currentPage } = data;
  const orientationHorizontal = container.getBoundingClientRect().width >= '600'; // matches query in SCSS to stack photo's vertically
  const orientationVertical = !orientationHorizontal;
  let scrollFired = 0;

  // TODO: Performance improvement would be to throttle this scroll event
  container.addEventListener('scroll', () => {
    if (scrollFired === 0) {
      const containerRect = container.getBoundingClientRect();
      const lastCardRect = container.lastChild.getBoundingClientRect();
      let reachedEnd;

      if (orientationVertical) {
        reachedEnd = container.scrollHeight - container.scrollTop === containerRect.height;
      } else {
        const vWidth = containerRect.width;
        const cardRightEnd = lastCardRect.right - containerRect.left;
        reachedEnd = vWidth - cardRightEnd === 0;
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
