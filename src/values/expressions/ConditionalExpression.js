import getValue from './index.js';

/**
 * Extractor function for a ConditionalExpression type value node.
 *
 * @param value Value - AST Value object with type `ConditionalExpression`
 * @returns - The extracted value converted to correct type.
 */
export default function extractValueFromConditionalExpression(value) {
  const { test, alternate, consequent } = value;

  return getValue(test) ? getValue(consequent) : getValue(alternate);
}
