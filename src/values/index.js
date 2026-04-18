import JSXElement from './JSXElement.js';
import JSXFragment from './JSXFragment.js';
import JSXText from './JSXText.js';
import Literal from './Literal.js';
import JSXExpressionContainer, { extractLiteral } from './expressions/index.js';

// Composition map of types to their extractor functions.
const TYPES = {
  Literal,
  JSXElement,
  JSXExpressionContainer,
  JSXText,
  JSXFragment,
};

// Composition map of types to their extractor functions to handle literals.
const LITERAL_TYPES = {
  ...TYPES,
  JSXElement: () => null,
  JSXExpressionContainer: extractLiteral,
};

/**
 * This function maps an AST value node to its correct extractor function for
 * its given type.
 *
 * This will map correctly for _all_ possible types.
 *
 * @param value - AST Value object on a JSX Attribute.
 */
export default function getValue(value) {
  if (!TYPES[value.type]) {
    console.log(value.type);
  }
  return TYPES[value.type](value);
}

/**
 * This function maps an AST value node to its correct extractor function for
 * its given type.
 *
 * This will map correctly for _some_ possible types that map to literals.
 *
 * @param value - AST Value object on a JSX Attribute.
 */
export function getLiteralValue(value) {
  return LITERAL_TYPES[value.type](value);
}
