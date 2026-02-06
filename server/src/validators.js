import {keywordObjectId} from '@feathersjs/mongodb';
import { Guard } from 'typebox/guard'
import { Value } from 'typebox/value'

// For more information about this file see https://dove.feathersjs.com/guides/cli/validators.html
import {Ajv, addFormats} from '@feathersjs/schema';

const formats = [
  'date-time',
  'time',
  'date',
  'email',
  'password',
  'hostname',
  'ipv4',
  'ipv6',
  'uri',
  'uri-reference',
  'uuid',
  'uri-template',
  'json-pointer',
  'relative-json-pointer',
  'regex',
  'iso-time',
  'iso-date-time',
  'duration',
  'byte',
  'int32',
  'int64',
  'float',
  'double',
  'password',
  'binary',
];

function schemaOf(schemaOf, value, schema) {
  switch (schemaOf) {
    case 'Constructor':
      return Guard.IsConstructor(schema) && Value.Check(schema, value) // not supported
    case 'Function':
      return Guard.IsFunction(schema) && Value.Check(schema, value) // not supported
    // case 'Date':
    //   return Guard.IsDate(schema) && Value.Check(schema, value)
    // case 'Promise':
    //   return Guard.IsPromise(schema) && Value.Check(schema, value) // not supported
    // case 'Uint8Array':
    //   return Guard.IsUint8Array(schema) && Value.Check(schema, value)
    case 'Undefined':
      return Guard.IsUndefined(schema) && Value.Check(schema, value) // not supported
    // case 'Void':
    //   return Guard.IsVoid(schema) && Value.Check(schema, value)
    default:
      return false
  }
}

export function createAjv(options = {}) {
  const ajv = addFormats(new Ajv(options), formats)
    .addKeyword(keywordObjectId)
    .addKeyword({ type: 'object', keyword: 'instanceOf', validate: schemaOf })
    .addKeyword({ type: 'null', keyword: 'typeOf', validate: schemaOf })
    .addKeyword('exclusiveMinimumTimestamp')
    .addKeyword('exclusiveMaximumTimestamp')
    .addKeyword('minimumTimestamp')
    .addKeyword('maximumTimestamp')
    .addKeyword('minByteLength')
    .addKeyword('maxByteLength');

  ajv.addFormat('phone', {
    type: 'string',
    validate: (value) => /^\+?[1-9]\d{1,14}$/.test(value) // E.164 format
  });
  return ajv;
}

export const dataValidator = createAjv({ useDefaults: true });
export const patchDataValidator = createAjv({ useDefaults: false });
export const queryValidator = createAjv({coerceTypes: true});
