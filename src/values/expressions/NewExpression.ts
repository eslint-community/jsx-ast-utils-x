/**
 * Extractor function for a NewExpression type value node. A new expression
 * instantiates an object with `new` keyword.
 *
 * @returns - An empty object.
 */
export default function extractValueFromNewExpression(): object {
  return new Object();
}
