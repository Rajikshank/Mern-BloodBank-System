import React from 'react'
import {Link} from 'react-router-dom'

export const Action = () => {
  return (
    <div className='dash-buttons' >
        <Link to="/edit-profile" className='btn btn-light'>
            <i className='fas fa-user-circle text-primary'></i>{' '}
            Edit Profile
        </Link>

        <Link to="/Requests" className='btn btn-light'>
             
            <i class="fa-solid fa-arrow-rotate-right text-primary"></i>{' '}
            View Requests 
        </Link>
    

    </div>
  )
}
