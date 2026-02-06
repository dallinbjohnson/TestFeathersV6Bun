import {Type, getValidator, defaultAppConfiguration} from '@feathersjs/typebox';

import {dataValidator} from './validators.js';

export const configurationSchema = Type.Intersect([
  defaultAppConfiguration,
  Type.Object({
    host: Type.String(),
    port: Type.Number(),
    public: Type.String(),
    mongodb: Type.Optional(Type.Object({
      uri: Type.Optional(Type.String()),
      options: Type.Optional(Type.Object({})),
    })),
    uploads: Type.Object({
      privateFolder: Type.String(),
      services: Type.Object({
        s3: Type.Boolean(),
        'local-private': Type.Boolean(),
        'local-public': Type.Boolean(),
        'google-cloud': Type.Boolean(),
      }),
      defaultFileService: Type.String(),
      blockDeleteDocumentWhenDeleteFileFailed: Type.Boolean(),
      blockUpdateDocumentWhenReplaceFileFailed: Type.Boolean(),
      enums: Type.Object({
        STORAGE_TYPES: Type.Object({
          s3: Type.String(),
          'local-private': Type.String(),
          'local-public': Type.String(),
          'google-cloud': Type.String(),
          'grid-fs': Type.String(),
          bytescale: Type.String(),
          others: Type.String(),
        }),
        UPLOAD_SERVICES: Type.Object({
          s3: Type.String(),
          'local-private': Type.String(),
          'local-public': Type.String(),
          'google-cloud': Type.String(),
          'grid-fs': Type.String(),
          'bytescale': Type.String(),
          others: Type.String(),
        }),
        UPLOAD_PUBLIC_FILE_KEY: Type.String(),
      }),
    }),
    s3: Type.Optional(Type.Object({
      bucket: Type.Optional(Type.String()),
      accessKeyId: Type.Optional(Type.String()),
      secretAccessKey: Type.Optional(Type.String()),
      signedUrlExpires: Type.Optional(Type.Number()),
      region: Type.Optional(Type.String()),
      endpoint: Type.Optional(Type.String())
    })),
    'google-cloud': Type.Optional(Type.Object({
      projectId: Type.Optional(Type.String()),
      clientEmail: Type.Optional(Type.String()),
      privateKey: Type.Optional(Type.String()),
      bucket: Type.Optional(Type.String())
    })),
    bytescale: Type.Optional(Type.Object({
      publicKey: Type.Optional(Type.String()),
      secretKey: Type.Optional(Type.String()),
      accountId: Type.Optional(Type.String())
    }))
  }),
]);

export const configurationValidator = getValidator(configurationSchema, dataValidator);
