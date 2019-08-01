import _ from 'lodash';
import events from '../lib/events';

events.subscribe('createdCards', (data) => {
  console.log('cards are created!: ', data);
});

// subscription.remove();

/*
 * ----------
 */
/**
 *
 * source: https://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport/7557433#7557433
 */
function isElementVisible(el) {
  const rect = el.getBoundingClientRect();
  const vWidth = window.innerWidth || document.documentElement.clientWidth;
  const vHeight = window.innerHeight || document.documentElement.clientHeight;

  function efp(x, y) { return document.elementFromPoint(x, y); }

  // Return false if it's not in the viewport
  if (rect.right < 0 || rect.bottom < 0 || rect.left > vWidth || rect.top > vHeight) {
    return false;
  }

  // Return true if any of its four corners are visible
  return (
    el.contains(efp(rect.left, rect.top))
    || el.contains(efp(rect.right, rect.top))
    || el.contains(efp(rect.right, rect.bottom))
    || el.contains(efp(rect.left, rect.bottom))
  );
}

function allCardsLoaded() {
  const cards = document.getElementsByClassName('card');

  for (let i = 0; i < cards.length; i += 1) {
    console.log(isElementVisible(cards[i]));
  }
}

function callback() {
  allCardsLoaded();
}

window.addEventListener('scroll', _.throttle(callback, 1000, { leading: true }));