import extractValueFromTemplateLiteral from './TemplateLiteral.js';

/**
 * Returns the string value of a tagged template literal object. Redirects the
 * bulk of the work to `TemplateLiteral`.
 *
 * @param value
 */
export default function extractValueFromTaggedTemplateExpression(value) {
  return extractValueFromTemplateLiteral(value.quasi);
}
