import axios from 'axios';
import { setAlert } from "./alert";
import {
    ADD_PARTICPANTS,
    ADD_REQUEST,
    DELETE_REQUEST,
    GET_REQUESTS,
    POST_ERROR,
    GET_REQUEST,
    REJECT_REQUEST,
    ACCEPT_REQUEST
    
} from "./types";



export const getRequests=()=> async dispatch =>{
    try {
         

        const res=await axios.get(`/api/request/`)

        dispatch({
            type:GET_REQUESTS,
            payload:res.data
        })

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
          });

    }
}


//get post by id
export const getRequest=(id)=> async dispatch =>{
  try {
     

      const res=await axios.get(`/api/request/${id}`)

      dispatch({
          type:GET_REQUEST,
          payload:res.data
      })

  } catch (err) {
      dispatch({
          type: POST_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
        });

  }
}

 

// add request

export const addrequest = (formdata) => async (dispatch) => {
  const config ={
      headers:{
          'Content-Type':'application/json'
      }
  }

  try {
    const res =await axios.post(`/api/request/`,formdata,config);

    dispatch({
      type: ADD_REQUEST,
      payload: res.data
    });

    dispatch(setAlert('Request Send...', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};



// add participants



export const addAccept=(id)=> async dispatch =>{
    try {
        

        const res=await axios.put(`/api/request/Accept/${id}`)

        dispatch({
            type:ACCEPT_REQUEST,
            payload:res.data 
        })

        dispatch(setAlert('Request Accepted...', 'success'));

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
          });

    }
}



//remove participants

export const removeAccept=(id)=> async (dispatch) =>{
    try {
        

        const res=await axios.put(`/api/request/rm-Accept/${id}`)

        dispatch({
            type:REJECT_REQUEST,
            payload:res.data
        })

        dispatch(setAlert('Request Rejected...', 'error'));

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
          });

    }
}


// delete post

export const deleterequest = (id) => async (dispatch) => {
    try {
      await axios.delete(`/api/request/${id}`);
      
      dispatch({
        type: DELETE_REQUEST,
        payload: id
      });
  
      dispatch(setAlert('Request Removed', 'error'));
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
  

  
