import React, {useState} from 'react'
import { connect } from 'react-redux';
import { setAlert } from '../actions/alert';
import { authdonor } from '../actions/authdonor';
import {   Link, Navigate } from 'react-router-dom';
import { Input,Radio } from 'antd';

import PropTypes from 'prop-types'



export const DonorSignup = ({setAlert,authdonor,isAuthenticated}) => {

  const [formData,setFormdata]=useState({
    name:'',
    email:'',
    bloodgroup:'',
    city:'',
    sex:'',
    password:'',
    password2:'',
    phone:''
  });

  const {name,email,bloodgroup,city,password,password2,phone}=formData;
  const onChange=e=>setFormdata({...formData,[e.target.name]:e.target.value}) ;
  
  const onSubmit=async e=>{
    e.preventDefault();

    if(password!==password2){
      setAlert('Passwords do not match','danger')
      console.log(formData)

    }
    else{
      console.log('success')
      console.log(formData)
      authdonor(formData);
    }
    
  }
   
  if (isAuthenticated) {

    return <Navigate to="/dashboard" />;
  }

  return (
    <div> 
    <section className="container">
      <h1 className="large text-Danger">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form"  onSubmit={e=>onSubmit(e)}>
        <div className="form-group">
          <Input type="text" placeholder="Name" name="name"  value={name} onChange={e=>onChange(e)}/>
        </div>
        <div className="form-group">
          <Input type="email" placeholder="Email Address" name="email"  value={email}   onChange={e=>onChange(e)} />
           
        </div>
        <div className="form-group">
          <Input type="text" placeholder="Contact Number" name="phone"  value={phone}   onChange={e=>onChange(e)} />
           
        </div>
 
        <div className="form-group">
        Blood Group:
          <br/>
        <Radio.Group onChange={onChange} name="bloodgroup"  value={bloodgroup}>
      <Radio value={'A+'}>A+</Radio>
      <Radio value={'A-'}>A-</Radio>
      <Radio value={'AB+'}>AB+</Radio>
      <Radio value={'AB-'}>AB-</Radio>
      <Radio value={'B+'}>B+</Radio>
      <Radio value={'B-'}>B-</Radio>
      <Radio value={'O+'}>O+</Radio>
      <Radio value={'O-'}>O-</Radio>
       </Radio.Group>
       </div>


        <div className="form-group">
          <Input type="text" placeholder="city" name="city" value={city}  onChange={e=>onChange(e)}/>
           
        </div>

        <div className="form-group" >
        please Select your Gender :
        <br/>
        <input type="radio" value="MALE"  name="sex" onChange={e=>setFormdata({...formData,sex:'Male'})}/> Male
        <br/>
        <input type="radio" value="FEMALE" name="sex" onChange={e=>setFormdata({...formData,sex:'Female'})}/> Female
      </div>

        
        <div className="form-group" >
          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            minLength="6"
            onChange={e=>onChange(e)}
          />
        </div>
        <div className="form-group">
          <Input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            minLength="6"
            onChange={e=>onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="text-Danger">
        Already have an account? <Link  to={"/login"} className='text-Danger'>Sign In</Link>
      </p>
    </section>
    </div>
  )
}

DonorSignup.propTypes={
  setAlert:PropTypes.func.isRequired,
  authdonor:PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool
}


const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps,{setAlert,authdonor})(DonorSignup);