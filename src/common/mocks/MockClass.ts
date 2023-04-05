import { jest } from '@jest/globals';

// This function allow to create the mock class easier and fast

// The function you can give two params

// nameFn: string array = with this param you can give the methods name that must has the class mock

// callback: any array = with this para you give the methods function that must has the class mock
const MockClass = (nameFn: string[], callback: any[]): any => {
  // create the mock
  const mock = jest.fn();

  // asign the methods
  callback.forEach((cb, idx) => {
    mock.prototype[`${nameFn[idx]}`] = jest.fn(cb);
  });

  // return mock
  return mock;
};

export default MockClass;
