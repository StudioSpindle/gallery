const apiFlickrUri = 'https://www.flickr.com/services/rest/';
const apiGalleryMethod = 'flickr.galleries.getPhotos';
const apiGalleryId = '72157626297224144';
const apiPhotoMethod = 'flickr.photos.getSizes';
const apiFormat = 'format=json';

const galleryDomNode = document.getElementById('js-gallery');

const apiUrlGallery = `${apiFlickrUri}?method=${apiGalleryMethod}&${apiFormat}&nojsoncallback=true&gallery_id=${apiGalleryId}&api_key=${process.env.API_KEY}`;
const apiUrlPhoto = `${apiFlickrUri}?method=${apiPhotoMethod}&${apiFormat}&nojsoncallback=true&api_key=${process.env.API_KEY}`;

/**
 * @param {string} urlGallery The URL to fetch the gallery from
 * @param {string} urlPhoto The URL to fetch the photo meta information from
 */
async function getGalleryPhotos(urlGallery, urlPhoto) {
  const galleryPhotoResponse = await fetch(urlGallery);
  const galleryPhotoResponseJSON = await galleryPhotoResponse.json();

  const photos = galleryPhotoResponseJSON.photos.photo.map(async (photo) => {
    const { title } = photo;
    const photoUrl = `${urlPhoto}&photo_id=${photo.id}`;
    const photoResponse = await fetch(photoUrl);
    const photoResponseJSON = await photoResponse.json();
    return { ...photoResponseJSON, title };
  });
  return Promise.all(photos);
}

function generateCardHTML(data) {
  data.forEach((photo) => {
    // image aspect ratio is by default 4:3
    const photoSrcSmall = photo.sizes.size[4];
    // const photoSrcMedium = photo.sizes.size[5];
    // const photoSrcLarge = photo.sizes.size[7];

    const template = document.createElement('template');
    if (photo.stat !== 'ok') {
      template.innerHTML = `
        <div class="card">
          <p>Something is wrong with this photo</h2>
        </div>
      `;
    } else {
      template.innerHTML = `
        <div class="card">
          <div>
            <img class="card__image" width="${photoSrcSmall.width}" height="${photoSrcSmall.height}" src="${photoSrcSmall.source}" alt="Image named ${photo.title}" />
          </div>
          <h2>${photo.title}</h2>
        </div>
      `;
    }
    galleryDomNode.appendChild(template.content);
  });
}

getGalleryPhotos(apiUrlGallery, apiUrlPhoto)
  .then(generateCardHTML)
  .catch((rej) => {
    const errorFeedback = document.createElement('section');
    errorFeedback.innerHTML = `
      <h2>An error occured</h2>
      <p>Reason: ${rej}</p>
    `;
    galleryDomNode.appendChild(errorFeedback);
  });
