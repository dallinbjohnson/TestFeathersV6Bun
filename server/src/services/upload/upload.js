// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
// import {authenticate} from '@feathersjs/authentication';

// import {hooks as schemaHooks} from '@feathersjs/schema';
// import {
//   uploadSchema,
//   uploadDataValidator,
//   uploadPatchValidator,
//   uploadQueryValidator,
//   uploadResolver,
//   uploadExternalResolver,
//   uploadDataResolver,
//   uploadPatchResolver,
//   uploadQueryResolver,
  
//   uploadDataSchema,
//   uploadPatchSchema,
//   uploadQuerySchema,
// } from './upload.schema.js';
import {UploadService, getOptions} from './upload.class.js';
import {uploadPath, uploadMethods} from './upload.shared.js';

export * from './upload.class.js';
export * from './upload.schema.js';

// import swagger from 'feathers-swagger';
// const {createSwaggerServiceOptions} = swagger;


// A configure function that registers the service and its hooks via `app.configure`
export const upload = (app) => {
  // Register our service on the Feathers application
  app.use(uploadPath, new UploadService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: uploadMethods,
    // You can add additional custom events to be sent to clients here
    events: [],
    // docs: createSwaggerServiceOptions({
    //   schemas: {
    //     uploadSchema,
    //     uploadDataSchema,
    //     uploadPatchSchema,
    //     uploadQuerySchema,
    //   },
    //   docs: {
    //     securities: ['find', 'get', 'update', 'patch', 'remove'],
    //   },
    // }),
  });
  // Initialize hooks
  app.service(uploadPath).hooks({
    around: {
      all: [
        // schemaHooks.resolveExternal(uploadExternalResolver),
        // schemaHooks.resolveResult(uploadResolver),
      ],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: [],
    },
    before: {
      all: [
        // schemaHooks.validateQuery(uploadQueryValidator),
        // schemaHooks.resolveQuery(uploadQueryResolver),
      ],
      find: [],
      get: [],
      create: [
        // schemaHooks.validateData(uploadDataValidator),
        // schemaHooks.resolveData(uploadDataResolver),
      ],
      patch: [
        // schemaHooks.validateData(uploadPatchValidator),
        // schemaHooks.resolveData(uploadPatchResolver),
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
  
  // app.service(uploadPath).Schema = uploadSchema;
};
