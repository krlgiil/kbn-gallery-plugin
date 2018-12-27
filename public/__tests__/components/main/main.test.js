import expect from 'expect.js';
import { shallow } from 'enzyme';
import Main from '../../../../public/components/main/main';

describe('main component', () => {
  it('display the homepage containg a settings button', () => {
    const main = shallow(<Main title="shop_preview" />);
    expect(main).find('shop_prevsew');
  });
});
