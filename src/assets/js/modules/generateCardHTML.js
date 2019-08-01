/**
 * @param {object} data The data which provides the gallery image (and image meta)
 * @param {HTMLElement} destNode The destinnation where the card should be added to
 */
export default function generateCardHTML(data, destNode) {
  data.forEach((photo) => {
    // image aspect ratio is by default 4:3
    const photoSrcSmall = photo.sizes.size[4] ? photo.sizes.size[4] : null;
    const photoSrcMedium = photo.sizes.size[5] ? photo.sizes.size[5] : null;
    const photoSrcLarge = photo.sizes.size[7] ? photo.sizes.size[7] : null;

    const template = document.createElement('template');
    if (photo.stat !== 'ok') {
      template.innerHTML = `
        <div class="card gallery__item">
          <p>Something is wrong with this photo</h2>
        </div>
      `;
    } else {
      let srcSet;
      let sizes;
      if (photoSrcSmall) {
        srcSet = `${photoSrcSmall.source} 240w`;
        sizes = '(max-width: 600px) 320px';
      }
      if (photoSrcMedium) {
        srcSet = `${photoSrcMedium.source} 320w`;
        sizes = '(min-width: 600px) 320px';
      }
      // for some images the large size is not available
      if (photoSrcLarge) {
        srcSet = `${photoSrcMedium.source} 720w`;
        sizes = ', (min-width: 900px) 720px';
      }
      // browsers that don't have srcset will fallback on src,
      //  therefore the medium size is used
      template.innerHTML = `
        <div class="card gallery__item">
          <img 
            class="card__image"     
            alt="Image named ${photo.title}" 
            src="${photoSrcMedium.source}"
            srcset="${srcSet}"
            sizes="${sizes}"
          />
          <div class="card__title">
            <h2 class="serif">${photo.title}</h2>
          </div>
        </div>
      `;
    }
    destNode.appendChild(template.content);
  });
}
