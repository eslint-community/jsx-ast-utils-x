import getValue from './index.js';

/**
 * Extractor function for an ObjectExpression type value node. An object
 * expression is using {}.
 *
 * @param value
 * @returns - A representation of the object
 */
export default function extractValueFromObjectExpression(value) {
  return value.properties.reduce((obj, property) => {
    // Support types: SpreadProperty and ExperimentalSpreadProperty
    if (/^(?:Experimental)?Spread(?:Property|Element)$/.test(property.type)) {
      if (property.argument.type === 'ObjectExpression') {
        return {
          ...obj,
          ...extractValueFromObjectExpression(property.argument),
        };
      }
    } else {
      return { ...obj, [getValue(property.key)]: getValue(property.value) };
    }
    return obj;
  }, {});
}
