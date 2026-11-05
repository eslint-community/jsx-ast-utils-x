import elementType from './elementType';
import eventHandlers, { eventHandlersByType } from './eventHandlers';
import getProp from './getProp';
import getPropValue, { getLiteralPropValue } from './getPropValue';
import hasProp, { hasAnyProp, hasEveryProp } from './hasProp';
import propName from './propName';

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
