// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import {resolve} from '@feathersjs/schema';
import {Type, getValidator, querySyntax} from '@feathersjs/typebox';
import {ObjectIdSchema} from '@feathersjs/typebox';
import {passwordHash} from '@feathersjs/authentication-local';
import {dataValidator, patchDataValidator, queryValidator} from '../../validators.js';
import {patchExtendSchema} from '../../schemas/index.js';

// Main data model schema
export const uploadSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    text: Type.String(),

    createdAt: Type.String({ format: "date-time" }),
    updatedAt: Type.String({ format: "date-time" }),
  },
  { $id: "Upload", additionalProperties: false },
);
export const uploadValidator = getValidator(uploadSchema, dataValidator);
export const uploadResolver = resolve({});

export const uploadExternalResolver = resolve({
  // The password should never be visible externally
  password: async () => undefined,
});

// Schema for creating new entries
export const uploadDataSchema = Type.Pick(
  uploadSchema,
  ['text'],
  {
    $id: 'UploadData',
  },
);
export const uploadDataValidator = getValidator(uploadDataSchema, dataValidator);
export const uploadDataResolver = resolve({
  password: passwordHash({ strategy: "local" }),
  createdAt: async () => {
    // Return the current date
    return new Date().toISOString();
  },
  updatedAt: async () => {
    // Return the current date
    return new Date().toISOString();
  },
});

// Schema for updating existing entries
export const uploadPatchSchema = Type.Partial(patchExtendSchema(uploadSchema), {
  $id: 'UploadPatch',
});
export const uploadPatchValidator = getValidator(uploadPatchSchema, patchDataValidator);
export const uploadPatchResolver = resolve({
  password: passwordHash({ strategy: "local" }),
  updatedAt: async () => {
    // Return the current date
    return new Date().toISOString();
  },
});

// Schema for allowed query properties
export const uploadQueryProperties = Type.Pick(uploadSchema, [
  '_id',
  'text',
]);
export const uploadQuerySchema = Type.Intersect(
  [
    querySyntax(uploadQueryProperties, {}),
    // Add additional query properties here
    Type.Object({}, {additionalProperties: false}),
  ],
  {additionalProperties: false},
);
export const uploadQueryValidator = getValidator(uploadQuerySchema, queryValidator);
export const uploadQueryResolver = resolve({});
