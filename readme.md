[made with 💜 by [DS]](https://www.delicious-simplicity.com/)

# typekey

A TypeScript library for generating consistent, type-safe cache keys from a structured dictionary. It ensures cache keys are predictable by sorting cache key parameters and supports configurable key length limits.

### Features

- Type-safe key generation with TypeScript support
- Consistent key generation through sorted parameters
- Configurable key length limits
- Optional error handling for key length violations
- Support for all primitive types (string, number, boolean, null, undefined)
- Zero dependencies

### Usage

```ts
import { KeyDictionary, type KeyPrefixConfig } from "typekey";

const dict = {
  user: ["id"] as const,
} satisfies KeyPrefixConfig;

const keyDictionary = new KeyDictionary(dict);

keyDictionary.generateKey("user", { id: 1 });
// => 'user:["1"]'
```

## API

### `KeyDictionary` class

Generates cache keys based on a provided configuration of prefixes and parameters.

#### Arguments

- `config` (required): An object specifying the prefixes and their associated parameter names. See `KeyPrefixConfig` type. All declared parameters are required (even if `null` or `undefined`)
- `options` (optional): An object to configure the key dictionary. See `KeyDictionaryOptions` type.

#### Methods

#### `generateKey(prefix, params)`

Generates a cache key for the specified prefix with itsz parameters.

- `prefix` (required): The prefix to use for the generated key. Must be one of the keys from the `config` object passed to the constructor.
- `params` (required): An object containing the parameter values for the specified prefix. The parameter names must match those defined in the `config` object for the given prefix.

Returns: The generated cache key as a string.

Throws:

- `KeyDictionaryError` if `throwOnMaxLengthViolation` is enabled and the generated key exceeds the configured `maxKeyLength`.
- `Error` if a required parameter is missing or if an unexpected parameter is provided.

### Types

#### `KeyPrefixConfig`

An object where the keys are prefixes and the values are arrays of parameter names associated with each prefix.

#### `KeyDictionaryOptions`

Configuration options for the key dictionary.

Properties:

- `maxKeyLength` (optional): The maximum allowed length for generated keys. Defaults to `Number.POSITIVE_INFINITY`.
- `throwOnMaxLengthViolation` (optional): Whether to throw an error if a generated key exceeds `maxKeyLength`. If set to `true`, `maxKeyLength` must be provided. Defaults to `false`.
