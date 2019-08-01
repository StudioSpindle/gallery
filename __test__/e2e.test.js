import { queryByText, queryAllByAltText } from '@testing-library/dom';

const puppeteer = require('puppeteer');

const fs = require('fs');
const path = require('path');

const indexLocation = path.resolve(__dirname, '../build/index.html');
const html = fs.readFileSync(indexLocation, 'utf8');

jest.dontMock('fs');

describe('home page', () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
  });

  afterEach(() => {
    // restore the original func after test
    jest.resetModules();
  });

  it('gallery exists', () => {
    expect(document.getElementById('js-gallery')).toBeTruthy();
  });

  it('starts with a loading indicator when initially loading the page', async () => {
    expect(queryByText(document.body, 'Loading')).toBeTruthy();
  });

  // TODO: make this function
  it.skip('loads all the cards on the page', async (done) => {
    const browser = await puppeteer.launch({
      headless: true,
      slowMo: 80,
      args: ['--window-size=500,800'],
    });
    const page = await browser.newPage();
    // TODO: use express to start localhost (so browsersync)
    await page.goto('http://localhost:3000/', {
      waitUntil: 'networkidle2',
    });
    const bodyHTML = await page.evaluate(() => document.body.innerHTML);
    expect(bodyHTML).toBeTruthy();
    expect(queryByText(document, /planes/i)).toBeTruthy();
    expect(queryAllByAltText(document, /Image named planes/i)).toBeTruthy();

    done();
    await browser.close();
  });
});
