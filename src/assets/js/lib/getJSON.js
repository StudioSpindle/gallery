/**
 * @param {string} url The url to perform the fetch on
 */
export default async function getJSON(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    throw error;
  }
}
