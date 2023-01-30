import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import { Space, Table, Tag } from 'antd';
import Loading from '../Loading';


const DonHistory = ({auth:{user},profile:{profile,loading},getCurrentProfile}) => {
 

  useEffect(()=>{
 
    if(user!==null)
       {getCurrentProfile(user.Hospital);}
    
    
      
   },[user]); 


   const columns = [
    {
      title: 'Date',
      dataIndex: 'Date',
      key: 'Date',
     
    },
    {
      title: 'Time',
      dataIndex: 'Time',
      key: 'Time',
     
    },
    {
      title: 'location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Hospital',
      dataIndex: 'Hospital',
      key: 'Hospital',
    },
  
  ];


  const data = profile ? profile.Donationhistory: ''




  return ( profile ===null  ? <Loading/>:
    <>
    <div className="profile-top bg-primary p-2">
      <img className="round-img my-1" src={user.avatar} alt="" />
      <h1 className="large">{user.name}</h1>
      <p className="lead">
       Contact No: {profile.phone}
      </p>
      <p className="lead">{profile.bloodgroup ? <span>Blood Group:{' '}{profile.bloodgroup}</span> : null}</p>
      <p className="lead">{profile.location ? <span>{profile.location}</span> : null}</p>

      
      
    </div>
  
  <Table rowKey={(record) => record.uid}  columns={columns} dataSource={data} pagination={false}  />;
  </>
  )
}

DonHistory.propTypes = {
  auth:PropTypes.object.isRequired,
  profile:PropTypes.object.isRequired,
  getCurrentProfile:PropTypes.func.isRequired
}



const mapStateToProps=state=>({
  auth:state.auth,
  profile:state.profile
})

export default connect(mapStateToProps,{getCurrentProfile})(DonHistory)