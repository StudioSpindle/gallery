import { queryByText, queryAllByAltText } from '@testing-library/dom';
import {
  photoLowQuality,
  photos,
  photoWithoutTitle,
  photoErrorInResponse,
} from '../../../../models/__mocks__';
import generateCardHTML from './generateCardHTML';

const spyWarn = jest.spyOn(console, 'warn');

describe('generateCardHTML', () => {
  let destContainer;

  beforeEach(() => {
    spyWarn.mockReset();
    // setup document body
    document.body.innerHTML = '<div id="destination-container"></div>';
    destContainer = document.getElementById('destination-container');
    expect(destContainer).toBeTruthy();
  });

  it('to skip and throw console warning if the photo has low quality', () => {
    generateCardHTML(photoLowQuality, destContainer);
    expect(spyWarn).toHaveBeenCalled();
  });

  it('to show error if the photo cannot be loaded', () => {
    generateCardHTML(photoErrorInResponse, destContainer);
    expect(queryByText(document, /Something is wrong with this photo/i)).toBeTruthy();
  });

  it('to display at least an image if no title is supplied', () => {
    generateCardHTML(photoWithoutTitle, destContainer);
    expect(queryAllByAltText(document, /Image named undefined/i)).toBeTruthy();
  });

  it('to display at least an image if no title is supplied', () => {
    generateCardHTML(photos, destContainer);
    expect(queryByText(document, /first photo/i)).toBeTruthy();
    expect(queryAllByAltText(document, /Image named first photo/i)).toBeTruthy();
    expect(queryByText(document, /second photo/i)).toBeTruthy();
    expect(queryAllByAltText(document, /Image named second photo/i)).toBeTruthy();
    expect(queryByText(document, /third photo/i)).toBeTruthy();
    expect(queryAllByAltText(document, /Image named third photo/i)).toBeTruthy();
  });
});
