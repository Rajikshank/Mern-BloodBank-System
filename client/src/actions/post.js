import axios from 'axios';
import { setAlert } from "./alert";
import {
    ADD_PARTICPANTS,
    ADD_POST,
    DELETE_POST,
    GET_POSTS,
    POST_ERROR,
    GET_POST
} from "./types";



export const getPosts=(Hospital)=> async dispatch =>{
    try {
        const path=Hospital ? 'all':''

        const res=await axios.get(`/api/post/${path}`)

        dispatch({
            type:GET_POSTS,
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
export const getPost=(id)=> async dispatch =>{
  try {
     

      const res=await axios.get(`/api/post/${id}`)

      dispatch({
          type:GET_POST,
          payload:res.data
      })

  } catch (err) {
      dispatch({
          type: POST_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
        });

  }
}

//approve post 
export const approvepost=(id,navigate)=> async dispatch =>{
  try {
      

      const res=await axios.put(`/api/post/all/approve/${id}`)

     
       
    dispatch(setAlert('Post Approved', 'success'));
     navigate('/');

  } catch (err) {
      dispatch({
          type: POST_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
        });

  }
}





// add participants



export const addParticipants=(id)=> async dispatch =>{
    try {
        

        const res=await axios.put(`/api/post/participants/${id}`)

        dispatch({
            type:ADD_PARTICPANTS,
            payload:{participants:res.data}
        })

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
          });

    }
}



//remove participants

export const removeParticipants=(userid,id)=> async (dispatch) =>{
    try {
        

        const res=await axios.put(`/api/post/rm-participants/${id}`)

        dispatch({
            type:ADD_PARTICPANTS,
            payload:id
        })

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
          });

    }
}


// delete post

export const deletepost = (id) => async (dispatch) => {
    try {
      await axios.delete(`/api/post/${id}`);
      
      dispatch({
        type: DELETE_POST,
        payload: id
      });
  
      dispatch(setAlert('Post Removed', 'success'));
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
  


  export const addpost = (formdata) => async (dispatch) => {
    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }

    try {
      const res =await axios.post(`/api/post/`,formdata,config);
  
      dispatch({
        type: ADD_POST,
        payload: res.data
      });
  
      dispatch(setAlert('Post Created', 'success'));
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
  
