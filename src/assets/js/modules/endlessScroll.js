import events from '../lib/events';

function loadMore() {
  console.log('load more items');
}

events.subscribe('createdCards', (data) => {
  const { container } = data;

  window.addEventListener('scroll', () => {
    const rect = container.getBoundingClientRect();
    const vHeight = window.innerHeight || document.documentElement.clientHeight;

    const reachedEnd = Math.round(rect.bottom) === vHeight;
    if (reachedEnd) {
      loadMore();
    }
  });
});
