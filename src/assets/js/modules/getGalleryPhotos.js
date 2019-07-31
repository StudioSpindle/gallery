/**
 * @param {string} urlGallery The URL to fetch the gallery from
 * @param {string} urlPhoto The URL to fetch the photo meta information from
 */
export default async function getGalleryPhotos(urlGallery, urlPhoto) {
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
