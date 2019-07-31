/**
 * @param {object} data The data which provides the gallery image (and image meta)
 * @param {HTMLElement} destNode The destinnation where the card should be added to
 */
export default function generateCardHTML(data, destNode) {
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
    destNode.appendChild(template.content);
  });
}
