/**
 * @param {String} HTML representing a single element
 * @return {Element} The newly created element
 * @description Uses the template pattern to create a new element in the DOM
 */
export default function (html) {
  const template = document.createElement('template');
  const trimmedHtml = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = trimmedHtml;
  return template.content.firstChild;
}
