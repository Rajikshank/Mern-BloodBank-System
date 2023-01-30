import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


const SingleDonorProfile = ({profile:{user:{_id,name,avatar},location,sex,bloodgroup,phone}}) => {
  return (
    <div className='profile bg-light'>
      <img src={require('../../img/donor.png')}/> 
       <div>
        <h2>{name}</h2>
        <p><i class="fa-solid fa-user"></i>Blood Group : {' '} {bloodgroup}</p>
        <p ><i class="fa-solid fa-venus-mars"></i>{' '} Sex:{' '}{sex}</p>
        <p><i class="fa-solid fa-location-dot"></i> Location : {' '}{location}</p>
        <p><i class="fa-solid fa-phone"></i> Contact no : {' '}{phone}</p>
       </div>
    </div>
  )
}

SingleDonorProfile.propTypes = {
    profile:PropTypes.object.isRequired
}

export default SingleDonorProfile