export class KeyDictionaryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'KeyDictionaryError';
  }
}
