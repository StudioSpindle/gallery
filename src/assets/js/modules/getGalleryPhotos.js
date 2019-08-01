/**
 * @param {string} url The url to perform the fetch on
 */
async function getJSON(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    throw error;
  }
}

/**
 * @param {string} urlGallery The URL to fetch the gallery from
 * @param {string} urlPhoto The URL to fetch the photo meta information from
 */
export default async function getGalleryPhotos(urlGallery, urlPhoto) {
  const galleryPhotoResponseJSON = await getJSON(urlGallery);
  const photos = galleryPhotoResponseJSON.photos.photo.map(async (photo) => {
    const { title } = photo;
    const photoUrl = `${urlPhoto}&photo_id=${photo.id}`;
    const photoResponseJSON = await getJSON(photoUrl);
    return { ...photoResponseJSON, title };
  });
  return Promise.all(photos);
}
