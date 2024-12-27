import { KeyDictionary, type KeyDictionaryOptions, type KeyPrefixConfig } from '@delicious-simplicity/typekey';

const dict = {
  user: ['id'] as const,
} satisfies KeyPrefixConfig;

const options = {
  maxKeyLength: 8,
} satisfies KeyDictionaryOptions;

const keyDictionary = new KeyDictionary(dict, options);

keyDictionary.generateKey('user', { id: 1 });
// => 'user:["1'
