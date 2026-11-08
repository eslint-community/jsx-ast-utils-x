import getValue from './index.js';

/**
 * Extractor function for an AssignmentExpression type value node. An assignment
 * expression looks like `x = y` or `x += y` in expression position. This will
 * return the assignment as the value.
 *
 * @param value Value - AST Value object with type `AssignmentExpression`
 * @returns - The extracted value converted to correct type.
 */
export default function extractValueFromAssignmentExpression(value) {
  return `${getValue(value.left)} ${value.operator} ${getValue(value.right)}`;
}
