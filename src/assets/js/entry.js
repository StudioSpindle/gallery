import { apiUrlGallery, apiUrlPhoto } from './api';
import generateCardHTML from './modules/generateCardHTML';
import getGalleryPhotos from './modules/getGalleryPhotos';

const galleryDomNode = document.getElementById('js-gallery');

getGalleryPhotos(apiUrlGallery, apiUrlPhoto)
  .then(data => generateCardHTML(data, galleryDomNode))
  .catch((rej) => {
    const errorFeedback = document.createElement('section');
    errorFeedback.innerHTML = `
      <h2>An error occured</h2>
      <p>Reason: ${rej}</p>
    `;
    galleryDomNode.appendChild(errorFeedback);
  });
