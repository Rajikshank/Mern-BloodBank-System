import {ADD_PARTICPANTS,ADD_REQUEST, GET_REQUESTS,POST_ERROR,DELETE_POST, REMOVE_PARTICPANTS, GET_REQUEST, DELETE_REQUEST, ACCEPT_REQUEST,REJECT_REQUEST} from '../actions/types'

const initialState ={
    requests:[],
    request:null,
    loading:true,
    error:{}
}

export default function(state=initialState,action){
    const {type,payload}=action;


    switch(type){
        case ADD_REQUEST:
            return {
                ...state,
                requests:[payload,...state.requests]
            }
        case GET_REQUESTS:
            return {
                ...state,
                requests:payload,
                loading:false
            }
        case GET_REQUEST:
            return {
              ...state,
              request:payload,
              loading:false   
            }
            case DELETE_REQUEST:
                return {
                  ...state,
                  requests: state.requests.filter((request) => request._id !== payload),
                  loading: false
                };
        case POST_ERROR:
            return {
                ...state,
                error:payload,
                loading:false
            }

        case ACCEPT_REQUEST:
        case REJECT_REQUEST:
            return {
                ...state,
                request :{...state.request,Accept:payload},
                loading:false
            }
         
         
        default:
            return state
    }
}