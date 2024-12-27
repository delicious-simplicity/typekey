import { KeyDictionary, type KeyPrefixConfig } from 'typekey';

const dict = {
  user: ['id'] as const,
} satisfies KeyPrefixConfig;

const keyDictionary = new KeyDictionary(dict);

keyDictionary.generateKey('user', { id: 1 });
// => 'user:["1"]'
