import { createKeyDictionary } from '../src/index';

describe('createKeyDictionary', () => {
  const keyDictionary = createKeyDictionary({
    alphabet: [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
    ] as const,
    boolean: ['value'] as const,
    mixed: ['number', 'string', 'boolean', 'null', 'undefined'] as const,
    null: ['value'] as const,
    number: ['value'] as const,
    string: ['value'] as const,
    undefined: ['value'] as const,
  });

  test("should return a key with the number prefix and the value parameter's value", () => {
    expect(keyDictionary.generateKey('number', { value: 1 })).equals('number:["1"]');
  });

  test('should work with boolean values', () => {
    expect(keyDictionary.generateKey('boolean', { value: true })).equals('boolean:["true"]');
  });

  test('should work with string values', () => {
    expect(keyDictionary.generateKey('string', { value: 'hello' })).equals('string:["hello"]');
  });

  test('should work with null values', () => {
    expect(keyDictionary.generateKey('null', { value: null })).equals('null:["null"]');
  });

  test('should work with undefined values', () => {
    expect(keyDictionary.generateKey('undefined', { value: undefined })).equals('undefined:["undefined"]');
  });

  test('should work with mixed values', () => {
    expect(
      keyDictionary.generateKey('mixed', {
        boolean: true,
        null: null,
        number: 1,
        string: 'hello',
        undefined: undefined,
      }),
    ).equals('mixed:["true","null","1","hello","undefined"]');
  });

  test('should work with mixed valued out of order', () => {
    expect(
      keyDictionary.generateKey('mixed', {
        null: null,
        boolean: true,
        number: 1,
        undefined: undefined,
        string: 'hello',
      }),
    ).equals('mixed:["true","null","1","hello","undefined"]');
  });

  test('should work with alphabet values', () => {
    // randomly shuffle the alphabet
    const randomAlphabetObject = Object.fromEntries(
      Array.from({ length: 26 }, (_, i) => [String.fromCharCode(97 + i), String.fromCharCode(97 + i)]).sort(
        () => Math.random() - 0.5,
      ),
    );

    expect(keyDictionary.generateKey('alphabet', randomAlphabetObject as Record<string, string>)).equals(
      'alphabet:["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]',
    );
  });
});

describe('createKeyDictionary with maxKeyLength', () => {
  test.each([8, 16, 32, 64, 128, 256])('should truncate the key if it exceeds the maxKeyLength: %s', (maxKeyLength) => {
    const keyDictionary = createKeyDictionary({ string: ['value'] as const }, { maxKeyLength });

    const value = Array.from({ length: maxKeyLength }, (_, i) => i + 1).join('');

    expect(keyDictionary.generateKey('string', { value })).equals(`string:["${value}"]`.slice(0, maxKeyLength));
  });
});

describe('createKeyDictionary with throwOnMaxLengthViolation', () => {
  test.each([8, 16, 32, 64, 128, 256])(
    'should throw an error if the key exceeds the maxKeyLength: %s',
    (maxKeyLength) => {
      const keyDictionary = createKeyDictionary(
        { string: ['value'] as const },
        {
          maxKeyLength,
          throwOnMaxLengthViolation: true,
        },
      );

      const value = Array.from({ length: maxKeyLength }, (_, i) => i + 1).join('');

      expect(() => keyDictionary.generateKey('string', { value })).toThrow();
    },
  );
});
