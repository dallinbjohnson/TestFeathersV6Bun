import {Type,} from '@feathersjs/typebox';

export const Nullable = (schema) => Type.Union([schema, Type.Null()]);

/**
 * Overrides a nested property in a schema.
 *
 * @param {object} schema - The original schema.
 * @param {string | Array} path - Either a dot‑notation string (e.g. "metaData.insertManyConfigs.deleteStrategy")
 *   or an array of logical keys (e.g. ["metaData", "insertManyConfigs", "deleteStrategy"]).
 *   In both cases, "properties" is automatically interleaved between the keys.
 * @param {*} newSubschema - The new subschema to assign at that path.
 * @returns {object} A new schema with the override applied.
 */
export function overrideSchema(schema, path, newSubschema) {
  let finalPath;
  if (typeof path === 'string') {
    const parts = path.split('.');
    finalPath = [];
    parts.forEach(function(key) {
      finalPath.push('properties', key);
    });
  } else if (Array.isArray(path)) {
    // Even if an array is passed, we insert "properties" before each key.
    finalPath = [];
    path.forEach(function(key) {
      finalPath.push('properties', key);
    });
  } else {
    throw new Error('Path must be a dot string or an array.');
  }
  
  // Clone the schema along the computed finalPath to avoid mutating the original.
  const cloned = Object.assign({}, schema);
  let current = cloned;
  for (let i = 0; i < finalPath.length - 1; i++) {
    const key = finalPath[i];
    // Ensure the current object exists and clone it.
    current[key] = Object.assign({}, current[key]);
    current = current[key];
  }
  // Set the property at the final key to the new subschema.
  current[finalPath[finalPath.length - 1]] = newSubschema;
  return cloned;
}

export const patchExtendSchema = (schema, extendSchema = Type.Object({})) => {
  return Type.Intersect([
    schema,
    Type.Object({
      $unset: Type.Optional(Type.Record(Type.String(), Type.Boolean())),
      ...(extendSchema?.properties || extendSchema),
    }),
  ]);
};
