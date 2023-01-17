import React, {useState} from 'react'
import { connect } from 'react-redux';
import { setAlert } from '../actions/alert';
import { authdonor } from '../actions/authdonor';
import {   Navigate } from 'react-router-dom';

import PropTypes from 'prop-types'



export const DonorSignup = ({setAlert,authdonor,isAuthenticated}) => {

  const [formData,setFormdata]=useState({
    name:'',
    email:'',
    bloodgroup:'',
    city:'',
    sex:'',
    password:'',
    password2:''
  });

  const {name,email,bloodgroup,city,password,password2}=formData;
  const onChange=e=>setFormdata({...formData,[e.target.name]:e.target.value})
  
  const onSubmit=async e=>{
    e.preventDefault();

    if(password!==password2){
      setAlert('Passwords do not match','danger')
      console.log(formData)

    }
    else{
      console.log('success')
      console.log(formData)
      authdonor({name,email,password,bloodgroup,city});
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
          <input type="text" placeholder="Name" name="name"  value={name} onChange={e=>onChange(e)}/>
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email"  value={email}   onChange={e=>onChange(e)} />
           
        </div>

        <div className="form-group">
          <input type="text" placeholder="bloodgroup" name="bloodgroup"   value={bloodgroup} onChange={e=>onChange(e)}/>
        </div>

        <div className="form-group">
          <input type="text" placeholder="city" name="city" value={city}  onChange={e=>onChange(e)}/>
           
        </div>

        <div className="form-group" >
        please Select your Gender :
        <br/>
        <input type="radio" value="MALE" defaultChecked name="sex" onChange={e=>onChange(e)}/> Male
        <br/>
        <input type="radio" value="FEMALE" name="sex" onChange={e=>onChange(e)}/> Female
      </div>

        
        <div className="form-group" >
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            minLength="6"
            onChange={e=>onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            minLength="6"
            onChange={e=>onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-Danger" value="Register" />
      </form>
      <p className="text-Danger">
        Already have an account? <a  href="login.html" className='text-Danger'>Sign In</a>
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