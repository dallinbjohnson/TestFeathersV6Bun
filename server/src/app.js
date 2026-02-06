import { feathers } from "@feathersjs/feathers";
import {
  createHandler,
  errorHandler,
  queryParser,
  bodyParser,
} from "feathers/http";

import qs from "qs";

const customQueryParser = queryParser((query) => {
  return qs.parse(query, { arrayLimit: 200 });
});
const customLogger = async (context, next) => {
  console.log(`${context.request.method} ${context.request.url}`);
  await next();
};


import configuration from "@feathersjs/configuration";

import openapi from "./openapi.js";

import { configurationValidator } from "./configuration.js";
import redis from "./redis.js";
import { mongodb } from "./mongodb.js";

import { authentication } from "./authentication.js";

import { services } from "./services/index.js";
import { channels } from "./channels.js";

import path from "path";

const app = feathers();

// Load our app configuration (see config/ folder)
app.configure(configuration(configurationValidator));

app.configure(openapi);

app.configure(redis);
app.configure(mongodb);

app.configure(authentication);

app.configure(services);
app.configure(channels);

const handler = createHandler(app, [
  errorHandler(),
  customLogger,
  customQueryParser,
  bodyParser(),
]);

Bun.serve({
  port: 3030,
  fetch: async (request) => {
    const url = new URL(request.url);

    if (request.method === "GET" || request.method === "HEAD") {
      const publicDir = path.resolve(process.cwd(), "public");
      let relativePath = decodeURIComponent(url.pathname).replace(/^\//, "");
      if (relativePath === "") {
        relativePath = "index.html";
      }
      const filePath = path.resolve(publicDir, relativePath);

      if (filePath.startsWith(publicDir + path.sep)) {
        const file = Bun.file(filePath);
        if (await file.exists()) {
          return new Response(file);
        }
      }
    }

    return handler(request);
  }
})