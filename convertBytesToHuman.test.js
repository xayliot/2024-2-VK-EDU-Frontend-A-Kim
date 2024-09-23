/*
 * Необходимо покрыть все возможные
 * и невозможные кейсы. Например,
 * convertBytesToHuman(-1) === false,
 * convertBytesToHuman(-1) !== '1 B',
 * convertBytesToHuman('string') === false
 * convertBytesToHuman(5) === '5 B'
 */

import convertBytesToHuman from './convertBytesToHuman';

test('Возвращает false для неправильного типа данных', () => {
  expect(convertBytesToHuman('12.21.12')).toBe(false)
  expect(convertBytesToHuman('hello')).toBe(false)
  expect(convertBytesToHuman('12b2')).toBe(false)
});

test('Возвращает корректное значение для чисел', () => {
  expect(convertBytesToHuman(1610612736)).toBe('1.5 GB')
  expect(convertBytesToHuman(123123123)).toBe('117.42 MB')
  expect(convertBytesToHuman(1024)).toBe('1 KB')
  expect(convertBytesToHuman(1)).toBe('1 B')
});

test('Возвращает false для правильного типа данных', () => {
  expect(convertBytesToHuman(1-2)).toBe(false)
  expect(convertBytesToHuman(-1)).toBe(false)
});