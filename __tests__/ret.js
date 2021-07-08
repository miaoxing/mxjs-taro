import $, {Ret} from 'miaoxing';
import '../';
import Taro from '@tarojs/taro';

Taro.showToast = jest.fn().mockImplementation(async () => ({errMsg: 'ok'}));

describe('ret', () => {
  test('result', async () => {
    const result = $.ret(new Ret({code: 0, message: 'ok'}), 0);
    expect(result.then).not.toBeUndefined();
  });

  test('await', async () => {
    const ms = new Date().getMilliseconds();
    await $.ret(new Ret({code: 0, message: 'ok'}), 50);
    const duration = new Date().getMilliseconds() - ms;
    expect(duration).toBeGreaterThanOrEqual(50);
  });

  test('suc', async () => {
    let called = '';
    await $.ret(new Ret({code: 0, message: 'ok'}), 100)
      .suc(() => {
        called = 'suc';
      }).err(() => {
        called = 'err';
      });

    expect(called).toBe('suc');
  });

  test('err', async () => {
    let called = '';
    await $.ret(new Ret({code: 1, message: 'fail'}), 10)
      .suc(() => {
        called = 'suc';
      }).err(() => {
        called = 'err';
      });
    expect(called).toBe('err');
  });
});
