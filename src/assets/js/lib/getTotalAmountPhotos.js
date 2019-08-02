import getJSON from './getJSON';

export default async function getTotalAmountPhotos(urlGallery) {
  const galleryResponseJSON = await getJSON(urlGallery);
  const totalPhotos = await galleryResponseJSON.photos.total;
  return new Promise((resolve, reject) => {
    resolve(totalPhotos);
    reject(new Error('Cant reach API to fetch total amount of photos.'));
  });
}
