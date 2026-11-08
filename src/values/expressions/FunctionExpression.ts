import type { ArrowFunctionExpression, FunctionExpression } from 'estree';

/**
 * Extractor function for a FunctionExpression type value node. Statically, we
 * can't execute the given function, so just return a function to indicate that
 * the value is present.
 *
 * @param value Value - AST Value object with type `FunctionExpression`
 * @returns - The extracted value converted to correct type.
 */
export default function extractValueFromFunctionExpression(
  value: ArrowFunctionExpression | FunctionExpression,
): () => ArrowFunctionExpression | FunctionExpression {
  return () => value;
}
