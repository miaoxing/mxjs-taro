import {setApiUrl} from '../';
import $ from 'miaoxing';

describe('taro', () => {
  test('url: index', () => {
    expect($.url()).toBe('/pages/index/index');
    expect($.url('index')).toBe('/pages/index/index');
    expect($.url('index/index')).toBe('/pages/index/index');
  });

  test('url: add /pages', () => {
    expect($.url('tests/edit')).toBe('/pages/tests/edit');
    expect($.url('tests/edit', {id: 1})).toBe('/pages/tests/edit?id=1');
    expect($.url('tests/edit?id=1', {id: 2})).toBe('/pages/tests/edit?id=1&id=2');
  });

  test('url: add /index', () => {
    expect($.url('tests')).toBe('/pages/tests/index');
    expect($.url('tests', {a: 'b'})).toBe('/pages/tests/index?a=b');
    expect($.url('tests?a=b', {a: 'c'})).toBe('/pages/tests/index?a=b&a=c');
  });

  test('url: ignore absolute path', () => {
    expect($.url('/pages/test')).toBe('/pages/test');
    expect($.url('/pages/test/index')).toBe('/pages/test/index');
  });

  test('apiUrl', () => {
    setApiUrl('https://test.com');

    expect($.apiUrl('articles')).toBe('https://test.com/m-api/articles');
    expect($.apiUrl('articles/1')).toBe('https://test.com/m-api/articles/1');
    expect($.apiUrl('articles', {id: 1})).toBe('https://test.com/m-api/articles?id=1');
  });
});
