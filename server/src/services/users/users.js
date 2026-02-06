// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
// import {authenticate} from '@feathersjs/authentication';

import {hooks as schemaHooks} from '@feathersjs/schema';
import {
  userSchema,
  userDataValidator,
  userPatchValidator,
  userQueryValidator,
  userResolver,
  userExternalResolver,
  userDataResolver,
  userPatchResolver,
  userQueryResolver,
  
  userDataSchema,
  userPatchSchema,
  userQuerySchema,
} from './users.schema.js';
import {UserService, getOptions} from './users.class.js';
import {userPath, userMethods} from './users.shared.js';

export * from './users.class.js';
export * from './users.schema.js';

import swagger from 'feathers-swagger';
const {createSwaggerServiceOptions} = swagger;

import {dotNotationWrapper} from '../../hooks/dot-notation-wrapper.js';
import {avatarToDataUri} from '../../hooks/avatar-to-data-uri.js';


// A configure function that registers the service and its hooks via `app.configure`
export const user = (app) => {
  // Register our service on the Feathers application
  app.use(userPath, new UserService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: userMethods,
    // You can add additional custom events to be sent to clients here
    events: [],
    docs: createSwaggerServiceOptions({
      schemas: {
        userSchema,
        userDataSchema,
        userPatchSchema,
        userQuerySchema,
      },
      docs: {
        securities: ['find', 'get', 'update', 'patch', 'remove'],
      },
    }),
  });
  // Initialize hooks
  app.service(userPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(userExternalResolver),
        schemaHooks.resolveResult(userResolver),
      ],
      find: [
        // authenticate('jwt'),
      ],
      get: [
        // authenticate('jwt'),
      ],
      create: [],
      update: [
        // authenticate('jwt'),
      ],
      patch: [
        // authenticate('jwt'),
      ],
      remove: [
        // authenticate('jwt'),
      ],
    },
    before: {
      all: [
        schemaHooks.validateQuery(userQueryValidator),
        schemaHooks.resolveQuery(userQueryResolver),
      ],
      find: [],
      get: [],
      create: [
        avatarToDataUri('avatar'),
        schemaHooks.validateData(userDataValidator),
        schemaHooks.resolveData(userDataResolver),
      ],
      patch: [
        avatarToDataUri('avatar'),
        dotNotationWrapper(schemaHooks.validateData(userPatchValidator)),
        schemaHooks.resolveData(userPatchResolver),
      ],
      remove: [],
    },
    after: {
      all: [],
    },
    error: {
      all: [],
    },
  });
  
  app.service(userPath).Schema = userSchema;
};
