// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import {resolve} from '@feathersjs/schema';
import {Type, getValidator, querySyntax} from '@feathersjs/typebox';
import {ObjectIdSchema} from '@feathersjs/typebox';
import {passwordHash} from '@feathersjs/authentication-local';
import {dataValidator, patchDataValidator, queryValidator} from '../../validators.js';
import {patchExtendSchema} from '../../schemas/index.js';

// Main data model schema
export const userSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    email: Type.String({ format: "email" }),
    password: Type.Optional(Type.String({ format: "password" })),
    avatar: Type.Optional(Type.String()),
    
    googleId: Type.Optional(Type.String()),
    facebookId: Type.Optional(Type.String()),
    twitterId: Type.Optional(Type.String()),
    githubId: Type.Optional(Type.String()),
    auth0Id: Type.Optional(Type.String()),

    createdAt: Type.String({ format: 'date-time' }),
    updatedAt: Type.String({ format: 'date-time' }),
  },
  { $id: "User", additionalProperties: false },
);
export const userValidator = getValidator(userSchema, dataValidator);
export const userResolver = resolve({});

export const userExternalResolver = resolve({
  // The password should never be visible externally
  password: async () => undefined,
});

// Schema for creating new entries
export const userDataSchema = Type.Pick(
  userSchema,
  ['email', 'password', 'avatar', 'googleId', 'facebookId', 'twitterId', 'githubId', 'auth0Id'],
  {
    $id: 'UserData',
  },
);
export const userDataValidator = getValidator(userDataSchema, dataValidator);
export const userDataResolver = resolve({
  password: passwordHash({strategy: 'local'}),
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
export const userPatchSchema = Type.Partial(patchExtendSchema(userSchema), {
  $id: 'UserPatch',
});
export const userPatchValidator = getValidator(userPatchSchema, patchDataValidator);
export const userPatchResolver = resolve({
  password: passwordHash({strategy: 'local'}),
  updatedAt: async () => {
    // Return the current date
    return new Date().toISOString();
  },
});

// Schema for allowed query properties
export const userQueryProperties = Type.Pick(userSchema, [
  '_id',
  'email',
  'googleId',
  'facebookId',
  'twitterId',
  'githubId',
  'auth0Id',
]);
export const userQuerySchema = Type.Intersect(
  [
    querySyntax(userQueryProperties, {}),
    // Add additional query properties here
    Type.Object({}, {additionalProperties: false}),
  ],
  {additionalProperties: false},
);
export const userQueryValidator = getValidator(userQuerySchema, queryValidator);
export const userQueryResolver = resolve({
  // If there is a user (e.g. with authentication), they are only allowed to see their own data
  _id: async (value, user, context) => {
    if (context.params.user) {
      return context.params.user._id;
    }
    
    return value;
  },
});
