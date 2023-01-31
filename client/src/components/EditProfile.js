import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux';
import { setAlert } from '../actions/alert';
import PropTypes from 'prop-types'
import authHospital from '../actions/authHospital';
import {   Navigate, useMatch, useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'
import { EditProfile } from '../actions/profile';
import { getCurrentProfile } from '../actions/profile';
import { Divider,FloatButton,Popover,Input } from 'antd'
import { CustomerServiceOutlined } from '@ant-design/icons'
import { DeleteAccount } from '../actions/profile';


export const EditHospitalProfile= ({ auth:{user},profile:{profile,loading},EditProfile,getCurrentProfile,DeleteAccount})  => {

 
  
var initialstate={
  name:'', 
  A_B_C:'',
  location:'',
  password:'',
  phone:'',
  M_S_C:''
 
}
 
 


  const [formData,setFormdata]=useState({
    name:'', 
    A_B_C:'',
    location:'',
    password:'',
    password2:'',
    M_S_C:'',
    phone:''
  });
 
  const editingprofile=useMatch('/create-profile');
  const navigate=useNavigate();

   const {
    name,
    A_B_C,
    location,
    password,
    password2,
    phone,
    M_S_C
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
    <>
    <div> 
    <section className="container">
      <p className="lead"><i className="fas fa-user"></i> Account Settings</p>
      <form className="form"  onSubmit={e=>onSubmit(e)}>
        <div className="form-group">
          <Input type="text" placeholder="Name" name="name" required value={name} onChange={e=>onChange(e)}/>
        </div>

        <div className="form-group">
          <input type="text" placeholder="Contact Number" name="phone"  value={phone}   onChange={e=>onChange(e)} />
           
        </div>

        <div className="form-group">
          <input type="text" placeholder="Maximum Storage Capacity" name="M_S_C" required value={M_S_C} onChange={e=>onChange(e)}/>
        </div>
    
        <div className="form-group">
          <Input type="text" placeholder="Available Blood package count" name="A_B_C" required value={A_B_C} onChange={e=>onChange(e)}/>
        </div>

        <div className="form-group">
          <Input type="text" placeholder="location" name="location" value={location}  onChange={e=>onChange(e)}/>
           
        </div>


        
        <div className="form-group" >
          <Input
            type="password"
            placeholder="Password"
            name="password"
             
            minLength="6" 
            onChange={e=>onChange(e)}
          />
        </div>
        <div className="form-group">
          <Input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            
            minLength="6"
            onChange={e=>onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Update"  />
      </form>
     
    </section>
    
    </div>
    <Popover title="Delete Account">
    <FloatButton
      shape="circle"
      onClick={e=>DeleteAccount(true,navigate)}
      style={{
        right: 94,
        
      }}
      icon={<i class="fa-sharp fa-solid fa-trash"></i>}
    />
    </Popover>

    </>


  )
}

EditHospitalProfile.prototype={
  EditProfile:PropTypes.func.isRequired,
  profile:PropTypes.object.isRequired,
  getCurrentProfile:PropTypes.func.isRequired,
  DeleteAccount:PropTypes.func.isRequired
  
}

const mapStateToProps=state=>({
  auth:state.auth,
  profile:state.profile
})
 
export default connect (mapStateToProps,{EditProfile,getCurrentProfile,DeleteAccount})( EditHospitalProfile)