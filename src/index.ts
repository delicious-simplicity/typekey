import { KeyDictionaryError } from './error';
import { isPlainObject } from './utils';

type KeyParams = Record<string, string | number | boolean | null | undefined>;

type KeyPrefixConfig = Record<string, string[]>;

type KeyPrefixParams<T extends KeyPrefixConfig> = {
  [K in keyof T]: Record<T[K][number], KeyParams[T[K][number]]>;
};

type KeyDictionaryOptionsBase = {
  maxKeyLength?: number;
  throwOnMaxLengthViolation?: false;
};

type KeyDictionaryOptionsStrict = {
  maxKeyLength: number;
  throwOnMaxLengthViolation: true;
};

type KeyDictionaryOptions = KeyDictionaryOptionsBase | KeyDictionaryOptionsStrict;

class KeyDictionary<T extends KeyPrefixConfig> {
  private prefixParamsMap: T;
  private maxKeyLength: number;
  private throwOnMaxLengthViolation: boolean;

  constructor(config: T, options: KeyDictionaryOptions = {}) {
    this.prefixParamsMap = config;

    if (options.throwOnMaxLengthViolation && options.maxKeyLength === undefined) {
      throw new KeyDictionaryError('maxKeyLength must be provided when throwOnMaxLengthViolation is true');
    }

    this.maxKeyLength = options.maxKeyLength ?? Number.POSITIVE_INFINITY;
    this.throwOnMaxLengthViolation = options.throwOnMaxLengthViolation ?? false;
  }

  private hashKeyParts(keyParts: string[]): string {
    return JSON.stringify(keyParts, (_, val) =>
      isPlainObject(val)
        ? Object.keys(val)
            .sort()
            .reduce((result, key) => {
              result[key] = val[key];
              return result;
            }, {} as any)
        : val,
    );
  }

  generateKey<K extends keyof T>(prefix: K, params: KeyPrefixParams<T>[K]): string {
    const hashedKeyParts = this.hashKeyParts(
      this.prefixParamsMap[prefix].sort().map((param) => String(params[param as T[K][number]])),
    );

    const key = `${String(prefix)}:${hashedKeyParts}`;

    if (key.length > this.maxKeyLength) {
      if (this.throwOnMaxLengthViolation) {
        throw new KeyDictionaryError(`Generated key exceeds maximum length of ${this.maxKeyLength}`);
      }

      return key.slice(0, this.maxKeyLength);
    }

    return key;
  }
}

export { KeyDictionary, KeyDictionaryError, type KeyDictionaryOptions, type KeyPrefixConfig };
