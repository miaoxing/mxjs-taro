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
    const time = new Date().getTime();
    await $.ret(new Ret({code: 0, message: 'ok'}), 50);
    const duration = new Date().getTime() - time;
    // NOTE: setTimeout 不是完全精准的，可能会提前一点
    expect(duration).toBeGreaterThanOrEqual(45);
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
