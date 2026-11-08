import elementType from './elementType.js';
import eventHandlers, { eventHandlersByType } from './eventHandlers.js';
import getProp from './getProp.js';
import getPropValue, { getLiteralPropValue } from './getPropValue.js';
import hasProp, { hasAnyProp, hasEveryProp } from './hasProp.js';
import propName from './propName.js';

export default {
  hasProp,
  hasAnyProp,
  hasEveryProp,
  elementType,
  eventHandlers,
  eventHandlersByType,
  getProp,
  getPropValue,
  getLiteralPropValue,
  propName,
};
export {
  elementType,
  eventHandlers,
  eventHandlersByType,
  getLiteralPropValue,
  getProp,
  getPropValue,
  hasAnyProp,
  hasEveryProp,
  hasProp,
  propName,
};
