import { KeyDictionary, type KeyDictionaryOptions, type KeyPrefixConfig } from 'typekey';

const dict = {
  user: ['id'] as const,
} satisfies KeyPrefixConfig;

const options = {
  maxKeyLength: 8,
  throwOnMaxLengthViolation: true,
} satisfies KeyDictionaryOptions;

const keyDictionary = new KeyDictionary(dict, options);

keyDictionary.generateKey('user', { id: 1 });
// => KeyDictionaryError - key length would exceed `maxKeyLength` of 8
