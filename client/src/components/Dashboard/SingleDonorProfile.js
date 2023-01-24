import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


const SingleDonorProfile = ({profile:{user:{_id,name,avatar},location,sex,bloodgroup}}) => {
  return (
    <div className='profile bg-light'>
      <img src={require('../../img/donor.png')}/> 
       <div>
        <h2>{name}</h2>
        <p>Blood Group : {' '} {bloodgroup}</p>
        <p className='my-1'>sex :{' '} {sex}</p>
        <p>Location : {' '}{location}</p>
       </div>
    </div>
  )
}

SingleDonorProfile.propTypes = {
    profile:PropTypes.object.isRequired
}

export default SingleDonorProfile