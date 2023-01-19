import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux';
import { setAlert } from '../actions/alert';
import PropTypes from 'prop-types'
import authHospital from '../actions/authHospital';
import {   Navigate, useMatch, useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'
import { EditProfile } from '../actions/profile';
import { getCurrentProfile } from '../actions/profile';

export const EditHospitalProfile= ({ auth:{user},profile:{profile,loading},EditProfile,getCurrentProfile})  => {

var initialstate={}

if(user!==null && user.Hospital){
  
initialstate={
  name:'', 
  A_B_C:'',
  location:'',
  password:'',
 
}
}
else if (user !==null && user.Hospital===false){
  initialstate={
    name:'',
    email:'',
    bloodgroup:'',
    city:'',
    sex:'',
    password:'',
  
  }
}


  const [formData,setFormdata]=useState({
    name:'', 
    A_B_C:'',
    location:'',
    password:'',
    password2:''
  });
 
  const editingprofile=useMatch('/create-profile');
  const navigate=useNavigate();

   const {
    name,
    A_B_C,
    location,
    password,
    password2
  }=formData;



useEffect(()=>{
var profileData={};

if(!profile) getCurrentProfile(user.Hospital);

if(!loading && profile) {
  profileData={...initialstate}
  profileData.name=user.name;
  for (const key in profile) {
    if (key in profileData) profileData[key] = profile[key];
  }
}
console.log("profiledata",profileData)
setFormdata(profileData);
},[loading,getCurrentProfile,profile])


 
const onChange=e=>setFormdata({...formData,[e.target.name]:e.target.value})

const onSubmit=e=>{
  e.preventDefault()
  console.log('formdata',formData)
  EditProfile(formData,navigate,user.Hospital)
}

  return (
    <div> 
    <section className="container">
      <p className="lead"><i className="fas fa-user"></i> Edit Your Account</p>
      <form className="form"  onSubmit={e=>onSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" required value={name} onChange={e=>onChange(e)}/>
        </div>
         
    
        <div className="form-group">
          <input type="text" placeholder="Available Blood package count" name="A_B_C" required value={A_B_C} onChange={e=>onChange(e)}/>
        </div>

        <div className="form-group">
          <input type="text" placeholder="city" name="location" value={location}  onChange={e=>onChange(e)}/>
           
        </div>


        
        <div className="form-group" >
          <input
            type="password"
            placeholder="Password"
            name="password"
             
            minLength="6" 
            onChange={e=>onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            
            minLength="6"
            onChange={e=>onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-Danger" value="Register" />
      </form>
       
    </section>
    </div>
  )
}

EditHospitalProfile.prototype={
  EditProfile:PropTypes.func.isRequired,
  profile:PropTypes.object.isRequired,
  getCurrentProfile:PropTypes.func.isRequired
  
}

const mapStateToProps=state=>({
  auth:state.auth,
  profile:state.profile
})
 
export default connect (mapStateToProps,{EditProfile,getCurrentProfile})( EditHospitalProfile)