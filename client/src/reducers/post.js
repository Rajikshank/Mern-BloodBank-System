import {ADD_PARTICPANTS, GET_POSTS,POST_ERROR,DELETE_POST, ADD_POST, GET_POST, REMOVE_PARTICPANTS} from '../actions/types'

const initialState ={
    posts:[],
    post:null,
    loading:true,
    error:{}
}

export default function(state=initialState,action){
    const {type,payload}=action;


    switch(type){
        case ADD_POST:
            return {
                ...state,
                posts:[payload,...state.posts]
            }
        case GET_POSTS:
            return {
                ...state,
                posts:payload,
                loading:false
            }
        case GET_POST:
            return {
              ...state,
              post:payload,
              loading:false   
            }
            case DELETE_POST:
                return {
                  ...state,
                  posts: state.posts.filter((post) => post._id !== payload),
                  loading: false
                };
        case POST_ERROR:
            return {
                ...state,
                error:payload,
                loading:false
            }

        case ADD_PARTICPANTS:
            return {
                ...state,
                post :{...state.post,participants:payload},
                loading:false
            }
        case REMOVE_PARTICPANTS:
            return {
                ...state,
                post:{...state.post,
                    participants:state.post.participants.filter(participant=>participant.user!==payload)
                },
                loading:false
            }
         
        default:
            return state
    }
}