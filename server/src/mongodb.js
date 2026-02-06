// For more information about this file see https://dove.feathersjs.com/guides/cli/databases.html
import {MongoClient} from 'mongodb';
import {logger} from './logger.js';

export const mongodb = (app) => {
  const config = app.get('mongodb');
  const database = new URL(config.uri).pathname.substring(1);
  
  console.log({database, mongodbConfig: config});
  const mongoClient = MongoClient.connect(config.uri, config.options)
    .then((client) => {
      logger.info(`Connected to MongoDB at URL: ${config.uri}`);
      
      return client.db(database);
    });
  
  app.set('mongodbClient', mongoClient);
};
