import { REGISTER_SUCCESS ,REGISTER_SUCCESS_HOS,REGISTER_FAIL,USER_LOADED,AUTH_ERROR,LOGIN_FAIL,LOGIN_SUCCESS,LOGIN_SUCCESS_HOS, LOGOUT,USER_LOADED_HOS, DELETE_ACCCOUNT } from "../actions/types";

const initialState={
    token:localStorage.getItem('token'),
    isAuthenticated:null,
    loading:true,
    user:null,
    notifications:null,
    Donor:null 
}

export default function(state=initialState,action){
    const {type ,payload }=action;
switch(type){

case USER_LOADED:
    return {
        ...state,
        isAuthenticated:true,
        user:payload,
        Donor:true,
        loading:false 
    }    

case USER_LOADED_HOS:
        return {
            ...state,
            isAuthenticated:true,
            user:payload,
            Donor:false ,
            loading:false
        }    

 
case REGISTER_SUCCESS:
case LOGIN_SUCCESS:
    localStorage.setItem('token',payload.token)
    return {
        ...state,
        ...payload,
        isAuthenticated:true
        ,loading:false 
        ,Donor:true 
    }

    case REGISTER_SUCCESS_HOS:
        case LOGIN_SUCCESS_HOS:
            localStorage.setItem('token',payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated:true
                ,loading:false 
                ,Donor:false 
            }
        


   case REGISTER_FAIL:
    case LOGOUT:
    case AUTH_ERROR:
        case LOGIN_FAIL:
        case DELETE_ACCCOUNT:
        localStorage.removeItem('token');
        return {
            ...state,
           token:null,
           user:null,
            isAuthenticated:false ,
            loading:false 
            ,Donor:null 

        }
   default :
    return state;
}
}