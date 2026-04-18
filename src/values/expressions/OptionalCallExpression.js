import getValue from './index.js';

/**
 * Extractor function for a OptionalCallExpression type value node. A member
 * expression is accessing a property on an object `obj.property` and invoking
 * it.
 *
 * @param value Value - AST Value object with type `OptionalCallExpression`
 * @returns - The extracted value converted to correct type and maintaining
 *   `obj.property?.()` convention.
 */
export default function extractValueFromOptionalCallExpression(value) {
  return `${getValue(value.callee)}?.(${value.arguments.map(x => getValue(x)).join(', ')})`;
}
