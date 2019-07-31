const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, '../src/index.html'), 'utf8');

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
});
