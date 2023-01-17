import React from 'react'
import {Link} from 'react-router-dom'

export const Action = () => {
  return (
    <div className='dash-buttons' >
        <Link to="/edit-profile" className='btn btn-light'>
            <i className='fas fa-user-circle text-primary'></i>{' '}
            Edit Profile
        </Link>

        <Link to="/Update-profile" className='btn btn-light'>
             
            <i class="fa-solid fa-arrow-rotate-right text-primary"></i>{' '}
            Update 
        </Link>
    

    </div>
  )
}
