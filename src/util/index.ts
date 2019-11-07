const isStringCheck = (...args: any[]) => {
  args.forEach(value => {
    if (typeof value !== 'undefined') {
      if (typeof value !== 'string') {
        throw new Error('provided parameter is not a string');
      }
    } else {
      throw new Error('provided parameter is undefined');
    }
  });
};

export const isStringCheckArray = (args: any[]) => {
  if (args.length > 0) {
    args.forEach(value => {
      if (typeof value !== 'undefined') {
        if (typeof value !== 'string') {
          throw new Error('provided parameter is not a string');
        }
      } else {
        throw new Error('provided parameter is undefined');
      }
    });
  }
};

export default isStringCheck;
