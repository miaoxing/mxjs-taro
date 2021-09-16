import $ from 'miaoxing';
import Taro from '@tarojs/taro';
import '../';
import {createPromise} from '@mxjs/test';

Taro.getStorageSync = jest.fn();
Taro.showToast = jest.fn().mockImplementation(() => {
  return {};
});
// h5 不支持该接口，需要 mock
Taro.showNavigationBarLoading = jest.fn();

describe('http', () => {
  test('patch', async () => {
    const promise = createPromise();
    Taro.request = jest.fn().mockImplementationOnce(() => promise.resolve({
      statusCode: 200,
      data: {},
    }));

    await $.http({
      method: 'patch',
      url: 'test',
    });

    expect(Taro.request.mock.calls).toMatchSnapshot();
  });
});
