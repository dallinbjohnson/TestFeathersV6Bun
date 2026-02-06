import swagger from 'feathers-swagger';

import packageJson from '../package.json' with { type: "json" };

const getSwaggerInitializerScript = ({docsJsonPath, ctx}) => {
  const headers = ctx && ctx.headers;
  const basePath = headers['x-forwarded-prefix'] ?? '';
  
  // language=JavaScript
  return `
    window.onload = function () {
      var script = document.createElement('script');
      script.onload = function () {
        window.ui = SwaggerUIBundle({
          url: "${basePath}${docsJsonPath}",
          dom_id: '#swagger-ui',
          deepLinking: true,
          presets: [
            SwaggerUIBundle.presets.apis,
            SwaggerUIStandalonePreset,
            SwaggerUIApiKeyAuthFormPlugin,
          ],
          plugins: [
            SwaggerUIBundle.plugins.DownloadUrl
          ],
          layout: "StandaloneLayout",
          configs: {
            apiKeyAuthFormPlugin: {
              forms: {
                BearerAuth: {
                  fields: {
                    email: {
                      type: 'text',
                      label: 'E-Mail-Address',
                    },
                    password: {
                      type: 'password',
                      label: 'Password',
                    },
                  },
                  authCallback(values, callback) {
                    window.ui.fn.fetch({
                      url: '/authentication',
                      method: 'post',
                      headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        strategy: 'local',
                        ...values,
                      }),
                    }).then(function (response) {
                      const json = JSON.parse(response.data);
                      if (json.accessToken) {
                        callback(null, json.accessToken);
                      } else {
                        callback('error while login');
                      }
                    }).catch(function (err) {
                      console.log(err, Object.entries(err));
                      callback('error while login');
                    });
                  },
                }
              },
              localStorage: {
                BearerAuth: {}
              }
            }
          }
        });
      };
      
      script.src = '//cdn.jsdelivr.net/npm/@mairu/swagger-ui-apikey-auth-form@1/dist/swagger-ui-apikey-auth-form.js';
      document.head.appendChild(script)
    };
  `;
};

export default (app) => {
  const docsJsonPath = '/swagger.json';

  // If you don't use custom methods this line can be removed
  app.configure(swagger.customMethodsHandler);
  
  app.configure(
    swagger({
      docsJsonPath,
      specs: {
        info: {
          title: 'test-feathers-v6-bun API',
          description: 'test-feathers-v6-bun API documentation',
          version: packageJson.version,
        },
        components: {
          securitySchemes: {
            BearerAuth: {
              type: 'http',
              scheme: 'bearer',
            },
          },
        },
        security: [{BearerAuth: []}],
      },
      idType: 'string',
      defaults: {
        getOperationArgs({service, apiPath, version}) {
          return {
            tags: [apiPath],
          };
        },
      },
      ui: false,
    }),
  );

  class DocsJsonService {
    constructor(application) {
      this.app = application;
    }

    async find() {
      return this.app.docs;
    }
  }

  class DocsUiService {
    constructor(application) {
      this.app = application;
    }

    async find(params = {}) {
      const ctx = { headers: params.headers || {} };
      const initializerScript = getSwaggerInitializerScript({ docsJsonPath, ctx });

      const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>API Docs</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
  </head>
  <body>
    <div id="swagger-ui"></div>

    <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
    <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-standalone-preset.js"></script>
    <script>${initializerScript}</script>
  </body>
</html>`;

      return new Response(html, {
        status: 200,
        headers: {
          'content-type': 'text/html; charset=utf-8',
        },
      });
    }
  }

  app.use(docsJsonPath, new DocsJsonService(app));
  app.use('/docs', new DocsUiService(app));
};
