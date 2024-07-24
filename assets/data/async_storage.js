import AsyncStorage from '@react-native-async-storage/async-storage';

const setAsyncData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
        console.log('Data successfully saved');
    } catch (error) {
        console.error('Error occurred while saving AsyncStorage data: ', error);
    }
};

const getAsyncData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        }
        console.log('No value found for key: ', key);
        return null;
    } catch (error) {
        console.error('Error occurred while getting AsyncStorage data: ', error);
        return null;
    }
};

const getAllAsyncData = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const data = await AsyncStorage.multiGet(keys);

        const dataObject = {};

        data.forEach(([key, value]) => {
            dataObject[key] = value;
        });

        return dataObject;
    } catch (error) {
        console.error('Error occurred while getting AsyncStorage data: ', error); 
        return null;
    }
};

export { setAsyncData, getAsyncData, getAllAsyncData };
