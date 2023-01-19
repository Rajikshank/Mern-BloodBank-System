import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


const SingleHospitalProfile = ({profile:{user:{_id,name,avatar},location,A_B_C,N_B_G}}) => {
  return (
    <div className='profile bg-light'>
       <i class="fa-solid fa-house-medical-circle-check fa-2xl"></i>
       <div>
        <h2>{name}</h2>
        <p>Available Blood Packages : {' '} {A_B_C}</p>
        <p className='my-1'>Needed Blood Group :{' '} {N_B_G}</p>
        <p>Location : {' '}{location}</p>
       </div>
    </div>
  )
}

SingleHospitalProfile.propTypes = {
    profile:PropTypes.object.isRequired
}

export default SingleHospitalProfile