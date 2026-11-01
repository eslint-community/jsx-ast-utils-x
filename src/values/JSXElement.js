import getValue from '.';

/**
 * Extractor function for a JSXElement type value node.
 *
 * Returns self-closing element with correct name.
 *
 * @param value
 */
export default function extractValueFromJSXElement(value) {
  const Tag = value.openingElement.name.name;
  if (value.openingElement.selfClosing) {
    return `<${Tag} />`;
  }
  return `<${Tag}>${[value.children]
    .flat()
    .map(x => getValue(x))
    .join('')}</${Tag}>`;
}
