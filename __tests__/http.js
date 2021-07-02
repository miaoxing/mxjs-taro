import $ from 'miaoxing';
import Taro from '@tarojs/taro';
import '../';
import {createPromise} from '@mxjs/test';

Taro.getStorageSync = jest.fn();
Taro.showToast = jest.fn().mockImplementation(() => {
  return {};
});

describe('http', () => {
  test('patch', async () => {
    const promise = createPromise();
    Taro.request = jest.fn().mockImplementationOnce(() => promise.resolve({
      statusCode: 200,
    }));

    await $.http({
      method: 'patch',
      url: 'test',
    });

    expect(Taro.request.mock.calls).toMatchSnapshot();
  });
});
