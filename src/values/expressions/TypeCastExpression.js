import getValue from './index.js';

/**
 * Extractor function for a TypeCastExpression type value node. A type cast
 * expression looks like `(this.handleClick: (event: MouseEvent) => void))` This
 * will return the expression `this.handleClick`.
 *
 * @param value Value - AST Value object with type `TypeCastExpression`
 * @returns - The extracted value converted to correct type.
 */
export default function extractValueFromTypeCastExpression(value) {
  return getValue(value.expression);
}
