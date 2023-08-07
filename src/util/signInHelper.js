import { readStorage, StorageTypes, createStorage, eraseStorage } from './storageHelper';

const getSessionValues = () => {
    const userId = readStorage(StorageTypes.ID_TOKEN_STORAGE);
    if (!userId) {
        return {
            username: "",
            idToken: "",
            accessToken: ""
        };
    } else {
        return {
            username: readStorage(StorageTypes.USERNAME_STORAGE) || '',
            idToken: readStorage(StorageTypes.ID_TOKEN_STORAGE) || '',
            accessToken: readStorage(StorageTypes.ACCESS_TOKEN_STORAGE) || '',
        };
    }
};

const createSignInSession = (username, idToken, accessToken, days) => {
    createStorage(StorageTypes.USERNAME_STORAGE, username, days);
    createStorage(StorageTypes.ID_TOKEN_STORAGE, idToken, days);
    createStorage(StorageTypes.ACCESS_TOKEN_STORAGE, accessToken, days);
};

const isSignedIn = () => {
    const { accessToken, username, idToken } = getSessionValues();
    return !!accessToken && !!username && !!idToken;
};

const cleanupOnSignOut = () => {
    eraseStorage(StorageTypes.USERNAME_STORAGE);
    eraseStorage(StorageTypes.ID_TOKEN_STORAGE);
    eraseStorage(StorageTypes.ACCESS_TOKEN_STORAGE);
};

export { getSessionValues, createSignInSession, isSignedIn, cleanupOnSignOut }
