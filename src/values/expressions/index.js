import JSXElement from '../JSXElement.js';
import JSXFragment from '../JSXFragment.js';
import JSXText from '../JSXText.js';
import Literal from '../Literal.js';

import ArrayExpression from './ArrayExpression.js';
import AssignmentExpression from './AssignmentExpression.js';
import BinaryExpression from './BinaryExpression.js';
import BindExpression from './BindExpression.js';
import CallExpression from './CallExpression.js';
import ChainExpression from './ChainExpression.js';
import ConditionalExpression from './ConditionalExpression.js';
import FunctionExpression from './FunctionExpression.js';
import Identifier from './Identifier.js';
import LogicalExpression from './LogicalExpression.js';
import MemberExpression from './MemberExpression.js';
import NewExpression from './NewExpression.js';
import ObjectExpression from './ObjectExpression.js';
import OptionalCallExpression from './OptionalCallExpression.js';
import OptionalMemberExpression from './OptionalMemberExpression.js';
import SequenceExpression from './SequenceExpression.js';
import SpreadElement from './SpreadElement.js';
import TSNonNullExpression from './TSNonNullExpression.js';
import TaggedTemplateExpression from './TaggedTemplateExpression.js';
import TemplateLiteral from './TemplateLiteral.js';
import ThisExpression from './ThisExpression.js';
import TypeCastExpression from './TypeCastExpression.js';
import UnaryExpression from './UnaryExpression.js';
import UpdateExpression from './UpdateExpression.js';

// Composition map of types to their extractor functions.
const TYPES = {
  Identifier,
  Literal,
  JSXElement,
  JSXFragment,
  JSXText,
  TaggedTemplateExpression,
  TemplateLiteral,
  ArrowFunctionExpression: FunctionExpression,
  FunctionExpression,
  LogicalExpression,
  MemberExpression,
  ChainExpression,
  OptionalCallExpression,
  OptionalMemberExpression,
  CallExpression,
  UnaryExpression,
  ThisExpression,
  ConditionalExpression,
  BinaryExpression,
  ObjectExpression,
  NewExpression,
  UpdateExpression,
  ArrayExpression,
  BindExpression,
  SpreadElement,
  TypeCastExpression,
  SequenceExpression,
  TSNonNullExpression,
  AssignmentExpression,
};

const noop = () => null;

const errorMessage = expression =>
  `The prop value with an expression type of ${expression} could not be resolved. Please file an issue ( https://github.com/jsx-eslint/jsx-ast-utils/issues/new ) to get this fixed immediately.`;

/**
 * This function maps an AST value node to its correct extractor function for
 * its given type.
 *
 * This will map correctly for _all_ possible expression types.
 *
 * @param value Value - AST Value object with type `JSXExpressionContainer`
 * @returns The extracted value.
 */
export default function extract(value) {
  // Value will not have the expression property when we recurse.
  // The type for expression on ArrowFunctionExpression is a boolean.
  let expression;
  expression =
    typeof value.expression !== 'boolean' && value.expression
      ? value.expression
      : value;
  let { type } = expression;

  // Typescript NonNull Expression is wrapped & it would end up in the wrong extractor
  if (expression.object && expression.object.type === 'TSNonNullExpression') {
    type = 'TSNonNullExpression';
  }

  while (type === 'AsExpression' || type === 'TSAsExpression') {
    ({ type } = expression);
    if (expression.expression) {
      ({ expression } = expression);
    }
  }

  if (TYPES[type] === undefined) {
    console.error(errorMessage(type));
    return null;
  }

  return TYPES[type](expression);
}

// Composition map of types to their extractor functions to handle literals.
const LITERAL_TYPES = {
  ...TYPES,
  Literal: value => {
    const extractedVal = TYPES.Literal.call(undefined, value);
    const isNull = extractedVal === null;
    // This will be convention for attributes that have null
    // value explicitly defined (<div prop={null} /> maps to 'null').
    return isNull ? 'null' : extractedVal;
  },
  Identifier: value => {
    const isUndefined = TYPES.Identifier.call(undefined, value) === undefined;
    return isUndefined ? undefined : null;
  },
  JSXElement: noop,
  JSXFragment: noop,
  JSXText: noop,
  ArrowFunctionExpression: noop,
  FunctionExpression: noop,
  LogicalExpression: noop,
  MemberExpression: noop,
  OptionalCallExpression: noop,
  OptionalMemberExpression: noop,
  CallExpression: noop,
  UnaryExpression: value => {
    const extractedVal = TYPES.UnaryExpression.call(undefined, value);
    return extractedVal === undefined ? null : extractedVal;
  },
  UpdateExpression: value => {
    const extractedVal = TYPES.UpdateExpression.call(undefined, value);
    return extractedVal === undefined ? null : extractedVal;
  },
  ThisExpression: noop,
  ConditionalExpression: noop,
  BinaryExpression: noop,
  ObjectExpression: noop,
  NewExpression: noop,
  ArrayExpression: value => {
    const extractedVal = TYPES.ArrayExpression.call(undefined, value);
    return extractedVal.filter(val => val !== null);
  },
  BindExpression: noop,
  SpreadElement: noop,
  TSNonNullExpression: noop,
  TSAsExpression: noop,
  TypeCastExpression: noop,
  SequenceExpression: noop,
  ChainExpression: noop,
};

/**
 * This function maps an AST value node to its correct extractor function for
 * its given type.
 *
 * This will map correctly for _some_ possible types that map to literals.
 *
 * @param value Value - AST Value object with type `JSXExpressionContainer`
 * @returns The extracted value.
 */
export function extractLiteral(value) {
  // Value will not have the expression property when we recurse.
  const expression = value.expression || value;
  const { type } = expression;

  if (LITERAL_TYPES[type] === undefined) {
    console.error(errorMessage(type));
    return null;
  }

  return LITERAL_TYPES[type](expression);
}
