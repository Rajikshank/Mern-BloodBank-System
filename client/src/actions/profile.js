import axios from "axios";
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

    const {name,A_B_C,location,password}=formdata
    

    const send=JSON.stringify({A_B_C,location})
    const send2=JSON.stringify({name,password})



     
    
    const res=await axios.post(`/api/hospitals`,send,config)
    const res2=await axios.post('api/users/edit',send2,config)
    
    dispatch({
        type:GET_PROFILE,
        payload:res.data
    });

    dispatch(setAlert( 'profile updated'))
    dispatch(loadUser())

   
        navigate('/dashboard');}

    else if (Hospital===false)
    
    {
        const config ={
            headers:{
                'Content-Type':'application/json'
            }
        }
    
        const {name,sex,bloodgroup,location,covid,password}=formdata
        
    
        const send=JSON.stringify({sex,bloodgroup,location,covid })
        const send2=JSON.stringify({name,password})
    
    
    
        
        
        const res=await axios.post(`/api/profile`,send,config)
        const res2=await axios.post('api/users/edit',send2,config)
        
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        });
    
        dispatch(setAlert( 'profile updated'))
        dispatch(loadUser())
    
       
            navigate('/dashboard');
    }
    

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


//update profile

export const updateProfile =(formdata,navigate,Hospital=null)=>async dispatch=>{

    try {
        const config ={
            headers:{
                'Content-Type':'application/json'
            }
        }
    
        const data ={...formdata}
        const A_B_C=data.A_B_C
        const location=data.location
    
        const send=JSON.stringify({A_B_C,location})
    
    
    
        const path=Hospital ===true ? 'hospitals/nbg':'profile/bloodgroup'
        
        const res=await axios.put(`/api/${path}`,send,config)
         
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        });
    
        dispatch(setAlert( 'Profile updated'))
    
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



// delete account

export const DeleteAccount =(id,Hospital)=>async dispatch =>{

    if(window.confirm('Are you sure? Do you want to Delete your Account Permanently?...')){

        try {

            const path=Hospital ? 'hospitals/' :'profile'
            const res =await axios.delete(`/api/${path}`)
    
              
            dispatch({type:CLEAR_PROFILE });
    
            dispatch({type:DELETE_ACCCOUNT})

            dispatch(setAlert('Account Deleted'))
        } catch (err) {
            dispatch({
        
                
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
              });
            
        }
    }
}