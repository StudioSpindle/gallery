import { apiUrlGallery, apiUrlPhoto } from '../api';
import getTotalAmountPhotos from './getTotalAmountPhotos';
import generateCardHTML from './generateCardHTML';
import getGalleryPhotos from './getGalleryPhotos';
import events from './events';

/**
 * @param {HTMLElement} destLocation Location to append results to
 * @param {number} pageNumber The page number to start from
 */
export default async function loadPhotos(destLocation, pageNumber) {
  const loaderTemplate = document.createElement('template');
  const loaderHTML = '<div id="js-loading">Loading</div>';
  loaderTemplate.innerHTML = loaderHTML;

  const totalPhotos = await getTotalAmountPhotos(apiUrlGallery);
  const photosPerPage = 6;

  const amountOfPhotos = photosPerPage * pageNumber - photosPerPage;
  const noPhotosLeft = amountOfPhotos > totalPhotos;
  if (noPhotosLeft) {
    // reached the end...
    return;
  }

  destLocation.appendChild(loaderTemplate.content.firstChild);

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
      destLocation.removeChild(loader);
      errorFeedback.innerHTML = `
        <h2>An error occured.</h2>
        <p>${rej}</p>
      `;
      destLocation.appendChild(errorFeedback);
    });
}
