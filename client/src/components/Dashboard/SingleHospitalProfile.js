import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


const SingleHospitalProfile = ({profile:{user:{_id,name,avatar},location,A_B_C,N_B_G,phone,M_S_C}}) => {
  return (
    <div className='profile bg-light'>
       <img src={require('../../img/hospital.png')}/> 
       <div>
        <h2>{name}</h2>
        <p><i class="fa-solid fa-hospital"></i>Available Blood Packages : {' '} {A_B_C}</p>
        {Array.isArray(N_B_G) && <p className='my-1'><i class="fa-solid fa-syringe"></i> Needed Blood Group :{' '} {N_B_G.join()}</p>}
        <p className='my-1'><i class="fa-solid fa-location-dot"></i>Location : {' '}{location}</p>
        <p className='my-1'><i class="fa-solid fa-phone"></i> Contact no : {' '}{phone}</p>
        <p className='my-1'><i class="fa-solid fa-truck-front"></i> Maximum Storage Capacity : {' '}{M_S_C}</p>
       </div>
    </div>
  )
}

SingleHospitalProfile.propTypes = {
    profile:PropTypes.object.isRequired
}

export default SingleHospitalProfile