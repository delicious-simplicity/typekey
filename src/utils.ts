function hasObjectPrototype(o: any): boolean {
  return Object.prototype.toString.call(o) === '[object Object]';
}

// biome-ignore lint/complexity/noBannedTypes: necessary usage of Object type
export function isPlainObject(o: any): o is Object {
  if (!hasObjectPrototype(o)) return false;

  // If has no constructor
  const ctor = o.constructor;
  if (ctor === undefined) return true;

  // If has modified prototype
  const prot = ctor.prototype;
  if (!hasObjectPrototype(prot)) return false;

  // If constructor does not have an Object-specific method
  // biome-ignore lint/suspicious/noPrototypeBuiltins: necessary usage of prototype
  if (!prot.hasOwnProperty('isPrototypeOf')) return false;

  // Handles Objects created by Object.create(<arbitrary prototype>)
  if (Object.getPrototypeOf(o) !== Object.prototype) return false;

  // Most likely a plain Object
  return true;
}
