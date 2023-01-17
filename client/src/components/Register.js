import React from 'react'
import { Link,Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {PropTypes} from 'prop-types';
import {   Navigate } from 'react-router-dom';


 const Register = ({isAuthenticated }) => {
  if(isAuthenticated){
    return <Navigate to='/dashboard' />
  }

  return (
    <section class="landing">
    <div class="dark-overlay">
      <div class="landing-inner">
        <h1 class="x-large">NITAL</h1>
        <p class="lead">
          Create a Donor/Hospital profile to help 
          patients and hospitals 
        </p>
        <div class="buttons">
          <Link to="/DonorSignup" class="btn btn-danger">Sign Up As a Donor</Link>
          <Link to="/HospitalSignup" class="btn btn-danger">Sign Up As a Hospital</Link>
          <Link to="/Login" class="btn btn-success">Login</Link>
        </div>
      </div>
    </div>
  </section>
  )
}

Register.propTypes={
  isAuthenticated:PropTypes.bool
}

const mapStateToProps=state=>({
  isAuthenticated:state.auth.isAuthenticated
})

export default connect (mapStateToProps)(Register)
