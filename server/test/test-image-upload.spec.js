import { assert } from 'chai';
import ImageService from '../server/api/services/image.service';
// import assert from 'assert';

describe('image upload tags', () => {
  it('test upload', async () => {
    const url =
      'https://media.wired.com/photos/5d09594a62bcb0c9752779d9/1:1/w_1500,h_1500,c_limit/Transpo_G70_TA-518126.jpg';
    return ImageService.upload(url, 'public', { name: 'Tushar' })
      .then((tags) => {
        console.log(tags);
        assert.ok(tags.length > 0, 'Tags array is empty');
      })
      .catch((err) => {
        console.log(err);
      });
  }).timeout(60000);
});
