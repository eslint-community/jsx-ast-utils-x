import JSXElement from '../JSXElement';
import JSXFragment from '../JSXFragment';
import JSXText from '../JSXText';
import Literal from '../Literal';

import ArrayExpression from './ArrayExpression';
import AssignmentExpression from './AssignmentExpression';
import BinaryExpression from './BinaryExpression';
import BindExpression from './BindExpression';
import CallExpression from './CallExpression';
import ChainExpression from './ChainExpression';
import ConditionalExpression from './ConditionalExpression';
import FunctionExpression from './FunctionExpression';
import Identifier from './Identifier';
import LogicalExpression from './LogicalExpression';
import MemberExpression from './MemberExpression';
import NewExpression from './NewExpression';
import ObjectExpression from './ObjectExpression';
import OptionalCallExpression from './OptionalCallExpression';
import OptionalMemberExpression from './OptionalMemberExpression';
import SequenceExpression from './SequenceExpression';
import SpreadElement from './SpreadElement';
import TSNonNullExpression from './TSNonNullExpression';
import TaggedTemplateExpression from './TaggedTemplateExpression';
import TemplateLiteral from './TemplateLiteral';
import ThisExpression from './ThisExpression';
import TypeCastExpression from './TypeCastExpression';
import UnaryExpression from './UnaryExpression';
import UpdateExpression from './UpdateExpression';

const noop = () => null;

// Composition map of types to their extractor functions.
const TYPES = {
  Identifier,
  Literal,
  JSXElement,
  JSXFragment,
  JSXText,
  // An empty expression container (e.g. `{/* a comment */}`) has no value to
  // extract; treat it as unresolvable rather than logging a spurious error.
  JSXEmptyExpression: noop,
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

const errorMessage = expression =>
  `The prop value with an expression type of ${expression} could not be resolved. Please file an issue ( https://github.com/eslinter/jsx-ast-utils-x/issues/new ) to get this fixed immediately.`;

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
