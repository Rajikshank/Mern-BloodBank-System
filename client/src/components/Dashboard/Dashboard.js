import React,{Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../actions/profile';
import { getCurrentHospital } from '../../actions/Hospitals';
import Loading from '../Loading'
import { Action } from './Action';
import Cardview from './Card';
import { Row } from 'antd';
import Posts from '../post/Posts';
const Dashboard = ({getCurrentProfile,auth:{user,Donor},profile:{profile,loading}}) => {

useEffect(()=>{
 
 if(user!==null)
    {getCurrentProfile(user.Hospital);}
 
  
   
},[user]); 

 console.log('profile',profile)
 //console.log('hospital',user.Hospital)

 
  return  loading && profile ===null ? <Loading/> :<Fragment>
    <h1 className='large text-primary'>Dashboard</h1>
    <p className='lead'>
      <i className='fas fa-user'></i> Hey!! {user &&user.name}
    </p>
    {profile!==null ? 
    <Fragment>
      <Action/>
      <Row  justify={'start'} gutter={[60,60]}>
      <Cardview classname='fas fa-user' name='Available Blood Packages' value={profile.A_B_C}/>
      <Cardview classname='fas fa-hand-holding-heart' name="Needed Blood Group" value={"A+,B,AB+"}/>
     

      </Row>
      <Posts/>
    </Fragment> :<Fragment> not available</Fragment>}
  </Fragment>
}

Dashboard.propTypes = {
    getCurrentProfile:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    profile:PropTypes.object.isRequired
}

const mapStateToProps=state=>({
    auth:state.auth,
    profile:state.profile
})

export default connect (mapStateToProps,{getCurrentProfile})(Dashboard)