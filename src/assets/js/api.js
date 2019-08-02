const apiFlickrUri = 'https://www.flickr.com/services/rest/';
const apiGalleryMethod = 'flickr.galleries.getPhotos';
const apiGalleryId = '72157626297224144';
const apiPhotoMethod = 'flickr.photos.getSizes';
const apiFormat = 'format=json';

export const apiUrlGallery = `${apiFlickrUri}?method=${apiGalleryMethod}&${apiFormat}&nojsoncallback=true&gallery_id=${apiGalleryId}&api_key=${process.env.API_KEY}&continuation=0`;
export const apiUrlPhoto = `${apiFlickrUri}?method=${apiPhotoMethod}&${apiFormat}&nojsoncallback=true&api_key=${process.env.API_KEY}`;
