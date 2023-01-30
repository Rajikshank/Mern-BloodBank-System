import axios from 'axios'
import { setAlert } from './alert';
import { REGISTER_SUCCESS_HOS,REGISTER_FAIL,AUTH_ERROR,LOGIN_SUCCESS_HOS,LOGIN_FAIL,LOGOUT, USER_LOADED_HOS,CLEAR_PROFILE} from './types';
import setAuthToken from '../utils/setAuthToken';
 

export const loadUser=()=>async dispatch=>{
     if(localStorage.token){
      
        setAuthToken(localStorage.token)
     }

     try {
        
        const res =await axios.get('api/auth');
        dispatch({
            type:USER_LOADED_HOS,
            payload:res.data 
        })
     } catch (err) {
        dispatch({
            type:AUTH_ERROR
        })
     }
}

export const authHospital=({name,email,password,ABC,city,phone,M_S_C})=>async dispatch=>{
    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const Hospital=true ;
    const body=JSON.stringify({name,email,password,Hospital})


    const config2 ={// configuraion for profile 
        headers:{
            'Content-Type':'application/json',
            'x-auth-token':''
        }
    }
 
     console.log(ABC,city)
     const A_B_C=ABC 
     const location=city
     const body2=JSON.stringify({A_B_C,location,phone,M_S_C})

    try {
        
    const res= await axios.post('/api/users',body,config) 
    console.log(res.data.token)
    config2.headers['x-auth-token']=res.data.token
            
      await axios.post( '/api/hospitals',body2,config2)
    
        dispatch({
            type:REGISTER_SUCCESS_HOS,
            payload:res.data
        });

        dispatch(loadUser())
    } catch (err) {
        dispatch (setAlert(err.response.data.errors[0].msg,'error'))
        console.log(err)
        const errors=err.response.data;
        if(errors){
            errors.forEach(error =>dispatch (setAlert(error.msg,'error'))
                
            );
        }
        dispatch({
            type:REGISTER_FAIL
        })
    }
}




export const LoginUser=(email,password)=>async dispatch=>{
    console.log('frm authdonor',email,password)
    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }
    
    const body=JSON.stringify({ email,password})

 
 
 
     
    try {
        
    const res= await axios.post('/api/auth',body,config) 
    console.log(res.data.token)
     
    
        dispatch({
            type:LOGIN_SUCCESS_HOS,
            payload:res.data
        });


        dispatch(loadUser())
    } catch (err) {
        console.log(err)
        const errors=err.response.data;
        console.log(errors)
        if(errors){
            errors.errors.forEach(error =>dispatch (setAlert(error.msg,'error'))
                
            );
        }
        dispatch({
            type:LOGIN_FAIL
        })
    }
}


export const logout=()=>dispatch=>{
    dispatch({type:CLEAR_PROFILE})
    dispatch({type:LOGOUT})
}
 
export default authHospital;