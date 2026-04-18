import getValue from './index.js';

/**
 * Extractor function for a SequenceExpression type value node. A Sequence
 * expression is an object with an attribute named expressions which contains an
 * array of different types of expression objects.
 *
 * @param value
 * @returns - An array of the extracted elements.
 */
export default function extractValueFromSequenceExpression(value) {
  return value.expressions.map(element => getValue(element));
}
