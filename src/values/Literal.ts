import type { Literal } from 'estree';

/**
 * Extractor function for a Literal type value node.
 *
 * @param value Value - AST Value object with type `Literal`
 * @returns {string | boolean} - The extracted value converted to correct type.
 */
export default function extractValueFromLiteral(
  value: Literal,
): Literal['value'] {
  const { value: extractedValue } = value;

  const normalizedStringValue =
    typeof extractedValue === 'string' && extractedValue.toLowerCase();
  if (normalizedStringValue === 'true') {
    return true;
  }

  if (normalizedStringValue === 'false') {
    return false;
  }

  return extractedValue;
}
