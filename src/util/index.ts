const isStringCheck = (...args: any[]) => {
  args.forEach(value => {
    if (typeof value !== 'undefined') {
      if (typeof value !== 'string') {
        throw new Error('provided parameter is not a string');
      }
    }
  });
};

export default isStringCheck;
