import { user } from './users/users.js';
import { upload } from './upload/upload.js';


export const services = (app) => {
  app.configure(user);
  app.configure(upload);
};
