/**
 * AltSchool School of Engineering - JavaScript Assignment
 * Solutions to Problems 1 - 5 (Slide 294+: LeetCode Objects)
 * Student: Saheed Adeolu Lawal
 * AltSchool ID: ALT/SOE/KAR/026/0591
 */

// ============================================================================
// Problem 1 — Deep Equal (Easy)
// Write deepEqual(objA, objB) that returns true if two objects have the same
// keys and values recursively (including nested objects), without using JSON.stringify.
// =======================================================================
function deepEqual(objA, objB) {
  // If primitive and strictly equal (or same reference)
  if (objA === objB) return true;

  // If either is null or not an object, they are not equal
  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  // Different number of keys means objects cannot be equal
  if (keysA.length !== keysB.length) return false;

  // Check every key recursively
  for (const key of keysA) {
    if (!Object.hasOwn(objB, key)) return false;
    if (!deepEqual(objA[key], objB[key])) return false;
  }

  return true;
}

// Test Problem 1:
console.log('--- Problem 1 Tests ---');
console.log(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })); // true
console.log(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 } })); // false
console.log(deepEqual({ a: 1 }, { a: 1, b: 2 }));                     // false


// ============================================================================
// Problem 2 — Object Diff (Medium)
// Write diffObjects(oldObj, newObj) that returns an object describing what changed:
// { added: {...}, removed: {...}, changed: {...} }, comparing only top-level keys.
// ============================================================================
function diffObjects(oldObj, newObj) {
  const added = {};
  const removed = {};
  const changed = {};

  // Combine all unique keys from both objects
  const allKeys = new Set([...Object.keys(oldObj), ...Object.keys(newObj)]);

  for (const key of allKeys) {
    const hasOld = Object.hasOwn(oldObj, key);
    const hasNew = Object.hasOwn(newObj, key);

    if (!hasOld && hasNew) {
      // Key only exists in newObj
      added[key] = newObj[key];
    } else if (hasOld && !hasNew) {
      // Key only existed in oldObj
      removed[key] = oldObj[key];
    } else if (hasOld && hasNew) {
      // Key exists in both: check if value changed
      if (oldObj[key] !== newObj[key]) {
        changed[key] = { from: oldObj[key], to: newObj[key] };
      }
    }
  }

  return { added, removed, changed };
}

// Test Problem 2:
console.log('\n--- Problem 2 Test ---');
console.log(diffObjects(
  { name: 'Setemi', role: 'Engineer', country: 'Jamaica' },
  { name: 'Setemi', role: 'Senior Engineer', city: 'Kingston' }
));
// Expected: { added: { city: 'Kingston' }, removed: { country: 'Jamaica' }, changed: { role: { from: 'Engineer', to: 'Senior Engineer' } } }


// ============================================================================
// Problem 3 — Deep Freeze (Medium)
// Object.freeze only freezes the top level. Write deepFreeze(obj) that recursively
// freezes an object and all of its nested objects, then returns it.
// ============================================================================
function deepFreeze(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Recursively freeze nested objects first
  for (const value of Object.values(obj)) {
    if (value !== null && typeof value === 'object' && !Object.isFrozen(value)) {
      deepFreeze(value);
    }
  }

  // Freeze the parent object and return it
  return Object.freeze(obj);
}

// Test Problem 3:
console.log('\n--- Problem 3 Test ---');
const config = deepFreeze({ api: { baseUrl: 'https://x.com', retries: 3 }, debug: false });
config.api.baseUrl = 'https://changed.com'; // should be ignored
config.debug = true;                        // should be ignored
console.log(config.api.baseUrl, config.debug); // "https://x.com" false
console.log(Object.isFrozen(config.api));       // true


// ============================================================================
// Problem 4 — Private Counter Factory (Easy)
// Write createCounter() that returns an object with increment(), decrement(),
// and value as a getter (not a plain property), keeping the internal count
// truly private via closure.
// ============================================================================
function createCounter() {
  let count = 0; // Private variable encapsulated via closure

  return {
    increment() {
      count++;
    },
    decrement() {
      count--;
    },
    get value() {
      return count;
    }
  };
}

// Test Problem 4:
console.log('\n--- Problem 4 Test ---');
const counter = createCounter();
counter.increment();
counter.increment();
counter.decrement();
console.log(counter.value); // 1
console.log(counter.count); // undefined — not directly accessible


// ============================================================================
// Problem 5 — Schema Validator (Medium)
// Write validateSchema(obj, schema) where schema maps each key to an expected
// typeof string (e.g. { name: 'string', age: 'number' }). Return an array of
// error messages for missing keys or type mismatches; return an empty array if valid.
// ============================================================================
function validateSchema(obj, schema) {
  const errors = [];

  for (const [key, expectedType] of Object.entries(schema)) {
    if (!Object.hasOwn(obj, key)) {
      errors.push(`${key}: missing property`);
    } else {
      const actualType = typeof obj[key];
      if (actualType !== expectedType) {
        errors.push(`${key}: expected ${expectedType}, got ${actualType}`);
      }
    }
  }

  return errors;
}

// Test Problem 5:
console.log('\n--- Problem 5 Tests ---');
const schema = { name: 'string', age: 'number', isAdmin: 'boolean' };
console.log(validateSchema({ name: 'Ada', age: 21, isAdmin: false }, schema));
// Expected: []
console.log(validateSchema({ name: 'Ada', age: '21' }, schema));
// Expected: ['age: expected number, got string', 'isAdmin: missing property']

module.exports = {
  deepEqual,
  diffObjects,
  deepFreeze,
  createCounter,
  validateSchema
};
