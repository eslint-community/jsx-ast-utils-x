import getValue from './index.js';

/**
 * Extractor function for a ChainExpression type value node. A member expression
 * is accessing a property on an object `obj.property`.
 *
 * @param value Value - AST Value object with type `ChainExpression`
 * @returns - The extracted value converted to correct type and maintaining
 *   `obj?.property` convention.
 */
export default function extractValueFromChainExpression(value) {
  return getValue(value.expression || value);
}
