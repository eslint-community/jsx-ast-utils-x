function resolveMemberExpressions(object, property) {
  if (object.type === 'JSXMemberExpression') {
    return `${resolveMemberExpressions(object.object, object.property)}.${property.name}`;
  }

  return `${object.name}.${property.name}`;
}

/**
 * Returns the tagName associated with a JSXElement.
 *
 * @param node
 */
export default function elementType(node) {
  if (node.type === 'JSXOpeningFragment') {
    return '<>';
  }

  const { name } = node;

  if (name.type === 'JSXMemberExpression') {
    const { object, property } = name;
    return resolveMemberExpressions(object, property);
  }

  if (name.type === 'JSXNamespacedName') {
    return `${name.namespace.name}:${name.name.name}`;
  }

  return name.name;
}
