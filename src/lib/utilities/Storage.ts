const Storage = {
  storeData: async (key: string, value: any): Promise<void> => {
    try {
      const json = JSON.stringify(value);

      localStorage.setItem(key, json);

      return new Promise(resolve => resolve());
    } catch (e) {
      //
      return new Promise(resolve => resolve());
    }
  },
  getData: async (key: string, fallbackValue: any = null): Promise<null | any> => {
    try {
      const value = localStorage.getItem(key);

      return 'string' === typeof value ? JSON.parse(value) : fallbackValue;
    } catch (e) {
      return fallbackValue;
    }
  },
  removeData: (key: string): Promise<void> => {
    try {
      localStorage.removeItem(key);

      return new Promise(resolve => resolve());
    } catch (e) {
      // 
      return new Promise(resolve => resolve());
    }
  },
  clearAll: (): Promise<void> => {
    try {
      localStorage.clear();

      return new Promise(resolve => resolve());
    } catch (e) {
      // Resolve false
      return new Promise(resolve => resolve());
    }
  }
};

export default Storage;
