import * as CONFIG from '../config.json';
import * as CONFIG_PROD from '../config.prod.json';

type ConfigType = typeof CONFIG & typeof CONFIG_PROD;

/* Development or Production */
export const isDev = process.env.NODE_ENV === 'development';

/**
 * Get value from config.json
 * 
 * @param {string} key Config key
 * @returns mixed
 */
export const appConfig = <K extends keyof ConfigType>(key: K): ConfigType[K] => {
  // Dev mode use CONFIG
  const result = isDev ? CONFIG[key] : CONFIG_PROD[key];

  return result;
};

export const isExperiment = (key: string | string[]): boolean => {
  const keys = 'string' === typeof key ? [key] : key;
  const experiments = appConfig('experiments') || [];

  if (!Array.isArray(experiments)) return false;

  return !!keys.find((item) => experiments.map(String).indexOf(item) >= 0);
};
