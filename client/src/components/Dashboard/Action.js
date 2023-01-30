import { Button } from 'antd'
import React from 'react'
import {Link} from 'react-router-dom'
import Notification from '../layout/Notification'

export const Action = (props) => {

  console.log('from action hospital is',props.Hospital)
  
  return (
    <>
    <div className='dash-buttons' >
        <Link to={props.Hospital ===true ? "/edit-hospital":"/edit-donor"} className='btn btn-light'>
            <i className='fas fa-user-circle text-primary'></i>{' '}
            Account Settings 
        </Link>

       { props.Hospital ===true && <Link to="/Requests" className='btn btn-light'>
             
            <i class="fa-solid fa-arrow-rotate-right text-primary"></i>{' '}
            View Requests 
        </Link>
    }
       { props.Hospital ===false && <Link to="/history" className='btn btn-light'>
             
             <i class="fa-solid fa-arrow-rotate-right text-primary"></i>{' '}
             View Donation History 
         </Link>
     }
 

    { props.Hospital ===true && <Link to="/add-history" className='btn btn-light'>
             
             <i class="fa-solid fa-arrow-rotate-right text-primary"></i>{' '}
             Add Blood Donation Entry 
         </Link>
     }
    <Notification/>
    </div>

    </>
    
  )
}
