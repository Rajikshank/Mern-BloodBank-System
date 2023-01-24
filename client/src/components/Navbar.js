import {React,Fragment} from 'react'
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {PropTypes} from 'prop-types';
import { logout } from '../actions/authdonor';
 



 const Navbar = ({auth:{isAuthenticated,Donor},logout}) => {

const authlinks=(

  <ul>
    <li>
      <Link   to='/Hospitals'>
      <i class="fa-solid fa-hospital"></i>{' '}
 
       Hospitals</Link>
    </li>

    <li>
      <Link   to='/Donors'>
      <i class="fa-solid fa-users"></i>{' '}
 
       Donors</Link>
    </li>


    <li>
      <Link   to='/dashboard'>
      <i class="fas fa-stream"></i>{' '}
 
       Dashboard</Link>
    </li>

    <li>
      <Link onClick={logout} to='/'>
      <i className="fas fa-sign-out-alt" />{' '}
        logout</Link>
    </li>
  </ul>
);


const guessLinks=(
<ul>
  <li><Link to="/">HOME</Link></li>
  <li><Link to="/About">ABOUT</Link></li>
</ul>
);

console.log('Donor is ',Donor);

  return (
    
    <nav class="navbar bg-danger">
    <h1>
      <Link to="/"><i className="fa-solid fa-truck-droplet"></i> NITAL</Link>
    </h1>
    <Fragment>{isAuthenticated ? authlinks : guessLinks}</Fragment>
  </nav>
  )
}

Navbar.propTypes={
  logout:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
   
}
const mapStateToProps=(state)=>({
  auth:state.auth,
 
})
export default connect(mapStateToProps,{logout} )(Navbar)