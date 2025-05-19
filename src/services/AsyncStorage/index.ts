import AsyncStorage from "@react-native-async-storage/async-storage";

export const KEY_STORAGE = {
  FIRST_FOCUS_HOME: 'FIRST_FOCUS_HOME',
  LOCALE: 'LOCALE',
  LOCAL_HISTORY: 'LOCAL_HISTORY',
  USER_SAVED: 'USER_SAVED'
}


async function saveDataLocal(key: string, value: string) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log(`ERROR_save-${key}`, error);
    }
  }
  
  async function getDataLocal(key: string) {
    try {
      if (key) {
        const value = await AsyncStorage.getItem(key);
        return value === null ? null : value;
      }
    } catch (error) {
      console.log(`ERROR_get-${key}`, error);
    }
  }
  async function saveObjectDataLocal(key: string, value: any) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.log(`ERROR_save-${key}`, error);
    }
  }
  
  async function getObjectDataLocal(key: string) {
    try {
      if (key) {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      }
    } catch (error) {
      console.log(`ERROR_save-${key}`, error);
    }
  }
export {
    saveDataLocal,
    getDataLocal,
    saveObjectDataLocal,
    getObjectDataLocal
}