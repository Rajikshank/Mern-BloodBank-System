 import React,{Fragment,useEffect} from 'react'
 import PropTypes from 'prop-types';
 import Loading from '../Loading'
 import {connect} from 'react-redux';
 import { getAllProfiles } from '../../actions/profile';
import profile from '../../reducers/profile';
import SingleDonorProfile from './SingleDonorProfile'
 
 const Donors = ({getAllProfiles,profile:{profiles,loading}}) => {

    useEffect(()=>{
        getAllProfiles(false);
    },[])


   return (
     <Fragment>{loading ? <Loading/> :<Fragment>
        <h1 className='large text-primary'>DONORS</h1>
        <p className='lead'>
        <i class="fa-solid fa-user"/> Currently available Blood Donors in our System
        </p>
        <div className='profiles'>
        {profiles.length>0 ? (
            profiles.map(profile=>(
                <SingleDonorProfile key={profile._id} profile={profile}/>
            ))
        ): <h4></h4>}

        </div>

        </Fragment>}</Fragment>
   )
 }
 
 Donors.propTypes = {
    getAllProfiles:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired
 }
 

 const mapStateToProps=state=>({
    profile:state.profile
 })
 export default connect(mapStateToProps,{getAllProfiles})(Donors)