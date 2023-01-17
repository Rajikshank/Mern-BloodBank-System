import axios from "axios";
import { setAlert } from "./alert";
import { GET_PROFILE,PROFILE_ERROR } from "./types";

export const getCurrentProfile=(hospital)=>async (dispatch,) =>{
    const api=hospital ===true ? 'hospitals':'profile'
    try {
        const res=await axios.get(`/api/${api}/me`);
     
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
          });
    }
}





export const EditProfile=(formdata,navigate,Hospital=null)=>async dispatch=>{

try {
    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }

    const data ={...formdata}
    const A_B_C=data.ABC
    const location=data.city

    const send=JSON.stringify({A_B_C,location})



    const path=Hospital ===true ? 'hospitals':'profile'
    
    const res=await axios.post(`/api/${path}`,send,config)
    
    dispatch({
        type:GET_PROFILE,
        payload:res.data
    });

    dispatch(setAlert( 'profile updated'))

    // if(!edit){
    //     navigate('/dashboard');
    // }

} catch (err) {

    console.log(err)
    const errors=err.response.data.errors ;
    if(errors){
        errors.forEach(error =>dispatch (setAlert(error.msg,'danger'))
            
        );
    }

     dispatch({

        
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
          });

          
}
}