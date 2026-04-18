import getValue from './index.js';

/**
 * Extractor function for a OptionalMemberExpression type value node. A member
 * expression is accessing a property on an object `obj.property`.
 *
 * @param value Value - AST Value object with type `OptionalMemberExpression`
 * @returns - The extracted value converted to correct type and maintaining
 *   `obj?.property` convention.
 */
export default function extractValueFromOptionalMemberExpression(value) {
  return `${getValue(value.object)}?.${getValue(value.property)}`;
}
