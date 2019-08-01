import { apiUrlGallery, apiUrlPhoto } from './api';
import generateCardHTML from './modules/generateCardHTML';
import getGalleryPhotos from './modules/getGalleryPhotos';

const galleryDomNode = document.getElementById('js-gallery');
const loader = document.getElementById('js-loading');

getGalleryPhotos(apiUrlGallery, apiUrlPhoto)
  .then((data) => {
    generateCardHTML(data, galleryDomNode);
    galleryDomNode.removeChild(loader);
  })
  .catch((rej) => {
    const errorFeedback = document.createElement('section');
    galleryDomNode.removeChild(loader);
    errorFeedback.innerHTML = `
      <h2>An error occured.</h2>
      <p>${rej}</p>
    `;
    galleryDomNode.appendChild(errorFeedback);
  });
