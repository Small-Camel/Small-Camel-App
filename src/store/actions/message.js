import {MESSAGE_REFRESH,SOCKET_LOADING} from '../types/message'


export const refreshMessage=(newMessage)=>{
    return {
        type:MESSAGE_REFRESH,
        payload:newMessage,
    };
};

export const setSocketLoading=(loading)=>{
    return {
        type:SOCKET_LOADING,
        payload:loading,
    }
}