import { setAsyncData } from "./async_storage";

const loginFunc = async (username, password) => {
    let res = false;
    try {
        await setAsyncData('username', username);
        await setAsyncData('userId', '1');
        res = true;
    } catch (error) {
        console.error('Error at auth.js: ', error);
    } finally {
        return res;
    }
};

export { loginFunc };
