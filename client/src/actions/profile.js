import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setAlert } from "./alert";
import { loadUser } from "./authHospital";
import { CLEAR_PROFILE, DELETE_ACCCOUNT, GET_PROFILE,GET_PROFILES,PROFILE_ERROR, UPDATE_PROFILE } from "./types";


//get current profile
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

// get all user profile
export const getAllProfiles=(hospital)=>async (dispatch,) =>{
    dispatch({type:CLEAR_PROFILE})

    const api=hospital ===true ? 'hospitals':'profile'
    try {
        const res=await axios.get(`/api/${api}/`);
     
        dispatch({
            type:GET_PROFILES,
            payload:res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
          });
    }
}


export const getAllProfilebyID=(userID,hospital)=>async (dispatch,) =>{
    dispatch({type:CLEAR_PROFILE})

    const api=hospital ===true ? 'hospitals':'profile'
    try {
        const res=await axios.get(`/api/${api}/user/${userID}`);
     
        dispatch({
            type:GET_PROFILES,
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

    if(Hospital)
{
    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }

    const {name,A_B_C,location,password,phone,M_S_C}=formdata
    

    const send=JSON.stringify({A_B_C,location,phone,M_S_C})
    const send2=JSON.stringify({name,password})



     
    
    const res=await axios.post(`/api/hospitals`,send,config)
    const res2=await axios.post('api/users/edit',send2,config)
    
    dispatch({
        type:GET_PROFILE,
        payload:res.data
    });

    dispatch(setAlert( 'profile updated','success'))
    dispatch(loadUser())

   
        navigate('/dashboard');
    }

    else if (Hospital===false)
    
    {
        const config ={
            headers:{
                'Content-Type':'application/json'
            }
        }
    
        const {name,sex,bloodgroup,location,phone,password}=formdata
        
    
        const send=JSON.stringify({sex,bloodgroup,location,phone })
        const send2=JSON.stringify({name,password})
    
    
    
        
        
        const res=await axios.post(`/api/profile`,send,config)
        const res2=await axios.post('api/users/edit',send2,config)
        
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        });
    
        dispatch(setAlert( 'profile updated','success'))
        dispatch(loadUser())
    
       
            navigate('/dashboard');
    }
    

} catch (err) {

    console.log(err)
    const errors=err.response.data.errors ;
    if(errors){
        errors.forEach(error =>dispatch (setAlert(error.msg,'error'))
            
        );
    }

     dispatch({

        
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
          });

          
}
}


//update Available blood package count

export const update_ABC =(value)=>async dispatch=>{

    try {
        const config ={
            headers:{
                'Content-Type':'application/json'
            }
        }
    
        const A_B_C=value;
        const send=JSON.stringify({A_B_C})
        
       
    
        
        
        const res=await axios.put(`/api/hospitals/abc`,send,config)
         
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        });
    
        dispatch(setAlert( 'Value updated','success'))
    
        // if(!edit){
        //     navigate('/dashboard');
        // }
    
    } catch (err) {
    
        console.log(err)
        const errors=err.response.data.errors ;
        if(errors){
            errors.forEach(error =>dispatch (setAlert(error.msg,'error'))
                
            );
        }
    
         dispatch({
    
            
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
              });
    
              
    }

}




export const update_NBG =(value)=>async dispatch=>{

    try {
        const config ={
            headers:{
                'Content-Type':'application/json'
            }
        }
    
        const N_B_G=value;
        const send=JSON.stringify({N_B_G})
        
       
    
        
        
        const res=await axios.put(`/api/hospitals/nbg`,send,config)
         
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        });
    
        dispatch(setAlert( 'Profile updated','success'))
    
        // if(!edit){
        //     navigate('/dashboard');
        // }
    
    } catch (err) {
    
        console.log(err)
        const errors=err.response.data.errors ;
        if(errors){
            errors.forEach(error =>dispatch (setAlert(error.msg,'error'))
                
            );
        }
    
         dispatch({
    
            
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
              });
    
              
    }

}

// add donation history 

export const update_History =({ID,location,Date,Time})=>async dispatch=>{

    try {
        const config ={
            headers:{
                'Content-Type':'application/json'
            }
        }
    
       
        const send=JSON.stringify({ID,location,Date,Time})
        
       
    
        
        
        const res=await axios.put(`/api/profile/history/`,send,config)
         
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        });
    
        dispatch(setAlert( 'History updated','success'))
    
        
    
    } catch (err) {
        dispatch(setAlert(err.response.data.msg,'error'))
        
       dispatch( console.log(err))


        const errors=err.response.data.errors ;
        if(errors){
            errors.forEach(error =>dispatch (setAlert(error.msg,'error'))
                
            );
        }
    
         dispatch({
    
            
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
              });
    
              
    }

}











// delete account

export const DeleteAccount =(Hospital,navigate)=>async dispatch =>{
      

    if(window.confirm('Are you sure? Do you want to Delete your Account Permanently?...')){

        try {

            const path=Hospital ? 'hospitals/' :'profile'
            const res =await axios.delete(`/api/${path}`)
    
              
            dispatch({type:CLEAR_PROFILE });
    
            dispatch({type:DELETE_ACCCOUNT})

            dispatch(setAlert('Account Deleted','success'))
            navigate('/')
        } catch (err) {
            dispatch({
        
                
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
              });
            
        }
    }
}