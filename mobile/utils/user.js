import "core-js/stable/atob";
import SyncStorage from "sync-storage";
export const authenticate = (data) => {

    SyncStorage.set("token", data.token);
    SyncStorage.set("user", JSON.stringify(data.user))

}

export const getUser = () => {
    const user = SyncStorage.get('user');
    console.log(user)
    return user ? user : null;
}

export const getToken = () => {
    const token = SyncStorage.get('token');
    return token ? token : null
}

export const logout = () => {
    SyncStorage.remove('user')
    SyncStorage.remove('token');
}