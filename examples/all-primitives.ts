import { KeyDictionary, type KeyPrefixConfig } from '@delicious-simplicity/typekey';

const dict = {
  boolean: ['value'] as const,
  mixed: ['number', 'string', 'boolean', 'null', 'undefined'] as const,
  null: ['value'] as const,
  number: ['value'] as const,
  string: ['value'] as const,
  undefined: ['value'] as const,
} satisfies KeyPrefixConfig;

const keyDictionary = new KeyDictionary(dict);

keyDictionary.generateKey('boolean', { value: true });
// => 'boolean:["true"]'

keyDictionary.generateKey('mixed', {
  boolean: true,
  null: null,
  number: 1,
  string: 'string',
  undefined: undefined,
});
// => 'mixed:["true","null","1","string","undefined"]'

keyDictionary.generateKey('null', { value: null });
// => 'null:["null"]'

keyDictionary.generateKey('number', { value: 1 });
// => 'number:["1"]'

keyDictionary.generateKey('string', { value: 'string' });
// => 'string:["string"]'

keyDictionary.generateKey('undefined', { value: undefined });
// => 'undefined:["undefined"]'
