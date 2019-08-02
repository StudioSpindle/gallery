import { apiUrlGallery, apiUrlPhoto } from '../api';
import { htmlToElement } from '../utilities';
import getTotalAmountPhotos from './getTotalAmountPhotos';
import generateCardHTML from './generateCardHTML';
import getGalleryPhotos from './getGalleryPhotos';
import events from './events';

/**
 * @param {HTMLElement} destLocation Location to append results to
 * @param {number} pageNumber The page number to start from
 */
export default async function loadPhotos(destLocation, pageNumber) {
  const htmlLoader = '<div id="js-loading" class="notification-state serif">Loading</div>';
  const htmlEndOfResults = '<div id="js-end-of-results" class="notification-state serif">No more photos in this gallery</div>';

  const totalPhotos = await getTotalAmountPhotos(apiUrlGallery);
  const photosPerPage = 6;
  const currentAmountOfPhotos = photosPerPage * pageNumber - photosPerPage;
  const noPhotosLeft = currentAmountOfPhotos > totalPhotos;
  if (noPhotosLeft) {
    destLocation.appendChild(htmlToElement(htmlEndOfResults));
    return;
  }

  destLocation.appendChild(htmlToElement(htmlLoader));

  getGalleryPhotos(`${apiUrlGallery}&page=${pageNumber}&per_page=${photosPerPage}`, apiUrlPhoto)
    .then((data) => {
      const loader = document.getElementById('js-loading');
      destLocation.removeChild(loader);
      generateCardHTML(data, destLocation);
      events.publish('createdCards', { container: destLocation, currentPage: pageNumber });
    })
    .catch((rej) => {
      const loader = document.getElementById('js-loading');
      const errorFeedback = document.createElement('section');
      if (loader) {
        destLocation.removeChild(loader);
      }
      errorFeedback.innerHTML = `
        <h2>An error occured.</h2>
        <p>${rej}</p>
      `;
      destLocation.appendChild(errorFeedback);
    });
}
