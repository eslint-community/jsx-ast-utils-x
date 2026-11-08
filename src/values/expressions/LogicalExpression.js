import getValue from './index.js';

/**
 * Extractor function for a LogicalExpression type value node. A logical
 * expression is `a && b` or `a || b`, so we evaluate both sides and return the
 * extracted value of the expression.
 *
 * @param value Value - AST Value object with type `LogicalExpression`
 * @returns - The extracted value converted to correct type.
 */
export default function extractValueFromLogicalExpression(value) {
  const { operator, left, right } = value;
  const leftVal = getValue(left);
  const rightVal = getValue(right);

  if (operator === '&&') {
    return leftVal && rightVal;
  }
  if (operator === '??') {
    return leftVal ?? rightVal;
  }
  return leftVal || rightVal;
}
