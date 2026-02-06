import {packages} from '@sparkz-community/common-utils';

const {lodash: {lset, lunset, lget, lisEmpty}} = packages;


function unsetPathAndCleanup(obj, path) {
  // Use lodash to unset the target path
  lunset(obj, path);
  
  // Split the path and clean up empty parent objects
  const pathArray = path.split('.');
  for (let i = pathArray.length - 2; i >= 0; i--) {
    const parentPath = pathArray.slice(0, i + 1).join('.');
    const parent = lget(obj, parentPath);
    
    // If the parent is empty, unset it as well
    if (lisEmpty(parent)) {
      lunset(obj, parentPath);
    } else {
      break; // Stop if we encounter a non-empty object
    }
  }
}

export const dotNotationWrapper = (validateData) => {
  return async (context, next) => {
    let dotKeys = [];
    let keys = Object.keys(context.data);
    for (let key of keys) {
      if (key.includes('.')) {
        dotKeys.push(key);
        let value = lget(context.data, key);
        lunset(context.data, key);
        lset(context.data, key, value);
      }
    }
    
    try {
      await validateData(context, next);
      
      for (let key of dotKeys) {
        let value = lget(context.data, key);
        unsetPathAndCleanup(context.data, key);
        lset(context.data, [key], value);
      }
    } catch (e) {
      throw e;
    }
    
    if (typeof next === 'function') {
      return next();
    }
  };
};
