import React from 'react'
import {Link} from 'react-router-dom'

export const Action = (props) => {

  console.log('from action hospital is',props.Hospital)
  return (
    <div className='dash-buttons' >
        <Link to={props.Hospital ===true ? "/edit-hospital":"/edit-donor"} className='btn btn-light'>
            <i className='fas fa-user-circle text-primary'></i>{' '}
            Edit Profile
        </Link>

       { props.Hospital ===true && <Link to="/Requests" className='btn btn-light'>
             
            <i class="fa-solid fa-arrow-rotate-right text-primary"></i>{' '}
            View Requests 
        </Link>
    }

    </div>
  )
}
