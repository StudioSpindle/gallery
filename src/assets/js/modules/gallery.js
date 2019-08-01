import { apiUrlGallery, apiUrlPhoto } from '../api';
import generateCardHTML from '../lib/generateCardHTML';
import getGalleryPhotos from '../lib/getGalleryPhotos';
import events from '../lib/events';

const galleryDomNode = document.getElementById('js-gallery');
const loader = document.getElementById('js-loading');

getGalleryPhotos(apiUrlGallery, apiUrlPhoto)
  .then((data) => {
    generateCardHTML(data, galleryDomNode);
    events.publish('createdCards', { url: 'test' });
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