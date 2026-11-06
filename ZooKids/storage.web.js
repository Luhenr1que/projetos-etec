import AsyncStorage from '@react-native-async-storage/async-storage';
const prefix = 'os005:zookids:';
export default {
  getItem: (key) => AsyncStorage.getItem(prefix + key),
  setItem: (key, value) => AsyncStorage.setItem(prefix + key, value),
  removeItem: (key) => AsyncStorage.removeItem(prefix + key),
  clear: async () => {
    const keys = (await AsyncStorage.getAllKeys()).filter(key => key.startsWith(prefix));
    await AsyncStorage.multiRemove(keys);
  },
};
