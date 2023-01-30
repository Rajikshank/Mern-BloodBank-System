import React,{Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../actions/profile';
import { getCurrentHospital } from '../../actions/Hospitals';
import Loading from '../Loading'
import { Action } from './Action';
import ABCCard from './ABCCard';
import NBGCard from './NBGCard';
import { Row } from 'antd';
import Posts from '../post/Posts';



const Dashboard = ({getCurrentProfile,auth:{user,Donor},profile:{profile,loading}}) => {

useEffect(()=>{
 
 if(user!==null)
    {getCurrentProfile(user.Hospital);}
 
 
   
},[user]); 

 console.log('profile',profile)
 //console.log('hospital',user.Hospital)

 
  return  loading && profile ===null && user ===null ? <Loading/> :<Fragment>
    <h1 className='large text-primary'>Dashboard</h1>
    <p className='lead'>
      <i className='fas fa-user'></i> Hey!! {user &&user.name}
    </p>
    {profile!==null ? 
    <Fragment>
      {user.Hospital!==null && <Action Hospital={user.Hospital}/>}
      <Row  justify={'start'} gutter={[60,60]}>
      {user.Hospital && <ABCCard classname='fas fa-user' name='Available Blood Packages' value={profile.A_B_C} />}
      {user.Hospital && <NBGCard classname='fas fa-hand-holding-heart' name="Needed Blood Group" value={[...new Set(profile.N_B_G)].join()}/>}
     

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