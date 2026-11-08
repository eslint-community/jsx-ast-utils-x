import type { Identifier } from 'estree';

const JS_RESERVED = {
  Array,
  Date,
  Infinity,
  Math,
  Number,
  Object,
  String,
  undefined,
};

/**
 * Extractor function for an Identifier type value node. An Identifier is
 * usually a reference to a variable. Just return variable name to determine its
 * existence.
 *
 * @param value Value - AST Value object with type `Identifier`
 * @returns - The extracted value converted to correct type.
 */
export default function extractValueFromIdentifier(
  value: Identifier,
): (typeof JS_RESERVED)[keyof typeof JS_RESERVED] | string {
  const { name } = value;

  if (Object.hasOwnProperty.call(JS_RESERVED, name)) {
    return JS_RESERVED[name as keyof typeof JS_RESERVED];
  }

  return name;
}
