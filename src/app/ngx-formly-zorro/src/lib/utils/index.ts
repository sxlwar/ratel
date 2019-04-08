function useDefaultIfUnset<T>(...args: T[]): T {
    const defaultValue = args[args.length - 1];

    return args.slice(0, -1).find(item => item !== void 0 && item !== null) || defaultValue;
  }

  export { useDefaultIfUnset };
