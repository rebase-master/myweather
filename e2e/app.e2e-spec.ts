import { MyweatherPage } from './app.po';

describe('myweather App', function() {
  let page: MyweatherPage;

  beforeEach(() => {
    page = new MyweatherPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
